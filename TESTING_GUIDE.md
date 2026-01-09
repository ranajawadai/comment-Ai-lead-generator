# 🧪 Testing Guide - AI Lead Generator

## Complete Testing Checklist

---

## Phase 1: Backend Testing (Oracle Cloud)

### ✅ Test 1: Backend Health Check

**Command:**
```bash
curl https://161.118.195.178.nip.io
```

**Expected Response:**
```json
{
  "status": "Active",
  "service": "AI Agent Backend",
  "version": "1.0.0",
  "facebook_token_configured": true,
  "api_key_configured": false
}
```

**Status:** ✅ Working

---

### ✅ Test 2: Webhook Verification

**Command:**
```bash
curl -k "https://161.118.195.178.nip.io/webhook?hub.verify_token=my_super_secret_code_123&hub.challenge=999888&hub.mode=subscribe"
```

**Expected Response:** `999888`

**Status:** ✅ Working

---

### ✅ Test 3: Check Docker Containers

**Command:**
```bash
ssh -i "YOUR-SSH-KEY" ubuntu@161.118.195.178 "docker ps"
```

**Expected Output:**
```
CONTAINER ID   IMAGE             COMMAND                  STATUS         NAMES
2205466cb38a   ai-lead-backend   "python main_product…"   Up 30 minutes  ai-lead-backend
f62886e04afe   caddy:alpine      "caddy run --config…"    Up 5 minutes   caddy
```

**Status:** ✅ All running

---

### ✅ Test 4: Check Logs

**Command:**
```bash
ssh -i "YOUR-SSH-KEY" ubuntu@161.118.195.178 "docker logs ai-lead-backend --tail 10"
```

**Expected Output:**
```
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Application startup complete.
```

**Status:** ✅ No errors

---

## Phase 2: Frontend Testing (Vercel)

### ✅ Test 5: Deploy to Vercel

**Steps:**
1. Go to https://vercel.com
2. Import GitHub repo: `ranajawadai/comment-Ai-lead-generator`
3. Select `frontend/` directory
4. Add environment variables:
   - `NEXT_PUBLIC_BACKEND_URL = https://161.118.195.178.nip.io`
   - `NEXT_PUBLIC_API_KEY = my_secure_api_key_2025`
5. Click Deploy

**Expected:** Site deployed at `https://your-app.vercel.app`

**Status:** ⏳ Pending your action

---

### ✅ Test 6: Frontend Backend Connection

**Steps:**
1. Open your Vercel app
2. Open browser console (F12)
3. Check for connection messages

**Expected Console Output:**
```
✅ Connected to backend: https://161.118.195.178.nip.io
✅ API key validated
```

**Status:** ⏳ Pending your action

---

### ✅ Test 7: Dashboard Display

**Steps:**
1. Open Vercel app
2. Check if dashboard shows:
   - Backend status
   - Lead count
   - Recent comments

**Expected:** Dashboard displays real-time data

**Status:** ⏳ Pending your action

---

## Phase 3: Facebook Integration Testing

### ✅ Test 8: Facebook Webhook Configuration

**Steps:**
1. Go to Facebook Developer Portal
2. Configure webhook:
   - Callback URL: `https://161.118.195.178.nip.io/webhook`
   - Verify Token: `my_super_secret_code_123`
3. Select: Page
4. Subscribe to: feed, comments
5. Request permission: `pages_read_engagement`

**Expected:** Webhook verified successfully

**Status:** ⏳ Pending your action

---

### ✅ Test 9: Real Comment Test

**Steps:**
1. Post on your Facebook Page
2. Comment: "I'm interested in your product pricing"
3. Check backend logs:
```bash
ssh -i "YOUR-SSH-KEY" ubuntu@161.118.195.178 "docker logs -f ai-lead-backend"
```

**Expected Log Output:**
```
Received Facebook comment: "I'm interested in your product pricing"
Category: Hot Lead
AI Response: "Thank you! Our product is $99. Would you like more details?"
Saved to leads_database.csv
```

**Status:** ⏳ Pending your action

---

### ✅ Test 10: Check Database

**Command:**
```bash
ssh -i "YOUR-SSH-KEY" ubuntu@161.118.195.178 "docker exec ai-lead-backend cat leads_database.csv"
```

**Expected Output:**
```csv
timestamp,sender,message,category,ai_response
2026-01-09 19:51,John Doe,"I'm interested in your product pricing",Hot Lead,"Thank you! Our product is $99..."
```

**Status:** ⏳ Pending your action

---

## Phase 4: End-to-End Testing

### ✅ Test 11: Complete Flow Test

**Scenario:** User comments on Facebook

**Flow:**
```
Facebook Comment
    ↓ (Webhook)
Backend receives data
    ↓ (Groq AI)
Analyzes intent
    ↓ (Categorization)
Saves as "Hot Lead"
    ↓ (Auto-reply)
Sends AI response
    ↓ (Database)
Saves to CSV
```

**Verify Each Step:**
1. ✅ Webhook receives data
2. ✅ Backend processes comment
3. ✅ AI categorizes correctly
4. ✅ Response generated
5. ✅ Data saved to CSV
6. ✅ (Optional) Reply sent to Facebook

---

## Phase 5: Security Testing

### ✅ Test 12: API Key Protection

**Test:** Try accessing without API key
```bash
curl https://161.118.195.178.nip.io/protected
```

**Expected:** 403 Forbidden

**Status:** ✅ Protected

---

### ✅ Test 13: HTTPS Only

**Test:** Try HTTP access
```bash
curl http://161.118.195.178.nip.io/webhook
```

**Expected:** Redirected to HTTPS

**Status:** ✅ Working

---

## Phase 6: Performance Testing

### ✅ Test 14: Multiple Comments

**Test:** Post 5 comments in quick succession

**Expected:**
- All 5 processed
- All saved to CSV
- All categorized correctly
- No errors in logs

**Status:** ⏳ Pending your action

---

### ✅ Test 15: Concurrent Users

**Test:** Multiple people comment simultaneously

**Expected:**
- All comments processed
- No data loss
- Fast response time

**Status:** ⏳ Pending your action

---

## Troubleshooting Tests

### If Test Fails:

**Backend not responding:**
```bash
# Check if running
docker ps | grep ai-lead-backend

# Restart if needed
docker restart ai-lead-backend

# Check logs
docker logs ai-lead-backend
```

**Webhook verification fails:**
```bash
# Check Caddy logs
docker logs caddy

# Test direct connection
curl http://localhost:8000/webhook?hub.verify_token=...
```

**Frontend not connecting:**
```bash
# Check environment variables
echo $NEXT_PUBLIC_BACKEND_URL

# Test from browser console
fetch('https://161.118.195.178.nip.io')
  .then(r => r.json())
  .then(console.log)
```

---

## Success Criteria

### ✅ All Tests Passed When:

**Backend:**
- [ ] Health check returns correct JSON
- [ ] Webhook verification works
- [ ] Docker containers running
- [ ] No errors in logs
- [ ] HTTPS working

**Frontend:**
- [ ] Deployed to Vercel
- [ ] Connects to backend
- [ ] Shows dashboard data
- [ ] No console errors

**Facebook:**
- [ ] Webhook verified
- [ ] Real comment processed
- [ ] Saved to CSV
- [ ] AI response generated

**Security:**
- [ ] API key required
- [ ] HTTPS only
- [ ] CORS configured

---

## Quick Test Commands

```bash
# Backend health
curl https://161.118.195.178.nip.io

# Webhook test
curl -k "https://161.118.195.178.nip.io/webhook?hub.verify_token=my_super_secret_code_123&hub.challenge=123456&hub.mode=subscribe"

# Check containers
ssh -i "YOUR-SSH-KEY" ubuntu@161.118.195.178 "docker ps"

# Check logs
ssh -i "YOUR-SSH-KEY" ubuntu@161.118.195.178 "docker logs ai-lead-backend --tail 20"

# Check database
ssh -i "YOUR-SSH-KEY" ubuntu@161.118.195.178 "docker exec ai-lead-backend cat leads_database.csv"
```

---

## 🎯 Testing Summary

**Current Status:**
- ✅ Backend: Deployed & Working
- ✅ HTTPS: Configured & Working
- ✅ Webhook: Verified & Working
- ⏳ Frontend: Awaiting Vercel deployment
- ⏳ Facebook: Awaiting webhook configuration
- ⏳ Integration: Awaiting real comment test

**Next Actions:**
1. Deploy frontend to Vercel
2. Configure Facebook webhook
3. Post test comment
4. Verify complete flow

**Estimated Time:** 15-20 minutes

---

## 📊 Test Results Template

| Test # | Test Name | Status | Notes |
|--------|-----------|--------|-------|
| 1 | Backend Health | ✅ Pass | Returns correct JSON |
| 2 | Webhook Verify | ✅ Pass | Returns challenge |
| 3 | Docker Running | ✅ Pass | All containers up |
| 4 | Logs Clean | ✅ Pass | No errors |
| 5 | Vercel Deploy | ⏳ Pending | - |
| 6 | Frontend Connect | ⏳ Pending | - |
| 7 | Dashboard | ⏳ Pending | - |
| 8 | FB Webhook | ⏳ Pending | - |
| 9 | Real Comment | ⏳ Pending | - |
| 10 | Database Save | ⏳ Pending | - |

---

**Ready to test? Start with Phase 1 and work through each test!** 🚀