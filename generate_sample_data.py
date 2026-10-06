import csv
import random
from datetime import date, timedelta

companies = [
    'Databricks', 'Uber', 'Stripe', 'Snowflake', 'Slack', 'Shopify', 'Notion', 'GitLab', 'Atlassian',
    'Figma', 'OpenAI', 'Plaid', 'Coinbase', 'Airbnb', 'Dropbox', 'Pinterest', 'Zoom', 'Robinhood',
    'Capital One', 'Netflix', 'Spotify', 'CrowdStrike', 'HubSpot', 'Twilio', 'MongoDB', 'ServiceNow',
    'eBay', 'JPMorgan Chase', 'Visa', 'Adobe', 'Intuit', 'Salesforce'
]

job_titles = [
    'Senior Data Engineer', 'Data Analyst', 'Analytics Engineer', 'Machine Learning Engineer',
    'Product Analyst', 'Business Intelligence Manager', 'Platform Engineer', 'Data Scientist',
    'Python Developer', 'ETL Developer', 'SQL Engineer', 'Senior BI Analyst', 'Research Analyst'
]

locations = [
    'New York, NY', 'San Francisco, CA', 'Seattle, WA', 'Austin, TX', 'Chicago, IL',
    'Boston, MA', 'Denver, CO', 'Remote - US', 'Remote - EU', 'Los Angeles, CA',
    'Atlanta, GA', 'Miami, FL', 'Portland, OR', 'Washington, DC'
]

skills_sets = [
    'Python, SQL, Airflow, dbt', 'SQL, Tableau, Python, Snowflake', 'Spark, Kafka, AWS, Python',
    'Power BI, SQL, Excel, Azure', 'dbt, PostgreSQL, Airflow, GCP', 'Python, Pandas, ETL, BigQuery',
    'Kafka, Spark, Scala, AWS', 'SQL, Looker, Python, Warehouse', 'Data Modeling, SQL, Python, Tableau',
    'ETL, Azure, Python, Data Warehousing'
]

base_date = date.today() - timedelta(days=365)
rows = []
for i in range(1200):
    company = random.choice(companies)
    title = random.choice(job_titles)
    location = random.choice(locations)
    remote = random.choice(['Remote', 'Hybrid', 'Onsite'])
    employment = random.choice(['Full-time', 'Contract', 'Part-time', 'Internship'])
    experience = random.choice(['Entry level', 'Mid level', 'Senior', 'Lead'])
    salary_min = random.randint(65000, 240000)
    salary_max = salary_min + random.randint(15000, 65000)
    posted = (base_date + timedelta(days=random.randint(0, 365))).isoformat()
    skills = random.choice(skills_sets)
    job_id = f'JOB-{10000 + i}'
    if i % 17 == 0:
        job_id = f'JOB-{10000 + ((i // 17) * 17)}'
    row = {
        'job_id': job_id,
        'job_title': title,
        'company': company,
        'location': location,
        'country': 'United States',
        'employment_type': employment,
        'experience_level': experience,
        'salary_min': salary_min if i % 9 != 0 else '',
        'salary_max': salary_max if i % 7 != 0 else '',
        'currency': 'USD',
        'skills': skills,
        'posted_date': posted,
        'remote_type': remote,
        'industry': random.choice(['Technology', 'Finance', 'Healthcare', 'Retail', 'Logistics', 'Media', 'Consulting']),
        'description': 'Drive analytics, model business data, and support operational decision-making across teams.'
    }
    rows.append(row)

path = 'data-pipeline/data/raw/job_postings_sample.csv'
with open(path, 'w', newline='', encoding='utf-8') as file:
    writer = csv.DictWriter(file, fieldnames=list(rows[0].keys()))
    writer.writeheader()
    writer.writerows(rows)

print(f'Generated {len(rows)} rows in {path}')
