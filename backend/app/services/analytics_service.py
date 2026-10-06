from app.services.job_service import JobService


class AnalyticsService:
    def __init__(self, db):
        self.service = JobService(db)

    def overview(self):
        return self.service.get_overview()

    def top_skills(self, limit=10):
        return self.service.get_top_skills(limit)

    def top_locations(self, limit=10):
        return self.service.get_top_locations(limit)

    def job_trends(self):
        return self.service.get_job_trends()

    def salary_distribution(self):
        return self.service.get_salary_distribution()

    def companies(self, limit=10):
        return self.service.get_company_counts(limit)

    def experience_levels(self):
        return self.service.get_experience_levels()

    def employment_types(self):
        return self.service.get_employment_types()
