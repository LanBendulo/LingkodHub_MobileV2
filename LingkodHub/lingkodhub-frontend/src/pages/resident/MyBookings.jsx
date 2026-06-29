import { useState } from 'react';
import { Link } from 'react-router-dom';
import ResidentLayout from '../../layouts/ResidentLayout';
import { mockBookings } from '../../data/mockData';
import './ResidentPages.css';

const MyBookings = () => {
  const [filter, setFilter] = useState('all');

  const filteredBookings = filter === 'all' 
    ? mockBookings 
    : mockBookings.filter(b => b.status === filter);

  return (
    <ResidentLayout>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <div className="breadcrumb-nav">
            <i className="bi bi-house-door"></i>
            <span>Bookings</span>
            <i className="bi bi-chevron-right"></i>
            <span>My Bookings</span>
          </div>
          <h1 className="page-title">My Bookings</h1>
          <p className="page-subtitle">Manage and track your service bookings</p>
        </div>
        <Link 
          to="/resident/find-services"
          className="action-btn action-btn-primary"
          style={{ width: 'auto', padding: '0.625rem 1.5rem', height: 'auto', fontWeight: '700' }}
        >
          <i className="bi bi-plus-circle me-2"></i>
          New Booking
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid-small">
        <div className="stat-card-small">
          <div className="stat-label-small">All Bookings</div>
          <div className="stat-value-small">{mockBookings.length}</div>
        </div>
        <div className="stat-card-small">
          <div className="stat-label-small">Confirmed</div>
          <div className="stat-value-small">{mockBookings.filter(b => b.status === 'confirmed').length}</div>
        </div>
        <div className="stat-card-small">
          <div className="stat-label-small">Pending</div>
          <div className="stat-value-small">{mockBookings.filter(b => b.status === 'pending').length}</div>
        </div>
        <div className="stat-card-small">
          <div className="stat-label-small">Completed</div>
          <div className="stat-value-small">{mockBookings.filter(b => b.status === 'completed').length}</div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <div className="filter-row" style={{ gridTemplateColumns: '1fr auto' }}>
          <div className="search-input-wrapper">
            <i className="bi bi-search"></i>
            <input type="text" placeholder="Search bookings by service or provider..." />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setFilter('all')}
              className="filter-select"
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
              onClick={() => setFilter('confirmed')}
              className="filter-select"
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
              onClick={() => setFilter('pending')}
              className="filter-select"
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
              onClick={() => setFilter('completed')}
              className="filter-select"
              style={{
                background: filter === 'completed' ? '#10b981' : '#f8fafc',
                color: filter === 'completed' ? 'white' : '#0f172a',
                border: filter === 'completed' ? '1px solid #10b981' : '1px solid #e2e8f0',
                cursor: 'pointer'
              }}
            >
              Completed ({mockBookings.filter(b => b.status === 'completed').length})
            </button>
          </div>
        </div>
      </div>

      {/* Bookings List */}
      {filteredBookings.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>
          {filteredBookings.map((booking) => (
            <div key={booking.id} className="settings-card">
              <div className="settings-card-body">
                <div className="row align-items-center">
                  <div className="col-md-2 text-center mb-3 mb-md-0">
                    <img
                      src={booking.provider.avatar}
                      alt={booking.provider.name}
                      style={{
                        width: '72px',
                        height: '72px',
                        borderRadius: '0.75rem',
                        border: '2px solid #e2e8f0',
                        marginBottom: '0.75rem',
                        objectFit: 'cover'
                      }}
                    />
                    <div style={{ fontWeight: '700', fontSize: '0.875rem', color: '#0f172a', marginBottom: '0.25rem' }}>
                      {booking.provider.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                      <i className="bi bi-star-fill" style={{ color: '#fbbf24' }}></i> {booking.provider.rating}
                    </div>
                  </div>

                  <div className="col-md-6 mb-3 mb-md-0">
                    <h3 style={{ fontSize: '1.125rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.875rem', letterSpacing: '-0.02em' }}>
                      {booking.service}
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.625rem', marginBottom: '0.875rem' }}>
                      <div style={{ fontSize: '0.8125rem', color: '#64748b', fontWeight: '500' }}>
                        <i className="bi bi-calendar me-2"></i>
                        {booking.date}
                      </div>
                      <div style={{ fontSize: '0.8125rem', color: '#64748b', fontWeight: '500' }}>
                        <i className="bi bi-clock me-2"></i>
                        {booking.time}
                      </div>
                      <div style={{ fontSize: '0.8125rem', color: '#64748b', fontWeight: '500' }}>
                        <i className="bi bi-geo-alt me-2"></i>
                        {booking.location}
                      </div>
                      <div style={{ fontSize: '0.8125rem', color: '#64748b', fontWeight: '500' }}>
                        <i className="bi bi-hourglass-split me-2"></i>
                        {booking.estimatedDuration}
                      </div>
                    </div>
                    {booking.description && (
                      <div style={{
                        padding: '0.75rem',
                        background: '#f8fafc',
                        borderRadius: '0.5rem',
                        fontSize: '0.8125rem',
                        color: '#64748b',
                        lineHeight: '1.5'
                      }}>
                        <strong style={{ color: '#0f172a' }}>Details:</strong> {booking.description}
                      </div>
                    )}
                  </div>

                  <div className="col-md-2 text-center mb-3 mb-md-0">
                    <div style={{ marginBottom: '1rem' }}>
                      <div style={{ fontSize: '0.6875rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.375rem' }}>
                        Total Amount
                      </div>
                      <div style={{ fontSize: '2rem', fontWeight: '800', color: '#2563eb', lineHeight: '1', letterSpacing: '-0.04em' }}>
                        ₱{booking.totalCost}
                      </div>
                    </div>
                    <span className={`status-badge status-${booking.status}`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </div>

                  <div className="col-md-2">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                      {booking.status === 'confirmed' && (
                        <>
                          <button className="action-btn" style={{ width: '100%', padding: '0.625rem', height: 'auto', fontWeight: '600' }}>
                            <i className="bi bi-chat-dots me-2"></i>
                            Message
                          </button>
                          <button className="action-btn action-btn-danger" style={{ width: '100%', padding: '0.625rem', height: 'auto', fontWeight: '600' }}>
                            Cancel
                          </button>
                        </>
                      )}
                      {booking.status === 'pending' && (
                        <>
                          <button className="action-btn" style={{ width: '100%', padding: '0.625rem', height: 'auto', fontWeight: '600' }}>
                            <i className="bi bi-pencil me-2"></i>
                            Edit
                          </button>
                          <button className="action-btn action-btn-danger" style={{ width: '100%', padding: '0.625rem', height: 'auto', fontWeight: '600' }}>
                            Cancel
                          </button>
                        </>
                      )}
                      {booking.status === 'completed' && (
                        <>
                          {booking.rating ? (
                            <button className="action-btn" disabled style={{ width: '100%', padding: '0.625rem', height: 'auto', fontWeight: '600', opacity: 0.6, cursor: 'not-allowed' }}>
                              <i className="bi bi-check-circle me-2"></i>
                              Reviewed
                            </button>
                          ) : (
                            <button className="action-btn action-btn-primary" style={{ width: '100%', padding: '0.625rem', height: 'auto', fontWeight: '600' }}>
                              <i className="bi bi-star me-2"></i>
                              Review
                            </button>
                          )}
                          <button className="action-btn" style={{ width: '100%', padding: '0.625rem', height: 'auto', fontWeight: '600' }}>
                            Book Again
                          </button>
                        </>
                      )}
                      {booking.status === 'cancelled' && (
                        <button className="action-btn" style={{ width: '100%', padding: '0.625rem', height: 'auto', fontWeight: '600' }}>
                          Book Again
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="settings-card">
          <div className="settings-card-body text-center py-5">
            <i className="bi bi-calendar-x" style={{ fontSize: '4rem', color: '#cbd5e1', marginBottom: '1.5rem', display: 'block' }}></i>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.5rem' }}>No bookings found</h3>
            <p style={{ color: '#64748b', marginBottom: '1.25rem', fontSize: '0.9375rem' }}>
              {filter === 'all' 
                ? "You haven't made any bookings yet"
                : `No ${filter} bookings at the moment`}
            </p>
            <Link 
              to="/resident/find-services"
              className="action-btn action-btn-primary"
              style={{ width: 'auto', padding: '0.625rem 1.5rem', height: 'auto' }}
            >
              <i className="bi bi-plus-circle me-2"></i>
              Book a Service
            </Link>
          </div>
        </div>
      )}
    </ResidentLayout>
  );
};

export default MyBookings;
