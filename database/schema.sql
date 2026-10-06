CREATE TABLE IF NOT EXISTS jobs (
    job_id VARCHAR(120) PRIMARY KEY,
    job_title VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    country VARCHAR(120) DEFAULT 'US',
    employment_type VARCHAR(80),
    experience_level VARCHAR(80),
    salary_min NUMERIC(12,2),
    salary_max NUMERIC(12,2),
    currency VARCHAR(20) DEFAULT 'USD',
    skills TEXT,
    posted_date DATE NOT NULL,
    remote_type VARCHAR(80),
    industry VARCHAR(200),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_jobs_location ON jobs(location);
CREATE INDEX IF NOT EXISTS idx_jobs_job_title ON jobs(job_title);
CREATE INDEX IF NOT EXISTS idx_jobs_posted_date ON jobs(posted_date);
CREATE INDEX IF NOT EXISTS idx_jobs_company ON jobs(company);
CREATE INDEX IF NOT EXISTS idx_jobs_experience_level ON jobs(experience_level);
