from app.core.config import INDEX_NAME
from fastapi import APIRouter
from app.schemas.newJob import NewJobOffer
from app.services.indexNewJob import index_new_job
router = APIRouter()

@router.post("/new", description="Index new offer")
async def indexJob(new_job: NewJobOffer) -> None:
    index_new_job(new_job)
