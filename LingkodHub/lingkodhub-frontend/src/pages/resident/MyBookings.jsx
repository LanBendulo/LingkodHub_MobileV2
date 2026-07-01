import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ResidentLayout from '../../layouts/ResidentLayout';
import './MyBookings.css';

const MyBookings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');

  // Mock booking data
  const mockBookings = [
    {
      id: 'BK-2026-001',
      provider: {
        name: "Juan's Plumbing Services",
        owner: "Juan Dela Cruz",
        avatar: "https://ui-avatars.com/api/?name=Juan+Dela+Cruz&background=2563eb&color=fff",
        verified: true,
        rating: 4.9,
      },
      service: {
        name: "Leak Repair",
        category: "Plumbing",
        icon: "bi-droplet-fill",
      },
      date: "2026-07-05",
      time: "10:00 AM",
      status: "pending",
      price: 370,
      address: "123 JP Laurel Ave, Poblacion, Davao City",
      createdAt: "2026-07-01",
    },
    {
      id: 'BK-2026-002',
      provider: {
        name: "PowerFix Electrical",
        owner: "Maria Santos",
        avatar: "https://ui-avatars.com/api/?name=Maria+Santos&background=2563eb&color=fff",
        verified: true,
        rating: 4.8,
      },
      service: {
        name: "Outlet Installation",
        category: "Electrical",
        icon: "bi-lightning-charge-fill",
      },
      date: "2026-07-03",
      time: "02:00 PM",
      status: "confirmed",
      price: 450,
      address: "456 Roxas Ave, Buhangin, Davao City",
      createdAt: "2026-06-28",
    },
    {
      id: 'BK-2026-003',
      provider: {
        name: "SparkClean Services",
        owner: "Pedro Cruz",
        avatar: "https://ui-avatars.com/api/?name=Pedro+Cruz&background=2563eb&color=fff",
        verified: true,
        rating: 4.7,
      },
      service: {
        name: "Deep House Cleaning",
        category: "House Cleaning",
        icon: "bi-house-fill",
      },
      date: "2026-07-02",
      time: "09:00 AM",
      status: "in-progress",
      price: 800,
      address: "789 Quimpo Blvd, Talomo, Davao City",
      createdAt: "2026-06-25",
    },
    {
      id: 'BK-2026-004',
      provider: {
        name: "CoolAir Technicians",
        owner: "Ana Reyes",
        avatar: "https://ui-avatars.com/api/?name=Ana+Reyes&background=2563eb&color=fff",
        verified: true,
        rating: 4.9,
      },
      service: {
        name: "AC Maintenance",
        category: "AC Cleaning",
        icon: "bi-fan",
      },
      date: "2026-06-28",
      time: "11:00 AM",
      status: "completed",
      price: 600,
      address: "321 Bolton St, Agdao, Davao City",
      createdAt: "2026-06-20",
      completedAt: "2026-06-28",
    },
    {
      id: 'BK-2026-005',
      provider: {
        name: "QuickFix Plumbing",
        owner: "Carlos Mendoza",
        avatar: "https://ui-avatars.com/api/?name=Carlos+Mendoza&background=2563eb&color=fff",
        verified: false,
        rating: 4.5,
      },
      service: {
        name: "Drain Unclogging",
        category: "Plumbing",
        icon: "bi-droplet-fill",
      },
      date: "2026-06-25",
      time: "03:00 PM",
      status: "cancelled",
      price: 300,
      address: "654 Pichon St, Poblacion, Davao City",
      createdAt: "2026-06-22",
      cancelledAt: "2026-06-24",
      cancelReason: "Provider unavailable",
    },
  ];

  const tabs = [
    { id: 'all', label: 'All Bookings', icon: 'bi-list-ul' },
    { id: 'pending', label: 'Pending', icon: 'bi-clock-history' },
    { id: 'confirmed', label: 'Confirmed', icon: 'bi-check-circle' },
    { id: 'in-progress', label: 'In Progress', icon: 'bi-arrow-repeat' },
    { id: 'completed', label: 'Completed', icon: 'bi-check-all' },
    { id: 'cancelled', label: 'Cancelled', icon: 'bi-x-circle' },
  ];

  const getStatusBadge = (status) => {
    const badges = {
      pending: { label: 'Pending Approval', color: '#fbbf24', bg: 'rgba(251, 191, 36, 0.1)', icon: 'bi-clock-history' },
      confirmed: { label: 'Confirmed', color: '#2563eb', bg: 'rgba(37, 99, 235, 0.1)', icon: 'bi-check-circle-fill' },
      'in-progress': { label: 'In Progress', color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.1)', icon: 'bi-arrow-repeat' },
      completed: { label: 'Completed', color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)', icon: 'bi-check-all' },
      cancelled: { label: 'Cancelled', color: '#dc2626', bg: 'rgba(220, 38, 38, 0.1)', icon: 'bi-x-circle-fill' },
    };
    return badges[status] || badges.pending;
  };

  const filteredBookings = activeTab === 'all' 
    ? mockBookings 
    : mockBookings.filter(booking => booking.status === activeTab);

  const getBookingCount = (tabId) => {
    if (tabId === 'all') return mockBookings.length;
    return mockBookings.filter(booking => booking.status === tabId).length;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handleViewDetails = (bookingId) => {
    navigate(`/resident/bookings/${bookingId}`);
  };

  return (
    <ResidentLayout>
      <div className="my-bookings-container">
        {/* Header */}
        <div className="bookings-header">
          <div>
            <div className="breadcrumb-nav">
              <i className="bi bi-house-door"></i>
              <i className="bi bi-chevron-right"></i>
              <span>My Bookings</span>
            </div>
            <h1 className="bookings-title">My Bookings</h1>
            <p className="bookings-subtitle">Manage and track all your service bookings</p>
          </div>
          <button className="btn-new-booking" onClick={() => navigate('/resident/find-services')}>
            <i className="bi bi-plus-circle"></i>
            New Booking
          </button>
        </div>

        {/* Stats Cards */}
        <div className="bookings-stats">
          <div className="stat-card">
            <div className="stat-icon pending">
              <i className="bi bi-clock-history"></i>
            </div>
            <div className="stat-content">
              <div className="stat-value">{getBookingCount('pending')}</div>
              <div className="stat-label">Pending</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon confirmed">
              <i className="bi bi-check-circle"></i>
            </div>
            <div className="stat-content">
              <div className="stat-value">{getBookingCount('confirmed')}</div>
              <div className="stat-label">Confirmed</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon in-progress">
              <i className="bi bi-arrow-repeat"></i>
            </div>
            <div className="stat-content">
              <div className="stat-value">{getBookingCount('in-progress')}</div>
              <div className="stat-label">In Progress</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon completed">
              <i className="bi bi-check-all"></i>
            </div>
            <div className="stat-content">
              <div className="stat-value">{getBookingCount('completed')}</div>
              <div className="stat-label">Completed</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bookings-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <i className={tab.icon}></i>
              <span>{tab.label}</span>
              <span className="tab-count">{getBookingCount(tab.id)}</span>
            </button>
          ))}
        </div>

        {/* Bookings List */}
        <div className="bookings-list">
          {filteredBookings.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <i className="bi bi-calendar-x"></i>
              </div>
              <h3>No bookings found</h3>
              <p>You don't have any {activeTab !== 'all' ? activeTab : ''} bookings yet.</p>
              <button className="btn-primary" onClick={() => navigate('/resident/find-services')}>
                <i className="bi bi-search"></i>
                Find Services
              </button>
            </div>
          ) : (
            filteredBookings.map(booking => {
              const statusBadge = getStatusBadge(booking.status);
              return (
                <div key={booking.id} className="booking-card">
                  <div className="booking-card-header">
                    <div className="booking-id">
                      <i className="bi bi-receipt"></i>
                      {booking.id}
                    </div>
                    <div className="booking-status" style={{ color: statusBadge.color, background: statusBadge.bg }}>
                      <i className={statusBadge.icon}></i>
                      {statusBadge.label}
                    </div>
                  </div>

                  <div className="booking-card-body">
                    <div className="booking-provider">
                      <img 
                        src={booking.provider.avatar} 
                        alt={booking.provider.name}
                        className="provider-avatar"
                      />
                      <div className="provider-info">
                        <div className="provider-name-row">
                          <h4>{booking.provider.name}</h4>
                          {booking.provider.verified && (
                            <span className="verified-badge-small">
                              <i className="bi bi-patch-check-fill"></i>
                            </span>
                          )}
                        </div>
                        <div className="provider-rating">
                          <i className="bi bi-star-fill"></i>
                          <span>{booking.provider.rating}</span>
                        </div>
                      </div>
                    </div>

                    <div className="booking-details-grid">
                      <div className="booking-detail">
                        <div className="detail-icon service">
                          <i className={booking.service.icon}></i>
                        </div>
                        <div>
                          <div className="detail-label">Service</div>
                          <div className="detail-value">{booking.service.name}</div>
                        </div>
                      </div>

                      <div className="booking-detail">
                        <div className="detail-icon date">
                          <i className="bi bi-calendar-event"></i>
                        </div>
                        <div>
                          <div className="detail-label">Date & Time</div>
                          <div className="detail-value">{formatDate(booking.date)} • {booking.time}</div>
                        </div>
                      </div>

                      <div className="booking-detail">
                        <div className="detail-icon location">
                          <i className="bi bi-geo-alt-fill"></i>
                        </div>
                        <div>
                          <div className="detail-label">Location</div>
                          <div className="detail-value">{booking.address}</div>
                        </div>
                      </div>

                      <div className="booking-detail">
                        <div className="detail-icon price">
                          <i className="bi bi-cash-coin"></i>
                        </div>
                        <div>
                          <div className="detail-label">Price</div>
                          <div className="detail-value price">₱{booking.price}</div>
                        </div>
                      </div>
                    </div>

                    {booking.status === 'cancelled' && booking.cancelReason && (
                      <div className="cancel-reason">
                        <i className="bi bi-info-circle"></i>
                        <span>Reason: {booking.cancelReason}</span>
                      </div>
                    )}
                  </div>

                  <div className="booking-card-footer">
                    <div className="booking-meta">
                      <i className="bi bi-clock"></i>
                      Booked on {formatDate(booking.createdAt)}
                    </div>
                    <div className="booking-actions">
                      <button 
                        className="btn-view-details"
                        onClick={() => handleViewDetails(booking.id)}
                      >
                        View Details
                        <i className="bi bi-arrow-right"></i>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </ResidentLayout>
  );
};

export default MyBookings;
