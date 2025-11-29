from pydantic import BaseModel

class UserLogin(BaseModel):
    username: str
    password: str

class UserRegister(BaseModel):
    username: str
    password: str

class Message(BaseModel):
    role: str
    parts: list[str] | str

class ChatRequest(BaseModel):
    history: list[Message]
    message: str
    username: str | None = None

class AssessmentRequest(BaseModel):
    name: str
    username: str
    qualification: str
    subjects: str
    interests: str
    skills: str | None = None
    preferred_sector: str | None = None
    preferred_role_type: str | None = None
