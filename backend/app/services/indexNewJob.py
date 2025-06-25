from app.core.get_es_client import get_client
from app.schemas.newJob import NewJobOffer
from app.core.config import INDEX_NAME

def index_new_job(new_job: NewJobOffer) -> dict:
    new_job_dict = new_job.model_dump()
    es = get_client()
    index_name = INDEX_NAME
    response = es.index(index=index_name, body=new_job_dict)
    print(response.body)
    return response.body
