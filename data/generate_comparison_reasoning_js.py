#!/usr/bin/env python3
import os

RESULTS_DIR = './comparison'        # Folder that contains subfolders 1..100, each with reason.txt
OUTPUT_FILE = './../comparison_reasoning.js'     # The JS file we will generate
NUM_FILES = 100                  # We have 100 indexes
# RESULTS_DIR = './adobe_results'        # Folder that contains subfolders 1..100, each with reason.txt
# OUTPUT_FILE = './../adobe_reasoning.js'     # The JS file we will generate
# NUM_FILES = 100                  # We have 100 indexes
suffix = ""

def main():
    # Open the output JS file for writing
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as outfile:
        # Start by declaring an empty array (or object) in JavaScript
        outfile.write(f"var reasoningData{suffix} = [];\n\n")

        # Loop from 1..100 (inclusive) to read each reason.txt
        for idx in range(1, NUM_FILES + 1):
            reason_path = os.path.join(RESULTS_DIR, str(idx), "ours.txt")
            
            # If reason.txt doesn't exist for this index, store an empty string or skip
            if not os.path.isfile(reason_path):
                outfile.write(f'reasoningData{suffix}[{idx}] = "";\n')
                continue

            # Read the content of reason.txt
            with open(reason_path, 'r', encoding='utf-8') as rf:
                content = rf.read()

            content = '\n'.join(content.splitlines())
            

            # Escape backslashes, quotes, and newlines so they don't break the JS string
            content_escaped = (content
                               .replace('\\', '\\\\')   # escape backslashes
                               .replace('"', '\\"')     # escape double quotes
                               .replace('\n', '\\n'))   # escape newlines

            # Write a line defining the array element
            outfile.write(f'reasoningData{suffix}[{idx}] = "{content_escaped}";\n')

        outfile.write("\n// End of generated file.\n")


if __name__ == "__main__":
    main()
