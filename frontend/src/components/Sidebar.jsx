import { NavLink } from 'react-router-dom';

const navItems = [
  { name: 'Dashboard', to: '/' },
  { name: 'Jobs', to: '/jobs' },
  { name: 'Analytics', to: '/analytics' },
  { name: 'Data Pipeline', to: '/pipeline' },
  { name: 'About', to: '/about' },
];

export default function Sidebar() {
  return (
    <aside className="w-full border-r border-slate-200 bg-white lg:w-64">
      <div className="px-6 py-5 border-b border-slate-200">
        <div className="text-xl font-semibold text-slate-900">JobPulse</div>
        <div className="text-sm text-slate-500">Job Market Analytics</div>
      </div>
      <nav className="space-y-1 p-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center rounded-lg px-3 py-2 text-sm font-medium ${
                isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
