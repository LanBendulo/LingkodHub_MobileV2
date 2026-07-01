import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProviderLayout from '../../layouts/ProviderLayout';
import { mockBookingsProvider } from '../../data/providerMockData';
import './ProviderWorkflow.css';

const BookingDetailsProvider = () => {
  const navigate = useNavigate();
  const { bookingId } = useParams();
  
  const [booking, setBooking] = useState(null);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [showStartModal, setShowStartModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [declineReason, setDeclineReason] = useState('');

  useEffect(() => {
    // Load from localStorage or use mock data
    const savedBookings = localStorage.getItem('provider_bookings');
    const bookings = savedBookings ? JSON.parse(savedBookings) : mockBookingsProvider;
    const foundBooking = bookings.find(b => b.id === bookingId);
    
    if (foundBooking) {
      setBooking(foundBooking);
    } else {
      navigate('/provider/requests');
    }
  }, [bookingId, navigate]);

  const updateBookingStatus = (newStatus, additionalData = {}) => {
    const savedBookings = localStorage.getItem('provider_bookings');
    const bookings = savedBookings ? JSON.parse(savedBookings) : mockBookingsProvider;
    
    const updatedBookings = bookings.map(b =>
      b.id === bookingId
        ? {
            ...b,
            status: newStatus,
            updatedAt: new Date().toISOString(),
            ...additionalData,
          }
        : b
    );
    
    localStorage.setItem('provider_bookings', JSON.stringify(updatedBookings));
    setBooking(updatedBookings.find(b => b.id === bookingId));
  };

  const handleAccept = () => {
    updateBookingStatus('confirmed', {
      confirmedAt: new Date().toISOString(),
    });
    setShowAcceptModal(false);
    setTimeout(() => {
      navigate('/provider/requests?tab=confirmed');
    }, 500);
  };

  const handleDecline = () => {
    if (!declineReason.trim()) {
      alert('Please provide a reason for declining');
      return;
    }
    
    updateBookingStatus('declined', {
      declinedAt: new Date().toISOString(),
      declinedReason: declineReason,
    });
    setShowDeclineModal(false);
    setTimeout(() => {
      navigate('/provider/requests?tab=declined');
    }, 500);
  };

  const handleStartService = () => {
    updateBookingStatus('in-progress', {
      startedAt: new Date().toISOString(),
    });
    setShowStartModal(false);
    setTimeout(() => {
      navigate(`/provider/service-in-progress/${bookingId}`);
    }, 500);
  };

  const handleCompleteService = () => {
    updateBookingStatus('completed', {
      completedAt: new Date().toISOString(),
    });
    setShowCompleteModal(false);
    setTimeout(() => {
      navigate('/provider/requests?tab=completed');
    }, 500);
  };

  const isToday = (dateString) => {
    const today = new Date().toISOString().split('T')[0];
    return dateString === today;
  };

  if (!booking) {
    return (
      <ProviderLayout>
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </ProviderLayout>
    );
  }

  return (
    <ProviderLayout>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <div className="breadcrumb-nav">
            <i className="bi bi-house-door"></i>
            <span>Booking Requests</span>
            <i className="bi bi-chevron-right"></i>
            <span>{booking.id}</span>
          </div>
          <h1 className="page-title">Booking Details</h1>
          <p className="page-subtitle">Review booking request and take action</p>
        </div>
        <button 
          className="action-btn"
          onClick={() => navigate('/provider/requests')}
        >
          <i className="bi bi-arrow-left me-2"></i>
          Back to Requests
        </button>
      </div>

      <div className="provider-detail-grid">
        {/* Main Content */}
        <div className="provider-detail-main">
          {/* Resident Information */}
          <div className="detail-card-provider">
            <h3 className="detail-card-title">
              <i className="bi bi-person-circle"></i>
              Resident Information
            </h3>
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
          </div>

          {/* Service Details */}
          <div className="detail-card-provider">
            <h3 className="detail-card-title">
              <i className="bi bi-tools"></i>
              Service Details
            </h3>
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
                <div className="detail-icon-wrapper detail-icon-service">
                  <i className="bi bi-tag-fill"></i>
                </div>
                <div className="detail-content">
                  <div className="detail-label">Category</div>
                  <div className="detail-value">{booking.service.category}</div>
                </div>
              </div>

              <div className="booking-detail-item">
                <div className="detail-icon-wrapper detail-icon-date">
                  <i className="bi bi-calendar-event"></i>
                </div>
                <div className="detail-content">
                  <div className="detail-label">Date</div>
                  <div className="detail-value">{booking.date}</div>
                </div>
              </div>

              <div className="booking-detail-item">
                <div className="detail-icon-wrapper detail-icon-date">
                  <i className="bi bi-clock"></i>
                </div>
                <div className="detail-content">
                  <div className="detail-label">Time</div>
                  <div className="detail-value">{booking.time}</div>
                </div>
              </div>

              <div className="booking-detail-item">
                <div className="detail-icon-wrapper detail-icon-service">
                  <i className="bi bi-hourglass-split"></i>
                </div>
                <div className="detail-content">
                  <div className="detail-label">Duration</div>
                  <div className="detail-value">{booking.pricing.duration}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Problem Description */}
          <div className="detail-card-provider">
            <h3 className="detail-card-title">
              <i className="bi bi-chat-left-text"></i>
              Problem Description
            </h3>
            <p style={{ 
              fontSize: '0.9375rem', 
              color: '#0f172a', 
              lineHeight: '1.7',
              margin: 0 
            }}>
              {booking.problemDescription}
            </p>
          </div>

          {/* Service Location */}
          <div className="detail-card-provider">
            <h3 className="detail-card-title">
              <i className="bi bi-geo-alt"></i>
              Service Location
            </h3>
            <div style={{ 
              padding: '1.25rem',
              background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
              border: '1px solid #f1f5f9',
              borderRadius: '0.625rem'
            }}>
              <div style={{ 
                fontSize: '1.0625rem', 
                fontWeight: '700', 
                color: '#0f172a',
                marginBottom: '0.5rem',
                letterSpacing: '-0.01em'
              }}>
                {booking.address.full}
              </div>
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '0.75rem',
                marginTop: '1rem'
              }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.25rem' }}>House No.</div>
                  <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#0f172a' }}>{booking.address.house}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.25rem' }}>Street</div>
                  <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#0f172a' }}>{booking.address.street}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.25rem' }}>Barangay</div>
                  <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#0f172a' }}>{booking.address.barangay}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.25rem' }}>City</div>
                  <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#0f172a' }}>{booking.address.city}</div>
                </div>
              </div>
              <button 
                className="btn-booking-action btn-view-details"
                style={{ width: '100%', marginTop: '1rem' }}
                onClick={() => window.open(`https://www.google.com/maps/search/${encodeURIComponent(booking.address.full)}`, '_blank')}
              >
                <i className="bi bi-map me-2"></i>
                Get Directions
              </button>
            </div>
          </div>

          {/* Uploaded Photos */}
          {booking.images && booking.images.length > 0 && (
            <div className="detail-card-provider">
              <h3 className="detail-card-title">
                <i className="bi bi-images"></i>
                Uploaded Photos ({booking.images.length})
              </h3>
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '1rem'
              }}>
                {booking.images.map((image, index) => (
                  <img 
                    key={index}
                    src={image}
                    alt={`Photo ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover',
                      borderRadius: '0.625rem',
                      border: '2px solid #e2e8f0',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onClick={() => window.open(image, '_blank')}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="provider-detail-sidebar sticky-sidebar-provider">
          {/* Booking Summary */}
          <div className="detail-card-provider">
            <h3 className="detail-card-title">
              <i className="bi bi-clipboard-check"></i>
              Booking Summary
            </h3>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.75rem'
              }}>
                <span style={{ fontSize: '0.8125rem', fontWeight: '600', color: '#64748b' }}>
                  Booking ID
                </span>
                <span style={{ fontSize: '0.875rem', fontWeight: '700', color: '#0f172a' }}>
                  {booking.id}
                </span>
              </div>
              
              <div style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.75rem'
              }}>
                <span style={{ fontSize: '0.8125rem', fontWeight: '600', color: '#64748b' }}>
                  Status
                </span>
                <span className={`booking-status-badge status-${booking.status}`}>
                  {booking.status.toUpperCase()}
                </span>
              </div>
              
              <div style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.75rem'
              }}>
                <span style={{ fontSize: '0.8125rem', fontWeight: '600', color: '#64748b' }}>
                  Date & Time
                </span>
                <span style={{ fontSize: '0.875rem', fontWeight: '700', color: '#0f172a' }}>
                  {booking.date}<br />{booking.time}
                </span>
              </div>
              
              <div style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ fontSize: '0.8125rem', fontWeight: '600', color: '#64748b' }}>
                  Requested
                </span>
                <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#64748b' }}>
                  {new Date(booking.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Pricing */}
            <div style={{
              padding: '1.25rem',
              background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(59, 130, 246, 0.02) 100%)',
              borderRadius: '0.625rem',
              border: '1px solid rgba(37, 99, 235, 0.1)',
              marginBottom: '1.5rem'
            }}>
              <div style={{ marginBottom: '0.75rem' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.375rem' }}>
                  Platform Suggested
                </div>
                <div style={{ fontSize: '1.125rem', fontWeight: '700', color: '#64748b' }}>
                  ₱{booking.pricing.suggested}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#2563eb', marginBottom: '0.375rem' }}>
                  Your Starting Price
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#2563eb', letterSpacing: '-0.03em' }}>
                  ₱{booking.pricing.provider}
                </div>
              </div>
              <div style={{ 
                fontSize: '0.75rem',
                color: '#64748b',
                marginTop: '0.75rem',
                paddingTop: '0.75rem',
                borderTop: '1px solid rgba(37, 99, 235, 0.1)'
              }}>
                <i className="bi bi-info-circle me-1"></i>
                Final price may vary based on actual work
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {booking.status === 'pending' && (
                <>
                  <button 
                    className="btn-booking-action btn-accept-booking"
                    style={{ width: '100%', justifyContent: 'center' }}
                    onClick={() => setShowAcceptModal(true)}
                  >
                    <i className="bi bi-check-circle me-2"></i>
                    Accept Booking
                  </button>
                  <button 
                    className="btn-booking-action btn-decline-booking"
                    style={{ width: '100%', justifyContent: 'center' }}
                    onClick={() => setShowDeclineModal(true)}
                  >
                    <i className="bi bi-x-circle me-2"></i>
                    Decline Booking
                  </button>
                </>
              )}

              {booking.status === 'confirmed' && isToday(booking.date) && (
                <button 
                  className="btn-booking-action btn-start-service"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => setShowStartModal(true)}
                >
                  <i className="bi bi-play-circle me-2"></i>
                  Start Service
                </button>
              )}

              {booking.status === 'in-progress' && (
                <button 
                  className="btn-booking-action btn-accept-booking"
                  style={{ width: '100%', justifyContent: 'center', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}
                  onClick={() => setShowCompleteModal(true)}
                >
                  <i className="bi bi-check-circle me-2"></i>
                  Complete Service
                </button>
              )}

              <button 
                className="btn-booking-action btn-view-details"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => window.open(`tel:${booking.resident.phone}`)}
              >
                <i className="bi bi-telephone me-2"></i>
                Call Resident
              </button>

              <button 
                className="btn-booking-action btn-view-details"
                style={{ width: '100%', justifyContent: 'center', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}
                onClick={() => alert('Message feature - Frontend only demo')}
              >
                <i className="bi bi-chat-dots me-2"></i>
                Send Message
              </button>
            </div>
          </div>

          {/* Booking Timeline */}
          {(booking.status === 'confirmed' || booking.status === 'in-progress' || booking.status === 'completed') && (
            <div className="detail-card-provider">
              <h3 className="detail-card-title">
                <i className="bi bi-clock-history"></i>
                Timeline
              </h3>
              <div className="timeline-container">
                <div className="timeline-item-provider active">
                  <div className="timeline-dot-provider">
                    <i className="bi bi-check"></i>
                  </div>
                  <div className="timeline-content-provider">
                    <div className="timeline-label-provider">Booking Requested</div>
                    <div className="timeline-time-provider">
                      {new Date(booking.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>

                {booking.confirmedAt && (
                  <div className="timeline-item-provider active">
                    <div className="timeline-dot-provider">
                      <i className="bi bi-check"></i>
                    </div>
                    <div className="timeline-content-provider">
                      <div className="timeline-label-provider">Booking Confirmed</div>
                      <div className="timeline-time-provider">
                        {new Date(booking.confirmedAt).toLocaleString()}
                      </div>
                    </div>
                  </div>
                )}

                {booking.startedAt && (
                  <div className="timeline-item-provider active">
                    <div className="timeline-dot-provider">
                      <i className="bi bi-check"></i>
                    </div>
                    <div className="timeline-content-provider">
                      <div className="timeline-label-provider">Service Started</div>
                      <div className="timeline-time-provider">
                        {new Date(booking.startedAt).toLocaleString()}
                      </div>
                    </div>
                  </div>
                )}

                {booking.completedAt && (
                  <div className="timeline-item-provider active">
                    <div className="timeline-dot-provider">
                      <i className="bi bi-check"></i>
                    </div>
                    <div className="timeline-content-provider">
                      <div className="timeline-label-provider">Service Completed</div>
                      <div className="timeline-time-provider">
                        {new Date(booking.completedAt).toLocaleString()}
                      </div>
                    </div>
                  </div>
                )}

                {booking.status === 'confirmed' && !booking.startedAt && (
                  <div className="timeline-item-provider pending">
                    <div className="timeline-dot-provider">
                      <i className="bi bi-clock"></i>
                    </div>
                    <div className="timeline-content-provider">
                      <div className="timeline-label-provider">Awaiting Service</div>
                      <div className="timeline-time-provider">
                        {booking.date} at {booking.time}
                      </div>
                    </div>
                  </div>
                )}

                {booking.status === 'in-progress' && (
                  <div className="timeline-item-provider pending">
                    <div className="timeline-dot-provider">
                      <i className="bi bi-hourglass-split"></i>
                    </div>
                    <div className="timeline-content-provider">
                      <div className="timeline-label-provider">In Progress</div>
                      <div className="timeline-time-provider">Service ongoing</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Accept Modal */}
      {showAcceptModal && (
        <div className="modal-overlay-provider" onClick={() => setShowAcceptModal(false)}>
          <div className="modal-content-provider" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-provider">
              <h3 className="modal-title-provider">Accept Booking Request</h3>
              <button className="modal-close-btn" onClick={() => setShowAcceptModal(false)}>
                <i className="bi bi-x"></i>
              </button>
            </div>
            <div className="modal-body-provider">
              <p>
                Are you sure you want to accept this booking request from <strong>{booking.resident.name}</strong>?
              </p>
              <p style={{ marginBottom: 0 }}>
                <strong>Service:</strong> {booking.service.name}<br />
                <strong>Date:</strong> {booking.date} at {booking.time}<br />
                <strong>Price:</strong> ₱{booking.pricing.provider}
              </p>
              <div className="modal-success">
                <i className="bi bi-info-circle"></i>
                <span>The resident will be notified and the booking will be confirmed.</span>
              </div>
            </div>
            <div className="modal-footer-provider">
              <button className="btn-modal-secondary" onClick={() => setShowAcceptModal(false)}>
                Cancel
              </button>
              <button className="btn-modal-primary" onClick={handleAccept}>
                <i className="bi bi-check-circle"></i>
                Accept Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Decline Modal */}
      {showDeclineModal && (
        <div className="modal-overlay-provider" onClick={() => setShowDeclineModal(false)}>
          <div className="modal-content-provider" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-provider">
              <h3 className="modal-title-provider">Decline Booking Request</h3>
              <button className="modal-close-btn" onClick={() => setShowDeclineModal(false)}>
                <i className="bi bi-x"></i>
              </button>
            </div>
            <div className="modal-body-provider">
              <p>Please provide a reason for declining this booking request:</p>
              <textarea
                className="form-input-enhanced"
                value={declineReason}
                onChange={(e) => setDeclineReason(e.target.value)}
                placeholder="e.g., Schedule conflict, unavailable materials, etc."
                rows="4"
                style={{ width: '100%', marginTop: '0.5rem' }}
              />
              <div className="modal-warning">
                <i className="bi bi-exclamation-triangle"></i>
                <span>The resident will be notified of your decision.</span>
              </div>
            </div>
            <div className="modal-footer-provider">
              <button className="btn-modal-secondary" onClick={() => setShowDeclineModal(false)}>
                Cancel
              </button>
              <button className="btn-modal-danger" onClick={handleDecline}>
                <i className="bi bi-x-circle"></i>
                Decline Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Start Service Modal */}
      {showStartModal && (
        <div className="modal-overlay-provider" onClick={() => setShowStartModal(false)}>
          <div className="modal-content-provider" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-provider">
              <h3 className="modal-title-provider">Start Service</h3>
              <button className="modal-close-btn" onClick={() => setShowStartModal(false)}>
                <i className="bi bi-x"></i>
              </button>
            </div>
            <div className="modal-body-provider">
              <p>
                Are you ready to start the service for <strong>{booking.resident.name}</strong>?
              </p>
              <p style={{ marginBottom: 0 }}>
                <strong>Service:</strong> {booking.service.name}<br />
                <strong>Location:</strong> {booking.address.barangay}
              </p>
              <div className="modal-success">
                <i className="bi bi-info-circle"></i>
                <span>The booking status will change to "In Progress".</span>
              </div>
            </div>
            <div className="modal-footer-provider">
              <button className="btn-modal-secondary" onClick={() => setShowStartModal(false)}>
                Cancel
              </button>
              <button className="btn-modal-primary" onClick={handleStartService}>
                <i className="bi bi-play-circle"></i>
                Start Service
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Complete Service Modal */}
      {showCompleteModal && (
        <div className="modal-overlay-provider" onClick={() => setShowCompleteModal(false)}>
          <div className="modal-content-provider" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-provider">
              <h3 className="modal-title-provider">Complete Service</h3>
              <button className="modal-close-btn" onClick={() => setShowCompleteModal(false)}>
                <i className="bi bi-x"></i>
              </button>
            </div>
            <div className="modal-body-provider">
              <p>
                Mark this service as completed?
              </p>
              <p style={{ marginBottom: 0 }}>
                <strong>Service:</strong> {booking.service.name}<br />
                <strong>Resident:</strong> {booking.resident.name}<br />
                <strong>Amount:</strong> ₱{booking.pricing.provider}
              </p>
              <div className="modal-success">
                <i className="bi bi-check-circle"></i>
                <span>The booking will be moved to completed jobs.</span>
              </div>
            </div>
            <div className="modal-footer-provider">
              <button className="btn-modal-secondary" onClick={() => setShowCompleteModal(false)}>
                Cancel
              </button>
              <button className="btn-modal-primary" onClick={handleCompleteService}>
                <i className="bi bi-check-circle"></i>
                Complete Service
              </button>
            </div>
          </div>
        </div>
      )}
    </ProviderLayout>
  );
};

export default BookingDetailsProvider;
