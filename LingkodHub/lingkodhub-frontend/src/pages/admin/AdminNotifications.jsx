import { Link } from 'react-router-dom';
import { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { mockNotifications } from '../../data/mockData';
import './AdminPages.css';

const AdminNotifications = () => {
  const [filterType, setFilterType] = useState('all');

  const filteredNotifications = mockNotifications.filter(notif => {
    return filterType === 'all' || notif.type === filterType;
  });

  const unreadCount = mockNotifications.filter(n => !n.read).length;

  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <div className="breadcrumb-nav">
            <i className="bi bi-house-door"></i>
            <span>Dashboard</span>
            <i className="bi bi-chevron-right" style={{ fontSize: '0.7rem', margin: '0 0.25rem' }}></i>
            <span>Notifications</span>
          </div>
          <h1 className="page-title">Notifications</h1>
          <p className="page-subtitle">System-wide notifications and alerts management</p>
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
            transition: 'all 0.15s ease',
            marginRight: '0.5rem'
          }}>
            <i className="bi bi-check-all"></i>
            <span>Mark All Read</span>
          </button>
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
            <span>Send Notification</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid-small">
        <div className="stat-card-small">
          <div className="stat-label-small">Total</div>
          <div className="stat-value-small">{mockNotifications.length}</div>
        </div>
        <div className="stat-card-small">
          <div className="stat-label-small">Unread</div>
          <div className="stat-value-small">{unreadCount}</div>
        </div>
        <div className="stat-card-small">
          <div className="stat-label-small">Today</div>
          <div className="stat-value-small">{mockNotifications.filter(n => n.date === '2026-06-22').length}</div>
        </div>
        <div className="stat-card-small">
          <div className="stat-label-small">This Week</div>
          <div className="stat-value-small">{mockNotifications.length}</div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <div className="filter-row" style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setFilterType('all')}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                border: filterType === 'all' ? '1px solid #2563eb' : '1px solid #e2e8f0',
                background: filterType === 'all' ? 'rgba(37, 99, 235, 0.1)' : 'white',
                color: filterType === 'all' ? '#2563eb' : '#64748b',
                fontWeight: 600,
                fontSize: '0.8125rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              All
            </button>
            <button
              onClick={() => setFilterType('booking')}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                border: filterType === 'booking' ? '1px solid #2563eb' : '1px solid #e2e8f0',
                background: filterType === 'booking' ? 'rgba(37, 99, 235, 0.1)' : 'white',
                color: filterType === 'booking' ? '#2563eb' : '#64748b',
                fontWeight: 600,
                fontSize: '0.8125rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              Bookings
            </button>
            <button
              onClick={() => setFilterType('review')}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                border: filterType === 'review' ? '1px solid #2563eb' : '1px solid #e2e8f0',
                background: filterType === 'review' ? 'rgba(37, 99, 235, 0.1)' : 'white',
                color: filterType === 'review' ? '#2563eb' : '#64748b',
                fontWeight: 600,
                fontSize: '0.8125rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              Reviews
            </button>
            <button
              onClick={() => setFilterType('payment')}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                border: filterType === 'payment' ? '1px solid #2563eb' : '1px solid #e2e8f0',
                background: filterType === 'payment' ? 'rgba(37, 99, 235, 0.1)' : 'white',
                color: filterType === 'payment' ? '#2563eb' : '#64748b',
                fontWeight: 600,
                fontSize: '0.8125rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              Payments
            </button>
          </div>
          <select className="filter-select">
            <option>All Priority</option>
            <option>High</option>
            <option>Normal</option>
            <option>Low</option>
          </select>
          <select className="filter-select">
            <option>All Time</option>
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
          </select>
          <select className="filter-select">
            <option>All Status</option>
            <option>Unread</option>
            <option>Read</option>
          </select>
        </div>
      </div>

      {/* Notifications Timeline */}
      <div className="notification-timeline">
        {filteredNotifications.map((notif) => (
          <div key={notif.id} className={`notification-item ${!notif.read ? 'unread' : ''}`}>
            <div className={`notification-icon-wrapper icon-${notif.color}`}>
              <i className={`bi ${notif.icon}`}></i>
            </div>
            <div className="notification-content">
              <h4 className="notification-title">{notif.title}</h4>
              <p className="notification-message">{notif.message}</p>
              <div className="notification-time">
                <i className="bi bi-clock" style={{ marginRight: '0.25rem' }}></i>
                {notif.date} • {notif.time}
              </div>
            </div>
            <div className="action-btn-group" style={{ alignSelf: 'flex-start' }}>
              <button className="action-btn" title="Mark as read">
                <i className="bi bi-check"></i>
              </button>
              <button className="action-btn" title="View details">
                <i className="bi bi-eye"></i>
              </button>
              <button className="action-btn action-btn-danger" title="Delete">
                <i className="bi bi-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminNotifications;
