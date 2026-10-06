export default function Pipeline() {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {[
          ['Pipeline Status', 'Healthy'],
          ['Last Run', '2026-10-06 10:42'],
          ['Records Processed', '1,200'],
          ['Records Rejected', '87'],
          ['Data Quality Score', '96.4%'],
        ].map(([label, value]) => (
          <div key={label} className="card p-4">
            <div className="text-sm text-slate-500">{label}</div>
            <div className="mt-2 text-xl font-semibold text-slate-900">{value}</div>
          </div>
        ))}
      </div>

      <div className="card p-6">
        <h3 className="mb-4 text-lg font-semibold text-slate-900">Pipeline Flow</h3>
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-700">
          <span className="rounded border border-slate-200 bg-slate-50 px-3 py-2">Raw Data</span>
          <span>→</span>
          <span className="rounded border border-slate-200 bg-slate-50 px-3 py-2">Validation</span>
          <span>→</span>
          <span className="rounded border border-slate-200 bg-slate-50 px-3 py-2">Transformation</span>
          <span>→</span>
          <span className="rounded border border-slate-200 bg-slate-50 px-3 py-2">PostgreSQL</span>
          <span>→</span>
          <span className="rounded border border-slate-200 bg-slate-50 px-3 py-2">Analytics</span>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="mb-4 text-lg font-semibold text-slate-900">Recent pipeline logs</h3>
        <div className="space-y-2 text-sm text-slate-600">
          {[
            '10:42:11  EXTRACT    1200 records loaded',
            '10:42:12  VALIDATE   1113 records passed',
            '10:42:13  TRANSFORM  Cleaning completed',
            '10:42:14  LOAD       1113 records inserted',
            '10:42:14  SUCCESS    Pipeline completed',
          ].map((log) => (
            <div key={log} className="rounded border border-slate-200 bg-slate-50 px-3 py-2">{log}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
