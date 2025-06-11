from fastapi import APIRouter
from app.services.searchAiService import searchAiService
from pydantic import BaseModel

router = APIRouter()

class SearchAIRequest(BaseModel):
    query: str

@router.post("/searchAI", description="Search by embeddings")
async def searchAI(request: SearchAIRequest):
    return searchAiService(request.query)
    