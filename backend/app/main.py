from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.models.job import Job  # noqa: F401
from app.routes.analytics import router as analytics_router
from app.routes.jobs import router as jobs_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title='JobPulse API', version='1.0.0')

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

app.include_router(jobs_router, prefix='/api')
app.include_router(analytics_router, prefix='/api')


@app.get('/api/health')
def health_check():
    return {'status': 'ok', 'service': 'jobpulse-api'}
