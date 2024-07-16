#!/bin/bash

# Setup gcloud CLI using Service Account Key
gcloud auth login --cred-file="$PARENT_DIR/sa_key.json"

# Define required environment variables for this script
required_vars=("GCP_PROJECT_ID" "GCP_BUCKET_NAME")

# Set Path
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Validate environment variables or exit
source "$SCRIPT_DIR/common.sh"

# Set Default GCP Project
gcloud config set project $GCP_PROJECT_ID

# npm run build

# Sync build folder files to GCS bucket
gcloud storage rsync build gs://$GCP_BUCKET_NAME --recursive
