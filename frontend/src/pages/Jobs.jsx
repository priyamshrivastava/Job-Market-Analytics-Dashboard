import { useEffect, useState } from 'react';
import { fetchJobs } from '../services/api';
import LoadingState from '../components/LoadingState';
import JobTable from '../components/JobTable';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(15);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState({ search: '', location: '', experience_level: '', employment_type: '', remote_type: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPage = async () => {
      setLoading(true);
      try {
        const response = await fetchJobs({
          page,
          page_size: pageSize,
          job_title: filters.search,
          location: filters.location,
          experience_level: filters.experience_level,
          employment_type: filters.employment_type,
          remote_type: filters.remote_type,
        });
        setJobs(response.data.items);
        setTotal(response.data.total);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPage();
  }, [page, filters]);

  const updateFilter = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value }));
    setPage(1);
  };

  if (loading) return <LoadingState message="Loading jobs catalog..." />;

  return (
    <div className="space-y-5">
      <div className="card p-5">
        <div className="grid gap-3 md:grid-cols-5">
          <input value={filters.search} onChange={(e) => updateFilter('search', e.target.value)} placeholder="Search jobs" className="rounded border border-slate-300 px-3 py-2 text-sm" />
          <input value={filters.location} onChange={(e) => updateFilter('location', e.target.value)} placeholder="Location" className="rounded border border-slate-300 px-3 py-2 text-sm" />
          <input value={filters.experience_level} onChange={(e) => updateFilter('experience_level', e.target.value)} placeholder="Experience" className="rounded border border-slate-300 px-3 py-2 text-sm" />
          <input value={filters.employment_type} onChange={(e) => updateFilter('employment_type', e.target.value)} placeholder="Employment Type" className="rounded border border-slate-300 px-3 py-2 text-sm" />
          <input value={filters.remote_type} onChange={(e) => updateFilter('remote_type', e.target.value)} placeholder="Remote Type" className="rounded border border-slate-300 px-3 py-2 text-sm" />
        </div>
      </div>
      <JobTable jobs={jobs} page={page} pageSize={pageSize} total={total} onPageChange={setPage} />
    </div>
  );
}
