#!/bin/bash

# Find root .env
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PARENT_DIR="$(dirname "$SCRIPT_DIR")"
ENV_FILE="$PARENT_DIR/.env"

# Load variables from root .env
if [ -f "$ENV_FILE" ]; then
  export $(grep -v '^#' "$ENV_FILE" | xargs)
else
  echo ".env file not found in the parent directory. Please create a .env file with the necessary variables."
  exit 1
fi

# Check if necessary variables are set
missing_vars=()
for var in "${required_vars[@]}"; do
  if [ -z "${!var}" ]; then
    missing_vars+=("$var")
  fi
done

if [ ${#missing_vars[@]} -ne 0 ]; then
  echo "The following required environment variables are missing:"
  for var in "${missing_vars[@]}"; do
    echo "- $var"
  done
  exit 1
fi