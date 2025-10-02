#!/bin/bash

# Vercel Deployment Script for Peachy Gang (peachyganggg.com)
# This script helps set up the environment for Discord OAuth with custom domain

echo "🚀 Peachy Gang Custom Domain Deployment Setup"
echo "=============================================="

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

echo "📋 Pre-deployment checklist for peachyganggg.com:"
echo ""

# Check for required environment variables
echo "✅ Environment Variables Required:"
echo "   - BOT_CLIENT_ID (Discord application client ID)"
echo "   - BOT_CLIENT_SECRET (Discord application client secret)"
echo "   - DATABASE_URL (MongoDB connection string)"
echo "   Note: APP_URL and NODE_ENV automatically detected from Vercel environment"
echo ""

echo "🌐 Custom Domain Setup:"
echo "   1. Configure peachyganggg.com in Vercel project settings"
echo "   2. Set up DNS records as instructed by Vercel"
echo "   3. Wait for SSL certificate provisioning"
echo ""

echo "🔧 Discord OAuth Setup:"
echo "   1. Go to https://discord.com/developers/applications"
echo "   2. Select your Discord application"
echo "   3. Navigate to OAuth2 → General"
echo "   4. Add this redirect URI:"
echo "      - https://peachyganggg.com/api/auth/callback/discord"
echo "   5. Ensure scopes include: identify, email, guilds"
echo ""

echo "📝 Next Steps:"
echo "   1. Run: vercel env add BOT_CLIENT_ID"
echo "   2. Run: vercel env add BOT_CLIENT_SECRET"
echo "   3. Run: vercel env add DATABASE_URL"
echo "   4. Run: vercel --prod"
echo ""

echo "🐛 If login fails, check:"
echo "   - https://peachyganggg.com/api/health for configuration status"
echo "   - Browser console for errors"
echo "   - Vercel function logs"
echo "   - Discord Developer Portal redirect URI matches exactly"
echo "   - Custom domain is properly configured and SSL is active"
echo ""

echo "📄 Documentation files available:"
echo "   - .env.peachyganggg.example (Environment variables template)"
echo "   - PEACHYGANGGG_SETUP.md (Detailed setup guide)"
echo "   - AuthDebugInfo component (Runtime debugging)"
echo ""

read -p "Press Enter to continue with deployment or Ctrl+C to cancel..."

echo "🚀 Starting deployment to peachyganggg.com..."
vercel --prod