
import os

from datetime import timedelta
from uuid import uuid4

from repositories.data import DataRepository
from repositories.incedent import IncedentRepository
from schemes.data import FoundData
from schemes.report import GenerateRequest

import matplotlib.pyplot as plt

from matplotlib.backends.backend_pdf import PdfPages
from schemes.incedent import IncedentData, IncedentMeta


class IncedentService:
    def __init__(self, incedent_repo: IncedentRepository):
        self.incedent_repo = incedent_repo

    async def get(self, id):
        return await self.incedent_repo.get(id)

    async def list(self):
        res = await self.incedent_repo.list()
        return res

    async def update_file(self, id, fp):
        await self.incedent_repo.attach_file(id, fp)

    async def add(self, meta: IncedentMeta, fp=None):
        await self.incedent_repo.add(meta, fp)
