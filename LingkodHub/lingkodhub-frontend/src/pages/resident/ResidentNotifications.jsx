import { useState } from 'react';
import ResidentLayout from '../../layouts/ResidentLayout';
import { mockNotifications } from '../../data/mockData';
import '../resident/ResidentPages.css';

const ResidentNotifications = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  // Calculate notification statistics
  const totalNotifications = mockNotifications.length;
  const unreadCount = mockNotifications.filter(n => !n.read).length;
  const todayCount = mockNotifications.filter(n => n.time.includes('ago')).length;

  const filteredNotifications = mockNotifications.filter(notif => {
    if (activeFilter === 'unread') return !notif.read;
    if (activeFilter === 'read') return notif.read;
    return true;
  });

  const getNotificationColor = (color) => {
    const colorMap = {
      'primary': '#2563EB',
      'success': '#10B981',
      'warning': '#FBBF24',
      'danger': '#EF4444',
      'info': '#3B82F6'
    };
    return colorMap[color] || '#2563EB';
  };

  return (
    <ResidentLayout>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Notifications</h1>
          <p className="page-subtitle">Stay updated with your bookings and activity</p>
        </div>
        <button style={{
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
          <i className="bi bi-check2-all"></i>
          Mark All as Read
        </button>
      </div>

      {/* KPI Cards Row */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="kpi-card">
            <div className="kpi-card-accent"></div>
            <div className="kpi-card-content">
              <div className="kpi-label">Total Notifications</div>
              <div className="kpi-value">{totalNotifications}</div>
              <div className="kpi-change">
                <i className="bi bi-bell"></i>
                All messages
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="kpi-card">
            <div className="kpi-card-accent"></div>
            <div className="kpi-card-content">
              <div className="kpi-label">Unread</div>
              <div className="kpi-value">{unreadCount}</div>
              <div className="kpi-change warning">
                <i className="bi bi-exclamation-circle"></i>
                Needs attention
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="kpi-card">
            <div className="kpi-card-accent"></div>
            <div className="kpi-card-content">
              <div className="kpi-label">Today</div>
              <div className="kpi-value">{todayCount}</div>
              <div className="kpi-change">
                <i className="bi bi-calendar-day"></i>
                Recent activity
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            onClick={() => setActiveFilter('all')}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              border: activeFilter === 'all' ? '1px solid #2563eb' : '1px solid #e2e8f0',
              background: activeFilter === 'all' ? 'rgba(37, 99, 235, 0.1)' : 'white',
              color: activeFilter === 'all' ? '#2563eb' : '#64748b',
              fontWeight: 600,
              fontSize: '0.8125rem',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            All ({totalNotifications})
          </button>
          <button 
            onClick={() => setActiveFilter('unread')}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              border: activeFilter === 'unread' ? '1px solid #2563eb' : '1px solid #e2e8f0',
              background: activeFilter === 'unread' ? 'rgba(37, 99, 235, 0.1)' : 'white',
              color: activeFilter === 'unread' ? '#2563eb' : '#64748b',
              fontWeight: 600,
              fontSize: '0.8125rem',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            Unread ({unreadCount})
          </button>
          <button 
            onClick={() => setActiveFilter('read')}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              border: activeFilter === 'read' ? '1px solid #2563eb' : '1px solid #e2e8f0',
              background: activeFilter === 'read' ? 'rgba(37, 99, 235, 0.1)' : 'white',
              color: activeFilter === 'read' ? '#2563eb' : '#64748b',
              fontWeight: 600,
              fontSize: '0.8125rem',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            Read ({totalNotifications - unreadCount})
          </button>
        </div>
      </div>

      {/* Notifications Timeline */}
      <div className="notification-timeline">
        {filteredNotifications.map((notif) => (
          <div 
            key={notif.id} 
            className={`notification-item ${!notif.read ? 'unread' : ''}`}
          >
            <div 
              className={`notification-icon-wrapper icon-${notif.color}`}
            >
              <i className={`bi ${notif.icon}`}></i>
            </div>
            <div className="notification-content">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
                <h4 className="notification-title">{notif.title}</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {!notif.read && (
                    <span className="status-badge status-active">
                      New
                    </span>
                  )}
                  <span className="notification-time">{notif.time}</span>
                </div>
              </div>
              <p className="notification-message">{notif.message}</p>
              <div className="notification-time">
                <i className="bi bi-calendar3" style={{ marginRight: '0.25rem' }}></i>
                {notif.date}
              </div>
            </div>
            <div className="action-btn-group" style={{ alignSelf: 'flex-start' }}>
              {!notif.read && (
                <button className="action-btn" title="Mark as read">
                  <i className="bi bi-check"></i>
                </button>
              )}
              <button className="action-btn" title="View details">
                <i className="bi bi-eye"></i>
              </button>
            </div>
          </div>
        ))}

        {filteredNotifications.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', background: 'white', borderRadius: '0.75rem' }}>
            <i className="bi bi-inbox" style={{ fontSize: '4rem', color: '#cbd5e1', marginBottom: '1rem', display: 'block' }}></i>
            <h5 style={{ color: '#64748b', marginBottom: '0.5rem' }}>No notifications found</h5>
            <p style={{ color: '#94a3b8', margin: 0 }}>You're all caught up!</p>
          </div>
        )}
      </div>
    </ResidentLayout>
  );
};

export default ResidentNotifications;
