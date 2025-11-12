#!/bin/bash
# Deploy to Docker (local or remote)
# Usage: ./scripts/deploy-docker.sh [production|staging|development]

set -e

ENVIRONMENT=${1:-development}
COMPOSE_FILE="docker-compose.yml"
IMAGE_NAME="vaccovid"
REGISTRY="${DOCKER_REGISTRY:-ghcr.io}"

echo "🚀 VacCOVID Docker Deployment"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Environment: $ENVIRONMENT"
echo "Image: $REGISTRY/$IMAGE_NAME"
echo ""

# Load environment variables
if [ -f ".env.$ENVIRONMENT" ]; then
  echo "📝 Loading environment from .env.$ENVIRONMENT"
  export $(cat ".env.$ENVIRONMENT" | grep -v '^#' | xargs)
else
  echo "⚠️  .env.$ENVIRONMENT not found, using defaults"
fi

case $ENVIRONMENT in
  production)
    echo "🏭 Deploying to PRODUCTION"
    # Production deployment with:
    # - Health checks enabled
    # - Auto-restart policy
    # - Resource limits
    # - Logging configuration
    
    docker-compose -f "$COMPOSE_FILE" \
      -p vaccovid-prod \
      build \
      --build-arg NODE_ENV=production
    
    docker-compose -f "$COMPOSE_FILE" \
      -p vaccovid-prod \
      up -d \
      --remove-orphans \
      --force-recreate
    
    echo "✅ Production deployment complete"
    ;;
    
  staging)
    echo "🧪 Deploying to STAGING"
    docker-compose -f "$COMPOSE_FILE" \
      -p vaccovid-staging \
      build
    
    docker-compose -f "$COMPOSE_FILE" \
      -p vaccovid-staging \
      up -d \
      --remove-orphans
    
    echo "✅ Staging deployment complete"
    ;;
    
  development|*)
    echo "💻 Deploying to DEVELOPMENT"
    docker-compose -f "$COMPOSE_FILE" \
      -p vaccovid-dev \
      build
    
    docker-compose -f "$COMPOSE_FILE" \
      -p vaccovid-dev \
      up \
      --remove-orphans
    
    echo "✅ Development environment ready"
    ;;
esac

echo ""
echo "📊 Running deployment verification..."
sleep 5

# Verify services are running
echo ""
echo "🔍 Service Status:"
docker-compose -f "$COMPOSE_FILE" ps

# Test API endpoint
echo ""
echo "🧪 Testing API endpoint..."
if curl -s http://localhost:5000/vaccines/all > /dev/null 2>&1; then
  echo "✅ Backend API is responding"
else
  echo "⚠️  Backend API not responding yet (may still be starting)"
fi

# Test frontend
echo ""
echo "🧪 Testing Frontend..."
if curl -s http://localhost:3000 > /dev/null 2>&1; then
  echo "✅ Frontend is responding"
else
  echo "⚠️  Frontend not responding yet (may still be building)"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Deployment process complete!"
echo ""
echo "📍 Access points:"
echo "  Frontend: http://localhost:3000"
echo "  Backend:  http://localhost:5000"
echo ""
echo "📋 View logs: docker-compose -p vaccovid-$ENVIRONMENT logs -f"
echo "🛑 Stop services: docker-compose -p vaccovid-$ENVIRONMENT down"
