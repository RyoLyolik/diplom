import logging

from contextlib import asynccontextmanager

from sqlalchemy import text

from providers.db import get_async_engine, get_async_session

import uvicorn

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import ORJSONResponse
from sqlalchemy.ext.asyncio import AsyncSession


async def prepare():
    async for session in get_async_session():
        session: AsyncSession
        query = 'DROP TABLE IF EXISTS incedent;'
        await session.execute(text(query))
        query = '''
CREATE TABLE incedent (
    incedent_id SERIAL PRIMARY KEY,
    timestamp TIMESTAMP,
    title TEXT,
    filename TEXT NULL,
    ext TEXT NULL
);
'''
        await session.execute(text(query))
    print('INCEDENT RELATION CREATED')


@asynccontextmanager
async def lifespan(app: FastAPI):
    engine = get_async_engine()

    await prepare()

    yield

    await engine.dispose()


def create_app() -> FastAPI:
    from api.router import router

    app = FastAPI(
        default_response_class=ORJSONResponse,
        lifespan=lifespan,
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=['*'],
        allow_credentials=True,
        allow_methods=['*'],
        allow_headers=['*'],
    )

    app.include_router(
        router,
    )

    return app


app = create_app()

if __name__ == '__main__':
    from core.config import settings

    logging.basicConfig(format=settings.logging.log_format)
    uvicorn.run(
        'run:app',
        host=settings.app.host,
        port=settings.app.port,
        workers=settings.app.workers,
        reload=True,
    )
