# 🤖 AI Lead Generator

A production-ready system that automatically converts social media comments into leads using AI-powered responses.

## 🎯 Features

- ✅ **Real-time Webhook Processing** - Receive Facebook comments automatically
- ✅ **AI-Powered Analysis** - Smart lead categorization and response generation
- ✅ **Professional Dashboard** - Real-time lead tracking with beautiful UI
- ✅ **Production Ready** - Deploy to Oracle Cloud + Vercel in minutes
- ✅ **Zero Cost** - Uses free tiers of Oracle Cloud and Vercel

---

## 🚀 Quick Start (5 Minutes)

### **Step 1: Deploy Backend to Oracle Cloud**

**Follow:** `backend/README_DEPLOY.md`

**What you'll do:**
- SSH into Oracle Cloud
- Clone repository
- Configure environment variables
- Deploy with Docker

**Result:** Backend running at `https://YOUR-DOMAIN.com`

---

### **Step 2: Deploy Frontend to Vercel**

**Follow:** `FRONTEND_VERCEL_DEPLOY.md`

**What you'll do:**
- Import GitHub repo to Vercel
- Add environment variables
- Deploy with 1 click

**Result:** Dashboard at `https://your-app.vercel.app`

---

### **Step 3: Configure Facebook Webhook**

**Follow:** `FACEBOOK_WEBHOOK_SETUP.md`

**What you'll do:**
- Go to Facebook Developer Portal
- Configure webhook URL
- Request `pages_read_engagement` permission
- Subscribe to your page

**Result:** Real-time comment processing

---

## 📁 Project Structure

```
AI Comment-to-Lead Agent/
├── backend/                 # FastAPI backend (Oracle Cloud)
│   ├── main_production.py  # Production-ready API
│   ├── .env.example        # Environment variables template
│   ├── requirements.txt    # Python dependencies
│   ├── Dockerfile          # Container setup
│   ├── docker-compose.yml  # Docker Compose
│   ├── DOCKER_DEPLOY.md    # Docker deployment guide
│   ├── CADDY_SETUP.md      # HTTPS configuration
│   └── README_DEPLOY.md    # Complete deployment guide
│
├── frontend/                # Next.js frontend (Vercel)
│   ├── src/app/            # Dashboard components
│   ├── index.html          # Working dashboard (test locally)
│   ├── package.json        # Dependencies
│   ├── .env.example        # Frontend env template
│   ├── README_DEPLOY.md    # Frontend deployment guide
│   └── next.config.js      # Next.js config
│
├── COMPLETE_DEPLOYMENT_GUIDE.md  # Step-by-step deployment
├── DEPLOYMENT_CHECKLIST.md       # Track your progress
├── DEPLOYMENT_SUMMARY.md         # Quick reference
├── FACEBOOK_PERMISSIONS_GUIDE.md # What permissions you need
├── FRONTEND_VERCEL_DEPLOY.md     # Vercel deployment steps
├── TESTING_GUIDE.md              # Complete testing checklist
└── README.md                     # This file
```

---

## 🔐 Environment Variables

### **Backend (.env)**
```env
HOST=0.0.0.0
PORT=8000
API_KEY=your-secure-api-key-here
VERIFY_TOKEN=my_facebook_verification_token
PAGE_ACCESS_TOKEN=your_facebook_token
GROQ_API_KEY=your_groq_key (optional)
```

### **Frontend (.env.local or Vercel)**
```env
NEXT_PUBLIC_BACKEND_URL=http://your-oracle-ip:8000
NEXT_PUBLIC_API_KEY=your-secure-api-key-here
```

---

## 🧪 Testing Your System

**Follow:** `TESTING_GUIDE.md`

**Tests include:**
1. Backend health check
2. Webhook verification
3. Docker container status
4. Frontend deployment
5. Facebook integration
6. End-to-end flow

---

## 📚 Documentation

### **Deployment:**
- `backend/README_DEPLOY.md` - Backend deployment
- `FRONTEND_VERCEL_DEPLOY.md` - Frontend deployment
- `COMPLETE_DEPLOYMENT_GUIDE.md` - Full deployment

### **Configuration:**
- `FACEBOOK_WEBHOOK_SETUP.md` - Facebook webhook setup
- `FACEBOOK_PERMISSIONS_GUIDE.md` - Required permissions
- `backend/CADDY_SETUP.md` - HTTPS configuration

### **Testing:**
- `TESTING_GUIDE.md` - Complete testing guide
- `DEPLOYMENT_CHECKLIST.md` - Progress tracking

---

## 💰 Cost

**Total: $0/month**
- Oracle Cloud Always Free: $0
- Vercel Hobby: $0
- GitHub: $0

---

## 🔒 Security

**IMPORTANT:** Never commit `.env` files!
- `.env` files are excluded in `.gitignore`
- Use `.env.example` as template
- Add real secrets to Vercel dashboard and Oracle Cloud

---

## 🎯 What You Get

✅ Backend API running 24/7 on Oracle Cloud  
✅ Professional dashboard on Vercel  
✅ Real-time lead tracking  
✅ AI-powered responses  
✅ Facebook webhook integration  
✅ Zero monthly costs  

---

## 🚀 Your Next Steps

### **1. Deploy Backend:**
```bash
# Follow: backend/README_DEPLOY.md
# Result: Backend running on Oracle Cloud
```

### **2. Deploy Frontend:**
```bash
# Follow: FRONTEND_VERCEL_DEPLOY.md
# Result: Dashboard on Vercel
```

### **3. Configure Facebook:**
```bash
# Follow: FACEBOOK_WEBHOOK_SETUP.md
# Result: Webhook receiving comments
```

### **4. Test Everything:**
```bash
# Follow: TESTING_GUIDE.md
# Result: Complete system working
```

---

## 🎯 Quick Commands

### **Backend Status:**
```bash
ssh -i "YOUR-SSH-KEY" ubuntu@YOUR-SERVER-IP "docker ps"
```

### **Backend Logs:**
```bash
ssh -i "YOUR-SSH-KEY" ubuntu@YOUR-SERVER-IP "docker logs -f ai-lead-backend"
```

### **Test Webhook:**
```bash
curl -k "https://YOUR-DOMAIN.com/webhook?hub.verify_token=YOUR_TOKEN&hub.challenge=123456&hub.mode=subscribe"
```

### **Check Database:**
```bash
ssh -i "YOUR-SSH-KEY" ubuntu@YOUR-SERVER-IP "docker exec ai-lead-backend cat leads_database.csv"
```

---

## 📊 System Architecture

```
Facebook Comment
    ↓
HTTPS Webhook (YOUR-DOMAIN.com/webhook)
    ↓
Caddy Reverse Proxy (Port 443 → 8000)
    ↓
FastAPI Backend (Port 8000)
    ↓
Groq AI Analysis
    ↓
Lead Categorization
    ↓
CSV Database + Auto-Reply
```

---

## 🎯 Success Criteria

**Your system is ready when:**
- ✅ Backend responds to health check
- ✅ Webhook verification works
- ✅ Frontend deployed to Vercel
- ✅ Facebook webhook configured
- ✅ Real comment processed successfully
- ✅ Data saved to CSV

---

## 🆘 Need Help?

1. **Check the deployment guides**
2. **Review the testing guide**
3. **Check Facebook webhook logs**
4. **Verify environment variables**

---

## 🎉 Ready to Start?

**Start with:** `backend/README_DEPLOY.md`

**Your backend URL will be:** `https://YOUR-DOMAIN.com/webhook`

**Your verify token:** `my_facebook_verification_token`

**Permission needed:** `pages_read_engagement`

---

**🚀 Deploy your AI Lead Generator now!**