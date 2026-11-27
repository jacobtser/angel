import subprocess, sys, os

FFMPEG = r"C:\Users\david\AppData\Roaming\Python\Python315\site-packages\static_ffmpeg\bin\win32\ffmpeg.EXE"
YTDLP = r"C:\Users\david\AppData\Roaming\Python\Python315\Scripts\yt-dlp.exe"
OUTDIR = r"C:\Users\david\angel\public\videos\english\orals"

IDS = [
    "kt9K2luWbm4","_IODAH2c5OQ","7n0saw-2LsQ","alXVP6yqnO0","KWuLshomp-o",
    "8X7wRwqpM20","aFJUMZo0Fw8","9aqFAjEzgek","t_CVDSESnnw","h93GQk0TW5A",
    "Q4uJ4-AUoHg","4W64lhDgmZE","_KRFrbUHKrg","1rU-pNCEf8I","JV9yoo_Kd-k",
    "moCBpvgi2P0","KQ0vbsB9hnw","yRPMrvTfOV0","qQrYiY7JG14","8UfgD2HYSDg",
    "k-PzjAcOU-8","t7nRLtOxL2Y","YSBTxPBPlgg","0fdivvUXRVk","9XsgtFsvIC0",
    "Pnc3OUGufRk",
]

os.makedirs(OUTDIR, exist_ok=True)
failed = []
for i, vid in enumerate(IDS, 1):
    out = os.path.join(OUTDIR, f"{vid}.mp4")
    if os.path.exists(out) and os.path.getsize(out) > 100000:
        print(f"[{i}/{len(IDS)}] SKIP {vid}", flush=True)
        continue
    url = f"https://www.youtube.com/watch?v={vid}"
    cmd = [
        YTDLP, "-f", "bv*[height<=480][ext=mp4]+ba[ext=m4a]/b[height<=480][ext=mp4]/bv*[height<=480]+ba/b[height<=480]/best",
        "--merge-output-format", "mp4",
        "--ffmpeg-location", FFMPEG,
        "-o", out,
        "--no-playlist", "--no-overwrites",
        "--retries", "3",
        url,
    ]
    print(f"[{i}/{len(IDS)}] DL {vid}", flush=True)
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        print(f"  FAIL {vid}: {r.returncode}", flush=True)
        print(r.stderr[-500:] if r.stderr else "", flush=True)
        failed.append(vid)
    else:
        size = os.path.getsize(out) if os.path.exists(out) else 0
        print(f"  OK {vid} {size/1024/1024:.1f}MB", flush=True)

print("FAILED", failed, flush=True)
sys.exit(1 if failed else 0)
