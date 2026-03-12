#!/bin/bash
script_dir=$(dirname "$0")
audio_dir="$script_dir/../audio"

# Make wildcards expand to empty list if no files match
shopt -s nullglob

for f in "$audio_dir"/*.m4a; do
    if [[ "$f" == *"_processed.m4a" ]]; then
        continue
    fi
    name=$(basename "$f")
    echo "Processing $name..."
    ffmpeg -hide_banner -loglevel error -i "$f" -c copy -map 0 -f segment -segment_time 1200 -reset_timestamps 1 "$script_dir/temp/${name%.m4a}_%03d.m4a"
done