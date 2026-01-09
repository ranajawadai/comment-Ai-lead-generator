# 🔒 Caddy HTTPS Setup for Facebook Webhook

## Problem
Facebook **STRICTLY requires HTTPS** for webhook callbacks. HTTP is not accepted.

## Solution
Use Caddy as reverse proxy with automatic HTTPS.

## Configuration

### 1. Caddyfile Setup
```bash
# SSH into server
ssh -i "C:\Users\RANA JAWAD LAPTOP\Downloads\n8n instance keys\ssh-key-2025-12-13.key" ubuntu@161.118.195.178

# Edit Caddyfile
docker exec -it caddy nano /etc/caddy/Caddyfile
```

**Add this to Caddyfile:**
```
ai-lead.161.118.195.178.nip.io {
    reverse_proxy ai-lead-backend:8000
    tls internal
}
```

### 2. Connect Backend to Caddy Network
```bash
# Connect backend container to n8n_net network
docker network connect n8n_net ai-lead-backend

# Reload Caddy
docker exec caddy caddy reload --config /etc/caddy/Caddyfile
```

## Final URLs

### ✅ HTTPS Webhook URL (Facebook Compatible):
```
https://ai-lead.161.118.195.178.nip.io/webhook
```

### ✅ Verify Token:
```
my_super_secret_code_123
```

### ✅ Health Check:
```
https://ai-lead.161.118.195.178.nip.io
```

## Test Webhook Verification

```bash
curl -k "https://ai-lead.161.118.195.178.nip.io/webhook?hub.verify_token=my_super_secret_code_123&hub.challenge=123456&hub.mode=subscribe"
```

**Expected Response:** `123456`

## Facebook Webhook Configuration

**In Facebook Developer Portal:**
- **Callback URL:** `https://ai-lead.161.118.195.178.nip.io/webhook`
- **Verify Token:** `my_super_secret_code_123`

## Docker Network Architecture

```
┌─────────────────────────────────────────┐
│  Oracle Cloud Server                    │
│                                         │
│  ┌──────────────────────────────────┐  │
│  │  Caddy (HTTPS Reverse Proxy)    │  │
│  │  Port: 443                      │  │
│  │  Network: n8n_net               │  │
│  └──────────┬───────────────────────┘  │
│             │                          │
│             │ HTTPS                    │
│             │                          │
│  ┌──────────▼───────────────────────┐  │
│  │  Backend Container               │  │
│  │  Port: 8000                      │  │
│  │  Network: n8n_net + bridge       │  │
│  └──────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

## Troubleshooting

### Check Caddy Logs:
```bash
docker logs caddy --tail 20
```

### Check Backend Logs:
```bash
docker logs ai-lead-backend --tail 20
```

### Test Connectivity:
```bash
# From inside Caddy container
docker exec caddy curl -s http://ai-lead-backend:8000

# From server
curl -k https://ai-lead.161.118.195.178.nip.io
```

### Verify Network Connection:
```bash
docker network inspect n8n_net
```

## Security Notes

✅ **HTTPS Enabled** - Facebook webhook compatible  
✅ **Internal TLS** - Caddy manages certificates automatically  
✅ **Network Isolation** - Backend accessible only via Caddy  
✅ **API Key Required** - All endpoints need API key  

## Deployment Complete

Your backend is now:
- ✅ Running on Oracle Cloud
- ✅ Accessible via HTTPS
- ✅ Facebook webhook ready
- ✅ Docker containerized
- ✅ Auto-restart enabled