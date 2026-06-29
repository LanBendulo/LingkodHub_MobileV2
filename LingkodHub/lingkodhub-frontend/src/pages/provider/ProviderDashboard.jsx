import { Link } from 'react-router-dom';
import { useState } from 'react';
import ProviderLayout from '../../layouts/ProviderLayout';
import { mockBookings } from '../../data/mockData';
import './ProviderPages.css';

const ProviderDashboard = () => {
  const [timeFilter, setTimeFilter] = useState('30d');

  const pendingRequests = mockBookings.filter(b => b.status === 'pending');
  const confirmedBookings = mockBookings.filter(b => b.status === 'confirmed');
  const completedJobs = mockBookings.filter(b => b.status === 'completed');
  
  const totalEarnings = 125500;
  const monthlyEarnings = 45200;
  const averageRating = 4.8;
  const totalReviews = 127;

  const recentReviews = [
    { id: 1, client: 'John D.', rating: 5, comment: 'Excellent service! Very professional and efficient.', date: '2 days ago', service: 'Plumbing' },
    { id: 2, client: 'Maria S.', rating: 4, comment: 'Great work, will book again!', date: '5 days ago', service: 'Electrical' },
    { id: 3, client: 'Pedro R.', rating: 5, comment: 'Highly recommended! Quick and professional.', date: '1 week ago', service: 'AC Repair' },
  ];

  const recentActivity = [
    { id: 1, type: 'booking', title: 'New booking request', subtitle: 'AC Repair - Poblacion District', time: '10 min ago', icon: 'bi-calendar-plus', color: 'warning' },
    { id: 2, type: 'payment', title: 'Payment received', subtitle: '₱3,500 for Plumbing Service', time: '2 hours ago', icon: 'bi-cash-stack', color: 'success' },
    { id: 3, type: 'review', title: 'New 5-star review', subtitle: 'From Maria Santos', time: '5 hours ago', icon: 'bi-star-fill', color: 'warning' },
    { id: 4, type: 'completed', title: 'Job completed', subtitle: 'Electrical Wiring - Matina', time: '1 day ago', icon: 'bi-check-circle', color: 'primary' },
  ];

  return (
    <ProviderLayout>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <div className="breadcrumb-nav">
            <i className="bi bi-house-door"></i>
            <span>Dashboard</span>
          </div>
          <h1 className="page-title">Provider Overview</h1>
          <p className="page-subtitle">Track your bookings, earnings, and performance</p>
        </div>
        <div className="header-actions-right">
          <div className="time-filter">
            <button 
              className={`filter-btn ${timeFilter === '7d' ? 'active' : ''}`}
              onClick={() => setTimeFilter('7d')}
            >
              7 Days
            </button>
            <button 
              className={`filter-btn ${timeFilter === '30d' ? 'active' : ''}`}
              onClick={() => setTimeFilter('30d')}
            >
              30 Days
            </button>
            <button 
              className={`filter-btn ${timeFilter === '90d' ? 'active' : ''}`}
              onClick={() => setTimeFilter('90d')}
            >
              90 Days
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-header">
            <div className="kpi-icon bg-warning-soft">
              <i className="bi bi-inbox-fill text-warning"></i>
            </div>
            <div className="kpi-trend positive">
              <i className="bi bi-arrow-up"></i>
              <span>+12%</span>
            </div>
          </div>
          <div className="kpi-body">
            <div className="kpi-value">{pendingRequests.length}</div>
            <div className="kpi-label">Pending Requests</div>
            <div className="kpi-meta">
              <span className="meta-item">
                <i className="bi bi-clock-history"></i>
                Requires action
              </span>
            </div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <div className="kpi-icon bg-primary-soft">
              <i className="bi bi-calendar-check-fill text-primary"></i>
            </div>
            <div className="kpi-trend positive">
              <i className="bi bi-arrow-up"></i>
              <span>+18%</span>
            </div>
          </div>
          <div className="kpi-body">
            <div className="kpi-value">{confirmedBookings.length}</div>
            <div className="kpi-label">Confirmed Bookings</div>
            <div className="kpi-meta">
              <span className="meta-item">
                <i className="bi bi-calendar3"></i>
                Upcoming jobs
              </span>
            </div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <div className="kpi-icon bg-success-soft">
              <i className="bi bi-currency-dollar text-success"></i>
            </div>
            <div className="kpi-trend positive">
              <i className="bi bi-arrow-up"></i>
              <span>+22%</span>
            </div>
          </div>
          <div className="kpi-body">
            <div className="kpi-value">₱{(monthlyEarnings / 1000).toFixed(1)}K</div>
            <div className="kpi-label">Monthly Earnings</div>
            <div className="kpi-meta">
              <span className="meta-item">
                <i className="bi bi-graph-up"></i>
                ₱{(totalEarnings / 1000).toFixed(1)}K total
              </span>
            </div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <div className="kpi-icon bg-warning-soft">
              <i className="bi bi-star-fill text-warning"></i>
            </div>
            <div className="kpi-trend positive">
              <i className="bi bi-arrow-up"></i>
              <span>+0.2</span>
            </div>
          </div>
          <div className="kpi-body">
            <div className="kpi-value">{averageRating}</div>
            <div className="kpi-label">Average Rating</div>
            <div className="kpi-meta">
              <span className="meta-item">
                <i className="bi bi-star"></i>
                {totalReviews} reviews
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Analytics Section */}
      <div className="analytics-row">
        {/* Pending Requests */}
        <div className="analytics-card large">
          <div className="card-header">
            <div>
              <h3 className="card-title">Pending Booking Requests</h3>
              <p className="card-subtitle">Requests waiting for your response</p>
            </div>
            <Link to="/provider/requests" className="btn-link">
              View All <i className="bi bi-arrow-right"></i>
            </Link>
          </div>
          <div className="card-body">
            {pendingRequests.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {pendingRequests.slice(0, 3).map((booking) => (
                  <div key={booking.id} style={{
                    background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
                    border: '1px solid #f1f5f9',
                    borderRadius: '0.625rem',
                    padding: '1.125rem',
                    transition: 'all 0.15s ease'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.875rem' }}>
                      <div>
                        <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.375rem', letterSpacing: '-0.01em' }}>
                          {booking.service}
                        </h4>
                        <p style={{ fontSize: '0.8125rem', color: '#64748b', marginBottom: '0.25rem', fontWeight: '500' }}>
                          <i className="bi bi-calendar me-2"></i>
                          {booking.date} at {booking.time}
                        </p>
                        <p style={{ fontSize: '0.8125rem', color: '#64748b', margin: 0, fontWeight: '500' }}>
                          <i className="bi bi-geo-alt me-2"></i>
                          {booking.location}
                        </p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.25rem', letterSpacing: '-0.03em' }}>
                          ₱{booking.totalCost}
                        </div>
                        <span className="status-badge status-pending">Pending</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="action-btn action-btn-primary" style={{ width: 'auto', padding: '0.5rem 1rem', height: 'auto' }}>
                        <i className="bi bi-check-lg me-2"></i>
                        Accept
                      </button>
                      <button className="action-btn action-btn-danger" style={{ width: 'auto', padding: '0.5rem 1rem', height: 'auto' }}>
                        <i className="bi bi-x-lg me-2"></i>
                        Decline
                      </button>
                      <button className="action-btn" style={{ width: 'auto', padding: '0.5rem 1rem', height: 'auto' }}>
                        <i className="bi bi-chat-dots me-2"></i>
                        Message
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-5">
                <i className="bi bi-inbox" style={{ fontSize: '3rem', color: '#cbd5e1', marginBottom: '1rem' }}></i>
                <p style={{ color: '#64748b', margin: 0 }}>No pending requests at the moment</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="analytics-card small">
          <div className="card-header">
            <h3 className="card-title">Quick Actions</h3>
          </div>
          <div className="card-body">
            <div className="quick-actions">
              <Link to="/provider/calendar" className="action-button primary">
                <div className="action-icon-title">
                  <i className="bi bi-calendar-week"></i>
                  <span className="action-title">Update Calendar</span>
                </div>
                <span className="action-desc">Manage your availability and time slots</span>
              </Link>
              <Link to="/provider/services" className="action-button secondary">
                <div className="action-icon-title">
                  <i className="bi bi-tools"></i>
                  <span className="action-title">Manage Services</span>
                </div>
                <span className="action-desc">Edit services and pricing</span>
              </Link>
              <Link to="/provider/analytics" className="action-button tertiary">
                <div className="action-icon-title">
                  <i className="bi bi-graph-up-arrow"></i>
                  <span className="action-title">View Analytics</span>
                </div>
                <span className="action-desc">Track earnings and performance</span>
              </Link>
              <Link to="/provider/profile" className="action-button quaternary">
                <div className="action-icon-title">
                  <i className="bi bi-person"></i>
                  <span className="action-title">Edit Profile</span>
                </div>
                <span className="action-desc">Update business information</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bottom-row">
        {/* Upcoming Bookings */}
        <div className="section-card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Upcoming Bookings</h3>
              <p className="card-subtitle">Confirmed jobs scheduled</p>
            </div>
            <Link to="/provider/requests?filter=confirmed" className="btn-link">View All</Link>
          </div>
          <div className="card-body">
            {confirmedBookings.length > 0 ? (
              <div className="admin-table-card" style={{ border: 'none', boxShadow: 'none' }}>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Service</th>
                      <th>Date & Time</th>
                      <th>Location</th>
                      <th className="text-end">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {confirmedBookings.slice(0, 4).map((booking) => (
                      <tr key={booking.id}>
                        <td>
                          <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '0.875rem' }}>
                            {booking.service}
                          </div>
                        </td>
                        <td>
                          <div style={{ fontSize: '0.8125rem', color: '#64748b', fontWeight: '500' }}>
                            {booking.date}<br />
                            {booking.time}
                          </div>
                        </td>
                        <td>
                          <div style={{ fontSize: '0.8125rem', color: '#64748b', fontWeight: '500' }}>
                            {booking.location}
                          </div>
                        </td>
                        <td className="text-end">
                          <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '0.9375rem' }}>
                            ₱{booking.totalCost}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-5">
                <i className="bi bi-calendar-x" style={{ fontSize: '3rem', color: '#cbd5e1', marginBottom: '1rem' }}></i>
                <p style={{ color: '#64748b', margin: 0 }}>No confirmed bookings</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="section-card">
          <div className="card-header">
            <h3 className="card-title">Recent Activity</h3>
            <Link to="/provider/activity" className="btn-link">View All</Link>
          </div>
          <div className="card-body">
            <div className="activity-timeline">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="activity-item">
                  <div className={`activity-icon bg-${activity.color}-soft`}>
                    <i className={`${activity.icon} text-${activity.color}`}></i>
                  </div>
                  <div className="activity-content">
                    <div className="activity-title">{activity.title}</div>
                    <div className="activity-subtitle">{activity.subtitle}</div>
                  </div>
                  <div className="activity-time">{activity.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="section-header">
        <h2 className="section-title">
          <i className="bi bi-star-fill"></i>
          Recent Reviews
        </h2>
        <Link to="/provider/reviews" className="btn-link">
          View All Reviews <i className="bi bi-arrow-right"></i>
        </Link>
      </div>

      <div className="row g-4 mb-4">
        {recentReviews.map((review) => (
          <div key={review.id} className="col-md-4">
            <div className="barangay-card">
              <div style={{ marginBottom: '0.875rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.625rem' }}>
                  <h4 style={{ fontSize: '0.9375rem', fontWeight: '700', color: '#0f172a', margin: 0 }}>
                    {review.client}
                  </h4>
                  <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '500' }}>{review.date}</span>
                </div>
                <div className="text-warning" style={{ marginBottom: '0.5rem' }}>
                  {[...Array(review.rating)].map((_, i) => (
                    <i key={i} className="bi bi-star-fill"></i>
                  ))}
                  {[...Array(5 - review.rating)].map((_, i) => (
                    <i key={i} className="bi bi-star" style={{ opacity: 0.3 }}></i>
                  ))}
                </div>
              </div>
              <p style={{ fontSize: '0.8125rem', color: '#64748b', lineHeight: '1.5', marginBottom: '0.75rem' }}>
                "{review.comment}"
              </p>
              <div style={{ 
                padding: '0.5rem 0.75rem', 
                background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', 
                borderRadius: '0.375rem',
                fontSize: '0.75rem',
                fontWeight: '600',
                color: '#64748b'
              }}>
                <i className="bi bi-tools me-2"></i>
                {review.service}
              </div>
            </div>
          </div>
        ))}
      </div>
    </ProviderLayout>
  );
};

export default ProviderDashboard;
