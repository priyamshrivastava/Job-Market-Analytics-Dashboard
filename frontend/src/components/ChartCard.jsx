export default function ChartCard({ title, children, fullWidth = false }) {
  return (
    <div className={`card p-5 ${fullWidth ? 'lg:col-span-2' : ''}`}>
      <div className="mb-4">
        <h3 className="text-base font-semibold text-slate-800">{title}</h3>
      </div>
      {children}
    </div>
  );
}
