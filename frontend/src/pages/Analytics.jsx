import { useEffect, useState } from 'react';
import { BarChart, Bar, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, PieChart, Pie, Cell } from 'recharts';
import ChartCard from '../components/ChartCard';
import LoadingState from '../components/LoadingState';
import { fetchTopSkills, fetchTopLocations, fetchCompanies, fetchExperienceLevels, fetchEmploymentTypes, fetchSalaryDistribution, fetchJobTrends } from '../services/api';

const palette = ['#2563eb', '#0f172a', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function Analytics() {
  const [topSkills, setTopSkills] = useState([]);
  const [topLocations, setTopLocations] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [experience, setExperience] = useState([]);
  const [employment, setEmployment] = useState([]);
  const [salary, setSalary] = useState([]);
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [skillsResponse, locationsResponse, companiesResponse, experienceResponse, employmentResponse, salaryResponse, trendsResponse] = await Promise.all([
          fetchTopSkills(),
          fetchTopLocations(),
          fetchCompanies(),
          fetchExperienceLevels(),
          fetchEmploymentTypes(),
          fetchSalaryDistribution(),
          fetchJobTrends(),
        ]);
        setTopSkills(skillsResponse.data);
        setTopLocations(locationsResponse.data);
        setCompanies(companiesResponse.data);
        setExperience(experienceResponse.data);
        setEmployment(employmentResponse.data);
        setSalary(salaryResponse.data);
        setTrends(trendsResponse.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <LoadingState message="Loading analytics..." />;

  return (
    <div className="space-y-5">
      <div className="grid gap-4 xl:grid-cols-2">
        <ChartCard title="Top 10 skills">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topSkills.slice(0, 10)} layout="vertical" margin={{ left: 15 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis type="number" allowDecimals={false} />
                <YAxis type="category" dataKey="name" width={90} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="value" fill="#2563eb" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
        <ChartCard title="Top locations">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topLocations.slice(0, 10)}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} interval={0} angle={-20} textAnchor="end" height={60} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#0f172a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <ChartCard title="Most active companies">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={companies.slice(0, 8)}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} interval={0} angle={-20} textAnchor="end" height={60} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
        <ChartCard title="Jobs by experience level">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={experience} dataKey="value" nameKey="name" outerRadius={90} label>
                  {experience.map((entry, index) => (
                    <Cell key={entry.name} fill={palette[index % palette.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <ChartCard title="Jobs by employment type">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={employment}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
        <ChartCard title="Salary distribution">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salary}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <ChartCard title="Monthly job posting trend" fullWidth>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={trends}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#2563eb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
}
