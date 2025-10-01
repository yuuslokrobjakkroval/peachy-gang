#!/bin/bash

echo "🔧 Fixing Tailwind CSS v4 deployment issues..."

# Remove the problematic v4 packages
echo "📦 Removing Tailwind v4 packages..."
npm uninstall @tailwindcss/postcss tailwindcss

# Install stable Tailwind CSS v3 with required dependencies
echo "📦 Installing stable Tailwind CSS v3..."
npm install -D tailwindcss@^3.4.17 autoprefixer@^10.4.20 postcss@^8.4.49

echo "✅ Dependencies updated! Your PostCSS config should now work with Vercel."
echo ""
echo "🚀 Try deploying again. Your new configuration:"
echo "   - tailwindcss: v3.4.17 (stable)"
echo "   - postcss: v8.4.49" 
echo "   - autoprefixer: v10.4.20"
echo ""
echo "If you still have issues, run: npm run build"