#!/usr/bin/env python3
"""Convert a Tabler docs page (Eleventy markdown + Liquid) to Astro MDX.

Usage:
  convert-docs-md.py <docs/content/.../page.md> <preview-astro/src/pages/.../index.mdx>

Pipeline:
1. Every `{% include "X.html" params %}` for a MAPPED component (INCLUDE_COMPONENTS)
   is replaced with `<Component params />` — anywhere (inline in prose or inside
   a capture block). Unmapped includes are left as-is and reported.
2. `{% capture html %}...{% endcapture %}` + `{% include "docs/example.html"
   html=html <params> %}` becomes `<Example <params>>content</Example>`
   (the example params — centered/column/bg/height/hide-code/raw — map to props).
3. `{% scss-docs %}` is removed (empty in the dev build).
4. Imports for Example + every component used are emitted at the top.

Loops/assigns (`{% for %}`, `{% assign %}`) are NOT auto-converted — pages that
use them are reported so they can be finished by hand (JSX `.map()`).
"""
import os
import re
import sys

# liquid include path -> (ComponentName, import path under components/, {kebab: camelProp})
INCLUDE_COMPONENTS = {
	'ui/icon.html': ('Icon', 'Icon.astro', {'icon': 'name'}),
	'ui/alert.html': ('Alert', 'Alert.astro', {'show-close': 'showClose'}),
	'ui/badge.html': ('Badge', 'ui/Badge.astro', {}),
	'ui/button.html': ('Button', 'Button.astro', {'icon-color': 'iconColor', 'icon-end': 'iconEnd', 'icon-only': 'iconOnly'}),
	'ui/avatar.html': ('Avatar', 'ui/Avatar.astro', {'person-id': 'personId'}),
	'ui/flag.html': ('Flag', 'ui/Flag.astro', {}),
	'ui/payment.html': ('Payment', 'ui/Payment.astro', {}),
	'ui/progress.html': ('Progress', 'ui/Progress.astro', {}),
	'ui/progressbg.html': ('ProgressBg', 'ui/ProgressBg.astro', {'show-value': 'showValue'}),
	'ui/progress-steps.html': ('ProgressSteps', 'ui/ProgressSteps.astro', {'aria-label': 'ariaLabel'}),
	'ui/pagination.html': ('Pagination', 'ui/Pagination.astro', {'active-item': 'activeItem', 'first-last': 'firstLast', 'prev-description': 'prevDescription', 'next-description': 'nextDescription'}),
	'ui/breadcrumb.html': ('Breadcrumb', 'ui/Breadcrumb.astro', {}),
	'ui/timeline.html': ('Timeline', 'ui/Timeline.astro', {}),
	'ui/steps.html': ('Steps', 'ui/Steps.astro', {'show-tooltip': 'showTooltip', 'show-title': 'showTitle'}),
	'ui/spinner.html': ('Spinner', 'ui/Spinner.astro', {}),
	'ui/status-dot.html': ('StatusDot', 'ui/StatusDot.astro', {}),
	'ui/ribbon.html': ('Ribbon', 'ui/Ribbon.astro', {}),
	'ui/tag.html': ('Tag', 'ui/Tag.astro', {'person-id': 'personId'}),
	'ui/dropdown.html': ('Dropdown', 'ui/Dropdown.astro', {'main-btn': 'mainBtn'}),
	'ui/nav.html': ('Nav', 'ui/Nav.astro', {}),
	'ui/nav-segmented.html': ('NavSegmented', 'ui/NavSegmented.astro', {'full-width': 'fullWidth'}),
	'ui/rating.html': ('Rating', 'ui/Rating.astro', {}),
	'ui/range.html': ('Range', 'ui/Range.astro', {}),
	'ui/toast.html': ('Toast', 'ui/Toast.astro', {}),
	'ui/empty.html': ('Empty', 'ui/Empty.astro', {'button-text': 'buttonText', 'button-icon': 'buttonIcon', 'icon-text': 'iconText'}),
	'ui/accordion.html': ('Accordion', 'ui/Accordion.astro', {'toggle-icon': 'toggleIcon', 'show-icon': 'showIcon'}),
	'ui/illustration.html': ('Illustration', 'ui/Illustration.astro', {}),
	'ui/wysiwyg.html': ('Wysiwyg', 'ui/Wysiwyg.astro', {}),
	'ui/map-vector.html': ('MapVector', 'ui/MapVector.astro', {'map-id': 'mapId'}),
	'ui/chart.html': ('Chart', 'Chart.astro', {'chart-id': 'chartId'}),
}

# example params (kebab) -> camelCase prop; `html`/`html=html` is dropped (the content)
EXAMPLE_PROP = {
	'hide-code': 'hideCode',
	'column-full-width': 'columnFullWidth',
}

# global Liquid vars used in docs prose (from docs/eleventy.config.mjs + site.json).
# Loop-scoped vars (script/color/pattern/gradient/illustration) are NOT here —
# pages using them need manual loop conversion.
PKG_VERSION = '1.4.0'
SITE_VARS = {
	'cdnUrl': f'https://cdn.jsdelivr.net/npm/@tabler/core@{PKG_VERSION}',
	'site.homepage': 'https://tabler.io',
	'site.icons.link': 'https://tabler.io/icons',
	'iconsCount': '123',
	'emailsCount': '123',
	'illustrationsCount': '123',
}


def _props(arg_str: str, prop_map: dict) -> str:
	props = []
	# key, with an optional value that is either a "quoted string" or a bare
	# token (Liquid include args: color="Blue", count=4, active=true, key=var).
	for pm in re.finditer(r'([\w-]+)(?:=("[^"]*"|[^\s]+))?', arg_str):
		key, raw = pm.group(1), pm.group(2)
		prop = prop_map.get(key, key)
		if raw is None:
			props.append(prop)
		elif raw.startswith('"'):
			val = raw[1:-1]
			if '&' in val or val.startswith('{'):
				props.append(prop + '={"' + val.replace('"', '\\"') + '"}')
			else:
				props.append(f'{prop}="{val}"')
		elif re.fullmatch(r'-?\d+(?:\.\d+)?', raw) or raw in ('true', 'false'):
			# unquoted number/boolean → JSX expression (preserves the type)
			props.append(f'{prop}={{{raw}}}')
		else:
			# unquoted variable reference (loop-scoped: color[0], forloop.index)
			props.append(f'{prop}={{{raw}}}')
	return ' '.join(props)


def inline_text_nodes(html: str) -> str:
	"""Join pure-text lines onto surrounding tag lines — MDX wraps text that
	stands alone on a line in <p>, which would change the example DOM."""
	out = []
	for line in html.splitlines():
		stripped = line.strip()
		is_text = bool(stripped) and '<' not in stripped
		if out and is_text and out[-1].rstrip().endswith('>'):
			out[-1] = out[-1].rstrip() + stripped
		elif out and is_text and '<' not in out[-1].strip():
			out[-1] = out[-1].rstrip() + ' ' + stripped
		elif out and stripped.startswith('</') and not out[-1].rstrip().endswith('>'):
			out[-1] = out[-1].rstrip() + stripped
		else:
			out.append(line)
	return '\n'.join(out)


def convert(src_path: str, dst_path: str) -> None:
	src = open(src_path).read()
	fm_end = src.index('---', 3)
	fm = src[3:fm_end].strip()
	body = src[fm_end + 3:]

	# redirect pages (layout: redirect) are not MDX content — a bare meta-refresh
	# document. They must be authored by hand as an .astro page using RedirectLayout
	# (appending a second `layout:` key here would produce invalid YAML).
	if re.search(r'^layout:\s*redirect\s*$', fm, flags=re.M):
		print(f'SKIP {src_path}: redirect page — author by hand with RedirectLayout')
		return

	used = set()
	todos = []

	# 0. self-close void elements — MDX is strict JSX and rejects `<input>` etc.
	# Only touch tags that are NOT already self-closed.
	VOID = 'area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr'
	body = re.sub(rf'<({VOID})(\b[^>]*?)(?<!/)>', r'<\1\2 />', body, flags=re.I)

	# 1. replace every mapped include (inline or inside captures)
	def repl_include(m: re.Match) -> str:
		path, args = m.group(1), m.group(2)
		if path == 'docs/example.html':
			return m.group(0)  # handled in step 2
		if path not in INCLUDE_COMPONENTS:
			todos.append(f'{path} (unmapped include)')
			return m.group(0)
		name, _imp, prop_map = INCLUDE_COMPONENTS[path]
		used.add(path)
		return f'<{name} {_props(args, prop_map)} />'

	body = re.sub(r'\{%-?\s*include "([^"]+)"\s*(.*?)-?%\}', repl_include, body, flags=re.S)

	# 2. capture + example include → <Example ...>content</Example>
	def convert_example(m: re.Match) -> str:
		# collapse newlines at tag boundaries so no element spans multiple lines
		# with inline children — MDX (strict JSX) rejects that. The DOM comparator
		# normalizes whitespace, so between-tag whitespace is insignificant.
		content = m.group(1).strip('\n')
		content = re.sub(r'\n\s*', ' ', content)
		content = re.sub(r'\s+/>', ' />', content)
		ex_args = m.group(2)
		# drop html / html=html; map the rest
		ex_args = re.sub(r'\bhtml(=html)?\b', '', ex_args).strip()
		props = _props(ex_args, EXAMPLE_PROP) if ex_args else ''
		open_tag = f'<Example {props}>'.replace(' >', '>')
		return f'{open_tag}\n{content}\n</Example>'

	# capture may open on its own line (multi-line body) or inline with the body
	# on the same line (`{% capture html -%} ... {%- endcapture %} {% include ... %}`)
	body = re.sub(
		r'\{%-?\s*capture html\s*-?%\}\s*(.*?)\{%-?\s*endcapture\s*-?%\}\s*\{%-?\s*include "docs/example.html"\s*(.*?)-?%\}',
		convert_example, body, flags=re.S)
	body = re.sub(r'\{%-?\s*scss-docs [^%]*-?%\}\s*', '', body)

	# resolve global Liquid variables in prose ({{ cdnUrl }}, {{ site.homepage }}...)
	def repl_var(m: re.Match) -> str:
		name = m.group(1).strip()
		if name in SITE_VARS:
			return SITE_VARS[name]
		todos.append(f'{{{{ {name} }}}} (unresolved variable — loop-scoped?)')
		return m.group(0)

	body = re.sub(r'\{\{\s*([\w.]+)\s*\}\}', repl_var, body)

	# 3. imports
	src_root = dst_path[:dst_path.index('src/pages/') + 4]
	up = os.path.relpath(src_root, os.path.dirname(dst_path))
	imports = [f"import Example from '{up}/components/docs/Example.astro';"]
	for path in sorted(used):
		name, imp, _ = INCLUDE_COMPONENTS[path]
		imports.append(f"import {name} from '{up}/components/{imp}';")

	out = f"""---
{fm}
layout: '{up}/layouts/DocsMdxLayout.astro'
---
{chr(10).join(imports)}

{body.strip()}
"""
	os.makedirs(os.path.dirname(dst_path), exist_ok=True)
	open(dst_path, 'w').write(out)
	print(f'written {dst_path}')
	for t in sorted(set(todos)):
		print(f'TODO: {t}')
	leftover = set(re.findall(r'\{%[^}]*%\}', out))
	for l in leftover:
		print(f'WARNING, unconverted Liquid tag: {l}')


if __name__ == '__main__':
	convert(sys.argv[1], sys.argv[2])
