import { Link } from 'react-router-dom';
import { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { mockBookings } from '../../data/mockData';
import './AdminPages.css';

const BookingMonitoring = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBookings = mockBookings.filter(booking => {
    const matchesSearch = booking.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.provider.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Calculate stats
  const totalBookings = mockBookings.length;
  const pendingBookings = mockBookings.filter(b => b.status === 'pending').length;
  const completedBookings = mockBookings.filter(b => b.status === 'completed').length;
  const totalRevenue = mockBookings.reduce((sum, b) => sum + b.totalCost, 0);

  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <div className="breadcrumb-nav">
            <i className="bi bi-house-door"></i>
            <span>Dashboard</span>
            <i className="bi bi-chevron-right" style={{ fontSize: '0.7rem', margin: '0 0.25rem' }}></i>
            <span>Booking Monitoring</span>
          </div>
          <h1 className="page-title">Booking Monitoring</h1>
          <p className="page-subtitle">Real-time monitoring of all platform bookings and service requests</p>
        </div>
        <div className="header-actions-right">
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
            <i className="bi bi-download"></i>
            <span>Export Data</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid-small">
        <div className="stat-card-small">
          <div className="stat-label-small">Total Bookings</div>
          <div className="stat-value-small">{totalBookings}</div>
        </div>
        <div className="stat-card-small">
          <div className="stat-label-small">Pending</div>
          <div className="stat-value-small">{pendingBookings}</div>
        </div>
        <div className="stat-card-small">
          <div className="stat-label-small">Completed</div>
          <div className="stat-value-small">{completedBookings}</div>
        </div>
        <div className="stat-card-small">
          <div className="stat-label-small">Revenue</div>
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
              placeholder="Search bookings by service or provider..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="filter-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <select className="filter-select">
            <option>All Services</option>
            <option>Plumbing</option>
            <option>Electrical</option>
            <option>Cleaning</option>
            <option>Carpentry</option>
          </select>
          <select className="filter-select">
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
            <option>All Time</option>
          </select>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="admin-table-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Service</th>
              <th>Provider</th>
              <th>Date & Time</th>
              <th>Location</th>
              <th className="text-end">Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking) => (
              <tr key={booking.id}>
                <td style={{ fontWeight: 700, color: '#2563eb' }}>#{booking.id}</td>
                <td>
                  <div style={{ fontWeight: 600, color: '#0f172a', marginBottom: '0.125rem' }}>
                    {booking.service}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                    {booking.estimatedDuration}
                  </div>
                </td>
                <td>
                  <div className="user-cell">
                    <img
                      src={booking.provider.avatar}
                      alt={booking.provider.name}
                      className="user-avatar"
                    />
                    <div className="user-info">
                      <span className="user-name">{booking.provider.name}</span>
                      <span className="user-email" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <i className="bi bi-star-fill" style={{ color: '#fbbf24', fontSize: '0.625rem' }}></i>
                        {booking.provider.rating}
                      </span>
                    </div>
                  </div>
                </td>
                <td style={{ fontWeight: 600 }}>
                  <div>{booking.date}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{booking.time}</div>
                </td>
                <td style={{ color: '#64748b', fontSize: '0.8125rem' }}>{booking.location}</td>
                <td className="text-end" style={{ fontWeight: 700 }}>₱{booking.totalCost.toLocaleString()}</td>
                <td>
                  <span className={`status-badge status-${booking.status}`}>
                    {booking.status}
                  </span>
                </td>
                <td>
                  <div className="action-btn-group">
                    <button className="action-btn" title="View Details">
                      <i className="bi bi-eye"></i>
                    </button>
                    <button className="action-btn" title="Edit Booking">
                      <i className="bi bi-pencil"></i>
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

export default BookingMonitoring;
