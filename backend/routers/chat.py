from fastapi import APIRouter, HTTPException
from models import ChatRequest
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter(prefix="/chat", tags=["chat"])

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_MODEL_NAME = 'gemini-2.5-flash-lite'

if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

from models import ChatRequest

# ... (imports)

@router.post("/message")
def chat_message(chat_req: ChatRequest):
    if not GEMINI_API_KEY:
        raise HTTPException(status_code=500, detail="Gemini API Key not configured")
    
    try:
        system_instruction = "You are a helpful AI Career Assistant."
        if chat_req.username:
            system_instruction += f" You are chatting with {chat_req.username}. Always address them by name when appropriate."
            
        model = genai.GenerativeModel(GEMINI_MODEL_NAME, system_instruction=system_instruction)
        
        # Convert Pydantic models to dicts for Gemini
        history_data = [{"role": msg.role, "parts": msg.parts} for msg in chat_req.history]
        
        chat = model.start_chat(history=history_data)
        response = chat.send_message(chat_req.message)
        
        return {"response": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
