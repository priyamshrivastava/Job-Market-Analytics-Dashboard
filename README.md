# JobPulse — Job Market Analytics Dashboard

JobPulse is a production-style data engineering project that ingests raw job-posting data, validates and transforms it, loads it into PostgreSQL, exposes analytics through a FastAPI service, and visualizes the results in a React + Recharts dashboard.

## Architecture

CSV
 ↓
Python / Pandas ETL
 ↓
PostgreSQL
 ↓
FastAPI
 ↓
React Dashboard

## Features

- Real sample job dataset with imperfect rows and duplicates
- ETL validation and transformation pipeline
- PostgreSQL storage with indexes and aggregation-ready tables
- FastAPI jobs and analytics API
- Professional React dashboard with KPI cards and charts

## Folder Structure

jobpulse/
├── backend/
├── data-pipeline/
├── database/
├── frontend/
├── docker-compose.yml
├── .env.example
├── .gitignore
├── README.md
└── .

## Setup

1. Start PostgreSQL:
   docker compose up -d postgres
2. Create backend venv and install requirements.
3. Load schema.sql into PostgreSQL.
4. Run data-pipeline src/pipeline.py.
5. Start backend with uvicorn.
6. Start frontend with npm install and npm run dev.

## Sample Data

All dataset files are clearly labeled as sample/demo data for analytics prototyping.

## Future Improvements

- Add scheduled ETL jobs
- Add alerting for data quality issues
- Add user auth and RBAC
- Add data warehouse models and BI layers
