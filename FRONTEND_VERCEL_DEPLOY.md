# 🚀 Frontend Deployment to Vercel - Step by Step

## Prerequisites
- GitHub account with your repository
- Vercel account (free)
- Your backend URL from Oracle Cloud

---

## Step 1: Prepare Your Frontend

### Option A: Use Next.js (Recommended)
Your `frontend/` folder already has Next.js setup.

### Option B: Use HTML Dashboard
Your `frontend/index.html` is ready to deploy.

---

## Step 2: Deploy to Vercel

### Method 1: Using Vercel Website (Easiest)

1. **Go to Vercel**
   ```
   https://vercel.com
   ```

2. **Import Your GitHub Repository**
   - Click **"Add New..."** → **"Project"**
   - Select **GitHub**
   - Find: `ranajawadai/comment-Ai-lead-generator`
   - Click **"Import"**

3. **Configure Project**

   **For Next.js:**
   ```
   Framework Preset: Next.js
   Root Directory: frontend/
   Build Command: (leave default)
   Output Directory: (leave default)
   ```

   **For HTML:**
   ```
   Framework Preset: Other
   Root Directory: frontend/
   Build Command: (leave empty)
   Output Directory: (leave empty)
   ```

4. **Add Environment Variables**

   Click **"Environment Variables"** and add:

   ```
   NEXT_PUBLIC_BACKEND_URL = https://161.118.195.178.nip.io
   NEXT_PUBLIC_API_KEY = my_secure_api_key_2025
   ```

   **Note:** Replace with your actual values!

5. **Deploy**
   - Click **"Deploy"**
   - Wait 1-2 minutes
   - Your site is live!

---

## Method 2: Using Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   cd frontend
   vercel
   ```

4. **Follow Prompts**
   ```
   Set up and deploy? → Y
   Which scope? → Your Vercel account
   Link to existing project? → N
   Project name? → ai-lead-generator
   In which directory? → ./
   Override settings? → N
   ```

5. **Add Environment Variables**
   ```bash
   vercel env add NEXT_PUBLIC_BACKEND_URL
   # Enter: https://161.118.195.178.nip.io
   
   vercel env add NEXT_PUBLIC_API_KEY
   # Enter: my_secure_api_key_2025
   ```

6. **Redeploy**
   ```bash
   vercel --prod
   ```

---

## Step 3: Configure Your Backend

### Update Backend CORS

Your backend needs to allow your Vercel domain:

**SSH into Oracle Cloud:**
```bash
ssh -i "YOUR-SSH-KEY" ubuntu@YOUR-SERVER-IP
```

**Edit backend file:**
```bash
cd ai-lead-backend
nano main_production.py
```

**Add CORS:**
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://your-app.vercel.app",
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

**Restart backend:**
```bash
docker restart ai-lead-backend
```

---

## Step 4: Test Your Frontend

### 1. Open Your Vercel App
```
https://your-app.vercel.app
```

### 2. Test Backend Connection
- Open browser console (F12)
- Check for connection status
- Should show: "Connected to backend"

### 3. Test Dashboard
- View the dashboard
- Check if it shows backend status
- Verify API key validation

---

## Step 5: Test Complete Flow

### 1. Facebook Comment Test
1. Post on your Facebook Page
2. Comment: "I'm interested in your product"
3. Check Vercel frontend dashboard
4. Should show the lead in real-time

### 2. Check Backend Logs
```bash
ssh -i "YOUR-SSH-KEY" ubuntu@YOUR-SERVER-IP
docker logs -f ai-lead-backend
```

### 3. Check Database
```bash
docker exec ai-lead-backend cat leads_database.csv
```

---

## Environment Variables Reference

### Required for Frontend:

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_BACKEND_URL` | Your backend URL | `https://161.118.195.178.nip.io` |
| `NEXT_PUBLIC_API_KEY` | Your API key | `my_secure_api_key_2025` |

### Optional:

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_GROQ_API_KEY` | For AI features | `gsk_xxxxxxxx` |

---

## Troubleshooting

### Issue 1: "Connection Refused"
**Solution:** Check backend is running and CORS is configured

### Issue 2: "API Key Invalid"
**Solution:** Verify `NEXT_PUBLIC_API_KEY` matches backend `.env`

### Issue 3: "CORS Error"
**Solution:** Add your Vercel domain to backend CORS allowed origins

### Issue 4: "Build Failed"
**Solution:** Check `package.json` dependencies are correct

---

## Verify Deployment

### Check Vercel Logs:
1. Go to Vercel Dashboard
2. Select your project
3. Click **"Logs"** tab
4. Look for deployment status

### Check Frontend:
1. Open your Vercel URL
2. Open browser console (F12)
3. Look for connection messages

---

## Security Checklist

- [ ] API key is in environment variables (not in code)
- [ ] Backend CORS allows only your Vercel domain
- [ ] GitHub repo excludes `.env` files
- [ ] Vercel domain uses HTTPS
- [ ] API key is strong and unique

---

## Next Steps After Deployment

### 1. Test Everything:
- ✅ Frontend loads
- ✅ Connects to backend
- ✅ Shows real-time data
- ✅ API key works

### 2. Configure Facebook:
- Use your Vercel URL for webhook
- Test with real comment

### 3. Monitor:
- Check Vercel analytics
- Monitor backend logs
- Track leads in CSV

---

## Your Final URLs

### Frontend (Vercel):
```
https://your-app.vercel.app
```

### Backend (Oracle Cloud):
```
https://161.118.195.178.nip.io
```

### Webhook:
```
https://161.118.195.178.nip.io/webhook
```

---

## Quick Commands Summary

```bash
# Deploy to Vercel
cd frontend
vercel --prod

# Add environment variables
vercel env add NEXT_PUBLIC_BACKEND_URL
vercel env add NEXT_PUBLIC_API_KEY

# View logs
vercel logs your-app.vercel.app
```

---

## 🎉 You're Ready!

**Your complete system:**
- ✅ Backend: Oracle Cloud (HTTPS)
- ✅ Frontend: Vercel (Live)
- ✅ Webhook: Facebook ready
- ✅ Database: CSV tracking
- ✅ AI: Groq configured

**Just configure Facebook and start generating leads!** 🚀