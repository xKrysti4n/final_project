import uuid
from app.core.config import INDEX_NAME
from app.services.indexNewJob import index_new_job
from app.schemas.newJob import NewJobOffer
from datetime import date
from app.core.get_es_client import get_client

def test_index_dummy_job():
    job = NewJobOffer(job_title="Dummy Title Job",
    url="https://example.pl",
    posted_date=date.today(),
    job_description="lorem lorem lorem lorem",
    company_name="Dummy company name",
    is_remote=True,
    job_id=int(str(uuid.uuid4().int)[:8]))
    response = index_new_job(job)
    assert response['result'] == 'created'
    client = get_client()
    client.delete(index=INDEX_NAME,id=response['_id'])
