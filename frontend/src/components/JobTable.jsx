export default function JobTable({ jobs, page, pageSize, total, onPageChange }) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm text-slate-700">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-600">
            <tr>
              <th className="px-4 py-3">Job Title</th>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Experience</th>
              <th className="px-4 py-3">Employment</th>
              <th className="px-4 py-3">Remote</th>
              <th className="px-4 py-3">Posted</th>
            </tr>
          </thead>
          <tbody>
            {jobs.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-4 py-8 text-center text-slate-500">No jobs found</td>
              </tr>
            ) : (
              jobs.map((job) => (
                <tr key={job.job_id} className="border-t border-slate-200">
                  <td className="px-4 py-3 font-medium text-slate-800">{job.job_title}</td>
                  <td className="px-4 py-3">{job.company}</td>
                  <td className="px-4 py-3">{job.location}</td>
                  <td className="px-4 py-3">{job.experience_level || 'N/A'}</td>
                  <td className="px-4 py-3">{job.employment_type || 'N/A'}</td>
                  <td className="px-4 py-3">{job.remote_type || 'N/A'}</td>
                  <td className="px-4 py-3">{job.posted_date}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3 text-sm text-slate-600">
        <span>Page {page} of {totalPages}</span>
        <div className="flex gap-2">
          <button
            className="rounded border border-slate-200 px-3 py-1 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
          >
            Prev
          </button>
          <button
            className="rounded border border-slate-200 px-3 py-1 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
