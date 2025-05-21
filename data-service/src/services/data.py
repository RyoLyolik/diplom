from repositories.data import DataRepository
from schemes.data import DataResponse


class DataService:
    def __init__(self, data_repo: DataRepository):
        self.data_repo = data_repo

    async def get(self, equipment: str, position: int) -> DataResponse:
        return await self.data_repo.get_by_filter(equipment, position + 1)
