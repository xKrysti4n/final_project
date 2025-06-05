from pydantic import BaseModel
from typing import List, Optional

class SearchRequest(BaseModel):
    query: Optional[str]
    salary_min: Optional[float]
    salary_max: Optional[float]
    locations: Optional[List[str]]
    job_types: Optional[List[str]]
