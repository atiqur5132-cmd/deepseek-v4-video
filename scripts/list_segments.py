import json

with open('public/timestamps.json', 'r', encoding='utf-8') as f:
    d = json.load(f)

for s in d['segments']:
    fs = s['frameStart']
    fe = s['frameEnd']
    st = s['start']
    et = s['end']
    txt = s['text']
    print(f"[{fs:4d} - {fe:4d}] ({st:5.1f}s - {et:5.1f}s): {txt}")
