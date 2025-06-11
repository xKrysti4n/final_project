from app.core.get_es_client import get_client
from app.core.config import INDEX_NAME
from sentence_transformers import SentenceTransformer
import numpy as np

model = SentenceTransformer('sentence-transformers/paraphrase-multilingual-mpnet-base-v2')

def searchAiService(request: str):
    client = get_client()
    query_embedding = model.encode(request)
    
    search_query = {
        "query": {
            "function_score": {
                "query": {
                    "multi_match": {
                        "query": request,
                        "fields": ["job_title^3", "job_description^2", "company_name^2", "company_industry"]
                    }
                },
                "boost_mode": "sum",
                "functions": [
                    {
                        "script_score": {
                            "script": {
                                "source": "cosineSimilarity(params.query_vector, 'job_description_embedding') + 1.0",
                                "params": {
                                    "query_vector": query_embedding.tolist()
                                }
                            }
                        },
                        "weight": 2
                    }
                ]
            }
        },
        "size": 20,
        "_source": {
            "excludes": ["job_description_embedding"]
        }
    }

    response = client.search(
        index=INDEX_NAME,
        body=search_query,
        source_excludes=["job_description_embedding"]
    )
    
    return response
