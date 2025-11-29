from fastapi import APIRouter, HTTPException
from models import ChatMessage
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter(prefix="/chat", tags=["chat"])

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_MODEL_NAME = 'gemini-1.5-flash-latest'

if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

@router.post("/message")
def chat_message(chat_msg: ChatMessage):
    if not GEMINI_API_KEY:
        raise HTTPException(status_code=500, detail="Gemini API Key not configured")
    
    try:
        model = genai.GenerativeModel(GEMINI_MODEL_NAME)
        # In a real app, we'd manage chat history/sessions. 
        # For now, we'll just send the single message or a simplified context.
        response = model.generate_content(chat_msg.message)
        return {"response": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
