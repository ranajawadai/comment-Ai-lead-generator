# 📋 Facebook Permissions Guide

## ❌ **What You DON'T Need:**

**Skip these - Not required for your use case:**
```
☐ pages_show_list - Only if you have multiple pages
☐ pages_manage_posts - Only if you want to CREATE posts
☐ pages_read_user_content - Only for reading user posts
☐ instagram_basic - Only if using Instagram
☐ instagram_manage_comments - Only if using Instagram
```

---

## ✅ **What You NEED for Facebook:**

### **Minimum Required Permissions:**

```
☑ pages_read_engagement
```

**That's it! Just ONE permission!**

---

## 🎯 **Why Only pages_read_engagement?**

### **Your Requirements:**
1. ✅ **Read new comments** → `pages_read_engagement` covers this
2. ✅ **Categorize comments** → Your backend code does this
3. ✅ **Auto-reply via Groq** → Your backend code does this
4. ✅ **Save to Google Sheets** → Your backend code does this

### **What pages_read_engagement gives you:**
- Read posts on your page
- Read comments on your posts
- Read likes/reactions
- Read page events

**Perfect for your lead generation tool!**

---

## 🔐 **Facebook Webhook Permissions:**

### **When Creating Webhook:**

**Select:**
```
☑ Page
```

**That's it! No Instagram needed.**

### **Subscription Fields:**
```
☑ feed      (includes posts & comments)
☑ comments  (specifically comments)
```

---

## 🚀 **Step-by-Step Facebook Setup:**

### **1. Go to Facebook Developer Portal:**
```
https://developers.facebook.com
```

### **2. Create/Select Your App:**
- Go to **My Apps**
- Select your app (or create new)

### **3. Add Webhooks Product:**
- **Products** → **Webhooks**
- Click **Get Started**

### **4. Configure Webhook:**

**Callback URL:**
```
https://161.118.195.178.nip.io/webhook
```

**Verify Token:**
```
my_super_secret_code_123
```

**Subscription Types:**
```
☑ Page
```

**Page Subscription Fields:**
```
☑ feed
☑ comments
```

### **5. Subscribe to Your Page:**
- Select your Facebook Page
- Click **Subscribe**

### **6. Request Permissions:**

**Go to:** App Dashboard → **App Review** → **Permissions**

**Request:**
```
pages_read_engagement
```

**Justification:**
```
"This app reads Facebook Page comments to generate leads and auto-respond to customer inquiries."
```

---

## 📊 **What You'll Receive:**

### **Facebook Comment Webhook Payload:**
```json
{
  "object": "page",
  "entry": [{
    "id": "YOUR_PAGE_ID",
    "time": 1641750000,
    "changes": [{
      "field": "feed",
      "value": {
        "item": "comment",
        "comment_id": "123456789",
        "sender_name": "John Doe",
        "message": "How much is this product?",
        "post_id": "987654321",
        "created_time": 1641750000
      }
    }]
  }]
}
```

### **Your Backend Will:**
1. ✅ Receive the comment instantly
2. ✅ Analyze with Groq AI (understand intent)
3. ✅ Categorize as lead (hot/warm/cold)
4. ✅ Auto-reply with AI response
5. ✅ Save to `leads_database.csv`
6. ✅ (Optional) Save to Google Sheets

---

## 🎯 **Complete Setup Checklist:**

### **Facebook App:**
- [ ] Create app
- [ ] Add Webhooks product
- [ ] Configure webhook URL & token
- [ ] Select Page subscription
- [ ] Subscribe to your page
- [ ] Request `pages_read_engagement`
- [ ] Test with real comment

### **Backend:**
- [ ] Backend running ✅
- [ ] HTTPS working ✅
- [ ] Webhook endpoint ready ✅
- [ ] Groq API configured (optional)
- [ ] CSV file ready ✅

---

## 🧪 **Test Your Setup:**

### **1. Facebook Test:**
1. Post on your Facebook Page
2. Comment: "I'm interested in your product"
3. Check backend logs:
```bash
ssh -i "C:\Users\RANA JAWAD LAPTOP\Downloads\n8n instance keys\ssh-key-2025-12-13.key" ubuntu@161.118.195.178 "docker logs -f ai-lead-backend"
```

### **2. Expected Output:**
```
Received Facebook comment: "I'm interested in your product"
Category: Hot Lead
AI Response: "Thank you for your interest! Our product is $99. Would you like more details?"
Saved to leads_database.csv
```

---

## 📈 **Your Workflow:**

### **When Someone Comments:**

```
Facebook Comment 
    ↓
Webhook Receives Data
    ↓
Backend Processes:
    1. Parse comment
    2. Analyze with Groq AI
    3. Categorize (Hot/Warm/Cold)
    4. Generate AI reply
    5. Save to CSV
    6. (Optional) Send reply to Facebook
```

---

## 🔒 **Permission Summary:**

### **For Facebook Only:**

**Required:**
- ✅ `pages_read_engagement` - Read comments

**Not Required:**
- ❌ `pages_manage_posts` - You're not posting
- ❌ `pages_show_list` - You have one page
- ❌ `instagram_*` - Not using Instagram

### **Total: 1 Permission**

---

## 🎉 **Simplest Setup Possible!**

**You only need:**
1. **1 Permission:** `pages_read_engagement`
2. **1 Webhook:** Page with feed & comments
3. **1 URL:** `https://161.118.195.178.nip.io/webhook`
4. **1 Token:** `my_super_secret_code_123`

**That's it! Your tool will:**
- ✅ Read all comments
- ✅ Categorize leads
- ✅ Auto-reply with AI
- ✅ Save to CSV

---

## 🚀 **Ready to Deploy!**

**Your Facebook Webhook Configuration:**

```
Callback URL: https://161.118.195.178.nip.io/webhook
Verify Token: my_super_secret_code_123
Permissions: pages_read_engagement
Subscription: Page feed & comments
```

**Go to Facebook Developer Portal and configure NOW!** 🎯