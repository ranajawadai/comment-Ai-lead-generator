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

### **1. Select Subscription Type:**

When creating webhook, you'll see these options:

```
Select Subscription Type:
☑ User
☑ Page
☑ Permissions
☑ Application
☑ Instagram
☑ WhatsApp Business Account
☑ Ad Account
☑ Catalog
```

### **✅ WHAT TO SELECT:**

**For Facebook Comments/Posts:**
- ✅ **User** - For user feed posts
- ✅ **Page** - For page posts and comments (MOST IMPORTANT)
- ✅ **Instagram** - If you want Instagram comments too

**For Lead Generation:**
- ✅ **Page** - Required for page posts
- ✅ **Instagram** - Optional for Instagram posts

---

## 🎯 **Recommended Selection:**

### **Option 1: Facebook Only (Simplest)**
```
☑ Page
```

### **Option 2: Facebook + Instagram**
```
☑ Page
☑ Instagram
```

### **Option 3: All Features**
```
☑ User
☑ Page
☑ Instagram
```

---

## 📋 **Permissions Required:**

### **For Facebook Page:**

**Basic Permissions:**
- ✅ `pages_show_list` - View pages
- ✅ `pages_read_engagement` - Read posts/comments
- ✅ `pages_manage_posts` - Create posts (optional)
- ✅ `pages_read_user_content` - Read user content

**Webhook Permissions:**
- ✅ `pages_messaging` - Receive messages (optional)
- ✅ `page_events` - Receive events

### **For Instagram:**

**Basic Permissions:**
- ✅ `instagram_basic` - Basic Instagram data
- ✅ `instagram_manage_comments` - Manage comments
- ✅ `instagram_manage_insights` - Insights (optional)

---

## 🚀 **Step-by-Step Setup:**

### **Step 1: Create Webhook**

**Callback URL:**
```
https://ai-lead.161.118.195.178.nip.io/webhook
```

**Verify Token:**
```
my_super_secret_code_123
```

**Subscription Fields:**
```
feed
comments
mentions
```

### **Step 2: Select Page/Instagram**

1. **Go to:** Settings → Instagram → Connect Instagram Business Account
2. **Select:** Your Instagram Business Account
3. **Grant Permissions:** All requested permissions

### **Step 3: Subscribe to Webhook**

**For Facebook Page:**
1. Go to **Webhooks** → **Pages**
2. Select your **Page**
3. Subscribe to:
   - `feed`
   - `comments`
   - `mentions`
   - `messages` (optional)

**For Instagram:**
1. Go to **Webhooks** → **Instagram**
2. Select your **Instagram Account**
3. Subscribe to:
   - `comments`
   - `mentions`
   - `stories` (optional)

---

## 🔐 **Required Permissions List:**

### **Facebook App Permissions:**

```
pages_show_list
pages_read_engagement
pages_manage_posts
pages_read_user_content
pages_messaging
instagram_basic
instagram_manage_comments
```

### **How to Add Permissions:**

1. Go to **App Dashboard** → **Settings** → **Basic**
2. Click **Add Platform** → Select **Facebook Login**
3. Go to **Facebook Login** → **Settings**
4. Add **Valid OAuth Redirect URIs**
5. Go to **App Review** → **Permissions**
6. Request these permissions

---

## 📱 **Connect Your Accounts:**

### **Facebook Page:**

1. **App Dashboard** → **Products** → **Webhooks**
2. Click **Subscribe to Page**
3. Select your **Facebook Page**
4. Choose **Subscription Fields**:
   - `feed` (posts, comments, likes)
   - `messages` (if using messaging)
   - `messaging_postbacks`

### **Instagram Business Account:**

1. **Connect Instagram** to your Facebook Page
2. **App Dashboard** → **Instagram** → **Basic Display**
3. Add **Valid OAuth Redirect URIs**
4. **Webhooks** → **Instagram** → Subscribe

---

## ✅ **Verification Checklist:**

- [ ] Callback URL is HTTPS
- [ ] Verify token matches your `.env` file
- [ ] Page access token is generated
- [ ] Instagram is connected to Facebook Page
- [ ] Webhook subscribed to `feed` and `comments`
- [ ] Permissions approved by Facebook
- [ ] Test webhook with sample data

---

## 🧪 **Test Your Webhook:**

### **Method 1: Facebook Test Tool**

1. Go to **Webhooks** → **Test Subscription**
2. Enter your **Callback URL** and **Verify Token**
3. Click **Test**
4. Should receive: `Challenge` response

### **Method 2: Manual Test**

```bash
curl -k "https://ai-lead.161.118.195.178.nip.io/webhook?hub.verify_token=my_super_secret_code_123&hub.challenge=test123&hub.mode=subscribe"
```

**Expected:** `test123`

### **Method 3: Real Test**

1. Post on your Facebook Page
2. Comment on that post
3. Check your backend logs:
```bash
ssh -i "C:\Users\RANA JAWAD LAPTOP\Downloads\n8n instance keys\ssh-key-2025-12-13.key" ubuntu@161.118.195.178 "docker logs -f ai-lead-backend"
```

---

## 🎯 **What You'll Receive:**

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

### **Instagram Comment Webhook Payload:**
```json
{
  "object": "instagram",
  "entry": [{
    "id": "INSTAGRAM_BUSINESS_ID",
    "time": 1234567890,
    "changes": [{
      "field": "comments",
      "value": {
        "comment_id": "COMMENT_ID",
        "text": "Product inquiry",
        "username": "user_name",
        "timestamp": "2026-01-09T18:00:00+00:00"
      }
    }]
  }]
}
```

---

## ⚠️ **Common Issues & Solutions:**

### **Issue 1: "Invalid OAuth Redirect URI"**
**Solution:** Add `https://ai-lead.161.118.195.178.nip.io` to Valid OAuth Redirect URIs

### **Issue 2: "Permission Denied"**
**Solution:** Submit app for review with required permissions

### **Issue 3: "Webhook Not Receiving"**
**Solution:** 
- Check Caddy logs: `docker logs caddy`
- Check backend logs: `docker logs ai-lead-backend`
- Verify network: `docker network inspect n8n_net`

### **Issue 4: "Instagram Not Showing"**
**Solution:** 
- Connect Instagram to Facebook Page first
- Switch Instagram to Business Account
- Reconnect in Facebook App

---

## 📊 **Facebook App Review Process:**

### **For Public Use:**

1. **Submit for Review** → **Permissions**
2. **Provide:**
   - App description
   - Demo video
   - Test user credentials
   - Privacy policy URL
3. **Wait:** 5-7 business days
4. **Approval:** Get production access

### **For Testing (Private):**

1. **Add Test Users** → **Roles** → **Test Users**
2. **Use:** Test user credentials to test
3. **No review needed** for test users

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
- [ ] Backend running on Oracle Cloud ✅
- [ ] HTTPS enabled via Caddy ✅
- [ ] Environment variables configured ✅
- [ ] Webhook endpoint ready ✅

### **Instagram Setup (Optional):**
- [ ] Instagram Business Account
- [ ] Connect to Facebook Page
- [ ] Add Instagram product to app
- [ ] Subscribe to Instagram webhooks

---

## 🚀 **After Setup:**

### **Your System Will:**
1. ✅ Receive real-time comment notifications
2. ✅ Process leads automatically
3. ✅ Save to `leads_database.csv`
4. ✅ Generate AI responses (if Groq configured)
5. ✅ Track all interactions

### **Monitor Your System:**
```bash
# Watch live logs
ssh -i "C:\Users\RANA JAWAD LAPTOP\Downloads\n8n instance keys\ssh-key-2025-12-13.key" ubuntu@161.118.195.178 "docker logs -f ai-lead-backend"

# Check leads file
ssh -i "C:\Users\RANA JAWAD LAPTOP\Downloads\n8n instance keys\ssh-key-2025-12-13.key" ubuntu@161.118.195.178 "cat ai-lead-backend/leads_database.csv"
```

---

## 📞 **Need Help?**

**Facebook Developer Docs:**
- Webhooks: https://developers.facebook.com/docs/graph-api/webhooks
- Instagram API: https://developers.facebook.com/docs/instagram-api
- Page API: https://developers.facebook.com/docs/graph-api/reference/page

**Your Backend:**
- URL: `https://ai-lead.161.118.195.178.nip.io/webhook`
- Verify Token: `my_super_secret_code_123`

---

## ✅ **Summary:**

**For Facebook Comments:**
- Select: **Page**
- Permissions: `pages_read_engagement`, `pages_manage_posts`
- Webhook Fields: `feed`, `comments`

**For Instagram Comments:**
- Select: **Instagram**
- Permissions: `instagram_basic`, `instagram_manage_comments`
- Webhook Fields: `comments`

**Start with:** Page only → Test → Add Instagram later

---

**🎉 Your backend is ready! Just configure Facebook and you're live!**