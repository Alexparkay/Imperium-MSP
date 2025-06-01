# Environment Variables Configuration

## Overview
This document describes the environment variables used in the Imperium MSP Dashboard application.

## Required Environment Variables

Create a `.env` file in the `frontend/` directory with the following variables:

### API Configuration
```env
# API Base URL - The backend API endpoint
VITE_API_BASE_URL=https://react-admin-ui-v1-api.vercel.app
```

### Application Configuration
```env
# Application Title
VITE_APP_TITLE=Imperium MSP Dashboard

# Application Version
VITE_APP_VERSION=1.0.0
```

### Build Environment
```env
# Node Environment
NODE_ENV=production
```

## Environment-Specific Configurations

### Development (.env.development)
```env
VITE_API_BASE_URL=http://localhost:5000
VITE_APP_TITLE=Imperium MSP Dashboard (Dev)
VITE_APP_VERSION=1.0.0-dev
NODE_ENV=development
```

### Production (.env.production)
```env
VITE_API_BASE_URL=https://your-production-api.vercel.app
VITE_APP_TITLE=Imperium MSP Dashboard
VITE_APP_VERSION=1.0.0
NODE_ENV=production
```

## Vercel Deployment Environment Variables

When deploying to Vercel, add these environment variables in the Vercel dashboard:

| Variable Name | Value | Description |
|---------------|-------|-------------|
| `VITE_API_BASE_URL` | `https://react-admin-ui-v1-api.vercel.app` | Backend API endpoint |
| `VITE_APP_TITLE` | `Imperium MSP Dashboard` | Application title |
| `VITE_APP_VERSION` | `1.0.0` | Application version |

## Important Notes

1. **Prefix**: All environment variables must be prefixed with `VITE_` to be accessible in the client-side code.

2. **Security**: Never commit `.env` files containing sensitive information to version control.

3. **Default Values**: The application includes fallback values for most environment variables, so it will work even if some are not set.

4. **Build Time**: Environment variables are embedded at build time, not runtime.

## Usage in Code

Environment variables are accessed using:
```typescript
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const appTitle = import.meta.env.VITE_APP_TITLE;
```

## Creating Environment Files

### For Development:
```bash
cd frontend
cat > .env << EOF
VITE_API_BASE_URL=https://react-admin-ui-v1-api.vercel.app
VITE_APP_TITLE=Imperium MSP Dashboard
VITE_APP_VERSION=1.0.0
NODE_ENV=development
EOF
```

### For Production:
Environment variables should be set in your deployment platform (Vercel, Netlify, etc.) rather than in files for security reasons. 