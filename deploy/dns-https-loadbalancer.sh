#!/bin/bash

# List of required environment variables
required_vars=("DOMAIN_NAME" "GCP_PROJECT_ID" "GCP_BUCKET_NAME" "GCP_ZONE_NAME")

# Validate parameters or exit
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/common.sh"

# Set the project
gcloud config set project $GCP_PROJECT_ID

# Create a backend bucket
gcloud compute backend-buckets create my-backend-bucket \
    --gcs-bucket-name=$GCP_BUCKET_NAME

# Create a URL map
gcloud compute url-maps create my-url-map \
    --default-backend-bucket=my-backend-bucket

# Create an HTTP proxy
gcloud compute target-http-proxies create http-lb-proxy \
    --url-map=my-url-map

# Create a global forwarding rule
gcloud compute forwarding-rules create http-lb-forwarding-rule \
    --global \
    --target-http-proxy=http-lb-proxy \
    --ports=80

# Get the external IP address of the load balancer
LB_IP_ADDRESS=$(gcloud compute forwarding-rules list --global --filter="name=http-lb-forwarding-rule" --format="value(IPAddress)")

if [ -z "$LB_IP_ADDRESS" ]; then
    echo "Failed to retrieve load balancer IP address. Exiting."
    exit 1
fi

echo "Load Balancer IP Address: $LB_IP_ADDRESS"



# Start DNS transaction
gcloud dns record-sets transaction start --zone=$GCP_ZONE_NAME

# Add A record for root domain
gcloud dns record-sets transaction add \
    --zone=$GCP_ZONE_NAME \
    --name=$DOMAIN_NAME. \
    --type=A \
    --ttl=300 \
    $LB_IP_ADDRESS

# Execute DNS transaction
gcloud dns record-sets transaction execute --zone=$GCP_ZONE_NAME

echo "DNS A record for $DOMAIN_NAME pointing to $LB_IP_ADDRESS has been created."

# Optional: Add CNAME record for www subdomain
gcloud dns record-sets transaction start --zone=$GCP_ZONE_NAME

gcloud dns record-sets transaction add \
    --zone=$GCP_ZONE_NAME \
    --name=www.$DOMAIN_NAME. \
    --type=CNAME \
    --ttl=300 \
    $DOMAIN_NAME.

gcloud dns record-sets transaction add \
    --zone=$GCP_ZONE_NAME \
    --name=dev.$DOMAIN_NAME. \
    --type=CNAME \
    --ttl=300 \
    $DOMAIN_NAME.

gcloud dns record-sets transaction execute --zone=$GCP_ZONE_NAME

echo "CNAME record for www.$DOMAIN_NAME pointing to $DOMAIN_NAME has been created."

echo "Setup complete. Your domain $DOMAIN_NAME should now route to your GCS bucket $GCP_BUCKET_NAME via the load balancer."
