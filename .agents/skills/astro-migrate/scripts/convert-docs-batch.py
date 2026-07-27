#!/usr/bin/env python3
"""Batch driver for docs md -> MDX conversion (Phase D1).

Classifies content/**/*.md into index/section, leaf-clean and leaf-dirty,
then converts a chosen bucket via convert-docs-md.py. Prints per-page warnings.

Usage: convert-docs-batch.py [clean|dirty|list]
"""
import glob
import os
import re
import subprocess
import sys

REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
CONV = os.path.join(REPO, ".claude", "skills", "astro-migrate", "scripts", "convert-docs-md.py")
CONTENT = os.path.join(REPO, "docs", "content")
PAGES = os.path.join(REPO, "preview-astro", "src", "pages")

MAPPED = {
    'ui/icon.html', 'ui/alert.html', 'ui/badge.html', 'ui/button.html', 'ui/avatar.html',
    'ui/flag.html', 'ui/payment.html', 'ui/progress.html', 'ui/progressbg.html',
    'ui/progress-steps.html', 'ui/pagination.html', 'ui/breadcrumb.html', 'ui/timeline.html',
    'ui/steps.html', 'ui/spinner.html', 'ui/status-dot.html', 'ui/ribbon.html', 'ui/tag.html',
    'ui/dropdown.html', 'ui/nav.html', 'ui/nav-segmented.html', 'ui/rating.html', 'ui/range.html',
    'ui/toast.html', 'ui/empty.html', 'ui/accordion.html', 'ui/illustration.html',
    'ui/wysiwyg.html', 'ui/map-vector.html', 'ui/chart.html', 'docs/example.html',
}


def classify():
    index, clean, dirty = [], [], []
    for f in sorted(glob.glob(os.path.join(CONTENT, "**", "*.md"), recursive=True)):
        s = open(f).read()
        rel = os.path.relpath(f, CONTENT)[:-3]
        base = os.path.basename(f)
        is_index = base == "index.md" or rel.count("/") == 0
        loops = len(re.findall(r'\{%-?\s*for ', s))
        assigns = len(re.findall(r'\{%-?\s*assign ', s))
        other = set(re.findall(r'\{%-?\s*(\w[\w-]*)', s)) - {
            'capture', 'endcapture', 'include', 'for', 'endfor', 'assign', 'if', 'endif',
            'unless', 'endunless', 'else', 'elsif', 'comment', 'endcomment', 'scss-docs'}
    # scss-docs is stripped by the converter, so it does not make a page dirty
        incs = set(re.findall(r'\{%-?\s*include "([^"]+)"', s))
        unmapped = sorted(i for i in incs if i not in MAPPED)
        # {{ script }} is the include-emitted JS (capture_script flow) — needs a
        # per-component fix; redirect pages are bare meta-refresh .astro documents.
        special = bool(re.search(r'\{\{\s*script\s*\}\}', s)) or bool(
            re.search(r'^layout:\s*redirect\s*$', s, flags=re.M))
        if is_index:
            index.append(rel)
        elif loops or assigns or other or unmapped or special:
            dirty.append(rel)
        else:
            clean.append(rel)
    return index, clean, dirty


def convert(rel):
    src = os.path.join(CONTENT, rel + ".md")
    dst = os.path.join(PAGES, rel, "index.mdx")
    out = subprocess.run([sys.executable, CONV, src, dst], capture_output=True, text=True)
    msg = (out.stdout + out.stderr).strip().splitlines()
    return [m for m in msg if not m.startswith("written")]


def main():
    mode = sys.argv[1] if len(sys.argv) > 1 else "list"
    index, clean, dirty = classify()
    if mode == "list":
        print(f"index/section {len(index)} | leaf-clean {len(clean)} | leaf-dirty {len(dirty)}")
        return
    bucket = clean if mode == "clean" else dirty
    warned = 0
    for rel in bucket:
        w = convert(rel)
        if w:
            warned += 1
            print(f"### {rel}")
            for line in w:
                print("   ", line)
    print(f"converted {len(bucket)} {mode} page(s); {warned} with warnings/TODO")


if __name__ == "__main__":
    main()
