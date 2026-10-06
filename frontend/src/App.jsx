import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Jobs from './pages/Jobs';
import Analytics from './pages/Analytics';
import Pipeline from './pages/Pipeline';
import About from './pages/About';

function AppLayout() {
  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar lastUpdated="2026-10-06 10:00 UTC" />
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/pipeline" element={<Pipeline />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return <AppLayout />;
}
