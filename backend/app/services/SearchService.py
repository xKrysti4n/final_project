from app.core.get_es_client import get_client
from app.core.config import INDEX_NAME
from app.schemas.searchrequest import SearchRequest

def SearchService(request: SearchRequest):
    client = get_client()
    query = {
        "query": {
            "bool": {
                "must": [],
                "should": [],
                "filter": []
            }
        },

        "sort": [
            {"_score": {"order": "desc"}}
        ],
        "size": 30

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
                "job_description":{
                    "query": request.query,
                }
            }
        })
    if request.locations and request.locations != ['']:
        query["query"]["bool"]["must"].append({
            "terms": {
                "job_location.keyword": request.locations
            }
        })

    remote_mapping = {
        "Zdalnie": True,
        "Pełny etat": False
    }
    
    if request.job_types:
        if set(remote_mapping.keys()).issubset(set(request.job_types)):
            pass  
        else:
            remote_conditions = []
            for job_type in request.job_types:
                if job_type in remote_mapping:
                    remote_conditions.append({
                        "term": {
                            "is_remote": remote_mapping[job_type]
                        }
                    })
            if remote_conditions:
                query["query"]["bool"]["must"].extend(remote_conditions)
    
    # # TODO Zrobić to
    # if request.salary_min:
    #     query['query']['bool']['must'].append({
    #         "range":{
    #             "salary":{
    #                 "gte": request.salary_min
    #             } 
    #         }
    #     })
    
    filter = ['hits.hits._score,hits.hits._source.job_title,hits.hits._source.job_description,hits.hits._source.job_location,hits.hits._source.is_remote,hits.hits._source.company_name,hits.hits._source.posted_date,hits.hits._source.job_id,hits.total,hits.hits._source.url']
    search_response = client.search(index=INDEX_NAME, body=query,filter_path=filter)
    return search_response
