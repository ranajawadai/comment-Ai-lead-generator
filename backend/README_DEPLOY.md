# Backend Deployment Guide - Oracle Cloud

This guide will help you deploy the AI Lead Backend to Oracle Cloud Infrastructure (OCI) and keep it running 24/7 with PM2.

## Prerequisites

- Oracle Cloud Account
- SSH access to your Oracle Cloud instance
- Basic Linux command knowledge

## Step 1: Connect to Oracle Cloud Instance

```bash
# SSH into your Oracle Cloud instance
ssh -i your-key.pem opc@your-oracle-ip
```

## Step 2: Install Required Software

```bash
# Update system
sudo yum update -y

# Install Python 3.9+ and pip
sudo yum install python3 python3-pip -y

# Install Git
sudo yum install git -y

# Install PM2 (Process Manager)
sudo npm install -g pm2

# Install virtualenv
sudo pip3 install virtualenv
```

## Step 3: Clone Your Repository

```bash
# Go to home directory
cd ~

# Clone your GitHub repository
git clone https://github.com/your-username/ai-lead-agent.git

# Navigate to backend directory
cd ai-lead-agent/backend
```

## Step 4: Set Up Virtual Environment

```bash
# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

## Step 5: Configure Environment Variables

```bash
# Create .env file
nano .env
```

Add the following content to `.env`:

```env
# Server Configuration
HOST=0.0.0.0
PORT=8000

# API Security
API_KEY=your-secure-api-key-here

# Facebook Configuration
VERIFY_TOKEN=my_super_secret_code_123
PAGE_ACCESS_TOKEN=your-facebook-page-access-token

# Groq API (Optional)
GROQ_API_KEY=your-groq-api-key

# Database
LEADS_CSV_FILE=leads_database.csv
```

Save and exit: `Ctrl+X`, then `Y`, then `Enter`

## Step 6: Test the Application

```bash
# Make start.sh executable
chmod +x start.sh

# Test run
python main_production.py
```

Press `Ctrl+C` to stop after testing.

## Step 7: Deploy with PM2

### Option A: Using PM2 directly

```bash
# Start with PM2
pm2 start main_production.py --name ai-lead-backend --interpreter python3

# Save PM2 configuration
pm2 save

# Make PM2 start on system boot
pm2 startup
```

### Option B: Using the start.sh script

```bash
# Make script executable
chmod +x start.sh

# Start with PM2
pm2 start start.sh --name ai-lead-backend

# Save PM2 configuration
pm2 save

# Make PM2 start on system boot
pm2 startup
```

## Step 8: Configure Firewall

```bash
# Allow port 8000
sudo firewall-cmd --permanent --add-port=8000/tcp
sudo firewall-cmd --reload
```

## Step 9: PM2 Management Commands

```bash
# Check status
pm2 status

# View logs
pm2 logs ai-lead-backend

# Restart application
pm2 restart ai-lead-backend

# Stop application
pm2 stop ai-lead-backend

# Monitor
pm2 monit
```

## Step 10: Set Up Domain (Optional)

If you have a domain name:

```bash
# Install Nginx
sudo yum install nginx -y

# Configure Nginx
sudo nano /etc/nginx/conf.d/ai-lead.conf
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Test and restart Nginx:

```bash
sudo nginx -t
sudo systemctl restart nginx
```

## Step 11: SSL Certificate (HTTPS)

```bash
# Install certbot
sudo yum install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal (runs twice daily)
sudo systemctl enable certbot.timer
```

## Step 12: Security Hardening

```bash
# Create a dedicated user (optional but recommended)
sudo useradd -m -s /bin/bash ai-lead
sudo passwd ai-lead

# Change ownership
sudo chown -R ai-lead:ai-lead /home/ai-lead/ai-lead-agent

# Switch to user
sudo su - ai-lead
```

## Step 13: Monitoring & Maintenance

### Check Application Health

```bash
# Test API
curl -H "X-API-Key: your-secure-api-key-here" http://localhost:8000/leads

# Check if running
pm2 list

# View resource usage
htop
```

### Log Rotation

```bash
# Install logrotate
sudo yum install logrotate -y

# Create logrotate config
sudo nano /etc/logrotate.d/ai-lead-backend
```

Add:

```
/home/ai-lead/ai-lead-agent/backend/*.log {
    daily
    rotate 7
    compress
    delaycompress
    missingok
    notifempty
    create 0640 ai-lead ai-lead
}
```

## Step 14: Backup Strategy

```bash
# Create backup script
nano backup.sh
```

```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/home/ai-lead/backups"
mkdir -p $BACKUP_DIR

# Backup leads database
cp /home/ai-lead/ai-lead-agent/backend/leads_database.csv $BACKUP_DIR/leads_$DATE.csv

# Backup logs
cp /home/ai-lead/ai-lead-agent/backend/*.log $BACKUP_DIR/

# Keep only last 7 days
find $BACKUP_DIR -type f -mtime +7 -delete

echo "Backup completed: $BACKUP_DIR/leads_$DATE.csv"
```

Make executable and schedule:

```bash
chmod +x backup.sh
crontab -e
```

Add:

```bash
0 2 * * * /home/ai-lead/backup.sh
```

## Step 15: Troubleshooting

### Application won't start

```bash
# Check PM2 logs
pm2 logs ai-lead-backend

# Check if port is in use
sudo netstat -tulpn | grep 8000

# Check Python version
python3 --version
```

### API Key issues

```bash
# Verify .env file
cat .env

# Restart PM2
pm2 restart ai-lead-backend
```

### Firewall issues

```bash
# Check firewall status
sudo firewall-cmd --list-all

# If needed, disable temporarily for testing
sudo systemctl stop firewalld
```

## Step 16: Update Deployment

When you make changes to the code:

```bash
# Pull latest changes
git pull origin main

# Update dependencies if needed
pip install -r requirements.txt

# Restart application
pm2 restart ai-lead-backend
```

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `HOST` | Yes | Server host (0.0.0.0 for all interfaces) |
| `PORT` | Yes | Server port (default: 8000) |
| `API_KEY` | Yes | Secret key for protected endpoints |
| `VERIFY_TOKEN` | Yes | Facebook webhook verification token |
| `PAGE_ACCESS_TOKEN` | Optional | Facebook Page Access Token for replies |
| `GROQ_API_KEY` | Optional | Groq API key for AI responses |
| `LEADS_CSV_FILE` | Yes | Database file name |

## API Endpoints

- `GET /` - Health check
- `GET /webhook` - Facebook verification
- `POST /webhook` - Receive webhooks
- `GET /leads` - Get all leads (Protected - requires X-API-Key header)
- `POST /test/facebook-reply` - Test Facebook reply (Protected)

## Testing the Deployment

```bash
# Test health endpoint
curl http://your-oracle-ip:8000/

# Test protected endpoint
curl -H "X-API-Key: your-secure-api-key-here" http://your-oracle-ip:8000/leads

# Test webhook (replace with actual data)
curl -X POST http://your-oracle-ip:8000/webhook \
  -H "Content-Type: application/json" \
  -d '{"object":"page","entry":[{"id":"123","time":1234567890,"changes":[{"field":"feed","value":{"from":{"id":"user123"},"message":"Test comment","post_id":"post1"}}]}]}'
```

## Success Checklist

- [ ] Application running with PM2
- [ ] Port 8000 open in firewall
- [ ] API key configured and working
- [ ] Environment variables set correctly
- [ ] PM2 startup enabled
- [ ] Logs being generated
- [ ] Health endpoint responding
- [ ] Protected endpoints requiring API key
- [ ] Webhook endpoint working

Your backend is now production-ready on Oracle Cloud! 🚀