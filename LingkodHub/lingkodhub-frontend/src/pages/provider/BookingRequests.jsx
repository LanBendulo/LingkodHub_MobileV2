import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ProviderLayout from '../../layouts/ProviderLayout';
import { mockBookingsProvider, getBookingsByStatus } from '../../data/providerMockData';
import './ProviderPages.css';
import './ProviderWorkflow.css';

const BookingRequests = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tabFromUrl = searchParams.get('tab') || 'all';
  
  const [filter, setFilter] = useState(tabFromUrl);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Load from localStorage or use mock data
    const savedBookings = localStorage.getItem('provider_bookings');
    const loadedBookings = savedBookings ? JSON.parse(savedBookings) : mockBookingsProvider;
    setBookings(loadedBookings);
  }, []);

  useEffect(() => {
    setFilter(tabFromUrl);
  }, [tabFromUrl]);

  const filteredRequests = filter === 'all' 
    ? bookings 
    : bookings.filter(b => b.status === filter);

  const getStatusCounts = () => ({
    all: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    'in-progress': bookings.filter(b => b.status === 'in-progress').length,
    completed: bookings.filter(b => b.status === 'completed').length,
    declined: bookings.filter(b => b.status === 'declined').length,
  });

  const counts = getStatusCounts();

  const handleViewDetails = (bookingId) => {
    navigate(`/provider/booking/${bookingId}`);
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
          <div className="stat-label-small">All Requests</div>
          <div className="stat-value-small">{counts.all}</div>
        </div>
        <div className="stat-card-small">
          <div className="stat-label-small">Pending</div>
          <div className="stat-value-small">{counts.pending}</div>
        </div>
        <div className="stat-card-small">
          <div className="stat-label-small">Confirmed</div>
          <div className="stat-value-small">{counts.confirmed}</div>
        </div>
        <div className="stat-card-small">
          <div className="stat-label-small">In Progress</div>
          <div className="stat-value-small">{counts['in-progress']}</div>
        </div>
        <div className="stat-card-small">
          <div className="stat-label-small">Completed</div>
          <div className="stat-value-small">{counts.completed}</div>
        </div>
        <div className="stat-card-small">
          <div className="stat-label-small">Declined</div>
          <div className="stat-value-small">{counts.declined}</div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <div className="filter-row" style={{ gridTemplateColumns: '1fr' }}>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
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
              All ({counts.all})
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
              Pending ({counts.pending})
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
              Confirmed ({counts.confirmed})
            </button>
            <button
              onClick={() => setFilter('in-progress')}
              className={`filter-select ${filter === 'in-progress' ? 'active' : ''}`}
              style={{
                background: filter === 'in-progress' ? '#8b5cf6' : '#f8fafc',
                color: filter === 'in-progress' ? 'white' : '#0f172a',
                border: filter === 'in-progress' ? '1px solid #8b5cf6' : '1px solid #e2e8f0',
                cursor: 'pointer'
              }}
            >
              In Progress ({counts['in-progress']})
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`filter-select ${filter === 'completed' ? 'active' : ''}`}
              style={{
                background: filter === 'completed' ? '#10b981' : '#f8fafc',
                color: filter === 'completed' ? 'white' : '#0f172a',
                border: filter === 'completed' ? '1px solid #10b981' : '1px solid #e2e8f0',
                cursor: 'pointer'
              }}
            >
              Completed ({counts.completed})
            </button>
            <button
              onClick={() => setFilter('declined')}
              className={`filter-select ${filter === 'declined' ? 'active' : ''}`}
              style={{
                background: filter === 'declined' ? '#dc2626' : '#f8fafc',
                color: filter === 'declined' ? 'white' : '#0f172a',
                border: filter === 'declined' ? '1px solid #dc2626' : '1px solid #e2e8f0',
                cursor: 'pointer'
              }}
            >
              Declined ({counts.declined})
            </button>
          </div>
        </div>
      </div>

      {/* Requests List */}
      {filteredRequests.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>
          {filteredRequests.map((booking) => (
            <div key={booking.id} className="booking-card-provider">
              {/* Header */}
              <div className="booking-card-header">
                <div className="booking-id-badge">
                  <i className="bi bi-bookmark-fill"></i>
                  {booking.id}
                </div>
                <span className={`booking-status-badge status-${booking.status}`}>
                  {booking.status === 'in-progress' ? 'IN PROGRESS' : booking.status.toUpperCase()}
                </span>
              </div>

              {/* Body */}
              <div className="booking-card-body">
                {/* Resident Info */}
                <div className="booking-resident">
                  <img 
                    src={booking.resident.avatar} 
                    alt={booking.resident.name}
                    className="resident-avatar-booking"
                  />
                  <div className="resident-info-booking">
                    <h4 className="resident-name-booking">{booking.resident.name}</h4>
                    <div className="resident-contact-row">
                      <div className="contact-info-item">
                        <i className="bi bi-telephone-fill"></i>
                        {booking.resident.phone}
                      </div>
                      <div className="contact-info-item">
                        <i className="bi bi-envelope-fill"></i>
                        {booking.resident.email}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Booking Details Grid */}
                <div className="booking-details-grid">
                  <div className="booking-detail-item">
                    <div className="detail-icon-wrapper detail-icon-service">
                      <i className={`bi ${booking.service.icon}`}></i>
                    </div>
                    <div className="detail-content">
                      <div className="detail-label">Service</div>
                      <div className="detail-value">{booking.service.name}</div>
                    </div>
                  </div>

                  <div className="booking-detail-item">
                    <div className="detail-icon-wrapper detail-icon-date">
                      <i className="bi bi-calendar-event"></i>
                    </div>
                    <div className="detail-content">
                      <div className="detail-label">Date & Time</div>
                      <div className="detail-value">{booking.date} at {booking.time}</div>
                    </div>
                  </div>

                  <div className="booking-detail-item">
                    <div className="detail-icon-wrapper detail-icon-location">
                      <i className="bi bi-geo-alt-fill"></i>
                    </div>
                    <div className="detail-content">
                      <div className="detail-label">Location</div>
                      <div className="detail-value">{booking.address.barangay}</div>
                    </div>
                  </div>

                  <div className="booking-detail-item">
                    <div className="detail-icon-wrapper detail-icon-price">
                      <i className="bi bi-currency-dollar"></i>
                    </div>
                    <div className="detail-content">
                      <div className="detail-label">Your Price</div>
                      <div className="detail-value detail-value-price">₱{booking.pricing.provider}</div>
                    </div>
                  </div>
                </div>

                {/* Problem Preview */}
                {booking.problemDescription && (
                  <div className="problem-preview">
                    <div className="problem-preview-label">
                      <i className="bi bi-chat-left-text"></i>
                      Problem Description
                    </div>
                    <p className="problem-preview-text">
                      {booking.problemDescription.length > 150 
                        ? booking.problemDescription.substring(0, 150) + '...' 
                        : booking.problemDescription}
                    </p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="booking-card-footer">
                <div className="booking-meta-time">
                  <i className="bi bi-clock-history"></i>
                  Requested {new Date(booking.createdAt).toLocaleDateString()}
                </div>
                <div className="booking-actions-row">
                  <button 
                    className="btn-booking-action btn-view-details"
                    onClick={() => handleViewDetails(booking.id)}
                  >
                    <i className="bi bi-eye"></i>
                    View Details
                  </button>
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
