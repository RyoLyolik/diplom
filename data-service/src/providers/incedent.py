from typing import Annotated

from providers.db import get_async_session
from repositories.incedent import IncedentRepository
from services.incedent import IncedentService

from fastapi import Depends
from minio import Minio
from sqlalchemy.ext.asyncio import AsyncSession


def get_incedent_storage():
    return Minio(
        endpoint='minio:9000',
        access_key='minioadmin',
        secret_key='minioadmin',
        secure=False,
    )


def get_incedent_service(
    session: Annotated[AsyncSession, Depends(get_async_session)],
):
    client = get_incedent_storage()
    incedent_repo = IncedentRepository(client, session)
    service = IncedentService(incedent_repo)
    return service
