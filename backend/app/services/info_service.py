from app.core.get_es_client import get_client
from fastapi import HTTPException
from app.schemas.info import InfoResponse
def get_info() -> InfoResponse:
    try:
        client = get_client()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error connecting to Elasticsearch: {str(e)}")
    info = client.info().body
    return InfoResponse(info_elastic=info)

