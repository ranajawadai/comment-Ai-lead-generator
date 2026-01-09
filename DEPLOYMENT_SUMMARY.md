# 🚀 AI Lead Agent - Complete Deployment Guide

## 📋 Project Overview

**AI Lead Agent** is a production-ready system that automatically:
- Receives social media comments via webhooks
- Analyzes them with AI (Groq)
- Generates smart responses
- Tracks leads in real-time
- Displays everything in a professional dashboard

---

## 🏗️ Architecture

```
┌─────────────────┐      ┌──────────────────┐      ┌─────────────────┐
│   Facebook/     │      │   Oracle Cloud   │      │     Vercel      │
│   Instagram     │─────▶│   Backend API    │─────▶│   Frontend UI   │
│   Webhooks      │      │   (FastAPI)      │      │   (Next.js)     │
└─────────────────┘      └──────────────────┘      └─────────────────┘
                              │
                              ▼
                         ┌──────────────┐
                         │  CSV Database│
                         │  (Leads)     │
                         └──────────────┘
```

---

## 📁 Project Structure

```
AI Comment-to-Lead Agent/
├── backend/
│   ├── main_production.py    # Production-ready backend
│   ├── main.py               # Development backend
│   ├── requirements.txt      # Python dependencies
│   ├── .env                  # Environment variables
│   ├── Procfile              # Heroku/Procfile
│   ├── start.sh              # Startup script
│   ├── leads_database.csv    # Database file
│   ├── README_DEPLOY.md      # Backend deployment guide
│   └── README.md             # Backend info
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx    # Main layout
│   │   │   ├── page.tsx      # Home redirect
│   │   │   ├── globals.css   # Styles
│   │   │   └── dashboard/
│   │   │       └── page.tsx  # Dashboard UI
│   ├── public/               # Static assets
│   ├── package.json          # Dependencies
│   ├── next.config.js        # Next.js config
│   ├── tailwind.config.ts    # Tailwind config
│   ├── tsconfig.json         # TypeScript config
│   ├── index.html            # Simple HTML fallback
│   ├── README_DEPLOY.md      # Frontend deployment guide
│   └── README.md             # Frontend info
│
├── .gitignore
├── DEPLOYMENT_SUMMARY.md     # This file
└── README.md                 # Main project README
```

---

## 🎯 Deployment Targets

### Backend: Oracle Cloud (Always Free Tier)
- **Cost**: $0/month
- **Specs**: 1 OCPU, 1GB RAM
- **URL**: `http://your-oracle-ip:8000`
- **Uptime**: 24/7 with PM2

### Frontend: Vercel (Hobby Tier)
- **Cost**: $0/month
- **Specs**: Unlimited deployments, 100GB bandwidth
- **URL**: `https://your-app.vercel.app`
- **CDN**: Global edge network

---

## ⚡ Quick Start (5 Minutes)

### Step 1: Backend on Oracle Cloud

```bash
# 1. SSH into Oracle Cloud
ssh -i your-key.pem opc@your-oracle-ip

# 2. Clone repository
git clone https://github.com/your-username/ai-lead-agent.git
cd ai-lead-agent/backend

# 3. Install dependencies
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# 4. Configure environment
nano .env
# Add: API_KEY, PORT, HOST, VERIFY_TOKEN, PAGE_ACCESS_TOKEN

# 5. Start with PM2
pm2 start main_production.py --name ai-lead-backend --interpreter python3
pm2 save
pm2 startup

# 6. Open firewall
sudo firewall-cmd --permanent --add-port=8000/tcp
sudo firewall-cmd --reload
```

**Backend is now live at**: `http://your-oracle-ip:8000`

### Step 2: Frontend on Vercel

```bash
# 1. Push code to GitHub
cd frontend
git add .
git commit -m "Ready for deployment"
git push origin main

# 2. Go to vercel.com
# 3. Import GitHub repository
# 4. Add environment variables:
#    NEXT_PUBLIC_BACKEND_URL = http://your-oracle-ip:8000
#    NEXT_PUBLIC_API_KEY = your-api-key
# 5. Click Deploy
```

**Frontend is now live at**: `https://your-app.vercel.app`

---

## 🔧 Configuration Files

### Backend `.env`
```env
# Server
HOST=0.0.0.0
PORT=8000

# Security
API_KEY=your-secure-api-key-here

# Facebook
VERIFY_TOKEN=my_super_secret_code_123
PAGE_ACCESS_TOKEN=your-facebook-token

# AI (Optional)
GROQ_API_KEY=your-groq-key

# Database
LEADS_CSV_FILE=leads_database.csv
```

### Frontend Environment (Vercel Dashboard)
```env
NEXT_PUBLIC_BACKEND_URL=http://your-oracle-ip:8000
NEXT_PUBLIC_API_KEY=your-secure-api-key-here
```

---

## 🧪 Testing the Complete System

### 1. Test Backend Health
```bash
curl http://your-oracle-ip:8000/
```
Should return: `{"status":"Active",...}`

### 2. Test Protected Endpoint
```bash
curl -H "X-API-Key: your-api-key" http://your-oracle-ip:8000/leads
```
Should return: `{"total_leads":0,"leads":[]}`

### 3. Test Webhook
```bash
curl -X POST http://your-oracle-ip:8000/webhook \
  -H "Content-Type: application/json" \
  -d '{"object":"page","entry":[{"id":"123","time":1234567890,"changes":[{"field":"feed","value":{"from":{"id":"user123"},"message":"How much does it cost?","post_id":"post1"}}]}]}'
```

### 4. Check Dashboard
Open `https://your-app.vercel.app` in browser

### 5. Send Real Webhook
Configure Facebook/Instagram webhook to:
- **URL**: `http://your-oracle-ip:8000/webhook`
- **Verify Token**: `my_super_secret_code_123`

---

## 📊 API Endpoints

| Endpoint | Method | Protected | Description |
|----------|--------|-----------|-------------|
| `/` | GET | ❌ | Health check |
| `/webhook` | GET | ❌ | Facebook verification |
| `/webhook` | POST | ❌ | Receive webhooks |
| `/leads` | GET | ✅ | Get all leads |
| `/test/facebook-reply` | POST | ✅ | Test Facebook reply |

---

## 🎨 Dashboard Features

### Real-time Stats
- ✅ Total Leads
- ✅ High Priority Count
- ✅ AI Responses Sent

### Live Table
- ✅ Source (Facebook/Instagram icons)
- ✅ User ID
- ✅ Comment Text
- ✅ AI Response
- ✅ Priority Badge
- ✅ Timestamp

### Auto-refresh
- Updates every 5 seconds
- Shows last update time
- Manual refresh button

---

## 🔐 Security Features

### Backend
- ✅ API Key protection for `/leads`
- ✅ Environment variable configuration
- ✅ CORS management
- ✅ Input validation with Pydantic

### Frontend
- ✅ API key stored in environment
- ✅ Secure headers
- ✅ Error handling
- ✅ No sensitive data in code

---

## 📈 Production Checklist

### Backend (Oracle Cloud)
- [ ] VM instance running
- [ ] Port 8000 open in firewall
- [ ] PM2 running 24/7
- [ ] Environment variables set
- [ ] API key configured
- [ ] Logs rotating
- [ ] Backups scheduled

### Frontend (Vercel)
- [ ] Code in GitHub
- [ ] Project created on Vercel
- [ ] Environment variables set
- [ ] Custom domain (optional)
- [ ] Auto-deploy enabled
- [ ] Analytics enabled (optional)

### Integration
- [ ] Backend URL configured in frontend
- [ ] API keys match
- [ ] CORS allows frontend domain
- [ ] Webhook configured in Facebook
- [ ] Test webhooks working
- [ ] Dashboard displays data

---

## 🔄 Workflow

### Daily Operations

1. **System Running**: Backend receives webhooks automatically
2. **AI Processing**: Each comment analyzed by Groq
3. **Smart Responses**: AI generates appropriate replies
4. **Lead Tracking**: All data saved to CSV
5. **Dashboard View**: Real-time updates every 5 seconds

### Maintenance

```bash
# Check backend health
curl http://your-oracle-ip:8000/

# View logs
pm2 logs ai-lead-backend

# Restart if needed
pm2 restart ai-lead-backend

# Check PM2 status
pm2 status
```

---

## 💰 Cost Breakdown

| Service | Tier | Cost | Notes |
|---------|------|------|-------|
| Oracle Cloud | Always Free | $0 | 1 OCPU, 1GB RAM |
| Vercel | Hobby | $0 | Unlimited deployments |
| GitHub | Free | $0 | Private repos |
| Groq API | Pay-per-use | ~$0.01/1K tokens | Optional |
| **Total** | | **$0/month** | |

---

## 🚨 Troubleshooting

### Backend Issues
```bash
# Check if running
pm2 status

# View logs
pm2 logs ai-lead-backend

# Test API
curl http://localhost:8000/

# Check port
sudo netstat -tulpn | grep 8000
```

### Frontend Issues
```bash
# Check Vercel logs
vercel logs

# Test backend connection
curl http://your-oracle-ip:8000/

# Check environment variables
# Vercel Dashboard → Settings → Environment Variables
```

### Common Errors

| Error | Solution |
|-------|----------|
| "Connection refused" | Backend not running or wrong IP |
| "Invalid API Key" | Check API_KEY matches |
| "CORS error" | Update backend CORS origins |
| "Webhook timeout" | Check firewall, restart backend |

---

## 📞 Support

### Backend Issues
- Check `pm2 logs ai-lead-backend`
- Verify `.env` configuration
- Test with `curl`

### Frontend Issues
- Check Vercel deployment logs
- Verify environment variables
- Check browser console

### Integration Issues
- Test backend independently
- Verify API keys match
- Check CORS configuration

---

## 🎉 Success Indicators

### Backend
```bash
$ curl http://your-oracle-ip:8000/
{"status":"Active","service":"AI Agent Backend","version":"1.0.0",...}
```

### Frontend
- Dashboard loads without errors
- Stats show 0 or actual numbers
- Table is empty or shows leads
- "Connected ✓" status visible

### Webhook
- Facebook shows "Verified"
- Comments appear in dashboard within 5 seconds
- AI responses generated automatically

---

## 🔄 Next Steps

### Immediate
1. ✅ Deploy backend to Oracle Cloud
2. ✅ Deploy frontend to Vercel
3. ✅ Configure Facebook webhook
4. ✅ Test with sample data

### Short-term
1. Add more social platforms (Twitter, LinkedIn)
2. Implement advanced analytics
3. Add email notifications
4. Create admin dashboard

### Long-term
1. Machine learning model training
2. Multi-language support
3. Mobile app
4. Team collaboration features

---

## 📝 Important Notes

### Security
- **Never** commit `.env` files
- **Always** use strong API keys
- **Regularly** rotate keys
- **Monitor** logs for suspicious activity

### Performance
- Backend: PM2 handles restarts
- Frontend: Vercel CDN for speed
- Database: CSV for simplicity (upgrade to PostgreSQL for scale)

### Scaling
- Backend: Can handle 1000s of webhooks/day
- Frontend: Vercel scales automatically
- Database: Consider PostgreSQL for 10,000+ leads

---

## 🎯 You're Ready!

Your AI Lead Agent is now **production-ready** with:
- ✅ Backend on Oracle Cloud (24/7)
- ✅ Frontend on Vercel (Global CDN)
- ✅ Real-time dashboard
- ✅ AI-powered responses
- ✅ Secure API
- ✅ Auto-refresh
- ✅ Professional UI

**Total Cost: $0/month** 🎉

Start receiving webhooks and watch your leads grow! 🚀