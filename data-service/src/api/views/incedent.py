import os
import tempfile

from datetime import datetime
from typing import Annotated
from uuid import uuid4

from providers.incedent import get_incedent_service
from schemes.incedent import IncedentMeta
from services.incedent import IncedentService

from fastapi import APIRouter, BackgroundTasks, Depends, File, UploadFile
from fastapi.responses import FileResponse


router = APIRouter(
    prefix='/incedent',
    tags=['auth'],
    responses={
        401: {},
        404: {},
    },
)


def delete_file(file_path: str):
    os.unlink(file_path)


@router.get('/')
async def download(
    incedent_service: Annotated[IncedentService, Depends(get_incedent_service)],
    id: int,
    background_tasks: BackgroundTasks,
):
    tmp_path = ''
    fn, iodata = await incedent_service.get(id)
    with tempfile.NamedTemporaryFile(delete=False) as tmp:
        tmp.write(iodata)
        tmp_path = tmp.name
    response = FileResponse(
        tmp_path, 200, media_type="application/octet-stream",
        filename=fn
    )
    background_tasks.add_task(delete_file, tmp_path)
    return response


@router.get('/list/')
async def list_(
    incedent_service: Annotated[IncedentService, Depends(get_incedent_service)]
):
    return await incedent_service.list()


@router.post('/')
async def create_incedent(
    timestamp: datetime,
    title: str,
    incedent_service: Annotated[IncedentService, Depends(get_incedent_service)],
    file: UploadFile | None = File(None),
):
    meta = IncedentMeta.model_validate(dict(timestamp=timestamp, title=title))
    fp = None
    if file is not None:
        ext = file.filename.split('.')[-1]
        fp = uuid4().hex + '.' + ext
        with open(f'./{fp}', mode='wb') as f:
            data = await file.read()
            f.write(data)
    await incedent_service.add(meta, fp)
    try:
        os.remove(fp)
    except Exception:
        pass


@router.patch('/')
async def attach_incedent_file(
    id: int,
    incedent_service: Annotated[IncedentService, Depends(get_incedent_service)],
    file: UploadFile = File(...),
):
    ext = file.filename.split('.')[-1]
    fp = uuid4().hex + '.' + ext
    with open(f'./{fp}', mode='wb') as f:
        data = await file.read()
        f.write(data)
    await incedent_service.update_file(id, fp)
    try:
        os.remove(fp)
    except Exception:
        pass
