from fastapi import APIRouter
from app.services.info_service import get_info
from app.schemas.info import InfoResponse
router = APIRouter()

@router.get("/info",response_model=InfoResponse, tags=["info_about_elasticsearch"])
async def info():
    return get_info()
