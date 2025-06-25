from app.core.config import INDEX_NAME,ANALYZER
from app.core.get_es_client import get_client
import json
from elasticsearch.helpers import bulk
from elasticsearch import Elasticsearch, exceptions
from logging import getLogger
logger = getLogger("INDEXING_OFFERS")
logger.setLevel("INFO")

"""
This module is responsible for indexing offers into Elasticsearch.
It contains functions to create an index and bulk index documents.
"""

def index_data(documents: list[dict]) -> None:
    client = get_client()
    try:
        _create_index(client)
        _bulk_index(client, documents)
    except exceptions.ConnectionError as e:
        logger.error(f"Connection error: {e}")

def _create_index(client: Elasticsearch) -> None:
    client.indices.delete(index=INDEX_NAME, ignore_unavailable=True)
    client.indices.create(index=INDEX_NAME, body=ANALYZER)
    logger.info(f"Index '{INDEX_NAME}' created successfully.")


def _bulk_index(client: Elasticsearch, documents: list[dict]) -> None:
    actions = [
        {
            "_index": INDEX_NAME,
            "_source": doc
        }
        for doc in documents
    ]
    bulk(client, actions)
    logger.info(f"Bulk indexed {len(actions)} documents into '{INDEX_NAME}'.")

with open("app/utils/oferty.json") as data:
    data = json.load(data)

if __name__ == "__main__":
    index_data(documents=data)
