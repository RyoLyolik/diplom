
import os

from datetime import timedelta
from uuid import uuid4

from repositories.data import DataRepository
from repositories.incident import incidentRepository
from schemes.data import FoundData
from schemes.report import GenerateRequest

import matplotlib.pyplot as plt

from matplotlib.backends.backend_pdf import PdfPages
from schemes.incident import incidentData, incidentMeta


class incidentService:
    def __init__(self, incident_repo: incidentRepository):
        self.incident_repo = incident_repo

    async def get(self, id):
        return await self.incident_repo.get(id)

    async def list(self):
        res = await self.incident_repo.list()
        return res

    async def update_file(self, id, fp):
        await self.incident_repo.attach_file(id, fp)

    async def add(self, meta: incidentMeta, fp=None):
        await self.incident_repo.add(meta, fp)
