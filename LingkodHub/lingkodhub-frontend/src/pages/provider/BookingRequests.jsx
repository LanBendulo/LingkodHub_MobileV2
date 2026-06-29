import { useState } from 'react';
import ProviderLayout from '../../layouts/ProviderLayout';
import { mockBookings } from '../../data/mockData';
import './ProviderPages.css';

const BookingRequests = () => {
  const [filter, setFilter] = useState('pending');

  const filteredRequests = filter === 'all' 
    ? mockBookings 
    : mockBookings.filter(b => b.status === filter);

  const handleAccept = (id) => {
    alert(`Booking ${id} accepted!`);
  };

  const handleDecline = (id) => {
    alert(`Booking ${id} declined!`);
  };

  return (
    <ProviderLayout>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <div className="breadcrumb-nav">
            <i className="bi bi-house-door"></i>
            <span>Operations</span>
            <i className="bi bi-chevron-right"></i>
            <span>Booking Requests</span>
          </div>
          <h1 className="page-title">Booking Requests</h1>
          <p className="page-subtitle">Manage incoming service requests and bookings</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid-small">
        <div className="stat-card-small">
          <div className="stat-label-small">Pending</div>
          <div className="stat-value-small">{mockBookings.filter(b => b.status === 'pending').length}</div>
        </div>
        <div className="stat-card-small">
          <div className="stat-label-small">Confirmed</div>
          <div className="stat-value-small">{mockBookings.filter(b => b.status === 'confirmed').length}</div>
        </div>
        <div className="stat-card-small">
          <div className="stat-label-small">Completed</div>
          <div className="stat-value-small">{mockBookings.filter(b => b.status === 'completed').length}</div>
        </div>
        <div className="stat-card-small">
          <div className="stat-label-small">All Requests</div>
          <div className="stat-value-small">{mockBookings.length}</div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <div className="filter-row" style={{ gridTemplateColumns: '1fr auto' }}>
          <div className="search-input-wrapper">
            <i className="bi bi-search"></i>
            <input type="text" placeholder="Search by service, location, or client..." />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setFilter('all')}
              className={`filter-select ${filter === 'all' ? 'active' : ''}`}
              style={{
                background: filter === 'all' ? '#2563eb' : '#f8fafc',
                color: filter === 'all' ? 'white' : '#0f172a',
                border: filter === 'all' ? '1px solid #2563eb' : '1px solid #e2e8f0',
                cursor: 'pointer'
              }}
            >
              All ({mockBookings.length})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`filter-select ${filter === 'pending' ? 'active' : ''}`}
              style={{
                background: filter === 'pending' ? '#fbbf24' : '#f8fafc',
                color: filter === 'pending' ? 'white' : '#0f172a',
                border: filter === 'pending' ? '1px solid #fbbf24' : '1px solid #e2e8f0',
                cursor: 'pointer'
              }}
            >
              Pending ({mockBookings.filter(b => b.status === 'pending').length})
            </button>
            <button
              onClick={() => setFilter('confirmed')}
              className={`filter-select ${filter === 'confirmed' ? 'active' : ''}`}
              style={{
                background: filter === 'confirmed' ? '#2563eb' : '#f8fafc',
                color: filter === 'confirmed' ? 'white' : '#0f172a',
                border: filter === 'confirmed' ? '1px solid #2563eb' : '1px solid #e2e8f0',
                cursor: 'pointer'
              }}
            >
              Confirmed ({mockBookings.filter(b => b.status === 'confirmed').length})
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`filter-select ${filter === 'completed' ? 'active' : ''}`}
              style={{
                background: filter === 'completed' ? '#2563eb' : '#f8fafc',
                color: filter === 'completed' ? 'white' : '#0f172a',
                border: filter === 'completed' ? '1px solid #2563eb' : '1px solid #e2e8f0',
                cursor: 'pointer'
              }}
            >
              Completed ({mockBookings.filter(b => b.status === 'completed').length})
            </button>
          </div>
        </div>
      </div>

      {/* Requests List */}
      {filteredRequests.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>
          {filteredRequests.map((booking) => (
            <div key={booking.id} className="settings-card">
              <div className="settings-card-body">
                <div className="row">
                  <div className="col-md-8">
                    <div style={{ marginBottom: '1.125rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.625rem' }}>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: '700', color: '#0f172a', margin: 0, letterSpacing: '-0.02em' }}>
                          {booking.service}
                        </h3>
                        <span className={`status-badge status-${booking.status}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.875rem', marginBottom: '1.125rem' }}>
                      <div>
                        <div style={{ fontSize: '0.6875rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.375rem' }}>
                          Date & Time
                        </div>
                        <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#0f172a' }}>
                          <i className="bi bi-calendar me-2"></i>
                          {booking.date}
                        </div>
                        <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#0f172a' }}>
                          <i className="bi bi-clock me-2"></i>
                          {booking.time}
                        </div>
                      </div>

                      <div>
                        <div style={{ fontSize: '0.6875rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.375rem' }}>
                          Duration
                        </div>
                        <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#0f172a' }}>
                          <i className="bi bi-hourglass-split me-2"></i>
                          {booking.estimatedDuration}
                        </div>
                      </div>

                      <div>
                        <div style={{ fontSize: '0.6875rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.375rem' }}>
                          Location
                        </div>
                        <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#0f172a' }}>
                          <i className="bi bi-geo-alt me-2"></i>
                          {booking.location}
                        </div>
                      </div>
                    </div>

                    {booking.description && (
                      <div style={{ 
                        padding: '1rem', 
                        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', 
                        borderRadius: '0.5rem',
                        border: '1px solid #f1f5f9'
                      }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>
                          Service Details
                        </div>
                        <div style={{ fontSize: '0.8125rem', color: '#64748b', lineHeight: '1.5' }}>
                          {booking.description}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="col-md-4">
                    <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                      <div style={{ fontSize: '0.6875rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>
                        Total Amount
                      </div>
                      <div style={{ fontSize: '2rem', fontWeight: '800', color: '#2563eb', lineHeight: '1', marginBottom: '0.5rem', letterSpacing: '-0.04em' }}>
                        ₱{booking.totalCost}
                      </div>
                    </div>

                    {booking.status === 'pending' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                        <button
                          className="action-btn action-btn-primary"
                          onClick={() => handleAccept(booking.id)}
                          style={{ width: '100%', padding: '0.75rem', height: 'auto', fontWeight: '700' }}
                        >
                          <i className="bi bi-check-circle me-2"></i>
                          Accept Request
                        </button>
                        <button
                          className="action-btn action-btn-danger"
                          onClick={() => handleDecline(booking.id)}
                          style={{ width: '100%', padding: '0.75rem', height: 'auto', fontWeight: '700' }}
                        >
                          <i className="bi bi-x-circle me-2"></i>
                          Decline
                        </button>
                        <button
                          className="action-btn"
                          style={{ width: '100%', padding: '0.75rem', height: 'auto', fontWeight: '700' }}
                        >
                          <i className="bi bi-chat-dots me-2"></i>
                          Message Client
                        </button>
                      </div>
                    )}

                    {booking.status === 'confirmed' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                        <button
                          className="action-btn"
                          style={{ width: '100%', padding: '0.75rem', height: 'auto', fontWeight: '700' }}
                        >
                          <i className="bi bi-chat-dots me-2"></i>
                          Message Client
                        </button>
                        <button
                          className="action-btn action-btn-primary"
                          style={{ width: '100%', padding: '0.75rem', height: 'auto', fontWeight: '700' }}
                        >
                          <i className="bi bi-check-circle me-2"></i>
                          Mark as Complete
                        </button>
                        <button
                          className="action-btn action-btn-danger"
                          style={{ width: '100%', padding: '0.75rem', height: 'auto', fontWeight: '700' }}
                        >
                          <i className="bi bi-x-circle me-2"></i>
                          Cancel Booking
                        </button>
                      </div>
                    )}

                    {booking.status === 'completed' && (
                      <div>
                        <button
                          className="action-btn action-btn-primary"
                          disabled
                          style={{ width: '100%', padding: '0.75rem', height: 'auto', fontWeight: '700', opacity: 0.6, cursor: 'not-allowed' }}
                        >
                          <i className="bi bi-check-circle-fill me-2"></i>
                          Completed
                        </button>
                        {booking.rating && (
                          <div style={{ 
                            marginTop: '1rem',
                            padding: '1rem', 
                            background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%)',
                            borderRadius: '0.5rem',
                            border: '1px solid rgba(251, 191, 36, 0.2)'
                          }}>
                            <div className="text-warning" style={{ marginBottom: '0.5rem', fontSize: '1.125rem' }}>
                              {[...Array(booking.rating)].map((_, i) => (
                                <i key={i} className="bi bi-star-fill"></i>
                              ))}
                            </div>
                            <div style={{ fontSize: '0.75rem', fontWeight: '600', color: '#64748b' }}>
                              Client rated this service
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="settings-card">
          <div className="settings-card-body text-center py-5">
            <i className="bi bi-inbox" style={{ fontSize: '4rem', color: '#cbd5e1', marginBottom: '1.5rem', display: 'block' }}></i>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.5rem' }}>No requests found</h3>
            <p style={{ color: '#64748b', margin: 0, fontSize: '0.9375rem' }}>
              {filter === 'all' 
                ? "You don't have any booking requests yet"
                : `No ${filter} requests at the moment`}
            </p>
          </div>
        </div>
      )}
    </ProviderLayout>
  );
};

export default BookingRequests;
