from fastapi import APIRouter, HTTPException
from app.schemas.searchrequest import SearchRequest
from app.services.SearchService import SearchService


router = APIRouter()

@router.post("/search", description="Perform a basic search in Elasticsearch")
async def search(search_request: SearchRequest):
    try:
        result =  SearchService(search_request)
        return result
    except Exception as e:
        raise HTTPException(status_code=503,detail=str(e))

