from elasticsearch import Elasticsearch
import logging
import time
logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.WARNING,format='[%(levelname)s] %(name)s: %(message)s')

def get_client(max_attempts: int = 3, sleep_time: int = 3) -> Elasticsearch:
    """Tworzenie clienta elasticsearch

    Returns:
        Elasticsearch: Klient Elasticsearch
    """
    for attempt in range(1,max_attempts+1):
        try:
            client = Elasticsearch("http://localhost:9200")
            if client.ping():
                logger.info("Getting Elasticsearch client")
                return client
            else:
                logger.warning(f"Elasticsearch is not responding ({attempt}/{max_attempts})")
                time.sleep(sleep_time)
        except Exception as e:
            logger.warning(f"Failed to connect ({attempt}/{max_attempts})")
            time.sleep(sleep_time)
    raise ConnectionError("Could not connect to Elasticsearch after multiple attempts")
