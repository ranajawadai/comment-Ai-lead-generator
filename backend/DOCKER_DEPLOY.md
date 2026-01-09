# 🐳 Docker Deployment Guide for Oracle Cloud

## Prerequisites
- SSH access to Oracle Cloud server
- Docker and Docker Compose installed on server

## Step 1: SSH into Oracle Cloud

```bash
ssh -i "C:\Users\RANA JAWAD LAPTOP\Downloads\n8n instance keys\ssh-key-2025-12-13.key" ubuntu@161.118.195.178
```

## Step 2: Clone Repository

```bash
# On your Oracle Cloud server
git clone https://github.com/ranajawadai/comment-Ai-lead-generator.git
cd comment-Ai-lead-generator/backend
```

## Step 3: Setup Environment Variables

```bash
# Copy the template
cp .env.example .env

# Edit .env file
nano .env
```

**Add your values:**
```
HOST=0.0.0.0
PORT=8000
API_KEY=your-secure-api-key
VERIFY_TOKEN=my_facebook_verification_token
PAGE_ACCESS_TOKEN=your_facebook_token
GROQ_API_KEY=your_groq_key (optional)
```

## Step 4: Build and Run with Docker

```bash
# Build the container
docker-compose build

# Run the container
docker-compose up -d

# Check logs
docker-compose logs -f
```

## Step 5: Configure Caddy (if needed)

If you want to use your existing Caddy setup, update your `Caddyfile`:

```
ai.yourdomain.com {
    reverse_proxy localhost:8000
}
```

Then reload Caddy:
```bash
sudo caddy reload --config /etc/caddy/Caddyfile
```

## Step 6: Verify Deployment

```bash
# Check if container is running
docker ps

# Test the API
curl http://localhost:8000

# Test webhook endpoint
curl http://localhost:8000/webhook
```

## Useful Docker Commands

```bash
# Stop container
docker-compose down

# Restart container
docker-compose restart

# View logs
docker-compose logs -f

# Remove container and image
docker-compose down --rmi all
```

## Troubleshooting

**Port already in use:**
```bash
# Check what's using port 8000
sudo lsof -i :8000

# Kill the process
sudo kill -9 <PID>
```

**Permission denied:**
```bash
# Add user to docker group
sudo usermod -aG docker ubuntu
newgrp docker
```

**Build failed:**
```bash
# Clean up and rebuild
docker system prune -a
docker-compose build --no-cache
```

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `HOST` | Yes | Server host (0.0.0.0) |
| `PORT` | Yes | Port (8000) |
| `API_KEY` | Yes | Your secure API key |
| `VERIFY_TOKEN` | Yes | Facebook webhook verify token |
| `PAGE_ACCESS_TOKEN` | Yes | Facebook page access token |
| `GROQ_API_KEY` | No | For AI responses (optional) |

## Next Steps

✅ Backend deployed via Docker  
✅ Running on port 8000  
✅ Ready for Facebook webhook  
✅ Data saved in `leads_database.csv`  

**Configure Facebook Webhook:**
- Callback URL: `http://161.118.195.178:8000/webhook`
- Verify Token: `my_facebook_verification_token`

**Deploy Frontend to Vercel:** Follow `frontend/README_DEPLOY.md`