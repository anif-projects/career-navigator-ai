from fastapi import APIRouter, UploadFile, File, HTTPException, Form
import shutil
import os
from pathlib import Path

router = APIRouter(prefix="/upload", tags=["upload"])

UPLOAD_DIR = "data/resumes"
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB
ALLOWED_TYPES = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
]

# Ensure upload directory exists
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

@router.post("/resume")
async def upload_resume(file: UploadFile = File(...), username: str = Form(...)):
    # Validate file type
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(status_code=400, detail="Invalid file type. Only PDF and DOCX are allowed.")

    # Validate file size (approximate, as we read chunks)
    # Note: For strict size validation, we might need to read the file or check Content-Length header
    # Here we will check after saving or during read if needed, but for simplicity relying on client-side + basic check
    
    file_path = Path(UPLOAD_DIR) / f"{username}_{file.filename}"
    
    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        # Check size after saving
        if os.path.getsize(file_path) > MAX_FILE_SIZE:
            os.remove(file_path)
            raise HTTPException(status_code=400, detail="File size exceeds 5MB limit.")
            
        return {"message": "Resume uploaded successfully", "filename": file.filename}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Could not save file: {str(e)}")
