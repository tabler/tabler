#!/usr/bin/env python3
"""Canonical DOM diff of two HTML files (Eleventy vs Astro).

Normalizations (non-semantic only):
- attribute sorting, whitespace collapse in attribute values and text
- HTML comments removed
- ?<unix-ts> cache-busters
- known Liquid include['size'] bug classes: icon-N, btn-N, avatar-N... (numeric only)
- footer "Generated <date>" (build timestamp)
- shiki code blocks compared as plain text (line breaking/tokenization is
  presentation; code content must match token for token)

Usage: compare-dom.py a.html b.html [--out-dir DIR]
"""
import re
import sys
from html.parser import HTMLParser

VOID = {"meta", "link", "input", "br", "img", "hr", "path", "source", "circle", "rect", "line", "polyline", "polygon", "ellipse", "use", "stop"}


class Canon(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.out = []
        self.depth = 0

    def _attrs(self, attrs):
        norm = []
        for k, v in sorted(attrs):
            v = v or ""
            # attribute values may contain nested HTML (data-clipboard-text):
            # apply the same normalizations as for the whole document
            v = re.sub(r"<!--.*?-->", "", v, flags=re.S)
            v = re.sub(r" (?:icon|btn|avatar|badge|progress|flag|payment|steps|chart|form-switch)-\d+(?=[\" ])", "", v)
            v = re.sub(r"\s+", " ", v).strip()
            if "<" in v:
                # nested HTML (data-clipboard-text): whitespace at tag
                # boundaries is non-semantic for the copied snippet
                v = re.sub(r"\s*(<|>)\s*", r"\1", v)
            norm.append(f'{k}="{v}"')
        return " ".join(norm)

    def handle_starttag(self, tag, attrs):
        a = self._attrs(attrs)
        self.out.append("  " * self.depth + f"<{tag}{' ' + a if a else ''}>")
        if tag not in VOID:
            self.depth += 1

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)

    def handle_endtag(self, tag):
        if tag not in VOID:
            self.depth = max(0, self.depth - 1)
            self.out.append("  " * self.depth + f"</{tag}>")

    def handle_data(self, data):
        t = re.sub(r"\s+", " ", data).strip()
        if t:
            self.out.append("  " * self.depth + t)


def canonicalize(path):
    html = open(path).read()
    html = re.sub(r"\?\d{9,}", "", html)                                  # cache-busters
    html = re.sub(r" (?:icon|btn|avatar|badge|progress|flag|payment|steps|chart|form-switch)-\d+(?=[\" ])", "", html)  # include['size'] bug
    html = re.sub(r"Generated \d{4}-\d{2}-\d{2} \d{2}:\d{2} \+0000", "Generated TIMESTAMP", html)
    html = re.sub(r"<!--.*?-->", "", html, flags=re.S)
    # empty lines inside shiki blocks (code panel cosmetics — Liquid leaves a
    # blank line between capture'd alerts, Astro does not)
    html = re.sub(r'<span class="line"></span>\n?', "", html)
    # compare shiki code blocks as plain text (line breaking/tokenization is
    # presentation; the code content must be token-identical)
    def flatten_pre(m):
        import html as html_lib
        inner = re.sub(r"<[^>]+>", "", m.group(2))
        inner = html_lib.unescape(inner)
        # whitespace at tag boundaries inside a snippet is non-semantic
        inner = re.sub(r"\s*([<>])\s*", r"\1", inner)
        inner = inner.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
        return m.group(1) + inner + "</pre>"
    html = re.sub(r'(<pre class="shiki[^"]*"[^>]*>)(.*?)</pre>', flatten_pre, html, flags=re.S)
    p = Canon()
    p.feed(html)
    return "\n".join(p.out) + "\n"


def main():
    a, b = sys.argv[1], sys.argv[2]
    out_dir = sys.argv[4] if len(sys.argv) > 4 and sys.argv[3] == "--out-dir" else "."
    ca, cb = canonicalize(a), canonicalize(b)
    pa, pb = f"{out_dir}/a.canon.txt", f"{out_dir}/b.canon.txt"
    open(pa, "w").write(ca)
    open(pb, "w").write(cb)
    if ca == cb:
        print("IDENTICAL")
        return 0
    import difflib
    diff = list(difflib.unified_diff(ca.splitlines(), cb.splitlines(), lineterm="", n=2))
    print(f"DIFF ({len(diff)} lines) — full result in {out_dir}/semantic.diff")
    open(f"{out_dir}/semantic.diff", "w").write("\n".join(diff))
    for line in diff[:80]:
        print(line)
    return 1


if __name__ == "__main__":
    sys.exit(main())
