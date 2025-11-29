from fastapi import APIRouter, HTTPException
from models import AssessmentRequest
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter(prefix="/assessment", tags=["assessment"])

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_MODEL_NAME = 'gemini-2.5-flash-lite'

if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

import json
from datetime import datetime

ASSESSMENT_FILE = "data/assessments.json"

def save_assessment(username, request_data, result_data):
    if not os.path.exists("data"):
        os.makedirs("data")
        
    history = []
    if os.path.exists(ASSESSMENT_FILE):
        try:
            with open(ASSESSMENT_FILE, "r") as f:
                history = json.load(f)
        except:
            history = []
            
    entry = {
        "id": len(history) + 1,
        "username": username,
        "timestamp": datetime.now().isoformat(),
        "request": request_data.dict(),
        "result": result_data
    }
    
    history.append(entry)
    
    with open(ASSESSMENT_FILE, "w") as f:
        json.dump(history, f, indent=4)

@router.post("/generate")
def generate_assessment(request: AssessmentRequest):
    if not GEMINI_API_KEY:
        raise HTTPException(status_code=500, detail="Gemini API Key not configured")
    
    try:
        model = genai.GenerativeModel(GEMINI_MODEL_NAME)
        
        prompt = f"""
        Act as an expert Career Counselor. Analyze the following student profile and provide personalized career recommendations.

        **Student Profile:**
        - **Name:** {request.name}
        - **Qualification:** {request.qualification}
        - **Favorite Subjects:** {request.subjects}
        - **Interests/Hobbies:** {request.interests}
        - **Skills:** {request.skills or "Not specified"}
        - **Preferred Sector:** {request.preferred_sector or "Open to suggestions"}
        - **Preferred Job Role Type:** {request.preferred_role_type or "Any (Private or Government)"}

        **Task:**
        Analyze the profile and return the result strictly in the following JSON format:

        {{
            "profile_analysis": {{
                "strengths": ["Strength 1", "Strength 2", "Strength 3"],
                "potential": "A brief summary of their potential."
            }},
            "recommendations": [
                {{
                    "role": "Job Title 1",
                    "fit_reason": "Why this fits them.",
                    "icon": "Emoji Icon"
                }},
                {{
                    "role": "Job Title 2",
                    "fit_reason": "Why this fits them.",
                    "icon": "Emoji Icon"
                }},
                {{
                    "role": "Job Title 3",
                    "fit_reason": "Why this fits them.",
                    "icon": "Emoji Icon"
                }}
            ],
            "roadmap": {{
                "title": "Roadmap for [Top Recommendation]",
                "steps": [
                    {{ "phase": "Phase 1: Foundation", "details": ["Step 1", "Step 2"] }},
                    {{ "phase": "Phase 2: Skill Building", "details": ["Step 1", "Step 2"] }},
                    {{ "phase": "Phase 3: Career Launch", "details": ["Step 1", "Step 2"] }}
                ]
            }},
            "motivational_note": "A short, encouraging closing remark."
        }}

        Ensure the response is valid JSON and nothing else. Do not use Markdown formatting for the JSON block.
        """
        
        response = model.generate_content(prompt)
        
        # Clean up response to ensure valid JSON
        response_text = response.text.replace("```json", "").replace("```", "").strip()
        
        result_json = json.loads(response_text)
        
        # Save to history
        save_assessment(request.username, request, result_json)
        
        return {"response": result_json}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/history/{username}")
def get_assessment_history(username: str):
    if not os.path.exists(ASSESSMENT_FILE):
        return []
        
    try:
        with open(ASSESSMENT_FILE, "r") as f:
            history = json.load(f)
            
        # Filter by username and sort by timestamp desc
        user_history = [h for h in history if h.get("username") == username]
        user_history.sort(key=lambda x: x["timestamp"], reverse=True)
        
        return user_history
    except Exception as e:
        print(f"Error reading history: {e}")
        return []

@router.delete("/history/{username}")
def clear_assessment_history(username: str):
    if not os.path.exists(ASSESSMENT_FILE):
        return {"message": "History cleared"}
        
    try:
        with open(ASSESSMENT_FILE, "r") as f:
            history = json.load(f)
            
        # Keep entries that DON'T match the username
        new_history = [h for h in history if h.get("username") != username]
        
        with open(ASSESSMENT_FILE, "w") as f:
            json.dump(new_history, f, indent=4)
            
        return {"message": "History cleared successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error clearing history: {str(e)}")
