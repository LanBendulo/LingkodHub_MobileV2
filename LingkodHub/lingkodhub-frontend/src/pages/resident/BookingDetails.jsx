import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ResidentLayout from '../../layouts/ResidentLayout';
import './BookingDetails.css';

const BookingDetails = () => {
  const navigate = useNavigate();
  const { bookingId } = useParams();
  const [showCancelModal, setShowCancelModal] = useState(false);

  // Mock booking data - in real app, fetch based on bookingId
  const booking = {
    id: bookingId || 'BK-2026-001',
    provider: {
      name: "Juan's Plumbing Services",
      owner: "Juan Dela Cruz",
      avatar: "https://ui-avatars.com/api/?name=Juan+Dela+Cruz&background=2563eb&color=fff",
      verified: true,
      rating: 4.9,
      reviews: 127,
      completedJobs: 145,
      phone: "+63 912 345 6789",
      email: "juan@plumbing.com",
    },
    service: {
      name: "Leak Repair",
      category: "Plumbing",
      icon: "bi-droplet-fill",
      description: "Professional leak detection and repair service for kitchen and bathroom fixtures.",
    },
    date: "2026-07-05",
    time: "10:00 AM",
    status: "confirmed",
    price: 370,
    suggestedPrice: 350,
    estimatedDuration: "1-2 hours",
    address: {
      houseNo: "123",
      street: "JP Laurel Avenue",
      barangay: "Poblacion District",
      city: "Davao City",
      postalCode: "8000",
    },
    problemDescription: "My kitchen sink has been leaking since yesterday. Water is dripping from under the sink basin. The leak seems to be coming from the pipe connection. I've tried tightening it but it didn't help.",
    images: [
      "https://via.placeholder.com/400x300/2563eb/ffffff?text=Leak+Photo+1",
      "https://via.placeholder.com/400x300/3b82f6/ffffff?text=Leak+Photo+2",
    ],
    createdAt: "2026-07-01T14:30:00",
    confirmedAt: "2026-07-01T15:45:00",
    timeline: [
      { status: 'submitted', label: 'Booking Submitted', timestamp: '2026-07-01T14:30:00', completed: true },
      { status: 'confirmed', label: 'Provider Confirmed', timestamp: '2026-07-01T15:45:00', completed: true },
      { status: 'scheduled', label: 'Scheduled for Service', timestamp: null, completed: false },
      { status: 'in-progress', label: 'Service in Progress', timestamp: null, completed: false },
      { status: 'completed', label: 'Service Completed', timestamp: null, completed: false },
    ],
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: { label: 'Pending Approval', color: '#fbbf24', bg: 'rgba(251, 191, 36, 0.1)', icon: 'bi-clock-history' },
      confirmed: { label: 'Confirmed', color: '#2563eb', bg: 'rgba(37, 99, 235, 0.1)', icon: 'bi-check-circle-fill' },
      scheduled: { label: 'Scheduled', color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.1)', icon: 'bi-calendar-check' },
      'in-progress': { label: 'In Progress', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)', icon: 'bi-arrow-repeat' },
      completed: { label: 'Completed', color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)', icon: 'bi-check-all' },
      cancelled: { label: 'Cancelled', color: '#dc2626', bg: 'rgba(220, 38, 38, 0.1)', icon: 'bi-x-circle-fill' },
    };
    return badges[status] || badges.pending;
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric'
    });
  };

  const statusBadge = getStatusBadge(booking.status);

  const handleCancelBooking = () => {
    setShowCancelModal(true);
  };

  const confirmCancelBooking = () => {
    // Mock cancel action
    setShowCancelModal(false);
    alert('Booking cancelled successfully');
    navigate('/resident/bookings');
  };

  return (
    <ResidentLayout>
      <div className="booking-details-container">
        {/* Header */}
        <div className="details-header">
          <button className="btn-back" onClick={() => navigate('/resident/bookings')}>
            <i className="bi bi-arrow-left"></i>
          </button>
          <div className="header-content">
            <div className="breadcrumb-nav">
              <i className="bi bi-house-door"></i>
              <i className="bi bi-chevron-right"></i>
              <span>My Bookings</span>
              <i className="bi bi-chevron-right"></i>
              <span>{booking.id}</span>
            </div>
            <h1 className="details-title">Booking Details</h1>
            <div className="booking-id-badge">
              <i className="bi bi-receipt"></i>
              {booking.id}
            </div>
          </div>
          <div className="booking-status-badge" style={{ color: statusBadge.color, background: statusBadge.bg }}>
            <i className={statusBadge.icon}></i>
            {statusBadge.label}
          </div>
        </div>

        <div className="details-grid">
          {/* Left Column */}
          <div className="details-main">
            {/* Provider Card */}
            <div className="detail-card provider-card">
              <h3 className="card-title">
                <i className="bi bi-person-circle"></i>
                Service Provider
              </h3>
              <div className="provider-details-content">
                <div className="provider-header-details">
                  <img 
                    src={booking.provider.avatar} 
                    alt={booking.provider.name}
                    className="provider-avatar-large"
                  />
                  <div className="provider-main-info">
                    <div className="provider-name-verified">
                      <h4>{booking.provider.name}</h4>
                      {booking.provider.verified && (
                        <span className="verified-badge-details">
                          <i className="bi bi-patch-check-fill"></i>
                          Verified
                        </span>
                      )}
                    </div>
                    <div className="provider-owner">by {booking.provider.owner}</div>
                    <div className="provider-stats-row">
                      <div className="stat-item">
                        <i className="bi bi-star-fill"></i>
                        <span>{booking.provider.rating}</span>
                        <span className="stat-label">({booking.provider.reviews} reviews)</span>
                      </div>
                      <div className="stat-item">
                        <i className="bi bi-check-circle"></i>
                        <span>{booking.provider.completedJobs}</span>
                        <span className="stat-label">completed</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="provider-contact">
                  <a href={`tel:${booking.provider.phone}`} className="contact-button">
                    <i className="bi bi-telephone-fill"></i>
                    <div>
                      <div className="contact-label">Phone</div>
                      <div className="contact-value">{booking.provider.phone}</div>
                    </div>
                  </a>
                  <a href={`mailto:${booking.provider.email}`} className="contact-button">
                    <i className="bi bi-envelope-fill"></i>
                    <div>
                      <div className="contact-label">Email</div>
                      <div className="contact-value">{booking.provider.email}</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Service Details Card */}
            <div className="detail-card">
              <h3 className="card-title">
                <i className="bi bi-tools"></i>
                Service Information
              </h3>
              <div className="service-details-content">
                <div className="service-header-detail">
                  <div className="service-icon-large">
                    <i className={booking.service.icon}></i>
                  </div>
                  <div>
                    <div className="service-category-badge">{booking.service.category}</div>
                    <h4 className="service-name-detail">{booking.service.name}</h4>
                    <p className="service-description">{booking.service.description}</p>
                  </div>
                </div>

                <div className="service-info-grid">
                  <div className="info-item">
                    <div className="info-label">Scheduled Date</div>
                    <div className="info-value">
                      <i className="bi bi-calendar-event"></i>
                      {formatDate(booking.date)}
                    </div>
                  </div>
                  <div className="info-item">
                    <div className="info-label">Scheduled Time</div>
                    <div className="info-value">
                      <i className="bi bi-clock"></i>
                      {booking.time}
                    </div>
                  </div>
                  <div className="info-item">
                    <div className="info-label">Estimated Duration</div>
                    <div className="info-value">
                      <i className="bi bi-hourglass-split"></i>
                      {booking.estimatedDuration}
                    </div>
                  </div>
                  <div className="info-item">
                    <div className="info-label">Service Price</div>
                    <div className="info-value price">
                      <i className="bi bi-cash-coin"></i>
                      ₱{booking.price}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Problem Description */}
            <div className="detail-card">
              <h3 className="card-title">
                <i className="bi bi-chat-left-text"></i>
                Problem Description
              </h3>
              <p className="problem-text">{booking.problemDescription}</p>
            </div>

            {/* Service Location */}
            <div className="detail-card">
              <h3 className="card-title">
                <i className="bi bi-geo-alt"></i>
                Service Location
              </h3>
              <div className="address-card">
                <div className="address-icon">
                  <i className="bi bi-house-door"></i>
                </div>
                <div className="address-text">
                  {booking.address.houseNo} {booking.address.street}<br />
                  {booking.address.barangay}<br />
                  {booking.address.city} {booking.address.postalCode}
                </div>
              </div>
            </div>

            {/* Photos */}
            {booking.images && booking.images.length > 0 && (
              <div className="detail-card">
                <h3 className="card-title">
                  <i className="bi bi-images"></i>
                  Uploaded Photos ({booking.images.length})
                </h3>
                <div className="photos-grid">
                  {booking.images.map((image, index) => (
                    <div key={index} className="photo-item">
                      <img src={image} alt={`Problem photo ${index + 1}`} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="details-sidebar">
            {/* Timeline Card */}
            <div className="detail-card timeline-card">
              <h3 className="card-title">
                <i className="bi bi-clock-history"></i>
                Booking Timeline
              </h3>
              <div className="booking-timeline-details">
                {booking.timeline.map((item, index) => (
                  <div key={index} className={`timeline-step ${item.completed ? 'completed' : 'pending'}`}>
                    <div className="timeline-dot-wrapper">
                      <div className="timeline-dot">
                        {item.completed && <i className="bi bi-check"></i>}
                      </div>
                      {index < booking.timeline.length - 1 && <div className="timeline-line"></div>}
                    </div>
                    <div className="timeline-content-detail">
                      <div className="timeline-label">{item.label}</div>
                      {item.timestamp && (
                        <div className="timeline-timestamp">{formatDateTime(item.timestamp)}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing Summary */}
            <div className="detail-card pricing-card">
              <h3 className="card-title">
                <i className="bi bi-cash-stack"></i>
                Pricing Summary
              </h3>
              <div className="pricing-rows">
                <div className="pricing-row">
                  <span className="pricing-label">Platform Suggested Price</span>
                  <span className="pricing-amount">₱{booking.suggestedPrice}</span>
                </div>
                <div className="pricing-row">
                  <span className="pricing-label">Provider Price</span>
                  <span className="pricing-amount">₱{booking.price}</span>
                </div>
                <div className="pricing-row">
                  <span className="pricing-label">Estimated Duration</span>
                  <span className="pricing-amount">{booking.estimatedDuration}</span>
                </div>
                <div className="pricing-total">
                  <span>Total Amount</span>
                  <span className="total-amount">₱{booking.price}</span>
                </div>
              </div>
              <div className="pricing-note">
                <i className="bi bi-info-circle"></i>
                Final price may vary based on actual work required
              </div>
            </div>

            {/* Action Buttons */}
            <div className="detail-card actions-card">
              <h3 className="card-title">
                <i className="bi bi-gear"></i>
                Actions
              </h3>
              <div className="action-buttons">
                {booking.status === 'confirmed' && (
                  <>
                    <button className="action-btn btn-reschedule">
                      <i className="bi bi-calendar-range"></i>
                      Reschedule Booking
                    </button>
                    <button className="action-btn btn-cancel" onClick={handleCancelBooking}>
                      <i className="bi bi-x-circle"></i>
                      Cancel Booking
                    </button>
                  </>
                )}
                {booking.status === 'completed' && (
                  <button className="action-btn btn-review">
                    <i className="bi bi-star"></i>
                    Write Review
                  </button>
                )}
                <button className="action-btn btn-contact">
                  <i className="bi bi-chat-dots"></i>
                  Contact Provider
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="modal-overlay" onClick={() => setShowCancelModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Cancel Booking</h3>
              <button className="modal-close" onClick={() => setShowCancelModal(false)}>
                <i className="bi bi-x"></i>
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to cancel this booking?</p>
              <p className="modal-warning">
                <i className="bi bi-exclamation-triangle"></i>
                This action cannot be undone.
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn-modal-secondary" onClick={() => setShowCancelModal(false)}>
                Keep Booking
              </button>
              <button className="btn-modal-danger" onClick={confirmCancelBooking}>
                <i className="bi bi-x-circle"></i>
                Cancel Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </ResidentLayout>
  );
};

export default BookingDetails;
