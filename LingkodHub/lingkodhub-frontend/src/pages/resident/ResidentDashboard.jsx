import { Link } from 'react-router-dom';
import { useState } from 'react';
import ResidentLayout from '../../layouts/ResidentLayout';
import { mockBookings, serviceCategories } from '../../data/mockData';
import './ResidentPages.css';

const ResidentDashboard = () => {
  const [timeFilter, setTimeFilter] = useState('30d');

  const upcomingBookings = mockBookings.filter(b => b.status === 'confirmed');
  const pendingBookings = mockBookings.filter(b => b.status === 'pending');
  const completedBookings = mockBookings.filter(b => b.status === 'completed');
  const totalSpent = 18500;

  const recentActivity = [
    { id: 1, type: 'confirmed', title: 'Booking Confirmed', subtitle: 'Plumbing Service - June 25', time: '2 hours ago', icon: 'bi-check-circle', color: 'primary' },
    { id: 2, type: 'review', title: 'Review Submitted', subtitle: '5 stars for Cleaning Service', time: '1 day ago', icon: 'bi-star-fill', color: 'warning' },
    { id: 3, type: 'pending', title: 'Awaiting Response', subtitle: 'Carpentry booking request', time: '2 days ago', icon: 'bi-hourglass-split', color: 'warning' },
    { id: 4, type: 'completed', title: 'Service Completed', subtitle: 'Electrical Repair - Paid ₱2,500', time: '3 days ago', icon: 'bi-check-circle', color: 'success' },
  ];

  return (
    <ResidentLayout>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <div className="breadcrumb-nav">
            <i className="bi bi-house-door"></i>
            <span>Dashboard</span>
          </div>
          <h1 className="page-title">Welcome Back!</h1>
          <p className="page-subtitle">Here's what's happening with your bookings</p>
        </div>
        <div className="header-actions-right">
          <Link 
            to="/resident/find-services"
            className="action-btn action-btn-primary"
            style={{ width: 'auto', padding: '0.625rem 1.5rem', height: 'auto', fontWeight: '700' }}
          >
            <i className="bi bi-plus-circle me-2"></i>
            Book a Service
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-header">
            <div className="kpi-icon bg-primary-soft">
              <i className="bi bi-calendar-check-fill text-primary"></i>
            </div>
            <div className="kpi-trend positive">
              <i className="bi bi-arrow-up"></i>
              <span>+15%</span>
            </div>
          </div>
          <div className="kpi-body">
            <div className="kpi-value">{upcomingBookings.length}</div>
            <div className="kpi-label">Active Bookings</div>
            <div className="kpi-meta">
              <span className="meta-item">
                <i className="bi bi-clock-history"></i>
                Upcoming services
              </span>
            </div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <div className="kpi-icon bg-warning-soft">
              <i className="bi bi-hourglass-split text-warning"></i>
            </div>
          </div>
          <div className="kpi-body">
            <div className="kpi-value">{pendingBookings.length}</div>
            <div className="kpi-label">Pending Requests</div>
            <div className="kpi-meta">
              <span className="meta-item">
                <i className="bi bi-bell"></i>
                Awaiting response
              </span>
            </div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <div className="kpi-icon bg-success-soft">
              <i className="bi bi-check-circle-fill text-success"></i>
            </div>
            <div className="kpi-trend positive">
              <i className="bi bi-arrow-up"></i>
              <span>+8%</span>
            </div>
          </div>
          <div className="kpi-body">
            <div className="kpi-value">{completedBookings.length}</div>
            <div className="kpi-label">Completed</div>
            <div className="kpi-meta">
              <span className="meta-item">
                <i className="bi bi-star"></i>
                Services finished
              </span>
            </div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <div className="kpi-icon bg-info-soft">
              <i className="bi bi-wallet2 text-info"></i>
            </div>
            <div className="kpi-trend positive">
              <i className="bi bi-arrow-up"></i>
              <span>+12%</span>
            </div>
          </div>
          <div className="kpi-body">
            <div className="kpi-value">₱{(totalSpent / 1000).toFixed(1)}K</div>
            <div className="kpi-label">Total Spent</div>
            <div className="kpi-meta">
              <span className="meta-item">
                <i className="bi bi-graph-up"></i>
                This month
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Row */}
      <div className="analytics-row">
        {/* Upcoming Bookings */}
        <div className="analytics-card large">
          <div className="card-header">
            <div>
              <h3 className="card-title">Upcoming Bookings</h3>
              <p className="card-subtitle">Your scheduled services</p>
            </div>
            <Link to="/resident/bookings" className="btn-link">
              View All <i className="bi bi-arrow-right"></i>
            </Link>
          </div>
          <div className="card-body">
            {upcomingBookings.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {upcomingBookings.slice(0, 3).map((booking) => (
                  <div key={booking.id} style={{
                    background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
                    border: '1px solid #e2e8f0',
                    borderRadius: '0.75rem',
                    padding: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    transition: 'all 0.15s ease'
                  }}>
                    <img
                      src={booking.provider.avatar}
                      alt={booking.provider.name}
                      style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '0.625rem',
                        border: '2px solid #e2e8f0',
                        objectFit: 'cover'
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.375rem', letterSpacing: '-0.01em' }}>
                        {booking.service}
                      </h4>
                      <div style={{ fontSize: '0.8125rem', color: '#64748b', marginBottom: '0.25rem', fontWeight: '500' }}>
                        {booking.provider.name} • <i className="bi bi-star-fill" style={{ color: '#fbbf24', fontSize: '0.75rem' }}></i> {booking.provider.rating}
                      </div>
                      <div style={{ fontSize: '0.8125rem', color: '#64748b', fontWeight: '500' }}>
                        <i className="bi bi-calendar me-2"></i>
                        {booking.date} at {booking.time}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#2563eb', marginBottom: '0.25rem', letterSpacing: '-0.03em' }}>
                        ₱{booking.totalCost}
                      </div>
                      <span className="status-badge status-confirmed">Confirmed</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-5">
                <i className="bi bi-calendar-x" style={{ fontSize: '3rem', color: '#cbd5e1', marginBottom: '1rem' }}></i>
                <p style={{ color: '#64748b', marginBottom: '1.25rem' }}>No upcoming bookings</p>
                <Link 
                  to="/resident/find-services"
                  className="action-btn action-btn-primary"
                  style={{ width: 'auto', padding: '0.625rem 1.5rem', height: 'auto' }}
                >
                  Book a Service
                </Link>
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
              <Link to="/resident/find-services" className="action-button primary">
                <div className="action-icon-title">
                  <i className="bi bi-search"></i>
                  <span className="action-title">Find Services</span>
                </div>
                <span className="action-desc">Browse and book trusted providers</span>
              </Link>
              <Link to="/resident/bookings" className="action-button secondary">
                <div className="action-icon-title">
                  <i className="bi bi-calendar-check"></i>
                  <span className="action-title">My Bookings</span>
                </div>
                <span className="action-desc">View and manage bookings</span>
              </Link>
              <Link to="/resident/providers" className="action-button tertiary">
                <div className="action-icon-title">
                  <i className="bi bi-people"></i>
                  <span className="action-title">Browse Providers</span>
                </div>
                <span className="action-desc">Explore service providers</span>
              </Link>
              <Link to="/resident/reviews" className="action-button quaternary">
                <div className="action-icon-title">
                  <i className="bi bi-star"></i>
                  <span className="action-title">My Reviews</span>
                </div>
                <span className="action-desc">Rate completed services</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Services Section */}
      <div className="section-header">
        <h2 className="section-title">
          <i className="bi bi-tools"></i>
          Popular Services
        </h2>
        <Link to="/resident/find-services" className="btn-link">
          View All Services <i className="bi bi-arrow-right"></i>
        </Link>
      </div>

      <div className="provider-grid">
        {serviceCategories.slice(0, 8).map((service) => (
          <Link
            key={service.id}
            to="/resident/find-services"
            style={{ textDecoration: 'none' }}
          >
            <div className="provider-card" style={{ textAlign: 'center', cursor: 'pointer' }}>
              <div style={{
                width: '64px',
                height: '64px',
                margin: '0 auto 1rem',
                borderRadius: '0.75rem',
                background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)',
                border: '1px solid rgba(37, 99, 235, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                color: '#2563eb'
              }}>
                <i className={service.icon}></i>
              </div>
              <h4 className="provider-name" style={{ margin: 0 }}>{service.name}</h4>
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom Row */}
      <div className="bottom-row">
        {/* Recent Activity */}
        <div className="section-card">
          <div className="card-header">
            <h3 className="card-title">Recent Activity</h3>
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

        {/* Pro Tip Card */}
        <div className="section-card">
          <div className="card-body" style={{ 
            background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)',
            borderRadius: '0.75rem',
            border: '1px solid rgba(37, 99, 235, 0.2)',
            padding: '2rem',
            textAlign: 'center'
          }}>
            <i className="bi bi-lightbulb-fill" style={{ fontSize: '3rem', color: '#2563eb', marginBottom: '1rem', display: 'block' }}></i>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
              Pro Tip
            </h3>
            <p style={{ fontSize: '0.9375rem', color: '#64748b', lineHeight: '1.6', marginBottom: '1.25rem' }}>
              Book services in advance to get your preferred time slots. Most providers respond within 15 minutes!
            </p>
            <Link 
              to="/resident/find-services"
              className="action-btn action-btn-primary"
              style={{ width: 'auto', padding: '0.625rem 1.5rem', height: 'auto' }}
            >
              <i className="bi bi-search me-2"></i>
              Browse Services
            </Link>
          </div>
        </div>
      </div>
    </ResidentLayout>
  );
};

export default ResidentDashboard;
