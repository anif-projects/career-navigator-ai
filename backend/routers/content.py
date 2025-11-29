from fastapi import APIRouter

router = APIRouter(prefix="/content", tags=["content"])

@router.get("/primary-education")
def get_primary_education():
    return {
        "title": "Primary Education",
        "description": "Foundation of your learning journey.",
        "content": "Details about primary education..." # Placeholder, would migrate actual content
    }

# Add other endpoints as needed
