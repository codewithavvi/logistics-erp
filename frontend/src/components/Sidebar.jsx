import { useState, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { FaHome, FaBox, FaWarehouse, FaTruck, FaUser, FaUsers, FaMoon, FaSun, FaBars, FaTimes } from 'react-icons/fa';

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle theme
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'logistics');
    }
  }, [isDarkMode]);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const isActive = (path) => location.pathname === path;

  return (
    <div
      className={`h-screen bg-gradient-to-b from-primary to-blue-700 text-white shadow-2xl transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      } flex flex-col`}
      aria-label="Sidebar Navigation"
    >
      {/* Header with Toggle Button */}
      <div className="p-4 flex items-center justify-between">
        {!isCollapsed && (
          <></>
        )}
        <button
          onClick={toggleSidebar}
          className="btn btn-ghost text-white hover:bg-blue-800"
          aria-label={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? <FaBars /> : <FaTimes />}
        </button>
      </div>

      {/* Navigation Links */}
      <ul className="menu flex-1 px-2">
        {[
          { path: '/', label: 'Dashboard', icon: <FaHome /> },
          { path: '/orders', label: 'Orders', icon: <FaBox /> },
          { path: '/warehouses', label: 'Warehouses', icon: <FaWarehouse /> },
          { path: '/vehicles', label: 'Vehicles', icon: <FaTruck /> },
          { path: '/drivers', label: 'Drivers', icon: <FaUser /> },
          { path: '/jobs', label: 'Jobs', icon: <FaUser /> },
          ...(user?.role === 'Admin' ? [{ path: '/register', label: 'Register User', icon: <FaUsers /> }] : []),
        ].map((item) => (
          <li key={item.path} className="relative group">
            <Link
              to={item.path}
              className={`flex items-center gap-3 py-3 px-4 rounded-lg transition-colors ${
                isActive(item.path)
                  ? 'bg-blue-900 text-white font-bold'
                  : 'hover:bg-blue-800 hover:text-white'
              }`}
              aria-current={isActive(item.path) ? 'page' : undefined}
            >
              <span className="text-lg">{item.icon}</span>
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
            {isCollapsed && (
              <div className="tooltip tooltip-right hidden group-hover:block absolute left-16 bg-neutral text-white p-2 rounded" aria-hidden={!isCollapsed}>
                {item.label}
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* Footer with User Info and Theme Toggle */}
      <div className="p-4 border-t border-blue-600">
        <div className="flex items-center justify-between mb-4">
          {!isCollapsed && user && (
            <div className="flex items-center gap-2">
              <span className="badge badge-secondary">{user.role}</span>
              <span className="text-sm">{user.username}</span>
            </div>
          )}
          <button
            onClick={toggleTheme}
            className="btn btn-ghost text-white hover:bg-blue-800"
            aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
        <button
          onClick={logout}
          className="btn btn-outline btn-sm w-full text-white hover:bg-blue-800"
          aria-label="Logout"
        >
          {isCollapsed ? <FaUser /> : 'Logout'}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;