from datetime import datetime

from pydantic import BaseModel


class IncedentMeta(BaseModel):
    timestamp: datetime
    title: str


class IncedentData(BaseModel):
    id: int
    title: str
    timestamp: datetime
    filename: str | None
