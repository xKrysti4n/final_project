from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.info import router as info_router
from app.api.search_title import router as search_title_router

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)


@app.get("/")
async def root():
    return {"message": "Welcome to the Job Offers API"}

app.include_router(info_router, prefix="/api/v1", tags=["info"])
app.include_router(search_title_router, prefix="/api/v1", tags=["search_title"])
