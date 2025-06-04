from pydantic import BaseModel
from typing import List, Optional

class SearchRequest(BaseModel):
    query: Optional[str] = None
    salary_min: Optional[float] = None
    salary_max: Optional[float] = None
    locations: Optional[List[str]] = None
    job_types: Optional[List[str]] = None
