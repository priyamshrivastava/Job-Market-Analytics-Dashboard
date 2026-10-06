from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.job import JobRead
from app.services.job_service import JobService

router = APIRouter(prefix='/jobs', tags=['jobs'])


@router.get('', response_model=dict)
def list_jobs(
    location: str | None = None,
    job_title: str | None = None,
    experience_level: str | None = None,
    employment_type: str | None = None,
    remote_type: str | None = None,
    start_date: str | None = None,
    end_date: str | None = None,
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=200),
    db: Session = Depends(get_db),
):
    service = JobService(db)
    offset = (page - 1) * page_size
    total, jobs = service.get_jobs(
        location=location,
        job_title=job_title,
        experience_level=experience_level,
        employment_type=employment_type,
        remote_type=remote_type,
        start_date=start_date,
        end_date=end_date,
        limit=page_size,
        offset=offset,
    )
    return {
        'total': total,
        'page': page,
        'page_size': page_size,
        'items': [JobRead.model_validate(job).model_dump() for job in jobs],
    }


@router.get('/{job_id}', response_model=JobRead)
def get_job(job_id: str, db: Session = Depends(get_db)):
    job = JobService(db).get_job(job_id)
    if not job:
        raise HTTPException(status_code=404, detail='Job not found')
    return job
