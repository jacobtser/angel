import pathlib

root = pathlib.Path('.')
exts = {'.ts', '.tsx', '.md', '.json', '.html', '.css', '.mjs', '.js'}
replacements = [
    ('\u00e2\u20ac\u0153', '\u201c'), # “
    ('\u00e2\u20ac\u009d', '\u201d'), # ”
    ('\u00e2\u20ac\u2122', '\u2019'), # ’
    ('\u00e2\u20ac\u201c', '\u2013'), # –
    ('\u00e2\u20ac\u201d', '\u2014'), # —
    ('\u00e2\u20ac\u00a6', '\u2026'), # …
    ('\u00e2\u20ac\u00a2', '\u2022'), # •
    ('\u00c2\u00b7', '\u00b7'),       # ·
    ('\u00c2 ', ' '),
    ('\u00e2\u0097\u008f', '\u25cb'), # ○ maybe
    ('\u00e2\u0097\u0086', '\u25c6'), # ◆ maybe
    ('\u00e2\u009c\u0094', '\u2714'), # ✔ maybe
    ('\u00e2\u009c\u0093', '\u2713'), # ✓
    ('\u00e2\u009c\u0097', '\u2717'), # ✗
    ('\u00e2\u0094\u0080', '\u2500'), # ─
    ('\u00e2\u0080\u0093', '\u2013'),
    ('\u00e2\u0080\u0094', '\u2014'),
    ('\u00e2\u0080\u0098', '\u2018'),
    ('\u00e2\u0080\u0099', '\u2019'),
    ('\u00e2\u0080\u009c', '\u201c'),
    ('\u00e2\u0080\u009d', '\u201d'),
    ('\u00e2\u0080\u00a6', '\u2026'),
    ('I\u00e2\u20ac\u2122ll', "I\u2019ll"),
    ('you\u00e2\u20ac\u2122', "you\u2019"),
    ('it\u00e2\u20ac\u2122s', "it\u2019s"),
    ('let\u00e2\u20ac\u2122s', "let\u2019s"),
    ('\u00e2\u0080\u00af', ' '),
]
count = 0
for p in root.rglob('*'):
    if not p.is_file():
        continue
    if p.suffix.lower() not in exts:
        continue
    s = str(p).replace('\\', '/')
    if '/.next/' in s or '/node_modules/' in s or '/out/' in s or '/.git/' in s:
        continue
    try:
        text = p.read_text(encoding='utf-8')
    except Exception:
        try:
            text = p.read_text(encoding='cp1252')
        except Exception:
            continue
    new = text
    for a, b in replacements:
        new = new.replace(a, b)
    # common leftover patterns
    new = new.replace('�?"', '—').replace('�?o', '“').replace('�??', '”').replace('�?T', '’')
    if new != text:
        p.write_text(new, encoding='utf-8')
        count += 1
print('fixed', count)
