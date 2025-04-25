from api.views.incedent import router as incedent_router
from api.views.report import router as report_router
from api.views.data import router as data_router

from fastapi import APIRouter


router = APIRouter(prefix='/api')

router.include_router(
    report_router,
)

router.include_router(
    incedent_router,
)

router.include_router(
    data_router
)
