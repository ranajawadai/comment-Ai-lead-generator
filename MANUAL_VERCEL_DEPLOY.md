# 🚀 Manual Vercel Deployment Guide

## Step-by-Step Vercel Website Deployment

---

## Step 1: Go to Vercel

1. Open your browser
2. Go to: **https://vercel.com**
3. Log in with your GitHub account

---

## Step 2: Import Your Project

1. Click **"Add New..."** (top right)
2. Select **"Project"**
3. Find and select: **`ranajawadai/comment-Ai-lead-generator`**
4. Click **"Import"**

---

## Step 3: Configure Project Settings

### **Framework Preset:**
```
Next.js
```

### **Root Directory:**
```
frontend/
```

### **Build Command:**
```
next build
```

### **Output Directory:**
```
.next
```

### **Install Command:**
```
npm install
```

---

## Step 4: Add Environment Variables

Click **"Environment Variables"** and add these:

| Variable Name | Value |
|---------------|-------|
| `NEXT_PUBLIC_BACKEND_URL` | `https://161.118.195.178.nip.io` |
| `NEXT_PUBLIC_API_KEY` | `my_secure_api_key_2025` |

**Important:** Replace the values with your actual backend URL and API key!

---

## Step 5: Deploy

1. Click **"Deploy"**
2. Wait 1-2 minutes for deployment
3. Your site will be live at: `https://your-project.vercel.app`

---

## Step 6: Test Your Deployment

### **1. Open Your App**
Go to your Vercel URL (e.g., `https://your-project.vercel.app`)

### **2. Check Browser Console (F12)**
Look for:
```
✅ Connected to backend: https://161.118.195.178.nip.io
✅ API key validated
```

### **3. Test Backend Connection**
In browser console, run:
```javascript
fetch('https://161.118.195.178.nip.io')
  .then(r => r.json())
  .then(console.log)
```

**Expected:** Shows backend status

---

## Step 7: Update Backend CORS (If Needed)

If you see CORS errors, update your backend:

**SSH into Oracle Cloud:**
```bash
ssh -i "YOUR-SSH-KEY" ubuntu@161.118.195.178
```

**Edit backend file:**
```bash
cd ai-lead-backend
nano main_production.py
```

**Add CORS middleware:**
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://your-project.vercel.app",
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

## Step 8: Test Complete Flow

### **1. Facebook Comment Test**
1. Post on your Facebook Page
2. Comment: "I'm interested in your product"
3. Check if it appears in your Vercel dashboard

### **2. Check Backend Logs**
```bash
ssh -i "YOUR-SSH-KEY" ubuntu@161.118.195.178 "docker logs -f ai-lead-backend"
```

### **3. Check Database**
```bash
ssh -i "YOUR-SSH-KEY" ubuntu@161.118.195.178 "docker exec ai-lead-backend cat leads_database.csv"
```

---

## Troubleshooting

### **Issue: "404: NOT_FOUND"**
**Solution:** 
- Check Root Directory is `frontend/`
- Check Framework is Next.js
- Redeploy

### **Issue: "Build Failed"**
**Solution:**
- Check `package.json` has all dependencies
- Check `next.config.js` is correct
- Check `tsconfig.json` is valid

### **Issue: "Environment Variables Not Working"**
**Solution:**
- Redeploy after adding env vars
- Check variable names are exact
- Check values are correct

### **Issue: "CORS Error"**
**Solution:**
- Update backend CORS (see Step 7)
- Add your Vercel domain to allowed origins

---

## Verify Deployment

### **Check Vercel Dashboard:**
1. Go to your project
2. Click **"Deployments"** tab
3. Status should be: **"Ready"**
4. Click the URL to open

### **Check Logs:**
1. Click **"Logs"** tab
2. Look for any errors
3. Should show successful build

---

## Your Final URLs

### **Frontend (Vercel):**
```
https://your-project.vercel.app
```

### **Backend (Oracle Cloud):**
```
https://161.118.195.178.nip.io
```

### **Webhook:**
```
https://161.118.195.178.nip.io/webhook
```

---

## Next Steps After Deployment

### **1. Configure Facebook Webhook:**
- Callback URL: `https://161.118.195.178.nip.io/webhook`
- Verify Token: `my_super_secret_code_123`
- Permission: `pages_read_engagement`

### **2. Test with Real Comment:**
- Post on Facebook
- Comment on your post
- Check Vercel dashboard

### **3. Monitor:**
- Vercel analytics
- Backend logs
- Database entries

---

## Quick Commands

```bash
# Redeploy from Vercel dashboard
# Click "Deployments" → "Redeploy"

# View logs
# Click "Logs" tab

# Add environment variables
# Project Settings → Environment Variables

# Custom domain (optional)
# Project Settings → Domains
```

---

## 🎉 You're Ready!

**Your system will:**
- ✅ Receive Facebook comments automatically
- ✅ Categorize leads with AI
- ✅ Auto-reply with Groq
- ✅ Save to CSV database
- ✅ Display in real-time dashboard

**Just deploy and configure Facebook!** 🚀