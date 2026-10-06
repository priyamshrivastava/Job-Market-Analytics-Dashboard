from sqlalchemy import Date, DateTime, Float, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class Job(Base):
    __tablename__ = 'jobs'

    job_id: Mapped[str] = mapped_column(String(120), primary_key=True)
    job_title: Mapped[str] = mapped_column(String(255), index=True, nullable=False)
    company: Mapped[str] = mapped_column(String(255), index=True, nullable=False)
    location: Mapped[str] = mapped_column(String(255), index=True, nullable=False)
    country: Mapped[str] = mapped_column(String(120), default='US')
    employment_type: Mapped[str] = mapped_column(String(80), nullable=True)
    experience_level: Mapped[str] = mapped_column(String(80), nullable=True)
    salary_min: Mapped[float | None] = mapped_column(Float, nullable=True)
    salary_max: Mapped[float | None] = mapped_column(Float, nullable=True)
    currency: Mapped[str] = mapped_column(String(20), default='USD')
    skills: Mapped[str | None] = mapped_column(Text, nullable=True)
    posted_date: Mapped[str] = mapped_column(Date, index=True, nullable=False)
    remote_type: Mapped[str] = mapped_column(String(80), nullable=True)
    industry: Mapped[str | None] = mapped_column(String(200), nullable=True)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    created_at: Mapped[str] = mapped_column(DateTime, server_default=func.now(), nullable=False)
