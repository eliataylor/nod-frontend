#!/bin/bash

# Define required environment variables for this script
required_vars=("GCP_PROJECT_ID" "GCP_BUCKET_APP_NAME" "SSL_CERT_NAME" "DNS_ZONE_IP")

# Validate parameters or exit
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/common.sh"

# Set the project
createBucket() {

  gcloud config set project $GCP_PROJECT_ID

  # Create bucket if it doesn't exist
  gsutil mb -c standard -l us-central1 gs://$GCP_BUCKET_APP_NAME

  # Set the main page and 404 page for your bucket
  gsutil web set -m index.html -e 404.html gs://$GCP_BUCKET_APP_NAME

  # Make the bucket public for reading
  gsutil iam ch allUsers:objectViewer gs://$GCP_BUCKET_APP_NAME
}

# createBucket ""

SANITIZED_BUCKET_NAME=$(sanitize_bucket_name "$GCP_BUCKET_APP_NAME")

# Create a global forwarding rule to route HTTPS traffic to the proxy
STATIC_IP=$(gcloud compute addresses describe $SANITIZED_BUCKET_NAME-ip --global --format="get(address)" 2>/dev/null)

if [[ -z "$STATIC_IP" ]]; then
  # Reserve a global static IP address for the load balancer
  gcloud compute addresses create $SANITIZED_BUCKET_NAME-ip --global
  STATIC_IP=$(gcloud compute addresses describe $SANITIZED_BUCKET_NAME-ip --global --format="get(address)")
  echo "Created Static IP address: $STATIC_IP"
else
  echo "Reusing Static IP address: $STATIC_IP"
fi

createDnsZone() {
  # Create DNS zone if it doesn't exist
  gcloud dns managed-zones describe $GCP_ZONE_NAME || gcloud dns managed-zones create $GCP_ZONE_NAME --dns-name=$DOMAIN_NAME --description="DNS zone for $DOMAIN_NAME"

  # Add a DNS record set for your domain, ww.domain, and dev.domain
  gcloud dns record-sets transaction start --zone=$GCP_ZONE_NAME
  gcloud dns record-sets transaction add --zone=nod-$GCP_ZONE_NAME --name=$DOMAIN_NAME --ttl=300 --type=A "$STATIC_IP"
  gcloud dns record-sets transaction execute --zone=$GCP_ZONE_NAME
}

sanitize_bucket_name ""

# Create a global SSL certificate
# gcloud compute ssl-certificates create $SSL_CERT_NAME --domains $DOMAIN_NAME --global

# Create a bucket backend
gcloud compute backend-buckets create $SANITIZED_BUCKET_NAME-backend \
    --gcs-bucket-name=$GCP_BUCKET_APP_NAME \
    --enable-cdn

# gcloud compute backend-services create $SANITIZED_BUCKET_NAME-backend-service \
#    --protocol=HTTP --global-backend-bucket=$SANITIZED_BUCKET_NAME-backend --enable-cdn

# Create a URL map to route requests to the bucket
gcloud compute url-maps create $SANITIZED_BUCKET_NAME-url-map \
--default-backend-bucket=$SANITIZED_BUCKET_NAME-backend

# Create a target HTTPS proxy to route requests to the URL map
gcloud compute target-https-proxies create $SANITIZED_BUCKET_NAME-https-proxy \
    --url-map=$SANITIZED_BUCKET_NAME-url-map \
    --global-ssl-certificates \
    --ssl-certificates=$SSL_CERT_NAME

# Create a global forwarding rule to route HTTPS traffic to the proxy
gcloud compute forwarding-rules create $SANITIZED_BUCKET_NAME-https-rule \
    --address=$STATIC_IP \
    --global \
    --target-https-proxy=$SANITIZED_BUCKET_NAME-https-proxy \
    --ports=443
#    --allow-global-access \

echo "Set these Name Servers from your domain's registrar"
gcloud dns managed-zones describe $GCP_ZONE_NAME --project=$GCP_PROJECT_ID --format="get(nameServers)"


## sub dev subdomain:
# gcloud dns record-sets transaction add --zone=your-dns-zone --name=dev.$DOMAIN_NAME --type=CNAME --ttl=300 "$WEBSITE_ENDPOINT"