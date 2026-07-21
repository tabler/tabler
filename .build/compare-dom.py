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

VOID = {"meta", "link", "input", "br", "img", "hr", "path", "source", "circle", "rect", "line", "polyline", "polygon", "ellipse", "use", "stop", "option"}


def normalize_js(code):
    """JS-token-level normalization of inline <script> content.

    The Astro chart generator builds configs as objects and serializes them
    (double quotes, no trailing commas, its own spacing), while Liquid emitted
    hand-formatted code. All of that is non-semantic for the executed JS, so:
    string literals are canonicalized to double-quoted form, trailing commas
    before } / ] are dropped, and whitespace adjacent to punctuation is removed.
    Real config changes (values, keys, structure) still produce a diff.
    """
    out, strings = [], []
    i, n = 0, len(code)
    while i < n:
        c = code[i]
        if c in ('"', "'", "`"):
            q, j, buf = c, i + 1, []
            while j < n:
                if code[j] == "\\":
                    buf.append(code[j:j + 2]); j += 2; continue
                if code[j] == q:
                    break
                buf.append(code[j]); j += 1
            s = "".join(buf)
            if q == "`":
                strings.append("`" + s + "`")
            else:
                inner = s.replace('\\"', '"').replace("\\'", "'")
                strings.append('"' + inner.replace('"', '\\"') + '"')
            out.append("\x00%d\x00" % (len(strings) - 1))
            i = j + 1
        else:
            out.append(c); i += 1
    text = "".join(out)
    text = re.sub(r",\s*([}\]])", r"\1", text)          # trailing commas
    text = re.sub(r"\s+", " ", text)                      # collapse whitespace
    text = re.sub(r" ?([{}()\[\]:;,=+*<>!&|.-]) ?", r"\1", text)  # spacing around punctuation
    return re.sub(r"\x00(\d+)\x00", lambda m: strings[int(m.group(1))], text)


class Canon(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.out = []
        self.depth = 0
        self.in_script = False

    def _attrs(self, attrs):
        norm = []
        for k, v in sorted(attrs):
            v = v or ""
            # attribute values may contain nested HTML (data-clipboard-text):
            # apply the same normalizations as for the whole document
            v = re.sub(r"<!--.*?-->", "", v, flags=re.S)
            v = re.sub(r" (?:icon|btn|avatar|badge|progress|flag|payment|steps|chart|form-switch|modal|nav|spinner)-\d+(?=[\" ])", "", v)
            v = re.sub(r"\s+", " ", v).strip()
            if "<" in v:
                # nested HTML (data-clipboard-text): canonicalize the serialized
                # fragment the same way as the document, so void closing tags
                # (</path>), self-close style, entity form (&hellip; vs …) and
                # attribute order — all non-semantic for the copied snippet —
                # normalize identically on both sides.
                inner = Canon()
                inner.feed(v)
                v = " ".join(x.strip() for x in inner.out)
            norm.append(f'{k}="{v}"')
        return " ".join(norm)

    def handle_starttag(self, tag, attrs):
        a = self._attrs(attrs)
        self.out.append("  " * self.depth + f"<{tag}{' ' + a if a else ''}>")
        if tag == "script":
            self.in_script = True
        if tag not in VOID:
            self.depth += 1

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)

    def handle_endtag(self, tag):
        if tag == "script":
            self.in_script = False
        if tag not in VOID:
            self.depth = max(0, self.depth - 1)
            self.out.append("  " * self.depth + f"</{tag}>")

    def handle_data(self, data):
        if self.in_script:
            data = normalize_js(data)
        t = re.sub(r"\s+", " ", data).strip()
        if t:
            self.out.append("  " * self.depth + t)


def canonicalize(path):
    html = open(path).read()
    html = re.sub(r"\?\d{9,}", "", html)                                  # cache-busters
    html = re.sub(r" (?:icon|btn|avatar|badge|progress|flag|payment|steps|chart|form-switch|modal|nav|spinner)-\d+(?=[\" ])", "", html)  # include['size'] bug
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
        # unescape to a fixpoint: source markup shown in the panel may be
        # double-escaped (&amp;hellip;), while the DOM-derived side carries the
        # decoded char (…). Collapsing both to the same char makes entity vs
        # unicode non-semantic for the displayed snippet.
        prev = None
        while inner != prev:
            prev = inner
            inner = html_lib.unescape(inner)
        # void-element self-close style (<input/> vs <input>), explicit void
        # closing tags (</path>) and the include['size'] bug classes are all
        # non-semantic in DISPLAYED code, same as in the DOM
        inner = re.sub(r"\s*/>", ">", inner)
        inner = re.sub(r"</(?:" + "|".join(VOID) + r")>", "", inner)
        inner = re.sub(r" (?:icon|btn|avatar|badge|progress|flag|payment|steps|chart|form-switch|modal|nav|spinner)-\d+(?=[\"' >])", "", inner)
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
