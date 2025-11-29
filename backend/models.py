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
