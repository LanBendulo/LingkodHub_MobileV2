import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProviderLayout from '../../layouts/ProviderLayout';
import { mockBookingsProvider } from '../../data/providerMockData';
import './ProviderPages.css';
import './ProviderWorkflow.css';

const TodaysSchedule = () => {
  const navigate = useNavigate();
  const [todaysBookings, setTodaysBookings] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update current time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Load today's bookings from localStorage or mock data
    const savedBookings = localStorage.getItem('provider_bookings');
    const bookings = savedBookings ? JSON.parse(savedBookings) : mockBookingsProvider;
    
    const today = new Date().toISOString().split('T')[0];
    const filtered = bookings
      .filter(b => b.date === today && ['confirmed', 'in-progress'].includes(b.status))
      .sort((a, b) => {
        // Sort by time
        const timeA = convertTo24Hour(a.time);
        const timeB = convertTo24Hour(b.time);
        return timeA.localeCompare(timeB);
      });
    
    setTodaysBookings(filtered);
  }, []);

  const convertTo24Hour = (time12h) => {
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');
    
    if (hours === '12') {
      hours = '00';
    }
    
    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }
    
    return `${hours}:${minutes}`;
  };

  const getCurrentTimeString = () => {
    return currentTime.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const isUpcoming = (bookingTime) => {
    const bookingTime24 = convertTo24Hour(bookingTime);
    const currentTime24 = currentTime.toTimeString().slice(0, 5);
    return bookingTime24 > currentTime24;
  };

  const handleViewDetails = (bookingId) => {
    navigate(`/provider/booking/${bookingId}`);
  };

  const handleStartService = (bookingId) => {
    navigate(`/provider/booking/${bookingId}`);
  };

  const handleGetDirections = (address) => {
    window.open(`https://www.google.com/maps/search/${encodeURIComponent(address)}`, '_blank');
  };

  const handleCall = (phone) => {
    window.open(`tel:${phone}`);
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
            <span>Today's Schedule</span>
          </div>
          <h1 className="page-title">Today's Schedule</h1>
          <p className="page-subtitle">View and manage your jobs scheduled for today</p>
        </div>
        <div className="header-actions-right">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem 1.25rem',
            background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
            borderRadius: '0.625rem',
            color: 'white',
            fontWeight: '700',
            fontSize: '1.0625rem',
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
          }}>
            <i className="bi bi-clock-fill" style={{ fontSize: '1.25rem' }}></i>
            {getCurrentTimeString()}
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="stats-grid-small">
        <div className="stat-card-small">
          <div className="stat-label-small">Total Jobs Today</div>
          <div className="stat-value-small">{todaysBookings.length}</div>
        </div>
        <div className="stat-card-small">
          <div className="stat-label-small">Confirmed</div>
          <div className="stat-value-small">{todaysBookings.filter(b => b.status === 'confirmed').length}</div>
        </div>
        <div className="stat-card-small">
          <div className="stat-label-small">In Progress</div>
          <div className="stat-value-small">{todaysBookings.filter(b => b.status === 'in-progress').length}</div>
        </div>
        <div className="stat-card-small">
          <div className="stat-label-small">Upcoming</div>
          <div className="stat-value-small">
            {todaysBookings.filter(b => b.status === 'confirmed' && isUpcoming(b.time)).length}
          </div>
        </div>
      </div>

      {/* Today's Jobs */}
      {todaysBookings.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {todaysBookings.map((booking, index) => {
            const upcoming = isUpcoming(booking.time);
            const isNext = upcoming && index === todaysBookings.findIndex(b => isUpcoming(b.time));

            return (
              <div 
                key={booking.id} 
                className="booking-card-provider"
                style={{
                  border: isNext ? '2px solid #2563eb' : undefined,
                  boxShadow: isNext ? '0 4px 16px rgba(37, 99, 235, 0.2)' : undefined
                }}
              >
                {/* Header */}
                <div className="booking-card-header">
                  <div className="booking-id-badge">
                    <i className="bi bi-calendar-event"></i>
                    {booking.time}
                    {isNext && (
                      <span style={{
                        marginLeft: '0.5rem',
                        padding: '0.25rem 0.625rem',
                        background: '#2563eb',
                        color: 'white',
                        borderRadius: '0.375rem',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        Next
                      </span>
                    )}
                  </div>
                  <span className={`booking-status-badge status-${booking.status}`}>
                    {booking.status === 'in-progress' ? 'IN PROGRESS' : 'CONFIRMED'}
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
                        <button
                          onClick={() => handleCall(booking.resident.phone)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.375rem',
                            padding: '0.375rem 0.875rem',
                            background: '#10b981',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.5rem',
                            fontSize: '0.8125rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                          }}
                          onMouseOver={(e) => e.currentTarget.style.background = '#059669'}
                          onMouseOut={(e) => e.currentTarget.style.background = '#10b981'}
                        >
                          <i className="bi bi-telephone-fill"></i>
                          Call
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Job Details */}
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
                      <div className="detail-icon-wrapper detail-icon-location">
                        <i className="bi bi-geo-alt-fill"></i>
                      </div>
                      <div className="detail-content">
                        <div className="detail-label">Location</div>
                        <div className="detail-value">{booking.address.barangay}</div>
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

                    <div className="booking-detail-item">
                      <div className="detail-icon-wrapper detail-icon-price">
                        <i className="bi bi-currency-dollar"></i>
                      </div>
                      <div className="detail-content">
                        <div className="detail-label">Price</div>
                        <div className="detail-value detail-value-price">₱{booking.pricing.provider}</div>
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1rem',
                    background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
                    border: '1px solid #f1f5f9',
                    borderRadius: '0.5rem',
                    marginTop: '1rem'
                  }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ 
                        fontSize: '0.75rem', 
                        fontWeight: '600', 
                        color: '#64748b',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        marginBottom: '0.375rem'
                      }}>
                        Service Address
                      </div>
                      <div style={{ fontSize: '0.9375rem', fontWeight: '600', color: '#0f172a' }}>
                        {booking.address.full}
                      </div>
                    </div>
                    <button
                      onClick={() => handleGetDirections(booking.address.full)}
                      className="btn-booking-action btn-view-details"
                      style={{ marginLeft: '1rem' }}
                    >
                      <i className="bi bi-map"></i>
                      Navigate
                    </button>
                  </div>
                </div>

                {/* Footer */}
                <div className="booking-card-footer">
                  <div className="booking-meta-time">
                    <i className="bi bi-bookmark-fill"></i>
                    {booking.id}
                  </div>
                  <div className="booking-actions-row">
                    <button 
                      className="btn-booking-action btn-view-details"
                      onClick={() => handleViewDetails(booking.id)}
                    >
                      <i className="bi bi-eye"></i>
                      View Details
                    </button>
                    {booking.status === 'confirmed' && (
                      <button 
                        className="btn-booking-action btn-start-service"
                        onClick={() => handleStartService(booking.id)}
                      >
                        <i className="bi bi-play-circle"></i>
                        Start Service
                      </button>
                    )}
                    {booking.status === 'in-progress' && (
                      <button 
                        className="btn-booking-action"
                        onClick={() => navigate(`/provider/service-in-progress/${booking.id}`)}
                        style={{
                          background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                          color: 'white'
                        }}
                      >
                        <i className="bi bi-arrow-right-circle"></i>
                        Continue Service
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="settings-card">
          <div className="settings-card-body text-center py-5">
            <i className="bi bi-calendar-x" style={{ 
              fontSize: '4rem', 
              color: '#cbd5e1', 
              marginBottom: '1.5rem', 
              display: 'block' 
            }}></i>
            <h3 style={{ 
              fontSize: '1.25rem', 
              fontWeight: '700', 
              color: '#0f172a', 
              marginBottom: '0.5rem' 
            }}>
              No jobs scheduled for today
            </h3>
            <p style={{ color: '#64748b', margin: 0, fontSize: '0.9375rem', marginBottom: '1.5rem' }}>
              You don't have any confirmed bookings scheduled for today.
            </p>
            <button 
              className="action-btn action-btn-primary"
              onClick={() => navigate('/provider/requests')}
            >
              <i className="bi bi-calendar-check me-2"></i>
              View Booking Requests
            </button>
          </div>
        </div>
      )}

      {/* Quick Tips */}
      {todaysBookings.length > 0 && (
        <div className="settings-card" style={{ marginTop: '2rem' }}>
          <div className="settings-card-body">
            <h3 style={{ 
              fontSize: '1.0625rem', 
              fontWeight: '700', 
              color: '#0f172a',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.625rem'
            }}>
              <i className="bi bi-lightbulb-fill" style={{ color: '#fbbf24' }}></i>
              Quick Tips
            </h3>
            <ul style={{ 
              margin: 0, 
              paddingLeft: '1.5rem',
              color: '#64748b',
              fontSize: '0.9375rem',
              lineHeight: '1.8'
            }}>
              <li>Call the resident 15 minutes before the scheduled time</li>
              <li>Use the "Navigate" button to get directions to the location</li>
              <li>Click "Start Service" when you arrive and begin work</li>
              <li>Remember to complete the service after finishing the job</li>
            </ul>
          </div>
        </div>
      )}
    </ProviderLayout>
  );
};

export default TodaysSchedule;
