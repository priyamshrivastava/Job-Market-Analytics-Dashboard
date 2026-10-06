export default function LoadingState({ message = 'Loading data...' }) {
  return (
    <div className="card p-8 text-center text-sm text-slate-500">
      {message}
    </div>
  );
}
