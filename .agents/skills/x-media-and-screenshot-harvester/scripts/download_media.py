import os
import sys
import subprocess

def download_video(url, output_path):
    """
    Downloads the highest quality MP4 video from X (Twitter) or YouTube using yt-dlp.
    """
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    cmd = [
        sys.executable, "-m", "yt_dlp",
        "-f", "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best",
        "--merge-output-format", "mp4",
        "-o", output_path,
        url
    ]
    print(f"Downloading from {url} to {output_path}...")
    try:
        subprocess.run(cmd, check=True)
        print(f"Success! Video saved at {output_path}")
    except subprocess.CalledProcessError as e:
        print(f"Error downloading video: {e}")
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python download_media.py <URL> <OUTPUT_PATH>")
        sys.exit(1)
    download_video(sys.argv[1], sys.argv[2])
