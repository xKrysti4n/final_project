from pydantic import BaseModel

class InfoResponse(BaseModel):
    info_about_elasticsearch_client: dict

