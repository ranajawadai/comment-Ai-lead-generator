# 📚 COMPLETE STEP-BY-STEP DEPLOYMENT GUIDE
## For Beginners - No Technical Knowledge Required

This guide will walk you through deploying your AI Lead Agent **step by step** with **zero assumptions** about your technical knowledge.

---

## 🎯 **WHAT YOU'LL ACCOMPLISH**

By the end of this guide, you will have:
- ✅ Backend running 24/7 on Oracle Cloud (FREE)
- ✅ Frontend live on Vercel with a professional dashboard (FREE)
- ✅ System ready to receive Facebook webhooks
- ✅ Real-time lead tracking with AI responses

---

## 📋 **PREREQUISITES CHECKLIST**

Before we start, make sure you have:

- [ ] Oracle Cloud account (created)
- [ ] Vercel account (created)
- [ ] GitHub account (created)
- [ ] Facebook Page Access Token (you have this)
- [ ] A computer with internet

**If any of these are missing, let me know and I'll help you create them!**

---

## 🏗️ **PART 1: DEPLOY BACKEND TO ORACLE CLOUD**

### **Step 1.1: Open Terminal on Your Computer**

**Windows Users:**
- Press `Windows Key + R`
- Type `cmd` and press Enter
- A black window will open (this is called "Command Prompt")

**Mac Users:**
- Press `Command + Space`
- Type `Terminal` and press Enter
- A white window will open

---

### **Step 1.2: Find Your Oracle Cloud IP Address**

1. Log in to your Oracle Cloud account at **cloud.oracle.com**
2. Click on **"Menu"** (top left) → **"Compute"** → **"Instances"**
3. Click on your instance name
4. Look for **"Public IP Address"** - it will look like: `123.45.67.89`
5. **Copy this IP address** and save it somewhere

---

### **Step 1.3: Find Your SSH Key File**

When you created your Oracle Cloud instance, you downloaded a `.pem` file. 

**Common locations:**
- `C:\Users\YOUR-NAME\Downloads\key.pem`
- `C:\Users\YOUR-NAME\Documents\key.pem`

**If you can't find it:**
- Go to Oracle Cloud → Your Instance → Click "Create/Download SSH Key" again
- Save it to your **Downloads** folder

---

### **Step 1.4: Connect to Your Oracle Cloud Server**

In your terminal (Command Prompt), type this command:

```bash
ssh -i "C:\Users\YOUR-NAME\Downloads\key.pem" opc@YOUR-ORACLE-IP
```

**Replace these two things:**
- `YOUR-NAME` → Your Windows username
- `YOUR-ORACLE-IP` → The IP address from Step 1.2

**Example:**
```bash
ssh -i "C:\Users\John\Downloads\key.pem" opc@123.45.67.89
```

**Press Enter.** You might see:
```
Are you sure you want to continue connecting? (yes/no)
```
Type `yes` and press Enter.

**If it asks for a password:** Just press Enter (no password needed).

**You should now see:** `[opc@your-server ~]$`

**Congratulations! You're inside your Oracle Cloud server!**

---

### **Step 1.5: Install Git (One-Time Setup)**

Copy and paste this command, then press Enter:

```bash
sudo yum install git -y
```

Wait for it to finish (you'll see "Complete!").

---

### **Step 1.6: Clone Your Repository**

First, let's get your code from GitHub:

```bash
cd ~
git clone https://github.com/YOUR-USERNAME/ai-lead-agent.git
```

**Replace `YOUR-USERNAME` with your actual GitHub username.**

**If you get an error:** You might need to make your repository public first.

---

### **Step 1.7: Navigate to Backend Folder**

```bash
cd ai-lead-agent/backend
```

---

### **Step 1.8: Set Up Python Environment**

Copy and paste these commands **one by one**:

```bash
python3 -m venv venv
```

Wait for it to finish.

```bash
source venv/bin/activate
```

You should see `(venv)` appear at the start of your prompt.

```bash
pip install -r requirements.txt
```

Wait for all packages to install (this takes 2-3 minutes).

---

### **Step 1.9: Create Configuration File**

This file will store your secret keys:

```bash
nano .env
```

A text editor will open. **Copy and paste this exactly:**

```env
HOST=0.0.0.0
PORT=8000
API_KEY=MySecureKey2024!
VERIFY_TOKEN=my_facebook_verification_token
PAGE_ACCESS_TOKEN=YOUR_FACEBOOK_TOKEN_HERE
LEADS_CSV_FILE=leads_database.csv
```

**IMPORTANT:** Replace `YOUR_FACEBOOK_TOKEN_HERE` with your actual Facebook Page Access Token.

**To save and exit:**
1. Press `Ctrl + X`
2. Press `Y`
3. Press `Enter`

---

### **Step 1.10: Make Script Executable**

```bash
chmod +x start.sh
```

---

### **Step 1.11: Install PM2 (Process Manager)**

PM2 keeps your app running 24/7:

```bash
sudo npm install -g pm2
```

Wait for it to finish.

---

### **Step 1.12: Start Your Backend**

```bash
pm2 start main_production.py --name ai-lead-backend --interpreter python3
```

**Check if it's running:**
```bash
pm2 status
```

You should see `ai-lead-backend` with status `online`.

---

### **Step 1.13: Make It Start Automatically**

```bash
pm2 save
pm2 startup
```

**You'll see instructions like:**
```
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u opc --hp /home/opc
```

**Copy that entire command and paste it, then press Enter.**

---

### **Step 1.14: Open Firewall Port**

Your backend needs to be accessible from the internet:

```bash
sudo firewall-cmd --permanent --add-port=8000/tcp
```

Then:
```bash
sudo firewall-cmd --reload
```

---

### **Step 1.15: Test Your Backend**

Open a **NEW terminal window** on your computer (keep the first one open).

In the **NEW** terminal, type:

```bash
curl http://YOUR-ORACLE-IP:8000/
```

**Replace `YOUR-ORACLE-IP` with your actual IP.**

**You should see:**
```json
{"status":"Active","service":"AI Agent Backend","version":"1.0.0",...}
```

**If you see this:** ✅ Your backend is LIVE!

---

## 🎨 **PART 2: DEPLOY FRONTEND TO VERCEL**

### **Step 2.1: Prepare Your Frontend Code**

Open a **NEW terminal window** on your computer.

```bash
cd "C:\Users\YOUR-NAME\Downloads\AI Comment-to-Lead Agent\frontend"
```

**Replace `YOUR-NAME` with your Windows username.**

---

### **Step 2.2: Initialize Git**

```bash
git init
```

---

### **Step 2.3: Add All Files**

```bash
git add .
```

---

### **Step 2.4: Commit Your Files**

```bash
git commit -m "Ready for Vercel deployment"
```

---

### **Step 2.5: Connect to GitHub**

```bash
git remote add origin https://github.com/YOUR-USERNAME/ai-lead-dashboard.git
```

**Replace `YOUR-USERNAME` with your GitHub username.**

---

### **Step 2.6: Push to GitHub**

```bash
git push -u origin main
```

**If it asks for your GitHub username and password:** Enter them.

---

### **Step 2.7: Deploy on Vercel (Website Method)**

**This is the easiest way:**

1. **Open your browser** and go to **vercel.com**
2. **Sign in** with your GitHub account
3. Click **"Add New..."** (top right) → **"Project"**
4. Find and click on your **`ai-lead-dashboard`** repository
5. Click **"Import"**

**Configure the project:**

- **Framework Preset:** Should automatically select "Next.js"
- **Build Command:** Should show `npm run build`
- **Output Directory:** Should show `.next`
- **Install Command:** Should show `npm install`

**Click "Environment Variables" and add these two:**

| Variable Name | Value |
|---------------|-------|
| `NEXT_PUBLIC_BACKEND_URL` | `http://YOUR-ORACLE-IP:8000` |
| `NEXT_PUBLIC_API_KEY` | `MySecureKey2024!` |

**Replace `YOUR-ORACLE-IP` with your actual Oracle IP address.**

**Click "Add" then click "Deploy"**

Wait 2-3 minutes while Vercel builds your site.

---

### **Step 2.8: Get Your Vercel URL**

When deployment finishes, you'll see:
```
🎉 Deployment Complete
https://your-app-name.vercel.app
```

**Copy this URL and save it!**

---

## 🧪 **PART 3: TEST EVERYTHING**

### **Test 1: Backend Health**

In your terminal:
```bash
curl http://YOUR-ORACLE-IP:8000/
```

**Should return:** `{"status":"Active",...}`

---

### **Test 2: Backend Protected Endpoint**

```bash
curl -H "X-API-Key: MySecureKey2024!" http://YOUR-ORACLE-IP:8000/leads
```

**Should return:** Your leads data (might be empty at first)

---

### **Test 3: Frontend Dashboard**

Open your **Vercel URL** in your browser.

**You should see:**
- Professional dark dashboard
- Stats showing numbers
- Table with your leads
- Auto-refresh working

**If you see this:** ✅ Everything is working!

---

## 🔧 **PART 4: CONNECT FACEBOOK WEBHOOK**

### **Step 4.1: Get Your Webhook URL**

Your webhook URL is:
```
http://YOUR-ORACLE-IP:8000/webhook
```

**Example:** `http://123.45.67.89:8000/webhook`

---

### **Step 4.2: Configure Facebook**

1. Go to **Facebook Developer Portal** (developers.facebook.com)
2. Select your **App**
3. Go to **Webhooks** → **Subscribe to Events**
4. Click **"Add Webhook"**

**Fill in these fields:**

- **Callback URL:** `http://YOUR-ORACLE-IP:8000/webhook`
- **Verify Token:** `my_facebook_verification_token` (from your .env file)

**Select Subscriptions:**
- ✅ `feed`
- ✅ `comments`

**Click "Verify and Save"**

---

### **Step 4.3: Test Webhook**

Send a test webhook:

```bash
curl -X POST http://YOUR-ORACLE-IP:8000/webhook \
  -H "Content-Type: application/json" \
  -d '{"object":"page","entry":[{"id":"123","time":1234567890,"changes":[{"field":"feed","value":{"from":{"id":"user123"},"message":"How much does it cost?","post_id":"post1"}}]}]}'
```

**Check your dashboard** - you should see the new lead appear within 5 seconds!

---

## 🎉 **CONGRATULATIONS!**

Your AI Lead Agent is now **100% live** with:

✅ **Backend:** Running 24/7 on Oracle Cloud  
✅ **Frontend:** Live on Vercel with professional dashboard  
✅ **Security:** API key protected  
✅ **Real-time:** Auto-refresh every 5 seconds  
✅ **AI Ready:** Will generate smart responses  
✅ **Facebook Ready:** Webhook configured  

---

## 📋 **DAILY USAGE**

### **Check if Backend is Running:**
```bash
# In terminal
ssh -i "C:\Users\YOUR-NAME\Downloads\key.pem" opc@YOUR-IP
pm2 status
```

### **View Backend Logs:**
```bash
pm2 logs ai-lead-backend
```

### **Update Frontend:**
```bash
cd frontend
git add .
git commit -m "Update"
git push origin main
# Vercel auto-deploys
```

---

## 🔍 **TROUBLESHOOTING**

### **Problem: "Connection refused" when testing backend**
**Solution:** Backend might not be running
```bash
# Connect to Oracle
ssh -i "C:\Users\YOUR-NAME\Downloads\key.pem" opc@YOUR-IP
cd ai-lead-agent/backend
pm2 status
# If not running:
pm2 start main_production.py --name ai-lead-backend --interpreter python3
```

### **Problem: "Invalid API Key" error**
**Solution:** Keys don't match
- Check your `.env` file: `cat .env`
- Check Vercel environment variables
- Make sure they're exactly the same

### **Problem: Dashboard shows "Backend: Disconnected"**
**Solution:** 
- Check if backend is running (see above)
- Check if firewall is open: `sudo firewall-cmd --list-ports`
- Verify `NEXT_PUBLIC_BACKEND_URL` in Vercel is correct

---

## 💰 **COST SUMMARY**

| Service | Monthly Cost |
|---------|--------------|
| Oracle Cloud (Always Free) | $0 |
| Vercel (Hobby) | $0 |
| **TOTAL** | **$0** |

---

## 🎯 **NEXT STEPS**

Now that you're deployed, you can:

1. **Send real webhooks** from Facebook
2. **Monitor leads** in your dashboard
3. **View AI responses** automatically generated
4. **Track high-priority leads** in real-time

---

## 🆘 **NEED HELP?**

If you get stuck at any step:

1. **Tell me exactly which step number** you're on
2. **Copy the exact error message** you see
3. **Tell me what command you ran**

I'll help you fix it immediately!

---

**Your AI Lead Agent is ready to transform your social media comments into leads!** 🚀

**Start by testing Step 1.15 - does your backend respond?**