#!/bin/bash

# Define required environment variables for this script
required_vars=("GCP_PROJECT_ID" "GCP_BUCKET_APP_NAME")

# Validate parameters or exit
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/common.sh"

gcloud config set project $GCP_PROJECT_ID

# npm run build

gsutil -m rsync -r build gs://$GCP_BUCKET_APP_NAME
