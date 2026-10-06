export default function About() {
  return (
    <div className="card p-6">
      <h2 className="text-xl font-semibold text-slate-900">About JobPulse</h2>
      <p className="mt-4 text-sm leading-6 text-slate-600">
        JobPulse is a portfolio project designed to reflect a real analytics workflow for evaluating labor market activity.
        It ingests raw job-posting data, validates quality issues, transforms records into a usable warehouse model,
        and publishes clean metrics through a backend API for dashboard consumption.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded border border-slate-200 bg-slate-50 p-4">
          <div className="font-medium text-slate-800">Data Pipeline</div>
          <p className="mt-2 text-sm text-slate-600">Pandas-based extraction, validation, transformation, and PostgreSQL load.</p>
        </div>
        <div className="rounded border border-slate-200 bg-slate-50 p-4">
          <div className="font-medium text-slate-800">Analytics Layer</div>
          <p className="mt-2 text-sm text-slate-600">SQL aggregation queries power overview, trend, and skills metrics.</p>
        </div>
      </div>
    </div>
  );
}
