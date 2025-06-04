from fastapi import APIRouter
from app.services.info_service import get_info
router = APIRouter()
from app.schemas.info import InfoResponse

@router.get("/info", response_model=InfoResponse,description="Get information about the application")
async def info():
    return get_info()
