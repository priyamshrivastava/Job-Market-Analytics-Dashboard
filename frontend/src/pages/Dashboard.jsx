import { useEffect, useState } from 'react';
import { BarChart, Bar, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import ChartCard from '../components/ChartCard';
import LoadingState from '../components/LoadingState';
import StatCard from '../components/StatCard';
import JobTable from '../components/JobTable';
import { fetchJobs, fetchOverview, fetchTopSkills, fetchTopLocations, fetchJobTrends, fetchExperienceLevels } from '../services/api';

export default function Dashboard() {
  const [overview, setOverview] = useState(null);
  const [skills, setSkills] = useState([]);
  const [locations, setLocations] = useState([]);
  const [trends, setTrends] = useState([]);
  const [experience, setExperience] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [overviewResponse, skillsResponse, locationsResponse, trendsResponse, experienceResponse, jobsResponse] = await Promise.all([
          fetchOverview(),
          fetchTopSkills(),
          fetchTopLocations(),
          fetchJobTrends(),
          fetchExperienceLevels(),
          fetchJobs({ page: 1, page_size: 8 }),
        ]);
        setOverview(overviewResponse.data);
        setSkills(skillsResponse.data);
        setLocations(locationsResponse.data);
        setTrends(trendsResponse.data);
        setExperience(experienceResponse.data);
        setJobs(jobsResponse.data.items);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <LoadingState message="Loading dashboard metrics..." />;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Jobs" value={overview?.total_jobs ?? 0} subtitle="live" accent="blue" />
        <StatCard label="Active Companies" value={overview?.active_companies ?? 0} subtitle="updated" accent="slate" />
        <StatCard label="Remote Jobs" value={overview?.remote_jobs ?? 0} subtitle="hybrid" accent="emerald" />
        <StatCard label="Average Salary" value={`$${Math.round(overview?.average_salary || 0).toLocaleString()}`} subtitle="USD" accent="amber" />
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <ChartCard title="Job postings over time">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trends}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="value" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Top skills">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={skills.slice(0, 8)} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis type="number" allowDecimals={false} />
                <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="value" fill="#1d4ed8" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Jobs by location">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={locations.slice(0, 8)}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} interval={0} angle={-20} textAnchor="end" height={60} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#0f172a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Experience level distribution">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={experience}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-800">Recent Job Postings</h2>
        </div>
        <JobTable jobs={jobs} page={1} pageSize={8} total={jobs.length} onPageChange={() => {}} />
      </div>
    </div>
  );
}
