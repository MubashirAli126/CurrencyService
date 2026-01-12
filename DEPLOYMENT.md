# Vercel Deployment Guide

This guide explains how to deploy the Currency Service application to Vercel.

## Prerequisites

1. A Vercel account (sign up at [vercel.com](https://vercel.com))
2. GitHub repository with your code
3. Environment variables for the backend API

## Deployment Steps

### 1. Connect Repository to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your GitHub repository: `MubashirAli126/CurrencyService`
4. Vercel will automatically detect the `vercel.json` configuration

### 2. Configure Environment Variables

In the Vercel project settings, add the following environment variables:

- `CURRENCY_API_KEY`: Your FreeCurrencyAPI key (e.g., `4E0VK7BnkdeUuh1vegAt808v2IUjzUR6lxcvBMT2`)
- `CURRENCY_API_BASE_URL`: `https://api.freecurrencyapi.com/v1` (optional, has default)
- `NODE_ENV`: `production`

**To add environment variables:**
1. Go to your project settings in Vercel
2. Navigate to "Environment Variables"
3. Add each variable for Production, Preview, and Development environments

### 3. Build Settings

Vercel will automatically use the `vercel.json` configuration. The build process:

1. **Backend (API)**: Builds NestJS serverless functions in the `api/` directory
2. **Frontend**: Builds React app from `frontend/` directory

### 4. Deploy

1. Click "Deploy" in Vercel
2. Vercel will:
   - Install dependencies for both frontend and backend
   - Build the frontend React app
   - Set up serverless functions for the backend API
   - Deploy everything

### 5. Verify Deployment

After deployment, you should have:
- Frontend accessible at: `https://your-project.vercel.app`
- API endpoints at: `https://your-project.vercel.app/api/currency/*`

## Project Structure

```
TA-Solution/
├── api/              # Vercel serverless functions (NestJS)
│   └── index.ts
├── backend/          # NestJS backend source code
│   └── src/
├── frontend/         # React frontend
│   └── src/
└── vercel.json       # Vercel configuration
```

## API Endpoints

Once deployed, the following endpoints will be available:

- `GET /api/currency/currencies` - Get all available currencies
- `GET /api/currency/latest?base=USD&currencies=EUR,GBP` - Get latest exchange rates
- `GET /api/currency/historical?base=USD&date=2024-01-01&currencies=EUR,GBP` - Get historical rates

## Troubleshooting

### Build Failures

1. **Missing dependencies**: Ensure all dependencies are in `package.json`
2. **TypeScript errors**: Check that all TypeScript files compile correctly
3. **Environment variables**: Verify all required environment variables are set

### API Not Working

1. Check that `CURRENCY_API_KEY` is set correctly
2. Verify API routes are accessible at `/api/currency/*`
3. Check Vercel function logs for errors

### CORS Issues

The API is configured to allow all origins in production. If you encounter CORS issues:
- Check that the frontend is using the correct API URL
- Verify CORS settings in `api/index.ts`

## Local Development

For local development, the frontend uses `http://localhost:3001` for the API. In production, it uses `/api` (relative URL).

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [NestJS on Vercel](https://vercel.com/docs/frameworks/nestjs)
- [React on Vercel](https://vercel.com/docs/frameworks/react)
