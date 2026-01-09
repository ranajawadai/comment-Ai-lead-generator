# 🤖 AI Lead Generator

A production-ready system that automatically converts social media comments into leads using AI-powered responses.

## 🎯 Features

- ✅ **Real-time Webhook Processing** - Receive Facebook/Instagram comments automatically
- ✅ **AI-Powered Analysis** - Smart lead categorization and response generation
- ✅ **Professional Dashboard** - Real-time lead tracking with beautiful UI
- ✅ **Production Ready** - Deploy to Oracle Cloud + Vercel in minutes
- ✅ **Zero Cost** - Uses free tiers of Oracle Cloud and Vercel

## 📁 Project Structure

```
AI Comment-to-Lead Agent/
├── backend/                 # FastAPI backend (Oracle Cloud)
│   ├── main_production.py  # Production-ready API
│   ├── .env.example        # Environment variables template
│   ├── requirements.txt    # Python dependencies
│   └── README_DEPLOY.md    # Backend deployment guide
│
├── frontend/                # Next.js frontend (Vercel)
│   ├── src/app/            # Dashboard components
│   ├── .env.example        # Frontend env template
│   ├── index.html          # Working dashboard (test locally)
│   └── README_DEPLOY.md    # Frontend deployment guide
│
├── COMPLETE_DEPLOYMENT_GUIDE.md  # Step-by-step deployment
├── DEPLOYMENT_CHECKLIST.md       # Track your progress
└── DEPLOYMENT_SUMMARY.md         # Quick reference
```

## 🚀 Quick Start (5 Minutes)

### 1. Setup Environment Variables

**Backend (Oracle Cloud):**
```bash
cd backend
cp .env.example .env
# Edit .env and fill in your values
```

**Frontend (Vercel):**
```bash
cd frontend
cp .env.example .env.local
# Edit .env.local for local testing
```

### 2. Deploy Backend to Oracle Cloud

Follow: **[COMPLETE_DEPLOYMENT_GUIDE.md](COMPLETE_DEPLOYMENT_GUIDE.md)** - Part 1

### 3. Deploy Frontend to Vercel

Follow: **[COMPLETE_DEPLOYMENT_GUIDE.md](COMPLETE_DEPLOYMENT_GUIDE.md)** - Part 2

## 🔐 Environment Variables

### Backend (.env)
```env
HOST=0.0.0.0
PORT=8000
API_KEY=your-secure-api-key-here
VERIFY_TOKEN=my_facebook_verification_token
PAGE_ACCESS_TOKEN=your_facebook_token
GROQ_API_KEY=your_groq_key (optional)
```

### Frontend (.env.local or Vercel)
```env
NEXT_PUBLIC_BACKEND_URL=http://your-oracle-ip:8000
NEXT_PUBLIC_API_KEY=your-secure-api-key-here
```

## 🧪 Test Locally

### Backend
```bash
cd backend
python main.py
# Visit http://localhost:8000
```

### Frontend Dashboard
Open `frontend/index.html` in your browser to see the working dashboard!

## 📚 Documentation

- **[COMPLETE_DEPLOYMENT_GUIDE.md](COMPLETE_DEPLOYMENT_GUIDE.md)** - Full step-by-step guide
- **[DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)** - Track your progress
- **[backend/README_DEPLOY.md](backend/README_DEPLOY.md)** - Backend details
- **[frontend/README_DEPLOY.md](frontend/README_DEPLOY.md)** - Frontend details

## 💰 Cost

**Total: $0/month**
- Oracle Cloud Always Free: $0
- Vercel Hobby: $0
- GitHub: $0

## 🔒 Security

**⚠️ IMPORTANT:** Never commit `.env` files!
- `.env` files are excluded in `.gitignore`
- Use `.env.example` as template
- Add real secrets to Vercel dashboard and Oracle Cloud

## 🎯 What You Get

✅ Backend API running 24/7 on Oracle Cloud  
✅ Professional dashboard on Vercel  
✅ Real-time lead tracking  
✅ AI-powered responses  
✅ Facebook webhook integration  
✅ Zero monthly costs  

## 🆘 Need Help?

1. Check the deployment guides
2. Review the checklist
3. Open an issue on GitHub

---

**Ready to deploy? Start with [COMPLETE_DEPLOYMENT_GUIDE.md](COMPLETE_DEPLOYMENT_GUIDE.md)!** 🚀