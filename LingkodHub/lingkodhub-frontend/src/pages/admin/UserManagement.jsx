import { Link } from 'react-router-dom';
import { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { mockUsers } from '../../data/mockData';
import './AdminPages.css';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || user.status === filter;
    return matchesSearch && matchesFilter;
  });

  // Calculate stats
  const totalUsers = mockUsers.length;
  const activeUsers = mockUsers.filter(u => u.status === 'active').length;
  const totalBookings = mockUsers.reduce((sum, u) => sum + u.bookings, 0);
  const totalRevenue = mockUsers.reduce((sum, u) => sum + u.spent, 0);

  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <div className="breadcrumb-nav">
            <i className="bi bi-house-door"></i>
            <span>Dashboard</span>
            <i className="bi bi-chevron-right" style={{ fontSize: '0.7rem', margin: '0 0.25rem' }}></i>
            <span>User Management</span>
          </div>
          <h1 className="page-title">User Management</h1>
          <p className="page-subtitle">Manage platform users, track activity, and control access permissions</p>
        </div>
        <div className="header-actions-right">
          <button className="action-button primary" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.625rem 1.125rem',
            borderRadius: '0.5rem',
            border: '1px solid #2563eb',
            background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
            color: 'white',
            fontWeight: 600,
            fontSize: '0.875rem',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            boxShadow: '0 1px 2px rgba(37, 99, 235, 0.2)'
          }}>
            <i className="bi bi-plus-lg"></i>
            <span>Add User</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid-small">
        <div className="stat-card-small">
          <div className="stat-label-small">Total Users</div>
          <div className="stat-value-small">{totalUsers}</div>
        </div>
        <div className="stat-card-small">
          <div className="stat-label-small">Active Users</div>
          <div className="stat-value-small">{activeUsers}</div>
        </div>
        <div className="stat-card-small">
          <div className="stat-label-small">Total Bookings</div>
          <div className="stat-value-small">{totalBookings}</div>
        </div>
        <div className="stat-card-small">
          <div className="stat-label-small">Total Revenue</div>
          <div className="stat-value-small">₱{(totalRevenue / 1000).toFixed(1)}K</div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <div className="filter-row">
          <div className="search-input-wrapper">
            <i className="bi bi-search"></i>
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="filter-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <select className="filter-select">
            <option>All Roles</option>
            <option>Resident</option>
            <option>Provider</option>
          </select>
          <button className="action-button quaternary" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.625rem 1.125rem',
            borderRadius: '0.5rem',
            border: '1px solid #e2e8f0',
            background: 'white',
            color: '#0f172a',
            fontWeight: 600,
            fontSize: '0.875rem',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}>
            <i className="bi bi-funnel"></i>
            <span>More Filters</span>
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="admin-table-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Join Date</th>
              <th className="text-end">Bookings</th>
              <th className="text-end">Total Spent</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className="user-cell">
                    <img
                      src={`https://ui-avatars.com/api/?name=${user.name}&background=2563eb&color=fff`}
                      alt={user.name}
                      className="user-avatar"
                    />
                    <div className="user-info">
                      <span className="user-name">{user.name}</span>
                      <span className="user-email">{user.email}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="status-badge" style={{
                    background: 'rgba(37, 99, 235, 0.1)',
                    color: '#2563eb'
                  }}>
                    {user.role}
                  </span>
                </td>
                <td style={{ fontWeight: 600 }}>{user.joinDate}</td>
                <td className="text-end" style={{ fontWeight: 700 }}>{user.bookings}</td>
                <td className="text-end" style={{ fontWeight: 700 }}>₱{user.spent.toLocaleString()}</td>
                <td>
                  <span className={`status-badge status-${user.status}`}>
                    {user.status}
                  </span>
                </td>
                <td>
                  <div className="action-btn-group">
                    <button className="action-btn" title="View Details">
                      <i className="bi bi-eye"></i>
                    </button>
                    <button className="action-btn" title="Edit User">
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button className="action-btn action-btn-danger" title="Delete User">
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default UserManagement;
