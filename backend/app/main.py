from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.info import router as info_router
from app.api.search import router as search_router
from app.api.job_detail import router as job_deatil_router
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
    
)


@app.get("/")
async def root():
    return {"message": "Welcome to the Job Offers API"}

app.include_router(info_router, prefix="/api/v1", tags=["info"])
app.include_router(search_router, prefix="/api/v1", tags=["search"])
app.include_router(job_deatil_router, prefix="/api/v1", tags=["job detail"])
