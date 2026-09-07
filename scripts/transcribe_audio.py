import json
import os
import sys
from faster_whisper import WhisperModel

audio_path = "public/Deepseek.m4a"
output_path = "public/timestamps.json"

print(f"Loading faster-whisper model...")
model = WhisperModel("base", device="cpu", compute_type="int8")

print(f"Transcribing {audio_path}...")
segments, info = model.transcribe(audio_path, word_timestamps=True, language="en")

result_segments = []
all_words = []

for s in segments:
    words = []
    if s.words:
        for w in s.words:
            words.append({
                "word": w.word.strip(),
                "start": round(w.start, 3),
                "end": round(w.end, 3),
                "frameStart": int(round(w.start * 30)),
                "frameEnd": int(round(w.end * 30))
            })
            all_words.append(words[-1])

    result_segments.append({
        "id": s.id,
        "start": round(s.start, 3),
        "end": round(s.end, 3),
        "frameStart": int(round(s.start * 30)),
        "frameEnd": int(round(s.end * 30)),
        "text": s.text.strip(),
        "words": words
    })

data = {
    "duration": round(info.duration, 3),
    "totalFrames": int(round(info.duration * 30)),
    "segments": result_segments,
    "words": all_words
}

with open(output_path, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"Transcription complete! Saved {len(result_segments)} segments and {len(all_words)} words to {output_path}")
