export default function StatCard({ label, value, subtitle, accent = 'blue' }) {
  const accents = {
    blue: 'bg-blue-50 text-blue-700',
    slate: 'bg-slate-100 text-slate-700',
    emerald: 'bg-emerald-50 text-emerald-700',
    amber: 'bg-amber-50 text-amber-700',
  };

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-900">{value}</h3>
        </div>
        <span className={`rounded-lg px-2.5 py-2 text-sm font-medium ${accents[accent]}`}>{subtitle}</span>
      </div>
    </div>
  );
}
