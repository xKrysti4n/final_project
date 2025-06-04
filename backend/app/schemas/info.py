from pydantic import BaseModel

class InfoResponse(BaseModel):
    info_elastic: dict

