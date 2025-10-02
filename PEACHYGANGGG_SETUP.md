# Discord OAuth Setup Guide for peachyganggg.com

## Step 1: Vercel Custom Domain Setup

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Domains**
3. Add your custom domain: `peachyganggg.com`
4. Configure DNS records as instructed by Vercel
5. Wait for domain verification and SSL certificate

## Step 2: Discord Developer Portal Configuration

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Select your application (or create a new one)
3. Go to the **OAuth2** section
4. In **Redirects** section, add this URI:

   ```
   https://peachyganggg.com/api/auth/callback/discord
   ```

5. In **Scopes** section, ensure these are selected:
   - `identify` - Basic user info
   - `email` - User's email
   - `guilds` - User's Discord servers

6. Copy your **Client ID** and **Client Secret**

## Step 3: Vercel Environment Variables

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add these variables:

| Variable Name       | Value                            | Notes                         |
| ------------------- | -------------------------------- | ----------------------------- |
| `BOT_CLIENT_ID`     | `your_discord_client_id`         | From Discord Developer Portal |
| `BOT_CLIENT_SECRET` | `your_discord_client_secret`     | From Discord Developer Portal |
| `DATABASE_URL`      | `your_mongodb_connection_string` | MongoDB connection            |

**Note:** APP_URL and BETTER_AUTH_URL are automatically set to `https://peachyganggg.com` when deployed to Vercel, so you don't need to set them manually. NODE_ENV is also automatically detected.

## Step 4: Deploy and Test

1. Deploy your app to Vercel
2. Ensure your custom domain is working: https://peachyganggg.com
3. Visit your app's login page
4. Click the Discord login button
5. Verify successful redirect to `/dashboard`

## Common Issues and Solutions

### Issue: "redirect_uri_mismatch" Error

- **Cause**: Discord redirect URI doesn't match configured URI
- **Solution**: Ensure you added exactly `https://peachyganggg.com/api/auth/callback/discord`

### Issue: Custom Domain Not Working

- **Cause**: DNS not properly configured or SSL pending
- **Solution**: Check Vercel domain settings and wait for propagation

### Issue: "invalid_client" Error

- **Cause**: Incorrect Client ID or Client Secret
- **Solution**: Double-check credentials in Discord Developer Portal

### Issue: 404 on Auth Endpoints

- **Cause**: App not properly deployed or domain misconfigured
- **Solution**: Redeploy and verify domain configuration

## Testing Checklist

- [ ] Custom domain `peachyganggg.com` is working
- [ ] Discord app redirect URI is set to `https://peachyganggg.com/api/auth/callback/discord`
- [ ] Bot Client ID and Secret are correct
- [ ] Database connection string is valid
- [ ] Login button redirects to Discord
- [ ] After Discord auth, redirects back to your app
- [ ] User session is properly established
- [ ] Dashboard page loads correctly

## Debug Information

If issues persist, check these URLs:

- Health check: `https://peachyganggg.com/api/health`
- Auth endpoint: `https://peachyganggg.com/api/auth`
- Browser console for error messages
- Use the AuthDebugInfo component for runtime details

## Configuration Summary

Your app is now configured to:

- ✅ Always use `https://peachyganggg.com` in production
- ✅ Automatically handle URL detection
- ✅ Work with your custom domain
- ✅ Provide proper CORS headers
- ✅ Include comprehensive error handling
