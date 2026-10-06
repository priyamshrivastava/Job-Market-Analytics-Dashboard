import pandas as pd


def extract_csv(csv_path: str):
    df = pd.read_csv(csv_path)
    required_columns = {
        'job_id', 'job_title', 'company', 'location', 'country', 'employment_type',
        'experience_level', 'salary_min', 'salary_max', 'currency', 'skills',
        'posted_date', 'remote_type', 'industry', 'description'
    }
    missing = required_columns - set(df.columns)
    if missing:
        raise ValueError(f'Missing required columns: {sorted(missing)}')

    print(f'[EXTRACT] {len(df)} records loaded from {csv_path}')
    return df
