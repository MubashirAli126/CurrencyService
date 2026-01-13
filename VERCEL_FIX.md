# Vercel 404 Error - Fix Guide

## The Problem
You're getting a 404 NOT_FOUND error after deploying to Vercel. This is typically caused by:
1. Incorrect routing configuration
2. Build output not being found
3. Missing build files

## Solution

I've updated the `vercel.json` configuration. Here's what changed:

### Updated Configuration
- Fixed routing to properly serve static files from the build directory
- Added filesystem handler to serve static assets
- Configured fallback to `index.html` for React Router

### Next Steps

1. **Commit and push the changes:**
   ```bash
   git add .
   git commit -m "Fix Vercel deployment configuration"
   git push origin main
   ```

2. **Redeploy on Vercel:**
   - Go to your Vercel dashboard
   - The deployment should automatically trigger from the push
   - Or manually trigger a redeploy

3. **Verify Environment Variables:**
   Make sure these are set in Vercel project settings:
   - `CURRENCY_API_KEY` - Your FreeCurrencyAPI key
   - `CURRENCY_API_BASE_URL` - `https://api.freecurrencyapi.com/v1` (optional)

4. **Check Build Logs:**
   - In Vercel dashboard, check the build logs
   - Ensure the frontend build completes successfully
   - Look for any errors in the API build

## If Still Not Working

If you still get a 404 after redeploying:

1. **Check Vercel Project Settings:**
   - Go to Settings → General
   - Verify "Root Directory" is not set (should be empty for monorepo)
   - Or set it to the repository root

2. **Verify Build Output:**
   - Check that `frontend/build` directory exists after build
   - Verify `frontend/build/index.html` exists

3. **Check API Routes:**
   - Test `/api/currency/currencies` directly
   - Check Vercel function logs for API errors

4. **Alternative: Use Vercel's Framework Detection:**
   If the current config doesn't work, you can:
   - Remove `vercel.json` temporarily
   - Set "Root Directory" to `frontend` in Vercel settings
   - Deploy just the frontend first
   - Then add API routes separately

## Current Configuration

The `vercel.json` now:
- Builds the API as a serverless function
- Builds the frontend as static files
- Routes `/api/*` to the API handler
- Serves static files from the build directory
- Falls back to `index.html` for client-side routing
