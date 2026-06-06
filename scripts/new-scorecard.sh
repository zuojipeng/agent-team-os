#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 2 ]]; then
  echo "Usage: $0 <project-name> <output-file>"
  exit 1
fi

project_name="$1"
output_file="$2"
root="/Users/edy/.agents/team-os"
today="$(date +%F)"

mkdir -p "$(dirname "$output_file")"
sed \
  -e "s/^Project:.*/Project: ${project_name}/" \
  -e "s/^Date:.*/Date: ${today}/" \
  "$root/templates/project-scorecard.md" > "$output_file"

echo "Created scorecard: $output_file"
