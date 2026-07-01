import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProviderLayout from '../../layouts/ProviderLayout';
import { mockBookingsProvider } from '../../data/providerMockData';
import './ProviderPages.css';
import './ProviderWorkflow.css';

const ServiceInProgress = () => {
  const navigate = useNavigate();
  const { bookingId } = useParams();
  
  const [booking, setBooking] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [notes, setNotes] = useState('');
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  useEffect(() => {
    // Load booking from localStorage or mock data
    const savedBookings = localStorage.getItem('provider_bookings');
    const bookings = savedBookings ? JSON.parse(savedBookings) : mockBookingsProvider;
    const foundBooking = bookings.find(b => b.id === bookingId);
    
    if (foundBooking && foundBooking.status === 'in-progress') {
      setBooking(foundBooking);
      
      // Calculate elapsed time from startedAt
      if (foundBooking.startedAt) {
        const startTime = new Date(foundBooking.startedAt).getTime();
        const now = Date.now();
        const elapsed = Math.floor((now - startTime) / 1000); // in seconds
        setElapsedTime(elapsed);
      }
    } else {
      navigate('/provider/requests');
    }
  }, [bookingId, navigate]);

  useEffect(() => {
    // Update timer every second
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCompleteService = () => {
    const savedBookings = localStorage.getItem('provider_bookings');
    const bookings = savedBookings ? JSON.parse(savedBookings) : mockBookingsProvider;
    
    const updatedBookings = bookings.map(b =>
      b.id === bookingId
        ? {
            ...b,
            status: 'completed',
            completedAt: new Date().toISOString(),
            providerNotes: notes,
            updatedAt: new Date().toISOString(),
          }
        : b
    );
    
    localStorage.setItem('provider_bookings', JSON.stringify(updatedBookings));
    setShowCompleteModal(false);
    
    // Show success and redirect
    setTimeout(() => {
      navigate('/provider/requests?tab=completed');
    }, 500);
  };

  const handleIssue = () => {
    alert('Issue reporting feature - Frontend demo only');
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
            <span>Operations</span>
            <i className="bi bi-chevron-right"></i>
            <span>Service In Progress</span>
          </div>
          <h1 className="page-title">Service In Progress</h1>
          <p className="page-subtitle">Track and manage your current service job</p>
        </div>
      </div>

      <div className="provider-detail-grid">
        {/* Main Content */}
        <div className="provider-detail-main">
          {/* Service Timer */}
          <div className="service-timer-card">
            <div className="timer-label">Service Duration</div>
            <div className="timer-display">{formatTime(elapsedTime)}</div>
            <div className="timer-sublabel">Started at {booking.time}</div>
          </div>

          {/* Job Information */}
          <div className="detail-card-provider">
            <h3 className="detail-card-title">
              <i className="bi bi-info-circle"></i>
              Job Information
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
                <div className="detail-icon-wrapper detail-icon-service">
                  <i className="bi bi-hourglass-split"></i>
                </div>
                <div className="detail-content">
                  <div className="detail-label">Estimated Duration</div>
                  <div className="detail-value">{booking.pricing.duration}</div>
                </div>
              </div>

              <div className="booking-detail-item">
                <div className="detail-icon-wrapper detail-icon-price">
                  <i className="bi bi-currency-dollar"></i>
                </div>
                <div className="detail-content">
                  <div className="detail-label">Service Price</div>
                  <div className="detail-value detail-value-price">₱{booking.pricing.provider}</div>
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

          {/* Provider Notes */}
          <div className="detail-card-provider">
            <h3 className="detail-card-title">
              <i className="bi bi-pencil-square"></i>
              Service Notes
            </h3>
            <textarea
              className="form-input-enhanced"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes about the service, materials used, or any observations..."
              rows="5"
              style={{ width: '100%', marginBottom: '0.75rem' }}
            />
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.875rem 1rem',
              background: 'rgba(37, 99, 235, 0.05)',
              border: '1px solid rgba(37, 99, 235, 0.1)',
              borderRadius: '0.5rem',
              fontSize: '0.8125rem',
              color: '#64748b'
            }}>
              <i className="bi bi-info-circle" style={{ color: '#2563eb' }}></i>
              These notes will be saved with the completed job for your records.
            </div>
          </div>

          {/* Photos During Service */}
          <div className="detail-card-provider">
            <h3 className="detail-card-title">
              <i className="bi bi-camera"></i>
              Service Photos (Optional)
            </h3>
            <div style={{
              padding: '2rem',
              background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
              border: '2px dashed #cbd5e1',
              borderRadius: '0.625rem',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onClick={() => alert('Photo upload - Frontend demo only')}
            >
              <i className="bi bi-cloud-upload" style={{ fontSize: '2.5rem', color: '#cbd5e1', marginBottom: '0.75rem', display: 'block' }}></i>
              <div style={{ fontSize: '0.9375rem', fontWeight: '600', color: '#0f172a', marginBottom: '0.375rem' }}>
                Upload photos during service
              </div>
              <div style={{ fontSize: '0.8125rem', color: '#64748b' }}>
                Document your work for quality assurance
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="provider-detail-sidebar sticky-sidebar-provider">
          {/* Resident Contact */}
          <div className="detail-card-provider">
            <h3 className="detail-card-title">
              <i className="bi bi-person-circle"></i>
              Resident Contact
            </h3>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <img 
                src={booking.resident.avatar} 
                alt={booking.resident.name}
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '3px solid #e2e8f0',
                  marginBottom: '0.75rem'
                }}
              />
              <h4 style={{ fontSize: '1.0625rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.5rem' }}>
                {booking.resident.name}
              </h4>
              <div style={{ fontSize: '0.8125rem', color: '#64748b', marginBottom: '0.25rem' }}>
                <i className="bi bi-telephone-fill me-2"></i>
                {booking.resident.phone}
              </div>
              <div style={{ fontSize: '0.8125rem', color: '#64748b' }}>
                <i className="bi bi-envelope-fill me-2"></i>
                {booking.resident.email}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              <button 
                className="btn-booking-action btn-accept-booking"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => window.open(`tel:${booking.resident.phone}`)}
              >
                <i className="bi bi-telephone"></i>
                Call Resident
              </button>
              <button 
                className="btn-booking-action btn-view-details"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => alert('Message feature - Frontend demo')}
              >
                <i className="bi bi-chat-dots"></i>
                Send Message
              </button>
            </div>
          </div>

          {/* Service Address */}
          <div className="detail-card-provider">
            <h3 className="detail-card-title">
              <i className="bi bi-geo-alt"></i>
              Service Address
            </h3>
            <div style={{
              padding: '1rem',
              background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
              border: '1px solid #f1f5f9',
              borderRadius: '0.625rem',
              marginBottom: '1rem'
            }}>
              <div style={{ fontSize: '0.9375rem', fontWeight: '600', color: '#0f172a', marginBottom: '0.5rem' }}>
                {booking.address.full}
              </div>
              <div style={{ fontSize: '0.8125rem', color: '#64748b' }}>
                <strong>Barangay:</strong> {booking.address.barangay}
              </div>
            </div>
            <button 
              className="btn-booking-action btn-view-details"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => window.open(`https://www.google.com/maps/search/${encodeURIComponent(booking.address.full)}`, '_blank')}
            >
              <i className="bi bi-map"></i>
              Get Directions
            </button>
          </div>

          {/* Action Buttons */}
          <div className="detail-card-provider">
            <h3 className="detail-card-title">
              <i className="bi bi-list-check"></i>
              Actions
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              <button 
                className="btn-booking-action btn-accept-booking"
                style={{ 
                  width: '100%', 
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  fontSize: '1rem',
                  padding: '0.875rem'
                }}
                onClick={() => setShowCompleteModal(true)}
              >
                <i className="bi bi-check-circle"></i>
                Complete Service
              </button>
              <button 
                className="btn-booking-action"
                style={{ 
                  width: '100%', 
                  justifyContent: 'center',
                  background: 'white',
                  color: '#dc2626',
                  border: '2px solid #dc2626'
                }}
                onClick={handleIssue}
              >
                <i className="bi bi-exclamation-triangle"></i>
                Report Issue
              </button>
            </div>
          </div>

          {/* Quick Info */}
          <div style={{
            padding: '1rem',
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(124, 58, 237, 0.05) 100%)',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            borderRadius: '0.625rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <i className="bi bi-info-circle-fill" style={{ color: '#8b5cf6', fontSize: '1.125rem' }}></i>
              <span style={{ fontSize: '0.875rem', fontWeight: '700', color: '#0f172a' }}>
                Service Tips
              </span>
            </div>
            <ul style={{
              margin: 0,
              paddingLeft: '1.25rem',
              fontSize: '0.8125rem',
              color: '#64748b',
              lineHeight: '1.6'
            }}>
              <li>Keep the resident informed of progress</li>
              <li>Document any additional work needed</li>
              <li>Take photos for quality records</li>
              <li>Complete service when job is finished</li>
            </ul>
          </div>
        </div>
      </div>

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
                Are you sure you want to mark this service as completed?
              </p>
              <div style={{
                padding: '1rem',
                background: '#f8fafc',
                borderRadius: '0.5rem',
                border: '1px solid #e2e8f0',
                marginTop: '1rem'
              }}>
                <div style={{ marginBottom: '0.5rem' }}>
                  <strong>Service:</strong> {booking.service.name}
                </div>
                <div style={{ marginBottom: '0.5rem' }}>
                  <strong>Resident:</strong> {booking.resident.name}
                </div>
                <div style={{ marginBottom: '0.5rem' }}>
                  <strong>Duration:</strong> {formatTime(elapsedTime)}
                </div>
                <div>
                  <strong>Amount:</strong> ₱{booking.pricing.provider}
                </div>
              </div>
              <div className="modal-success">
                <i className="bi bi-check-circle"></i>
                <span>The booking will be moved to completed jobs and the resident will be notified.</span>
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

export default ServiceInProgress;
