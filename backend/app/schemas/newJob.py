from datetime import date
from pydantic import BaseModel
import uuid


class NewJobOffer(BaseModel):
    job_title: str
    url: str
    posted_date: date = date.today()
    job_description: str
    company_name: str
    is_remote: bool
    job_id: int = int(str(uuid.uuid4().int)[:8])

