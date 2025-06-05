from pydantic import BaseModel


class JobDetailRequest(BaseModel):
    job_id: int
