from typing import Annotated

from providers.db import get_async_session
from repositories.incident import incidentRepository
from services.incident import incidentService

from fastapi import Depends
from minio import Minio
from sqlalchemy.ext.asyncio import AsyncSession


def get_incident_storage():
    return Minio(
        endpoint='minio:9000',
        access_key='minioadmin',
        secret_key='minioadmin',
        secure=False,
    )


def get_incident_service(
    session: Annotated[AsyncSession, Depends(get_async_session)],
):
    client = get_incident_storage()
    incident_repo = incidentRepository(client, session)
    service = incidentService(incident_repo)
    return service
