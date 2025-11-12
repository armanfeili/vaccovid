#!/bin/bash
# Quick deployment script for major cloud platforms
# Detects platform and deploys accordingly

set -e

ENVIRONMENT=${1:-staging}
PROJECT_NAME="vaccovid"

echo "🚀 VacCOVID Cloud Deployment"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Detect deployment platform
detect_platform() {
  if command -v vercel &> /dev/null; then
    echo "vercel"
  elif command -v netlify &> /dev/null; then
    echo "netlify"
  elif command -v heroku &> /dev/null; then
    echo "heroku"
  elif command -v railway &> /dev/null; then
    echo "railway"
  elif command -v render &> /dev/null; then
    echo "render"
  else
    echo "none"
  fi
}

PLATFORM=$(detect_platform)

if [ "$PLATFORM" == "none" ]; then
  echo "⚠️  No cloud platform CLI detected"
  echo ""
  echo "Supported platforms:"
  echo "  1. Vercel (frontend + serverless backend)"
  echo "  2. Netlify (frontend) + Render/Railway (backend)"
  echo "  3. Heroku (full-stack)"
  echo "  4. Railway (full-stack)"
  echo "  5. AWS (ECS/Fargate + RDS)"
  echo "  6. Azure (App Service + Database)"
  echo ""
  echo "Install one of the CLIs and try again"
  exit 1
fi

echo "📍 Detected platform: $PLATFORM"
echo ""

case $PLATFORM in
  vercel)
    echo "Deploying to Vercel..."
    vercel deploy --prod
    ;;
    
  netlify)
    echo "Deploying to Netlify..."
    netlify deploy --prod --dir=client/build
    ;;
    
  heroku)
    echo "Deploying to Heroku..."
    heroku login
    heroku create $PROJECT_NAME 2>/dev/null || true
    git push heroku main
    ;;
    
  railway)
    echo "Deploying to Railway..."
    railway login
    railway link $PROJECT_NAME
    railway up
    ;;
    
  render)
    echo "Deploying to Render..."
    render deploy --name=$PROJECT_NAME
    ;;
    
  *)
    echo "❌ Platform not supported in automation"
    exit 1
    ;;
esac

echo ""
echo "✅ Deployment complete!"
