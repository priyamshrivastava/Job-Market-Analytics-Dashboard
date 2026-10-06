import math

from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.job import Job


class JobService:
    def __init__(self, db: Session):
        self.db = db

    def get_jobs(self, location=None, job_title=None, experience_level=None, employment_type=None, remote_type=None, start_date=None, end_date=None, limit=50, offset=0):
        query = self.db.query(Job)
        filters = []

        if location:
            filters.append(Job.location.ilike(f'%{location}%'))
        if job_title:
            filters.append(Job.job_title.ilike(f'%{job_title}%'))
        if experience_level:
            filters.append(Job.experience_level.ilike(f'%{experience_level}%'))
        if employment_type:
            filters.append(Job.employment_type.ilike(f'%{employment_type}%'))
        if remote_type:
            filters.append(Job.remote_type.ilike(f'%{remote_type}%'))
        if start_date:
            filters.append(Job.posted_date >= start_date)
        if end_date:
            filters.append(Job.posted_date <= end_date)

        if filters:
            query = query.filter(*filters)

        total = query.count()
        jobs = query.order_by(Job.posted_date.desc(), Job.job_title.asc()).offset(offset).limit(limit).all()
        return total, jobs

    def get_job(self, job_id: str):
        return self.db.query(Job).filter(Job.job_id == job_id).first()

    def get_overview(self):
        salary_rows = self.db.query(Job.salary_min, Job.salary_max).filter(
            Job.salary_min.is_not(None),
            Job.salary_max.is_not(None),
        ).all()
        salary_values = []
        for salary_min, salary_max in salary_rows:
            try:
                min_value = float(salary_min)
                max_value = float(salary_max)
                if math.isfinite(min_value) and math.isfinite(max_value):
                    salary_values.append((min_value + max_value) / 2)
            except (TypeError, ValueError):
                continue
        avg_salary = sum(salary_values) / len(salary_values) if salary_values else 0

        remote_jobs = self.db.query(func.count(Job.job_id)).filter(Job.remote_type.ilike('%remote%')).scalar() or 0
        total_jobs = self.db.query(func.count(Job.job_id)).scalar() or 0
        active_companies = self.db.query(func.count(func.distinct(Job.company))).scalar() or 0
        earliest = self.db.query(func.min(Job.posted_date)).scalar()
        latest = self.db.query(func.max(Job.posted_date)).scalar()
        date_range = f'{earliest} to {latest}' if earliest and latest else None
        return {
            'total_jobs': total_jobs,
            'active_companies': active_companies,
            'remote_jobs': remote_jobs,
            'average_salary': round(float(avg_salary), 2),
            'date_range': date_range,
        }

    def get_top_skills(self, limit: int = 10):
        rows = self.db.query(Job.skills).filter(Job.skills.is_not(None)).all()
        counts = {}
        for row in rows:
            for skill in str(row[0]).split(','):
                skill_name = skill.strip()
                if skill_name:
                    counts[skill_name] = counts.get(skill_name, 0) + 1
        return [
            {'name': name, 'value': value}
            for name, value in sorted(counts.items(), key=lambda item: item[1], reverse=True)[:limit]
        ]

    def get_top_locations(self, limit: int = 10):
        return [
            {'name': location, 'value': count}
            for location, count in self.db.query(Job.location, func.count(Job.job_id))
            .group_by(Job.location)
            .order_by(func.count(Job.job_id).desc())
            .limit(limit)
            .all()
        ]

    def get_company_counts(self, limit: int = 10):
        return [
            {'name': company, 'value': count}
            for company, count in self.db.query(Job.company, func.count(Job.job_id))
            .group_by(Job.company)
            .order_by(func.count(Job.job_id).desc())
            .limit(limit)
            .all()
        ]

    def get_job_trends(self):
        return [
            {'month': month, 'value': count}
            for month, count in self.db.query(func.to_char(Job.posted_date, 'YYYY-MM'), func.count(Job.job_id))
            .group_by(func.to_char(Job.posted_date, 'YYYY-MM'))
            .order_by(func.to_char(Job.posted_date, 'YYYY-MM'))
            .all()
        ]

    def get_salary_distribution(self):
        rows = self.db.query(Job).filter(Job.salary_min.is_not(None)).all()
        buckets = [
            {'name': '0k-80k', 'low': 0, 'high': 80000},
            {'name': '80k-120k', 'low': 80000, 'high': 120000},
            {'name': '120k-160k', 'low': 120000, 'high': 160000},
            {'name': '160k-220k', 'low': 160000, 'high': 220000},
            {'name': '220k+', 'low': 220000, 'high': 500000},
        ]
        result = []
        for bucket in buckets:
            count = 0
            for job in rows:
                try:
                    avg_salary = ((float(job.salary_min) if job.salary_min is not None else 0) + (float(job.salary_max) if job.salary_max is not None else 0)) / 2
                    if math.isfinite(avg_salary) and bucket['low'] <= avg_salary < bucket['high']:
                        count += 1
                except (TypeError, ValueError):
                    continue
            result.append({'name': bucket['name'], 'value': count})
        return result

    def get_experience_levels(self):
        return [
            {'name': level, 'value': count}
            for level, count in self.db.query(Job.experience_level, func.count(Job.job_id))
            .group_by(Job.experience_level)
            .order_by(func.count(Job.job_id).desc())
            .all()
        ]

    def get_employment_types(self):
        return [
            {'name': emp_type, 'value': count}
            for emp_type, count in self.db.query(Job.employment_type, func.count(Job.job_id))
            .group_by(Job.employment_type)
            .order_by(func.count(Job.job_id).desc())
            .all()
        ]
