import { useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaComments, FaCalendarAlt, FaUser } from 'react-icons/fa';

const navItems = [
  { path: '/dashboard', icon: FaHome, label: 'Home' },
  { path: '/chat', icon: FaComments, label: 'Chat' },
  { path: '/events', icon: FaCalendarAlt, label: 'Events' },
  { path: '/profile', icon: FaUser, label: 'Profile' },
] as const;

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100">
      <div className="max-w-lg mx-auto">
        <div className="grid grid-cols-4">
          {navItems.map(({ path, icon: Icon, label }) => {
            const isActive = currentPath === path;
            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                className={`py-2 flex flex-col items-center ${
                  isActive ? 'text-[var(--primary)]' : 'text-gray-400'
                }`}
              >
                <Icon className={`text-lg ${isActive ? 'text-[var(--primary)]' : 'text-gray-400'}`} />
                <span className="text-[10px] mt-0.5 font-medium">{label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav; 