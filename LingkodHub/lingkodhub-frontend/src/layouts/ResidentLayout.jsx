import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './ResidentLayout.css';

const ResidentLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuSections = [
    {
      title: 'OVERVIEW',
      items: [
        { path: '/resident/dashboard', label: 'Dashboard', icon: 'bi-grid-1x2' },
      ]
    },
    {
      title: 'SERVICES',
      items: [
        { path: '/resident/find-services', label: 'Find Services', icon: 'bi-search' },
        { path: '/resident/providers', label: 'Browse Providers', icon: 'bi-people' },
      ]
    },
    {
      title: 'BOOKINGS',
      items: [
        { path: '/resident/bookings', label: 'My Bookings', icon: 'bi-calendar-check', badge: 3, badgeType: 'warning' },
        { path: '/resident/reviews', label: 'My Reviews', icon: 'bi-star' },
      ]
    },
    {
      title: 'ACCOUNT',
      items: [
        { path: '/resident/notifications', label: 'Notifications', icon: 'bi-bell', badge: 2, badgeType: 'warning' },
        { path: '/resident/profile', label: 'Profile', icon: 'bi-person' },
      ]
    }
  ];

  return (
    <div className="admin-layout">
      {/* Dark Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'show' : ''}`}>
        <div className="sidebar-header">
          <Link to="/resident/dashboard" className="sidebar-brand">
            <i className="bi bi-house-heart-fill"></i>
            <span>LingkodHub</span>
          </Link>
        </div>

        <nav className="sidebar-nav">
          {menuSections.map((section, idx) => (
            <div key={idx} className="nav-section">
              <div className="nav-section-title">{section.title}</div>
              {section.items.map((item, itemIdx) => (
                <Link
                  key={itemIdx}
                  to={item.path}
                  className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <i className={`${item.icon}`}></i>
                  <span>{item.label}</span>
                  {item.badge && <span className="nav-badge">{item.badge}</span>}
                </Link>
              ))}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile">
            <img src={user?.avatar} alt={user?.name} className="user-avatar" />
            <div className="user-info">
              <div className="user-name">{user?.name}</div>
              <div className="user-role">Resident</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <div className="admin-main">
        {/* Top Bar */}
        <header className="admin-header">
          <button className="btn-mobile-menu" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <i className="bi bi-list"></i>
          </button>

          <div className="header-search">
            <i className="bi bi-search"></i>
            <input type="text" placeholder="Search services, providers..." />
          </div>

          <div className="header-actions">
            <button className="btn-header-action" title="Quick Book">
              <i className="bi bi-plus-circle"></i>
            </button>

            <div className="dropdown">
              <button className="btn-header-action position-relative" data-bs-toggle="dropdown">
                <i className="bi bi-bell"></i>
                <span className="notification-dot"></span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end notification-dropdown">
                <li className="dropdown-header">Notifications</li>
                <li>
                  <a className="dropdown-item notification-item" href="/resident/bookings">
                    <div className="notification-icon bg-success">
                      <i className="bi bi-check-circle"></i>
                    </div>
                    <div className="notification-content">
                      <div className="notification-title">Booking Confirmed</div>
                      <div className="notification-time">2 hours ago</div>
                    </div>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item notification-item" href="/resident/bookings">
                    <div className="notification-icon bg-warning">
                      <i className="bi bi-hourglass-split"></i>
                    </div>
                    <div className="notification-content">
                      <div className="notification-title">Awaiting Provider Response</div>
                      <div className="notification-time">1 day ago</div>
                    </div>
                  </a>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <Link to="/resident/notifications" className="dropdown-item text-center text-primary">
                    View All
                  </Link>
                </li>
              </ul>
            </div>

            <div className="dropdown">
              <button className="user-menu" data-bs-toggle="dropdown">
                <img src={user?.avatar} alt={user?.name} />
                <span className="d-none d-md-inline">{user?.name}</span>
                <i className="bi bi-chevron-down"></i>
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <Link to="/resident/profile" className="dropdown-item">
                    <i className="bi bi-person me-2"></i>Profile
                  </Link>
                </li>
                <li>
                  <Link to="/resident/settings" className="dropdown-item">
                    <i className="bi bi-gear me-2"></i>Settings
                  </Link>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button onClick={handleLogout} className="dropdown-item text-danger">
                    <i className="bi bi-box-arrow-right me-2"></i>Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="admin-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default ResidentLayout;
