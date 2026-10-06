export default function Navbar({ lastUpdated }) {
  return (
    <header className="border-b border-slate-200 bg-white px-6 py-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">JobPulse</h1>
          <p className="text-sm text-slate-500">Job Market Analytics</p>
        </div>
        <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-600">
          Last data refresh: {lastUpdated || 'N/A'}
        </div>
      </div>
    </header>
  );
}
