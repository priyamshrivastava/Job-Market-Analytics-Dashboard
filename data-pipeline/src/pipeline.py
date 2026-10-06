from pathlib import Path

from extract import extract_csv
from transform import transform_dataframe
from validate import validate_dataframe
from load import load_dataframe


def run_pipeline(csv_path: str | None = None):
    base_dir = Path(__file__).resolve().parents[1]
    raw_path = csv_path or str(base_dir / 'data' / 'raw' / 'job_postings_sample.csv')

    df = extract_csv(raw_path)
    validate_summary = validate_dataframe(df)
    cleaned = transform_dataframe(df)
    inserted = load_dataframe(cleaned)

    print('[PIPELINE] Completed successfully')
    return {
        'source_rows': len(df),
        'validated_rows': validate_summary['valid_date_records'],
        'loaded_rows': inserted,
    }


if __name__ == '__main__':
    run_pipeline()
