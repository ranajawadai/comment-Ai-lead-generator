# AI Lead Dashboard - Frontend

Professional Next.js dashboard for AI-powered lead management.

## Installation

First, install the dependencies:

```bash
npm install
```

## Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- **Real-time Data**: Auto-refreshes every 5 seconds
- **Dark Mode**: Professional dark theme
- **Stats Dashboard**: Total leads, high priority, AI responses
- **Live Table**: Shows all leads with source, user, comment, AI response, and priority
- **Premium UI**: Modern design with smooth animations

## API Endpoints

- `GET http://localhost:8000/leads` - Fetch all leads
- `POST http://localhost:8000/webhook` - Receive webhooks
- `GET http://localhost:8000/` - Backend status

## Dependencies

- Next.js 14
- Tailwind CSS
- Lucide React (icons)
- Axios (HTTP client)

## Backend Requirements

Make sure the Python backend is running on port 8000:

```bash
cd backend
python main.py