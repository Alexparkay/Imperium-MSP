# Deployment Guide

## Overview
This is a modern dashboard application built with React, TypeScript, and Vite, featuring a glassmorphic dark UI design. The project is structured as a monorepo with frontend and backend components.

## Tech Stack
- **Frontend**: React 18, TypeScript, Vite
- **UI**: Material-UI (MUI), Tailwind CSS, DaisyUI
- **State Management**: React Query, Context API
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Calendar**: FullCalendar

## Project Structure
```
/
├── frontend/           # React application
├── backend/           # API backend
├── .gitignore         # Root gitignore
├── package.json       # Root package.json
└── DEPLOYMENT.md      # This file
```

## Environment Variables

### Frontend Environment Variables
Create a `.env` file in the `frontend/` directory with the following variables:

```env
# API Configuration
VITE_API_BASE_URL=https://react-admin-ui-v1-api.vercel.app

# Application Configuration
VITE_APP_TITLE=Imperium MSP Dashboard
VITE_APP_VERSION=1.0.0

# Environment
NODE_ENV=production
```

## Local Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup
1. Clone the repository:
```bash
git clone <your-repo-url>
cd imperium-msp
```

2. Install dependencies:
```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies (if applicable)
cd ../backend
npm install
```

3. Start development servers:
```bash
# Frontend only
cd frontend
npm run dev

# Or from root (if using workspaces)
npm run dev:frontend
```

## Deployment to GitHub

1. **Initialize Git repository** (if not already done):
```bash
git init
git add .
git commit -m "Initial commit: Modern dashboard application"
```

2. **Create GitHub repository**:
   - Go to GitHub and create a new repository
   - Don't initialize with README (since you already have one)

3. **Push to GitHub**:
```bash
git remote add origin https://github.com/yourusername/imperium-msp.git
git branch -M main
git push -u origin main
```

## Deployment to Vercel

### Option 1: Vercel CLI (Recommended)
1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy from the frontend directory:
```bash
cd frontend
vercel --prod
```

### Option 2: Vercel Web Interface
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Set the following configuration:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### Environment Variables in Vercel
In your Vercel dashboard, add the following environment variables:
- `VITE_API_BASE_URL`: `https://react-admin-ui-v1-api.vercel.app`
- `VITE_APP_TITLE`: `Imperium MSP Dashboard`
- `VITE_APP_VERSION`: `1.0.0`

## Build Verification

Before deploying, verify that the build works locally:

```bash
cd frontend

# Build the application
npm run build

# Preview the build
npm run preview
```

The build should complete without errors and the preview should show your application running correctly.

## Domain Configuration

After successful deployment:
1. Vercel will provide a `.vercel.app` domain
2. Configure custom domain in Vercel dashboard if needed
3. Update any hardcoded URLs to use the new domain

## Performance Optimization

The application includes several performance optimizations:
- Code splitting with Vite
- Tree shaking for smaller bundle sizes
- Asset optimization and compression
- React.memo for component optimization
- React Query for efficient data fetching

## Troubleshooting

### Common Issues:
1. **Build Errors**: Check that all dependencies are listed in `package.json`
2. **Environment Variables**: Ensure all `VITE_` prefixed variables are set
3. **API Errors**: Verify the API endpoint is accessible
4. **Routing Issues**: Ensure the `vercel.json` rewrites are configured correctly

### Debug Commands:
```bash
# Check build output
npm run build

# Check for type errors
npm run lint

# Check dependencies
npm audit
```

## Security Considerations

- Environment variables are properly configured
- Sensitive data is not committed to version control
- API endpoints use HTTPS
- Dependencies are regularly updated

## Support

For issues with deployment:
1. Check the build logs in Vercel dashboard
2. Verify environment variables are set correctly
3. Check that the API endpoints are accessible
4. Review this documentation for missed steps

---

**Last Updated**: $(date)
**Version**: 1.0.0 