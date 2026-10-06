import pandas as pd


def normalize_text(value):
    if pd.isna(value):
        return None
    return str(value).strip()


def standardize_employment(value):
    mapping = {
        'full-time': 'Full-time', 'full time': 'Full-time', 'fulltime': 'Full-time',
        'part-time': 'Part-time', 'part time': 'Part-time', 'contract': 'Contract',
        'temporary': 'Temporary', 'internship': 'Internship', 'intern': 'Internship'
    }
    cleaned = normalize_text(value)
    if not cleaned:
        return 'Unknown'
    return mapping.get(cleaned.lower(), cleaned.title())


def standardize_remote(value):
    mapping = {
        'remote': 'Remote', 'hybrid': 'Hybrid', 'onsite': 'Onsite', 'on-site': 'Onsite'
    }
    cleaned = normalize_text(value)
    if not cleaned:
        return 'Unknown'
    return mapping.get(cleaned.lower(), cleaned.title())


def clean_skills(value):
    if pd.isna(value):
        return None
    skills = [item.strip() for item in str(value).split(',') if item.strip()]
    if not skills:
        return None
    return ', '.join(sorted(set(skill.strip() for skill in skills), key=str.casefold))


def transform_dataframe(df: pd.DataFrame):
    df = df.copy()
    df.columns = [col.strip().lower().replace(' ', '_') for col in df.columns]
    df = df.drop_duplicates(subset=['job_id'], keep='last')

    for column in ['job_title', 'company', 'location', 'country', 'employment_type', 'experience_level', 'currency', 'remote_type', 'industry']:
        if column in df.columns:
            df[column] = df[column].apply(normalize_text)

    df['job_title'] = df['job_title'].fillna('Unknown Job Title').str.strip()
    df['company'] = df['company'].fillna('Unknown Company').str.strip()
    df['location'] = df['location'].fillna('Unknown Location').str.strip()
    df['country'] = df['country'].fillna('United States').str.strip()
    df['employment_type'] = df['employment_type'].apply(standardize_employment)
    df['remote_type'] = df['remote_type'].apply(standardize_remote)
    df['skills'] = df['skills'].apply(clean_skills)
    df['posted_date'] = pd.to_datetime(df['posted_date'], errors='coerce').dt.strftime('%Y-%m-%d')
    df['salary_min'] = pd.to_numeric(df['salary_min'], errors='coerce')
    df['salary_max'] = pd.to_numeric(df['salary_max'], errors='coerce')
    for col in ['salary_min', 'salary_max']:
        df[col] = df[col].where(df[col].between(0, 500000), None)
    df['description'] = df['description'].fillna('No description provided.')
    df['job_id'] = df['job_id'].astype(str).str.strip()
    print('[TRANSFORM] Cleaning completed')
    return df
