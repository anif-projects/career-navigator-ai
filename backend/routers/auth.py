from fastapi import APIRouter, HTTPException
from models import UserLogin, UserRegister
import pandas as pd
import hashlib
import os

router = APIRouter(prefix="/auth", tags=["auth"])

USER_FILE = "data/users.csv"

# Ensure CSV exists (reusing logic from original utils)
def init_user_file():
    if not os.path.exists(USER_FILE):
        os.makedirs(os.path.dirname(USER_FILE), exist_ok=True)
        df = pd.DataFrame(columns=["username", "password"])
        df.to_csv(USER_FILE, index=False)

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

@router.post("/register")
def register(user: UserRegister):
    init_user_file()
    df = pd.read_csv(USER_FILE)

    if user.username in df['username'].values:
        raise HTTPException(status_code=400, detail="Username already exists")

    new_user = pd.DataFrame([[user.username, hash_password(user.password)]], columns=["username", "password"])
    df = pd.concat([df, new_user], ignore_index=True)
    df.to_csv(USER_FILE, index=False)
    
    return {"message": "Registration successful"}

@router.post("/login")
def login(user: UserLogin):
    init_user_file()
    df = pd.read_csv(USER_FILE)

    hashed = hash_password(user.password)
    user_record = df[(df['username'] == user.username) & (df['password'] == hashed)]

    if not user_record.empty:
        return {"message": "Login successful", "username": user.username}
    
    raise HTTPException(status_code=401, detail="Invalid username or password")
