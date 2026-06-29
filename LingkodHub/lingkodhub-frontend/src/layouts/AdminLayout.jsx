import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './AdminLayout.css';

const AdminLayout = ({ children }) => {
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
        { path: '/admin/dashboard', label: 'Dashboard', icon: 'bi-grid-1x2' },
        { path: '/admin/analytics', label: 'Demand Analytics', icon: 'bi-graph-up-arrow' },
      ]
    },
    {
      title: 'OPERATIONS',
      items: [
        { path: '/admin/bookings', label: 'Booking Monitoring', icon: 'bi-calendar-check', badge: 12, badgeType: 'warning' },
        { path: '/admin/providers', label: 'Provider Management', icon: 'bi-briefcase' },
        { path: '/admin/users', label: 'User Management', icon: 'bi-people' },
      ]
    },
    {
      title: 'ANALYTICS',
      items: [
        { path: '/admin/service-trends', label: 'Service Trends', icon: 'bi-graph-up' },
        { path: '/admin/barangay-insights', label: 'Barangay Insights', icon: 'bi-geo-alt' },
        { path: '/admin/reports', label: 'Reports', icon: 'bi-file-earmark-bar-graph' },
      ]
    },
    {
      title: 'SYSTEM',
      items: [
        { path: '/admin/notifications', label: 'Notifications', icon: 'bi-bell', badge: 3, badgeType: 'warning' },
        { path: '/admin/settings', label: 'Settings', icon: 'bi-gear' },
      ]
    }
  ];

  return (
    <div className="admin-layout">
      {/* Dark Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'show' : ''}`}>
        <div className="sidebar-header">
          <Link to="/admin/dashboard" className="sidebar-brand">
            <i className="bi bi-house-gear-fill"></i>
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
              <div className="user-role">Administrator</div>
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
            <input type="text" placeholder="Search bookings, providers, users..." />
          </div>

          <div className="header-actions">
            <button className="btn-header-action" title="Quick Actions">
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
                  <a className="dropdown-item notification-item" href="/admin/notifications">
                    <div className="notification-icon bg-warning">
                      <i className="bi bi-exclamation-triangle"></i>
                    </div>
                    <div className="notification-content">
                      <div className="notification-title">12 Pending Approvals</div>
                      <div className="notification-time">2 minutes ago</div>
                    </div>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item notification-item" href="/admin/notifications">
                    <div className="notification-icon bg-success">
                      <i className="bi bi-check-circle"></i>
                    </div>
                    <div className="notification-content">
                      <div className="notification-title">New provider verified</div>
                      <div className="notification-time">1 hour ago</div>
                    </div>
                  </a>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <Link to="/admin/notifications" className="dropdown-item text-center text-primary">
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
                  <Link to="/admin/profile" className="dropdown-item">
                    <i className="bi bi-person me-2"></i>Profile
                  </Link>
                </li>
                <li>
                  <Link to="/admin/settings" className="dropdown-item">
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

export default AdminLayout;
