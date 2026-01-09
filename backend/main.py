from fastapi import FastAPI, Request, HTTPException, Query
from fastapi.responses import PlainTextResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, Dict, Any
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
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
        print("GROQ_API_KEY not set or still default value - using fallback mode")
except Exception as e:
    print(f"Failed to initialize Groq client: {e}")

# Facebook Page Access Token
PAGE_ACCESS_TOKEN = os.getenv("PAGE_ACCESS_TOKEN")

# Lead model
class Lead(BaseModel):
    source: str  # "facebook" or "instagram"
    user_id: str
    comment_text: str
    post_id: str
    timestamp: str
    priority: str = "Normal"
    ai_response: str = ""

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
    print(f"AI Response: {lead.ai_response}")

def send_facebook_reply(comment_id: str, message: str):
    """
    Send a reply to a Facebook comment using the Page Access Token
    """
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
    """
    Analyze comment using Groq API
    Returns: {'ai_response_text': str, 'priority_score': str}
    """
    if not groq_client:
        # Fallback to placeholder if Groq not available
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
        
        # Parse the response
        result_text = response.choices[0].message.content.strip()
        
        # Try to extract JSON from the response
        try:
            # Clean up the response if it has markdown code blocks
            result_text = result_text.replace("```json", "").replace("```", "").strip()
            result_data = json.loads(result_text)
            
            return {
                "ai_response_text": result_data.get("ai_response_text", "Thank you for your interest!"),
                "priority_score": result_data.get("priority_score", "Normal")
            }
        except:
            # If JSON parsing fails, use simple logic
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
        # Fallback
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
        
        # Facebook webhook structure
        for entry in data.get("entry", []):
            for change in entry.get("changes", []):
                if change.get("field") == "feed":
                    value = change.get("value", {})
                    
                    # Extract data
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
        
        # Instagram webhook structure
        for entry in data.get("entry", []):
            for change in entry.get("changes", []):
                if change.get("field") == "comments":
                    value = change.get("value", {})
                    
                    # Extract data
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

# Root route
@app.get("/")
async def root():
    return {
        "status": "Active",
        "service": "AI Agent Backend",
        "version": "1.0.0",
        "groq_connected": groq_client is not None,
        "facebook_token_configured": PAGE_ACCESS_TOKEN and PAGE_ACCESS_TOKEN != "your_page_access_token_here"
    }

# GET webhook route for Facebook/Meta verification
@app.get("/webhook")
async def verify_webhook(
    hub_mode: str = Query(alias="hub.mode"),
    hub_verify_token: str = Query(alias="hub.verify_token"),
    hub_challenge: str = Query(alias="hub.challenge")
):
    """
    Facebook/Meta webhook verification endpoint
    Handles the initial verification challenge from Facebook
    """
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

# POST webhook route to receive data
@app.post("/webhook")
async def receive_webhook(request: Request):
    """
    Receive webhook data from Facebook and Instagram
    Detects source, analyzes with AI, saves to database, and replies
    """
    try:
        # Get the raw body and parse it
        body = await request.body()
        if not body:
            return {"status": "empty", "message": "No data received"}
        
        # Parse JSON
        try:
            data = await request.json()
        except:
            # Fallback: manual parsing
            body_str = body.decode('utf-8')
            if not body_str:
                return {"status": "empty", "message": "Empty body"}
            data = json.loads(body_str)
        
        print(f"Received webhook: {json.dumps(data, indent=2)}")
        
        # Initialize database if needed
        init_leads_database()
        
        # Try to extract from Facebook
        facebook_lead = extract_facebook_comment(data)
        if facebook_lead:
            # Analyze with AI
            ai_result = analyze_comment_with_groq(facebook_lead.comment_text)
            facebook_lead.priority = ai_result["priority_score"]
            facebook_lead.ai_response = ai_result["ai_response_text"]
            
            # Save to database
            save_lead_to_csv(facebook_lead)
            
            # Try to send Facebook reply (if comment_id is available)
            # Note: Facebook webhook structure may need comment_id extraction
            # For now, we'll log the reply that would be sent
            print(f"Would reply to Facebook comment: {facebook_lead.ai_response}")
            
            return {
                "status": "processed",
                "source": "facebook",
                "lead": facebook_lead.model_dump(),
                "ai_analysis": ai_result,
                "reply_sent": False  # Will be True when comment_id is available
            }
        
        # Try to extract from Instagram
        instagram_lead = extract_instagram_comment(data)
        if instagram_lead:
            # Analyze with AI
            ai_result = analyze_comment_with_groq(instagram_lead.comment_text)
            instagram_lead.priority = ai_result["priority_score"]
            instagram_lead.ai_response = ai_result["ai_response_text"]
            
            # Save to database
            save_lead_to_csv(instagram_lead)
            
            print(f"Would reply to Instagram comment: {instagram_lead.ai_response}")
            
            return {
                "status": "processed",
                "source": "instagram",
                "lead": instagram_lead.model_dump(),
                "ai_analysis": ai_result,
                "reply_sent": False
            }
        
        # If neither source matched
        return {
            "status": "ignored",
            "message": "No valid comment data found",
            "data": data
        }
        
    except Exception as e:
        print(f"Error processing webhook: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Error processing webhook: {str(e)}"
        )

# Route to view leads database
@app.get("/leads")
async def get_leads():
    """
    View all leads from the database
    """
    if not os.path.exists(LEADS_CSV_FILE):
        return {"leads": [], "message": "Database file not found"}
    
    leads = []
    with open(LEADS_CSV_FILE, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            leads.append(row)
    
    return {
        "total_leads": len(leads),
        "leads": leads
    }

# Route to manually test Facebook reply
@app.post("/test/facebook-reply")
async def test_facebook_reply(comment_id: str, message: str):
    """
    Test sending a reply to a Facebook comment
    """
    success = send_facebook_reply(comment_id, message)
    return {
        "success": success,
        "comment_id": comment_id,
        "message": message
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)