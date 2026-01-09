# Frontend Deployment Guide - Vercel

This guide will help you deploy the AI Lead Dashboard frontend to Vercel.

## Prerequisites

- Vercel account (free tier available)
- GitHub account
- Your frontend code in a GitHub repository

## Step 1: Prepare Your Code for Deployment

### Update Environment Variables

Create a `.env.production` file in your frontend root:

```env
# Production Backend URL (replace with your Oracle Cloud IP)
NEXT_PUBLIC_BACKEND_URL=http://your-oracle-ip:8000

# API Key for protected endpoints
NEXT_PUBLIC_API_KEY=your-secure-api-key-here
```

### Update package.json

Make sure your `package.json` has the correct build command:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

## Step 2: Push Code to GitHub

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit - ready for Vercel deployment"

# Add remote repository
git remote add origin https://github.com/your-username/ai-lead-dashboard.git

# Push to GitHub
git push -u origin main
```

## Step 3: Deploy to Vercel

### Method 1: Vercel Website

1. **Go to [vercel.com](https://vercel.com) and sign in**

2. **Click "Add New..." → "Project"**

3. **Import GitHub Repository**
   - Select your GitHub account
   - Find and select your `ai-lead-dashboard` repository
   - Click "Import"

4. **Configure Project**
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

5. **Add Environment Variables**
   Click "Environment Variables" and add:

   | Variable | Value | Environment |
   |----------|-------|-------------|
   | `NEXT_PUBLIC_BACKEND_URL` | `http://your-oracle-ip:8000` | Production |
   | `NEXT_PUBLIC_API_KEY` | `your-secure-api-key-here` | Production |

6. **Deploy**
   Click "Deploy" and wait for the build to complete.

### Method 2: Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   cd frontend
   vercel
   ```

4. **Follow the prompts**
   - Set up and deploy? **Y**
   - Which scope? **Select your account**
   - Link to existing project? **N**
   - Project name? **ai-lead-dashboard**
   - In which directory? **./**
   - Override settings? **N**

5. **Add Environment Variables**
   ```bash
   vercel env add NEXT_PUBLIC_BACKEND_URL
   # Enter value: http://your-oracle-ip:8000
   # Select environment: Production

   vercel env add NEXT_PUBLIC_API_KEY
   # Enter value: your-secure-api-key-here
   # Select environment: Production
   ```

6. **Redeploy with new env vars**
   ```bash
   vercel --prod
   ```

## Step 4: Configure Custom Domain (Optional)

### Method 1: Through Vercel Dashboard

1. Go to your project in Vercel Dashboard
2. Click "Settings" → "Domains"
3. Enter your domain name
4. Follow the DNS configuration instructions

### Method 2: Using Vercel CLI

```bash
# Add domain
vercel domain add yourdomain.com

# Follow DNS instructions provided
```

## Step 5: Update Backend CORS

Since your frontend will be on Vercel (different domain), update your backend CORS:

```python
# In backend/main_production.py
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://your-app-name.vercel.app",
        "https://www.yourdomain.com",
        "https://yourdomain.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

Restart your backend after updating CORS.

## Step 6: Test Your Deployment

1. **Open your Vercel app URL**
   Example: `https://ai-lead-dashboard.vercel.app`

2. **Check browser console for errors**
   - Open DevTools (F12)
   - Check Console tab
   - Check Network tab

3. **Verify backend connection**
   - Dashboard should show "Connected ✓"
   - Stats should load
   - Table should show leads

## Step 7: Continuous Deployment

Vercel automatically deploys when you push to GitHub:

```bash
# Make changes
git add .
git commit -m "Update dashboard"
git push origin main
```

Vercel will automatically:
- Detect the push
- Build the project
- Deploy to production

## Troubleshooting

### Issue: "Failed to fetch" or "Connection error"

**Solution**: Check your backend URL
```bash
# Test backend from your local machine
curl http://your-oracle-ip:8000/

# If it works locally but not on Vercel:
# 1. Check NEXT_PUBLIC_BACKEND_URL is set correctly
# 2. Verify backend is running on Oracle Cloud
# 3. Check firewall on Oracle Cloud
```

### Issue: "Invalid API Key" error

**Solution**: Verify environment variable
- Check `NEXT_PUBLIC_API_KEY` matches your backend `API_KEY`
- Redeploy after updating env vars

### Issue: Build fails

**Solution**: Check dependencies
```bash
# Update package.json to ensure all dependencies are listed
npm install
npm run build
# Fix any errors locally first
```

### Issue: CORS errors

**Solution**: Update backend CORS configuration
- Add your Vercel URL to `allow_origins`
- Restart backend

## Environment Variables Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `NEXT_PUBLIC_BACKEND_URL` | Yes | Backend API URL | `http://123.45.67.89:8000` |
| `NEXT_PUBLIC_API_KEY` | Yes | API Key for protected endpoints | `your-secret-key-123` |

## API Endpoints Used

The frontend makes requests to:

1. **GET `${BACKEND_URL}/leads`**
   - Protected with `X-API-Key` header
   - Returns all leads

2. **Auto-refresh every 5 seconds**
   - Keeps dashboard real-time

## Monitoring

### Vercel Dashboard
- Go to your project in Vercel
- Check "Deployments" tab
- View build logs
- Monitor function invocations

### Analytics (Optional)
Enable in Vercel Dashboard:
- Web Analytics
- Speed Insights
- Core Web Vitals

## Security Best Practices

1. **Never commit `.env` files**
   ```bash
   echo ".env*.local" >> .gitignore
   ```

2. **Use strong API keys**
   ```bash
   # Generate strong key
   openssl rand -base64 32
   ```

3. **Rotate keys regularly**
   - Update API keys periodically
   - Redeploy with new keys

4. **Use environment-specific keys**
   - Different keys for dev/staging/prod

## Cost Optimization

### Free Tier Limits
- **Vercel Hobby**: Unlimited deployments, 100GB bandwidth
- **Oracle Cloud**: Always Free tier includes 1000 OCPU hours

### Optimization Tips
- Optimize images (use Next.js Image component)
- Minimize API calls (already using 5-second refresh)
- Use Vercel Edge Functions for static content

## Update Strategy

When you need to update:

```bash
# 1. Update code
git add .
git commit -m "Update: Add new feature"

# 2. Push to GitHub
git push origin main

# 3. Vercel auto-deploys
# Monitor at vercel.com/dashboard

# 4. If needed, redeploy manually
vercel --prod
```

## Success Checklist

- [ ] Code pushed to GitHub
- [ ] Project created on Vercel
- [ ] Environment variables set
- [ ] Backend deployed on Oracle Cloud
- [ ] Backend CORS configured
- [ ] Frontend deployed successfully
- [ ] Dashboard loads without errors
- [ ] Data displays correctly
- [ ] Auto-refresh working
- [ ] Custom domain configured (optional)

Your frontend is now production-ready on Vercel! 🚀

## Quick Commands Reference

```bash
# Deploy manually
vercel --prod

# View logs
vercel logs

# Add environment variable
vercel env add VARIABLE_NAME

# List environment variables
vercel env ls

# Remove environment variable
vercel env rm VARIABLE_NAME
```

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Test backend connectivity
3. Verify environment variables
4. Check browser console for errors
5. Review CORS configuration