from fastapi import APIRouter, HTTPException
from app.schemas.searchrequest import SearchRequest
from app.services.job_deatil import job_details


router = APIRouter()

@router.post("/job_detail", description="Return job details")
async def job_deatil_api(job_id: int):
    return job_details(job_id)
