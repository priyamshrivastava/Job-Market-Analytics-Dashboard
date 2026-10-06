import os

from dotenv import load_dotenv
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '..', '.env'))

DATABASE_URL = os.getenv('DATABASE_URL', 'postgresql+psycopg2://jobpulse:jobpulse@localhost:5432/jobpulse')
engine = create_engine(DATABASE_URL, pool_pre_ping=True)
Session = sessionmaker(bind=engine)


def load_dataframe(df):
    records = df.to_dict(orient='records')
    with Session() as session:
        inserted = 0
        for row in records:
            exists = session.execute(
                text('SELECT 1 FROM jobs WHERE job_id = :job_id'),
                {'job_id': row['job_id']},
            ).fetchone()
            if exists:
                continue
            session.execute(
                text('''
                    INSERT INTO jobs (
                        job_id, job_title, company, location, country, employment_type,
                        experience_level, salary_min, salary_max, currency, skills,
                        posted_date, remote_type, industry, description
                    ) VALUES (
                        :job_id, :job_title, :company, :location, :country, :employment_type,
                        :experience_level, :salary_min, :salary_max, :currency, :skills,
                        :posted_date, :remote_type, :industry, :description
                    )
                '''),
                row,
            )
            inserted += 1
        session.commit()
    print(f'[LOAD] {inserted} records inserted')
    return inserted
