#!/bin/bash
START_DIR=$(dirname "${BASH_SOURCE[0]}")

echo "Generating thumbnails for .webm files for:"
echo ""

# Define the folders you want to process
FOLDERS=("./src/videos" "./public/videos")

# Iterate over the list of folders
for current_folder in "${START_DIR}/${FOLDERS[@]}"; do
  echo "Processing folder: $current_folder"
  
  find "$current_folder" -type f -name "*.webm" -print0 | while IFS='' read -r -d '' f; do
    DIR_NAME=$(dirname "$f")
    FILE_NAME=$(basename "$f")
    BASE_NAME="${FILE_NAME%.webm}"
    OUTPUT_FILE="$DIR_NAME/$BASE_NAME.jpg"

    echo "  $f"
    ffmpeg -i "$f" -vframes 1 -q:v 2 "$OUTPUT_FILE" -y -loglevel quiet < /dev/null
  done
done

echo ""
echo "Thumbnail generation complete!"