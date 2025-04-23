
from datetime import timedelta
from uuid import uuid4

from schemes.incedent import IncedentData, IncedentMeta

from minio import Minio
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession


class IncedentRepository:
    def __init__(self, client: Minio, session: AsyncSession):
        self.client = client
        self.bucket = 'incedents'
        if not self.client.bucket_exists(self.bucket):
            self.client.make_bucket(self.bucket)
        self.session = session

    async def add(self, meta: IncedentMeta, fp=None):
        filename = 'NULL'
        ext = 'NULL'
        if fp is not None:
            ext = f"'{fp.split('.')[-1]}'"
            filename = uuid4().hex
            self.__fadd(fp, filename)
            filename = f"'{filename}'"
        query = f'''
INSERT INTO incedent (timestamp, title, filename, ext) VALUES ('{meta.timestamp}', '{meta.title}', {filename}, {ext});
'''
        await self.session.execute(text(query))

    def __fadd(self, fp, object_name):
        self.client.fput_object(
            bucket_name=self.bucket,
            object_name=object_name,
            file_path=fp
        )

    async def attach_file(self, id, fp):
        filename = uuid4().hex
        ext = fp.split('.')[-1]
        self.__fadd(fp, filename)
        query = f'''
UPDATE incedent
SET filename = '{filename}', ext = '{ext}'
WHERE incedent_id={id};
'''
        await self.session.execute(text(query))

    async def list(self) -> list[IncedentData]:
        query = '''
SELECT incedent_id, title, filename, timestamp FROM incedent
ORDER BY timestamp;
'''
        result = await self.session.execute(text(query))
        rows = result.all()
        ans = []
        for row in rows:
            idata = IncedentData.model_validate(
                dict(id=row[0],
                title=row[1],
                filename=row[2],
                timestamp=row[3],)
            )
            idata.timestamp += timedelta(hours=3)
            ans.append(idata)
        return ans

    async def get(self, id):
        query = f'''
SELECT incedent_id, title, filename, timestamp, ext FROM incedent
WHERE incedent_id={id};
'''
        result = await self.session.execute(text(query))
        if not result:
            return
        row = result.all()[0]
        object_name = row[2]
        filename = row[1] + '.' + row[4]
        return filename, self.client.get_object(self.bucket, object_name).data
