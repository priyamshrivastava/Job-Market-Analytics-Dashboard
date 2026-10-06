from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.services.analytics_service import AnalyticsService

router = APIRouter(prefix='/analytics', tags=['analytics'])


@router.get('/overview')
def overview(db: Session = Depends(get_db)):
    return AnalyticsService(db).overview()


@router.get('/top-skills')
def top_skills(db: Session = Depends(get_db)):
    return AnalyticsService(db).top_skills(limit=10)


@router.get('/top-locations')
def top_locations(db: Session = Depends(get_db)):
    return AnalyticsService(db).top_locations(limit=10)


@router.get('/job-trends')
def job_trends(db: Session = Depends(get_db)):
    return AnalyticsService(db).job_trends()


@router.get('/salary-distribution')
def salary_distribution(db: Session = Depends(get_db)):
    return AnalyticsService(db).salary_distribution()


@router.get('/companies')
def companies(db: Session = Depends(get_db)):
    return AnalyticsService(db).companies(limit=10)


@router.get('/experience-levels')
def experience_levels(db: Session = Depends(get_db)):
    return AnalyticsService(db).experience_levels()


@router.get('/employment-types')
def employment_types(db: Session = Depends(get_db)):
    return AnalyticsService(db).employment_types()
