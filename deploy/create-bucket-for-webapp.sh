#!/bin/bash

# Define required environment variables for this script
required_vars=("GCP_PROJECT_ID" "GCP_BUCKET_APP_NAME")

# Validate parameters or exit
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/common.sh"

gcloud config set project $GCP_PROJECT_ID

# create bucket
gsutil mb gs://$GCP_BUCKET_APP_NAME

# Set the main page and 404 page for your bucket
gsutil web set -m index.html -e 404.html gs://$GCP_BUCKET_APP_NAME

# make public for reading
gsutil iam ch allUsers:objectViewer gs://$GCP_BUCKET_APP_NAME
