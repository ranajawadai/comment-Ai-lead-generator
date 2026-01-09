from fastapi import FastAPI, Request, HTTPException, Query, Header, Depends
from fastapi.responses import PlainTextResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional, Dict, Any, List
import os
import csv
import json
from datetime import datetime
from dotenv import load_dotenv
from groq import Groq
import requests

# Load environment variables
load_dotenv()

app = FastAPI(
    title="Comment-to-Lead AI Agent",
    description="Backend service for converting social media comments to leads",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuration from environment variables
HOST = os.getenv("HOST", "0.0.0.0")
PORT = int(os.getenv("PORT", 8000))
API_KEY = os.getenv("API_KEY", "your-secret-api-key-here")

# Database file path
LEADS_CSV_FILE = "leads_database.csv"

# Initialize Groq client
groq_client = None
try:
    groq_api_key = os.getenv("GROQ_API_KEY")
    if groq_api_key and groq_api_key != "your_groq_api_key_here":
        groq_client = Groq(api_key=groq_api_key)
        print("Groq client initialized successfully")
    else:
        print("GROQ_API_KEY not set - using fallback mode")
except Exception as e:
    print(f"Failed to initialize Groq client: {e}")

# Facebook Page Access Token
PAGE_ACCESS_TOKEN = os.getenv("PAGE_ACCESS_TOKEN")

# Pydantic Models for strict typing
class LeadResponse(BaseModel):
    timestamp: str
    source: str
    user_id: str
    comment_text: str
    post_id: str
    priority: str
    ai_response: str

class LeadsListResponse(BaseModel):
    total_leads: int
    leads: List[LeadResponse]

class WebhookResponse(BaseModel):
    status: str
    source: Optional[str] = None
    lead: Optional[LeadResponse] = None
    ai_analysis: Optional[Dict[str, Any]] = None
    reply_sent: bool = False
    message: Optional[str] = None

class HealthResponse(BaseModel):
    status: str
    service: str
    version: str
    groq_connected: bool
    facebook_token_configured: bool
    api_key_configured: bool

class Lead(BaseModel):
    source: str
    user_id: str
    comment_text: str
    post_id: str
    timestamp: str
    priority: str = "Normal"
    ai_response: str = ""

# API Key Dependency
async def verify_api_key(api_key: str = Header(..., alias="X-API-Key")):
    if api_key != API_KEY:
        raise HTTPException(
            status_code=401,
            detail="Invalid API Key"
        )
    return api_key

def init_leads_database():
    """Initialize the leads CSV file with headers if it doesn't exist"""
    if not os.path.exists(LEADS_CSV_FILE):
        with open(LEADS_CSV_FILE, 'w', newline='', encoding='utf-8') as f:
            writer = csv.writer(f)
            writer.writerow(['timestamp', 'source', 'user_id', 'comment_text', 'post_id', 'priority', 'ai_response'])

def save_lead_to_csv(lead: Lead):
    """Save a lead to the CSV database"""
    with open(LEADS_CSV_FILE, 'a', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow([
            lead.timestamp,
            lead.source,
            lead.user_id,
            lead.comment_text,
            lead.post_id,
            lead.priority,
            lead.ai_response
        ])
    print(f"Lead saved: {lead.source} | {lead.user_id} | {lead.priority}")

def send_facebook_reply(comment_id: str, message: str):
    """Send a reply to a Facebook comment using the Page Access Token"""
    if not PAGE_ACCESS_TOKEN or PAGE_ACCESS_TOKEN == "your_page_access_token_here":
        print("Facebook Page Access Token not configured - skipping reply")
        return False
    
    try:
        url = f"https://graph.facebook.com/v18.0/{comment_id}/comments"
        params = {
            "message": message,
            "access_token": PAGE_ACCESS_TOKEN
        }
        
        response = requests.post(url, params=params)
        
        if response.status_code == 200:
            print(f"Facebook reply sent successfully to comment {comment_id}")
            return True
        else:
            print(f"Failed to send Facebook reply: {response.status_code} - {response.text}")
            return False
            
    except Exception as e:
        print(f"Error sending Facebook reply: {e}")
        return False

def analyze_comment_with_groq(comment_text: str) -> Dict[str, Any]:
    """Analyze comment using Groq API"""
    if not groq_client:
        text_lower = comment_text.lower()
        if any(word in text_lower for word in ["price", "cost", "how much", "info", "information", "details", "contact"]):
            return {
                "ai_response_text": "Thanks for your interest! Check your DMs for a special offer with pricing details.",
                "priority_score": "High"
            }
        else:
            return {
                "ai_response_text": "Thank you for your comment! We'll get back to you soon.",
                "priority_score": "Normal"
            }
    
    try:
        system_prompt = """You are a professional Sales Assistant. Analyze this comment and provide:
        1. A short, helpful response (max 20 words) if the user is asking about price, location, or availability
        2. Suggest they check their DMs for a special offer
        3. Categorize as 'High', 'Medium', or 'Low' priority
        
        Format your response as JSON:
        {
            "ai_response_text": "your response here",
            "priority_score": "High/Medium/Low"
        }"""
        
        response = groq_client.chat.completions.create(
            model="llama3-8b-8192",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"Comment: {comment_text}"}
            ],
            temperature=0.7,
            max_tokens=150
        )
        
        result_text = response.choices[0].message.content.strip()
        
        try:
            result_text = result_text.replace("```json", "").replace("```", "").strip()
            result_data = json.loads(result_text)
            
            return {
                "ai_response_text": result_data.get("ai_response_text", "Thank you for your interest!"),
                "priority_score": result_data.get("priority_score", "Normal")
            }
        except:
            text_lower = comment_text.lower()
            if any(word in text_lower for word in ["price", "cost", "how much", "info", "information", "details", "contact"]):
                return {
                    "ai_response_text": "Thanks for your interest! Check your DMs for a special offer with pricing details.",
                    "priority_score": "High"
                }
            else:
                return {
                    "ai_response_text": "Thank you for your comment! We'll get back to you soon.",
                    "priority_score": "Normal"
                }
                
    except Exception as e:
        print(f"Groq API error: {e}")
        text_lower = comment_text.lower()
        if any(word in text_lower for word in ["price", "cost", "how much", "info", "information", "details", "contact"]):
            return {
                "ai_response_text": "Thanks for your interest! Check your DMs for a special offer with pricing details.",
                "priority_score": "High"
            }
        else:
            return {
                "ai_response_text": "Thank you for your comment! We'll get back to you soon.",
                "priority_score": "Normal"
            }

def extract_facebook_comment(data: Dict[str, Any]) -> Optional[Lead]:
    """Extract comment from Facebook Page webhook structure"""
    try:
        if data.get("object") != "page":
            return None
        
        for entry in data.get("entry", []):
            for change in entry.get("changes", []):
                if change.get("field") == "feed":
                    value = change.get("value", {})
                    
                    user_id = value.get("from", {}).get("id", "")
                    comment_text = value.get("message", "")
                    post_id = value.get("post_id", "")
                    
                    if comment_text and user_id:
                        return Lead(
                            source="facebook",
                            user_id=user_id,
                            comment_text=comment_text,
                            post_id=post_id,
                            timestamp=datetime.now().isoformat()
                        )
    except Exception as e:
        print(f"Error extracting Facebook comment: {e}")
    
    return None

def extract_instagram_comment(data: Dict[str, Any]) -> Optional[Lead]:
    """Extract comment from Instagram webhook structure"""
    try:
        if data.get("object") != "instagram":
            return None
        
        for entry in data.get("entry", []):
            for change in entry.get("changes", []):
                if change.get("field") == "comments":
                    value = change.get("value", {})
                    
                    user_id = value.get("from", {}).get("id", "")
                    comment_text = value.get("text", "")
                    post_id = value.get("media", {}).get("id", "")
                    
                    if comment_text and user_id:
                        return Lead(
                            source="instagram",
                            user_id=user_id,
                            comment_text=comment_text,
                            post_id=post_id,
                            timestamp=datetime.now().isoformat()
                        )
    except Exception as e:
        print(f"Error extracting Instagram comment: {e}")
    
    return None

# Routes
@app.get("/", response_model=HealthResponse)
async def root():
    return {
        "status": "Active",
        "service": "AI Agent Backend",
        "version": "1.0.0",
        "groq_connected": groq_client is not None,
        "facebook_token_configured": PAGE_ACCESS_TOKEN and PAGE_ACCESS_TOKEN != "your_page_access_token_here",
        "api_key_configured": API_KEY != "your-secret-api-key-here"
    }

@app.get("/webhook")
async def verify_webhook(
    hub_mode: str = Query(alias="hub.mode"),
    hub_verify_token: str = Query(alias="hub.verify_token"),
    hub_challenge: str = Query(alias="hub.challenge")
):
    """Facebook/Meta webhook verification endpoint"""
    our_verify_token = os.getenv("VERIFY_TOKEN")
    
    if hub_verify_token != our_verify_token:
        raise HTTPException(
            status_code=403,
            detail="Invalid verification token"
        )
    
    try:
        challenge = int(hub_challenge)
        print(f"Verified! Sending challenge: {hub_challenge}")
        return PlainTextResponse(content=str(hub_challenge), status_code=200)
    except ValueError:
        raise HTTPException(
            status_code=400,
            detail="Invalid challenge format"
        )

@app.post("/webhook", response_model=WebhookResponse)
async def receive_webhook(request: Request):
    """Receive webhook data from Facebook and Instagram"""
    try:
        body = await request.body()
        if not body:
            return WebhookResponse(status="empty", message="No data received")
        
        try:
            data = await request.json()
        except:
            body_str = body.decode('utf-8')
            if not body_str:
                return WebhookResponse(status="empty", message="Empty body")
            data = json.loads(body_str)
        
        print(f"Received webhook: {json.dumps(data, indent=2)}")
        init_leads_database()
        
        facebook_lead = extract_facebook_comment(data)
        if facebook_lead:
            ai_result = analyze_comment_with_groq(facebook_lead.comment_text)
            facebook_lead.priority = ai_result["priority_score"]
            facebook_lead.ai_response = ai_result["ai_response_text"]
            save_lead_to_csv(facebook_lead)
            
            return WebhookResponse(
                status="processed",
                source="facebook",
                lead=LeadResponse(**facebook_lead.model_dump()),
                ai_analysis=ai_result,
                reply_sent=False
            )
        
        instagram_lead = extract_instagram_comment(data)
        if instagram_lead:
            ai_result = analyze_comment_with_groq(instagram_lead.comment_text)
            instagram_lead.priority = ai_result["priority_score"]
            instagram_lead.ai_response = ai_result["ai_response_text"]
            save_lead_to_csv(instagram_lead)
            
            return WebhookResponse(
                status="processed",
                source="instagram",
                lead=LeadResponse(**instagram_lead.model_dump()),
                ai_analysis=ai_result,
                reply_sent=False
            )
        
        return WebhookResponse(status="ignored", message="No valid comment data found")
        
    except Exception as e:
        print(f"Error processing webhook: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Error processing webhook: {str(e)}"
        )

@app.get("/leads", response_model=LeadsListResponse)
async def get_leads(api_key: str = Depends(verify_api_key)):
    """View all leads from the database (Protected)"""
    if not os.path.exists(LEADS_CSV_FILE):
        return LeadsListResponse(total_leads=0, leads=[])
    
    leads = []
    with open(LEADS_CSV_FILE, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            leads.append(LeadResponse(**row))
    
    return LeadsListResponse(total_leads=len(leads), leads=leads)

@app.post("/test/facebook-reply")
async def test_facebook_reply(comment_id: str, message: str, api_key: str = Depends(verify_api_key)):
    """Test sending a reply to a Facebook comment (Protected)"""
    success = send_facebook_reply(comment_id, message)
    return {
        "success": success,
        "comment_id": comment_id,
        "message": message
    }

if __name__ == "__main__":
    import uvicorn
    print(f"Starting server on {HOST}:{PORT}")
    uvicorn.run(app, host=HOST, port=PORT)