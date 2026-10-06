from __future__ import annotations

import pandas as pd


def validate_dataframe(df: pd.DataFrame):
    required_columns = {
        'job_id', 'job_title', 'company', 'location', 'country', 'employment_type',
        'experience_level', 'salary_min', 'salary_max', 'currency', 'skills',
        'posted_date', 'remote_type', 'industry', 'description'
    }
    missing = required_columns - set(df.columns)
    if missing:
        raise ValueError(f'Columns missing: {sorted(missing)}')

    invalid_salary = df[
        (df['salary_min'].notna() & (df['salary_min'] < 0)) |
        (df['salary_max'].notna() & (df['salary_max'] < 0))
    ]
    invalid_dates = df[pd.to_datetime(df['posted_date'], errors='coerce').isna()]
    duplicate_job_ids = df[df.duplicated(subset=['job_id'], keep=False)]

    summary = {
        'required_columns_ok': True,
        'total_records': len(df),
        'valid_salary_records': len(df) - len(invalid_salary),
        'valid_date_records': len(df) - len(invalid_dates),
        'duplicate_job_ids': len(duplicate_job_ids),
        'rejected_rows': len(invalid_salary) + len(invalid_dates) + len(duplicate_job_ids),
    }

    print(f'[VALIDATE] {summary["valid_date_records"]} valid records')
    return summary
