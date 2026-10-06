import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

export const fetchOverview = async () => api.get('/analytics/overview');
export const fetchJobs = async (params = {}) => api.get('/jobs', { params });
export const fetchTopSkills = async () => api.get('/analytics/top-skills');
export const fetchTopLocations = async () => api.get('/analytics/top-locations');
export const fetchJobTrends = async () => api.get('/analytics/job-trends');
export const fetchSalaryDistribution = async () => api.get('/analytics/salary-distribution');
export const fetchCompanies = async () => api.get('/analytics/companies');
export const fetchExperienceLevels = async () => api.get('/analytics/experience-levels');
export const fetchEmploymentTypes = async () => api.get('/analytics/employment-types');
export const fetchHealth = async () => api.get('/health');
