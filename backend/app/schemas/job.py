from datetime import date
from typing import Optional

from pydantic import BaseModel


class JobBase(BaseModel):
    job_id: str
    job_title: str
    company: str
    location: str
    country: Optional[str] = None
    employment_type: Optional[str] = None
    experience_level: Optional[str] = None
    salary_min: Optional[float] = None
    salary_max: Optional[float] = None
    currency: Optional[str] = None
    skills: Optional[str] = None
    posted_date: date
    remote_type: Optional[str] = None
    industry: Optional[str] = None
    description: Optional[str] = None


class JobRead(JobBase):
    class Config:
        from_attributes = True


class OverviewResponse(BaseModel):
    total_jobs: int
    active_companies: int
    remote_jobs: int
    average_salary: float
    date_range: Optional[str] = None


class MetricEntry(BaseModel):
    name: str
    value: float | int


class ErrorResponse(BaseModel):
    detail: str
