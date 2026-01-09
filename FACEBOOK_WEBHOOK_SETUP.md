# 📘 Facebook Webhook Setup Guide

## Step-by-Step Facebook Webhook Configuration

---

## 📍 **Where to Go:**

1. Go to **Facebook Developer Portal**: https://developers.facebook.com
2. Select your **App** (or create new)
3. Go to **Products** → **Webhooks**
4. Click **Get Started** or **Add New Webhook**

---

## 🔧 **Webhook Configuration**

### **1. Enter Your Details:**

**Callback URL:**
```
https://YOUR-DOMAIN.com/webhook
```

**Verify Token:**
```
your_custom_verify_token
```

### **2. Select Subscription Type:**

```
☑ Page
```

### **3. Subscribe to Fields:**

```
feed
comments
mentions
```

---

## 📋 **Required Permissions:**

### **For Facebook Page:**

**Basic Permissions:**
- ✅ `pages_read_engagement` - Read posts/comments

**How to Add:**
1. Go to **App Dashboard** → **App Review** → **Permissions**
2. Request: `pages_read_engagement`
3. Provide justification: "Reads Facebook Page comments to generate leads and auto-respond to customer inquiries"

---

## 🚀 **Complete Setup Steps:**

### **Step 1: Create Webhook**
```
Products → Webhooks → Add New Webhook
```

### **Step 2: Configure**
- **Callback URL:** `https://YOUR-DOMAIN.com/webhook`
- **Verify Token:** `your_custom_verify_token`

### **Step 3: Select Page**
- Choose your Facebook Page
- Subscribe to: `feed`, `comments`

### **Step 4: Request Permission**
- Request: `pages_read_engagement`
- Wait for approval (if needed)

---

## 🧪 **Test Your Webhook:**

### **Method 1: Facebook Test Tool**
1. Go to **Webhooks** → **Test Subscription**
2. Enter your **Callback URL** and **Verify Token**
3. Click **Test**
4. Should receive: `Challenge` response

### **Method 2: Real Test**
1. Post on your Facebook Page
2. Comment on that post
3. Check your backend logs

---

## 📊 **What You'll Receive:**

### **Facebook Comment Webhook Payload:**
```json
{
  "object": "page",
  "entry": [{
    "id": "PAGE_ID",
    "time": 1234567890,
    "changes": [{
      "field": "feed",
      "value": {
        "item": "comment",
        "comment_id": "COMMENT_ID",
        "sender_name": "User Name",
        "message": "Product inquiry",
        "post_id": "POST_ID"
      }
    }]
  }]
}
```

---

## ⚠️ **Common Issues & Solutions:**

### **Issue 1: "Invalid OAuth Redirect URI"**
**Solution:** Add your domain to Valid OAuth Redirect URIs

### **Issue 2: "Permission Denied"**
**Solution:** Submit app for review with required permissions

### **Issue 3: "Webhook Not Receiving"**
**Solution:** 
- Check backend logs
- Verify network connectivity
- Check SSL certificate

---

## 🎯 **Quick Start Checklist:**

### **Facebook App Setup:**
- [ ] Create Facebook App
- [ ] Add Webhooks product
- [ ] Configure callback URL & verify token
- [ ] Add permissions
- [ ] Connect Facebook Page
- [ ] Subscribe to feed/comments
- [ ] Test webhook

### **Backend Setup:**
- [ ] Backend running on Oracle Cloud
- [ ] HTTPS enabled via Caddy
- [ ] Environment variables configured
- [ ] Webhook endpoint ready

---

## 🚀 **After Setup:**

### **Your System Will:**
1. ✅ Receive real-time comment notifications
2. ✅ Process leads automatically
3. ✅ Save to database
4. ✅ Generate AI responses (if configured)
5. ✅ Track all interactions

---

## 📞 **Need Help?**

**Facebook Developer Docs:**
- Webhooks: https://developers.facebook.com/docs/graph-api/webhooks
- Page API: https://developers.facebook.com/docs/graph-api/reference/page

**Your Backend:**
- URL: `https://YOUR-DOMAIN.com/webhook`
- Verify Token: `your_custom_verify_token`

---

## ✅ **Summary:**

**For Facebook Comments:**
- Select: **Page**
- Permissions: `pages_read_engagement`
- Webhook Fields: `feed`, `comments`

**Start with:** Page only → Test → Go live

---

**🎉 Your backend is ready! Just configure Facebook and you're live!**