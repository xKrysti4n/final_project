from app.core.get_es_client import get_client
from app.schemas.info import InfoResponse
from fastapi import HTTPException
def get_info() -> InfoResponse:
    """
    Retrieve information about the Elasticsearch cluster.

    Returns:
        dict: Information about the Elasticsearch cluster.
    """
    try:
        client = get_client()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error connecting to Elasticsearch: {str(e)}")
    info = client.info().body
    return InfoResponse(info=info)

