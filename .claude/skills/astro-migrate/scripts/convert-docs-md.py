#!/usr/bin/env python3
"""Convert a Tabler docs page (Eleventy markdown + Liquid) to Astro MDX.

Usage:
  convert-docs-md.py <docs/content/.../page.md> <tabler-astro/src/pages/.../index.mdx>

Mappings:
- front matter → preserved + layout: DocsMdxLayout (adapter for DocsLayout)
- {% capture html %} + {% include "docs/example.html" html=html %} →
  <Example> with slot content: ui/alert.html includes → <Alert ... />, raw
  HTML inserted directly (text joined onto tag lines — MDX wraps multi-line
  text standing on its own line in <p>, which would change the preview DOM)
- entities in parameters (&hellip; etc.) → JS expression (JSX would decode
  them inside an attribute string)
- {% scss-docs %} → removed (renders empty in the dev build)

Includes other than ui/alert.html are reported as TODO — add a component
mapping analogous to INCLUDE_COMPONENTS.
"""
import os
import re
import sys

INCLUDE_COMPONENTS = {
	'ui/alert.html': ('Alert', {'show-close': 'showClose'}),
	# add more as needed: 'ui/badge.html': ('Badge', {}), ...
}


def include_to_component(inc: str) -> str | None:
	m = re.match(r'\{%-?\s*include "([^"]+)"\s*(.*?)-?%\}', inc.strip())
	if not m or m.group(1) not in INCLUDE_COMPONENTS:
		return None
	component, prop_map = INCLUDE_COMPONENTS[m.group(1)]
	props = []
	for pm in re.finditer(r'([\w-]+)(?:="([^"]*)")?', m.group(2)):
		key, val = pm.group(1), pm.group(2)
		if not key:
			continue
		prop = prop_map.get(key, key)
		if val is None:
			props.append(prop)
		elif '&' in val:
			props.append(prop + '={"' + val.replace('"', '\\"') + '"}')
		else:
			props.append(f'{prop}="{val}"')
	return f"  <{component} {' '.join(props)} />"


def inline_text_nodes(html: str) -> str:
	"""Join pure-text lines onto surrounding tag lines (anti-<p> for MDX)."""
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

	todos = []

	def convert_capture(m: re.Match) -> str:
		captured = m.group(1).strip('\n')
		lines = [l for l in captured.splitlines() if l.strip()]
		if all(l.strip().startswith('{% include') for l in lines):
			comps = [include_to_component(l) for l in lines]
			if all(comps):
				return '<Example>\n' + '\n'.join(comps) + '\n</Example>'
			todos.append(lines[0].strip())
		return f'<Example>\n{inline_text_nodes(captured)}\n</Example>'

	body = re.sub(
		r'\{% capture html -%\}\n(.*?)\{%- endcapture %\}\n\{% include "docs/example.html" html=html %\}',
		convert_capture, body, flags=re.S)
	body = re.sub(r'\{% scss-docs [^%]*%\}\s*', '', body)

	# relative paths computed from the target file's directory up to src/
	src_root = dst_path[:dst_path.index('src/pages/') + 4]
	up = os.path.relpath(src_root, os.path.dirname(dst_path))

	out = f"""---
{fm}
layout: '{up}/layouts/DocsMdxLayout.astro'
---
import Example from '{up}/components/docs/Example.astro';
import Alert from '{up}/components/Alert.astro';

{body.strip()}
"""
	os.makedirs(os.path.dirname(dst_path), exist_ok=True)
	open(dst_path, 'w').write(out)
	print(f'written {dst_path}')
	for t in todos:
		print(f'TODO (include without a mapping, inserted as raw Liquid!): {t}')
	leftover = re.findall(r'\{%[^}]*%\}', out)
	for l in set(leftover):
		print(f'WARNING, unconverted Liquid tag in output: {l}')


if __name__ == '__main__':
	convert(sys.argv[1], sys.argv[2])
