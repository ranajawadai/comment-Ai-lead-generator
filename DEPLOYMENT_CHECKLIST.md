# 📋 DEPLOYMENT CHECKLIST

Track your progress as you deploy your AI Lead Agent!

---

## ✅ **ORACLE CLOUD BACKEND**

- [ ] **Step 1.1:** Opened terminal/command prompt
- [ ] **Step 1.2:** Found your Oracle Cloud IP address: `___________`
- [ ] **Step 1.3:** Found your SSH key file (key.pem)
- [ ] **Step 1.4:** Successfully connected to Oracle Cloud (saw `[opc@server ~]$`)
- [ ] **Step 1.5:** Installed Git
- [ ] **Step 1.6:** Cloned your repository
- [ ] **Step 1.7:** Navigated to backend folder
- [ ] **Step 1.8:** Set up Python environment (saw `(venv)`)
- [ ] **Step 1.9:** Created .env file with your keys
- [ ] **Step 1.10:** Made start.sh executable
- [ ] **Step 1.11:** Installed PM2
- [ ] **Step 1.12:** Started backend (saw `online` status)
- [ ] **Step 1.13:** Set up auto-start
- [ ] **Step 1.14:** Opened firewall port 8000
- [ ] **Step 1.15:** Tested backend - got JSON response ✅

**Backend Status:** 🟢 LIVE at `http://YOUR-IP:8000`

---

## ✅ **VERCEL FRONTEND**

- [ ] **Step 2.1:** Opened terminal in frontend folder
- [ ] **Step 2.2:** Initialized git
- [ ] **Step 2.3:** Added all files
- [ ] **Step 2.4:** Committed files
- [ ] **Step 2.5:** Connected to GitHub
- [ ] **Step 2.6:** Pushed to GitHub
- [ ] **Step 2.7:** Deployed on Vercel
- [ ] **Step 2.8:** Got Vercel URL: `___________`

**Frontend Status:** 🟢 LIVE at your Vercel URL

---

## ✅ **TESTING**

- [ ] **Test 1:** Backend health check works
- [ ] **Test 2:** Protected endpoint works
- [ ] **Test 3:** Dashboard loads in browser
- [ ] **Test 4:** Shows your 4 leads
- [ ] **Test 5:** Auto-refresh works

---

## ✅ **FACEBOOK INTEGRATION**

- [ ] **Step 4.1:** Have webhook URL: `http://YOUR-IP:8000/webhook`
- [ ] **Step 4.2:** Configured in Facebook Developer Portal
- [ ] **Step 4.3:** Tested webhook - lead appeared in dashboard

---

## 🎯 **QUICK START COMMANDS**

**Check Backend:**
```bash
ssh -i "C:\Users\YOUR-NAME\Downloads\key.pem" opc@YOUR-IP
pm2 status
```

**View Logs:**
```bash
pm2 logs ai-lead-backend
```

**Test Backend:**
```bash
curl http://YOUR-IP:8000/
```

---

## 📞 **NEED HELP?**

Tell me:
1. Which step number you're stuck on
2. What error message you see
3. What command you ran

I'll help you immediately!

---

## 🎉 **WHEN COMPLETE**

Your AI Lead Agent will be:
- ✅ Running 24/7 on Oracle Cloud
- ✅ Live on Vercel with professional dashboard
- ✅ Ready to receive Facebook webhooks
- ✅ Generating AI responses automatically
- ✅ Tracking leads in real-time

**Total Cost: $0/month** 🎉