import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const DashboardLayout = ({ children, role, menuItems }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* Top Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top">
        <div className="container-fluid">
          <button
            className="btn btn-link d-lg-none me-2"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <i className="bi bi-list fs-4"></i>
          </button>
          
          <Link to={`/${role}/dashboard`} className="navbar-brand d-flex align-items-center">
            <i className="bi bi-house-gear-fill me-2 fs-4"></i>
            <span className="fw-bold">LingkodHub</span>
          </Link>
          
          <div className="ms-auto d-flex align-items-center">
            {/* Notifications */}
            <div className="dropdown me-3">
              <button
                className="btn btn-link position-relative"
                data-bs-toggle="dropdown"
              >
                <i className="bi bi-bell fs-5 text-dark"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  3
                </span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end" style={{ minWidth: '300px' }}>
                <li className="px-3 py-2 border-bottom">
                  <h6 className="mb-0">Notifications</h6>
                </li>
                <li>
                  <Link to={`/${role}/notifications`} className="dropdown-item py-2">
                    <div className="d-flex align-items-start">
                      <i className="bi bi-check-circle text-success me-2 mt-1"></i>
                      <div className="flex-grow-1">
                        <div className="fw-semibold">Booking Confirmed</div>
                        <small className="text-muted">Your booking has been confirmed</small>
                      </div>
                    </div>
                  </Link>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <Link to={`/${role}/notifications`} className="dropdown-item text-center text-primary">
                    View All Notifications
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* User Menu */}
            <div className="dropdown">
              <button
                className="btn btn-link text-decoration-none d-flex align-items-center"
                data-bs-toggle="dropdown"
              >
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="rounded-circle me-2"
                  width="32"
                  height="32"
                />
                <span className="text-dark d-none d-md-inline">{user?.name}</span>
                <i className="bi bi-chevron-down text-dark ms-2"></i>
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <Link to={`/${role}/profile`} className="dropdown-item">
                    <i className="bi bi-person me-2"></i>
                    Profile
                  </Link>
                </li>
                {role === 'admin' && (
                  <li>
                    <Link to={`/${role}/settings`} className="dropdown-item">
                      <i className="bi bi-gear me-2"></i>
                      Settings
                    </Link>
                  </li>
                )}
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button onClick={handleLogout} className="dropdown-item text-danger">
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      
      <div className="flex-grow-1 d-flex">
        {/* Sidebar */}
        <aside 
          className={`sidebar bg-white border-end ${sidebarOpen ? 'show' : ''}`}
          style={{ width: '250px' }}
        >
          <nav className="py-3">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={`sidebar-link ${
                  location.pathname === item.path ? 'active' : ''
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <i className={`${item.icon} me-2`}></i>
                {item.label}
                {item.badge && (
                  <span className="badge bg-danger ms-auto">{item.badge}</span>
                )}
              </Link>
            ))}
          </nav>
        </aside>
        
        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="d-lg-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
            style={{ zIndex: 999 }}
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Main Content */}
        <main className="flex-grow-1 bg-light">
          <div className="container-fluid p-4">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
