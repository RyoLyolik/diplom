from datetime import datetime

from pydantic import BaseModel


class incidentMeta(BaseModel):
    timestamp: datetime
    title: str


class incidentData(BaseModel):
    id: int
    title: str
    timestamp: datetime
    filename: str | None
