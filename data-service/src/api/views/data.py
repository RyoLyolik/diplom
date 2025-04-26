
from typing import Annotated

from providers.data import get_data_service
from schemes.data import DataResponse
from services.data import DataService

from fastapi import APIRouter, Depends


router = APIRouter(
    prefix='/data',
    responses={
        401: {},
        404: {},
    },
    tags=['data']
)


@router.get('/')
async def get_data(
    data_service: Annotated[DataService, Depends(get_data_service)],
    parameter: str,
    position: int,
) -> DataResponse:
    data = await data_service.get(parameter, position)
    return data
