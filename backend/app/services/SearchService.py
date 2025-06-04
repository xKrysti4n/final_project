from app.core.get_es_client import get_client
from app.core.config import INDEX_NAME
from app.schemas.searchrequest import SearchRequest
from pprint import pprint
import json
def SearchService(request: SearchRequest):
    client = get_client()
    query = {
        "query": {
            "bool": {
                "must": [],
                "should": []
            }
        },

        "sort": [
            {"_score": {"order": "desc"}}
        ],
        "size": 20

    }
    if request.query:
        query["query"]["bool"]["must"].append({
            "match": {
                "job_title":{
                    "query": request.query,
                }
            },
        })
        query["query"]["bool"]["should"].append({
            "match": {
                "job_desciption":{
                    "query": request.query
                }
            }
        })
    if request.locations and request.locations != ['']:
        query["query"]["bool"]["must"].append({
            "terms": {
                "job_location.keyword": request.locations
            }
        })
    if request.job_types == ["Zdalnie"]:
        query["query"]["bool"]["must"].append({
            "term": {
                "is_remote": True
            }
        })

    search_response = client.search(index=INDEX_NAME, body=query,filter_path=['hits.hits._score,hits.hits._source.job_title,hits.hits._source.job_description,hits.hits._source.is_remote'])
    return search_response
