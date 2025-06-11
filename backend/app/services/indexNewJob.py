from app.core.get_es_client import get_client
from app.schemas.newJob import NewJobOffer
from app.core.config import INDEX_NAME
import json

def index_new_job(new_job: NewJobOffer) -> None:
    new_job_json = new_job.model_dump_json()
    es = get_client()
    index_name = INDEX_NAME
    es.index(index=index_name, body=new_job_json)
    new_job_dict = json.loads(new_job_json)
    print(f"Debug - Full job data: {new_job_dict}")  # Debugging the full structure
    print(f"Indexed new job offer: {new_job_dict.get('title', 'No title available')}")  # Using get() with default value
