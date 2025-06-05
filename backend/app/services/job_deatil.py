import pprint
from app.core.get_es_client import get_client
from app.core.config import INDEX_NAME
from pprint import pprint

def job_details(job_id: int) -> dict:
    client = get_client()

    job_detail_response = client.search(index=INDEX_NAME,
    body={
        "query":{
            "term":{
                "job_id": job_id
            }
        },
    },size=1,
    source=["job_title","job_description","url","job_location","posted_date"])
    return job_detail_response
