from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.info import router as info_router
from app.api.search import router as search_router
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*", "Content-Type", "Authorization", "Accept", "Origin", "X-Requested-With"],
    expose_headers=["*"],
    max_age=3600,  # Cache preflight requests for 1 hour
)


@app.get("/")
async def root():
    return {"message": "Welcome to the Job Offers API"}

app.include_router(info_router, prefix="/api/v1", tags=["info"])
app.include_router(search_router, prefix="/api/v1", tags=["basic_search"])
