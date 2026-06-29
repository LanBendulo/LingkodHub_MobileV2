import { Link } from 'react-router-dom';
import { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { demandAnalytics, mockUsers, mockProviders } from '../../data/mockData';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [timeFilter, setTimeFilter] = useState('30d');

  // Calculate metrics
  const totalBookings = demandAnalytics.monthlyTrends.reduce((sum, m) => sum + m.bookings, 0);
  const totalRevenue = demandAnalytics.monthlyTrends.reduce((sum, m) => sum + m.revenue, 0);
  const activeProviders = mockProviders.filter(p => p.verified).length;
  const pendingApprovals = 12;

  // Service trends for chart
  const topServices = demandAnalytics.mostRequestedServices.slice(0, 5);
  const maxRequests = Math.max(...topServices.map(s => s.requests));

  // Recent activity
  const recentActivity = [
    { id: 1, type: 'booking', title: 'New booking request', subtitle: 'Plumbing Service - Poblacion', time: '2 min ago', icon: 'bi-calendar-plus', color: 'primary' },
    { id: 2, type: 'provider', title: 'Provider verified', subtitle: 'Juan Dela Cruz - Electrical', time: '15 min ago', icon: 'bi-patch-check', color: 'success' },
    { id: 3, type: 'trend', title: 'Demand spike detected', subtitle: 'AC Repair +25% in Matina', time: '1 hour ago', icon: 'bi-graph-up-arrow', color: 'warning' },
    { id: 4, type: 'report', title: 'Monthly report generated', subtitle: 'June 2026 Analytics', time: '2 hours ago', icon: 'bi-file-earmark-bar-graph', color: 'info' },
  ];

  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <div className="breadcrumb-nav">
            <i className="bi bi-house-door"></i>
            <span>Dashboard</span>
          </div>
          <h1 className="page-title">Home Service Analytics</h1>
          <p className="page-subtitle">Managing and analyzing demand across Davao City</p>
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
            <div className="kpi-icon bg-primary-soft">
              <i className="bi bi-people-fill text-primary"></i>
            </div>
            <div className="kpi-trend positive">
              <i className="bi bi-arrow-up"></i>
              <span>+15%</span>
            </div>
          </div>
          <div className="kpi-body">
            <div className="kpi-value">{mockUsers.length.toLocaleString()}</div>
            <div className="kpi-label">Total Users</div>
            <div className="kpi-meta">
              <span className="meta-item">
                <i className="bi bi-check-circle"></i>
                {mockUsers.filter(u => u.status === 'active').length} active
              </span>
            </div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <div className="kpi-icon bg-success-soft">
              <i className="bi bi-briefcase-fill text-success"></i>
            </div>
            <div className="kpi-trend positive">
              <i className="bi bi-arrow-up"></i>
              <span>+8%</span>
            </div>
          </div>
          <div className="kpi-body">
            <div className="kpi-value">{activeProviders}</div>
            <div className="kpi-label">Active Providers</div>
            <div className="kpi-meta">
              <span className="meta-item">
                <i className="bi bi-star-fill"></i>
                4.7 avg rating
              </span>
            </div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <div className="kpi-icon bg-info-soft">
              <i className="bi bi-calendar-check-fill text-info"></i>
            </div>
            <div className="kpi-trend positive">
              <i className="bi bi-arrow-up"></i>
              <span>+22%</span>
            </div>
          </div>
          <div className="kpi-body">
            <div className="kpi-value">{totalBookings.toLocaleString()}</div>
            <div className="kpi-label">Total Bookings</div>
            <div className="kpi-meta">
              <span className="meta-item">
                <i className="bi bi-clock-history"></i>
                {pendingApprovals} pending
              </span>
            </div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <div className="kpi-icon bg-warning-soft">
              <i className="bi bi-currency-dollar text-warning"></i>
            </div>
            <div className="kpi-trend positive">
              <i className="bi bi-arrow-up"></i>
              <span>+18%</span>
            </div>
          </div>
          <div className="kpi-body">
            <div className="kpi-value">₱{(totalRevenue / 1000000).toFixed(1)}M</div>
            <div className="kpi-label">Total Revenue</div>
            <div className="kpi-meta">
              <span className="meta-item">
                <i className="bi bi-graph-up"></i>
                ₱{(totalRevenue / demandAnalytics.monthlyTrends.length / 1000).toFixed(0)}K avg/month
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Analytics Section */}
      <div className="analytics-row">
        {/* Service Demand Trends */}
        <div className="analytics-card large">
          <div className="card-header">
            <div>
              <h3 className="card-title">Service Demand Trends</h3>
              <p className="card-subtitle">Most requested services across all barangays</p>
            </div>
            <Link to="/admin/analytics" className="btn-link">
              View All <i className="bi bi-arrow-right"></i>
            </Link>
          </div>
          <div className="card-body">
            <div className="service-chart">
              {topServices.map((service, idx) => (
                <div key={idx} className="service-bar-item">
                  <div className="service-info">
                    <span className="service-rank">#{idx + 1}</span>
                    <span className="service-name">{service.service}</span>
                  </div>
                  <div className="service-bar-container">
                    <div 
                      className="service-bar"
                      style={{ width: `${(service.requests / maxRequests) * 100}%` }}
                    >
                      <span className="service-value">{service.requests.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className={`service-change ${service.change >= 0 ? 'positive' : 'negative'}`}>
                    <i className={`bi bi-arrow-${service.change >= 0 ? 'up' : 'down'}`}></i>
                    {Math.abs(service.change)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="analytics-card small">
          <div className="card-header">
            <h3 className="card-title">Quick Actions</h3>
          </div>
          <div className="card-body">
            <div className="quick-actions">
              <Link to="/admin/providers" className="action-button primary">
                <div className="action-icon-title">
                  <i className="bi bi-person-plus-fill"></i>
                  <span className="action-title">Add Provider</span>
                </div>
                <span className="action-desc">Register and manage service providers</span>
              </Link>
              <Link to="/admin/reports" className="action-button secondary">
                <div className="action-icon-title">
                  <i className="bi bi-file-earmark-bar-graph"></i>
                  <span className="action-title">Generate Report</span>
                </div>
                <span className="action-desc">Export platform analytics and insights</span>
              </Link>
              <Link to="/admin/analytics" className="action-button tertiary">
                <div className="action-icon-title">
                  <i className="bi bi-graph-up-arrow"></i>
                  <span className="action-title">View Analytics</span>
                </div>
                <span className="action-desc">Review demand insights and trends</span>
              </Link>
              <Link to="/admin/users" className="action-button quaternary">
                <div className="action-icon-title">
                  <i className="bi bi-people"></i>
                  <span className="action-title">Manage Users</span>
                </div>
                <span className="action-desc">Control user access and permissions</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Barangay Intelligence Section */}
      <div className="section-header">
        <h2 className="section-title">
          <i className="bi bi-geo-alt-fill"></i>
          Barangay Intelligence
        </h2>
        <Link to="/admin/barangay-insights" className="btn-link">
          View All Insights <i className="bi bi-arrow-right"></i>
        </Link>
      </div>

      <div className="barangay-grid">
        {demandAnalytics.barangayTrends.slice(0, 4).map((barangay, idx) => (
          <div key={idx} className="barangay-card">
            <div className="barangay-rank">#{idx + 1}</div>
            <div className="barangay-header">
              <h4 className="barangay-name">{barangay.barangay}</h4>
              <div className={`barangay-growth ${barangay.growth >= 0 ? 'positive' : 'negative'}`}>
                <i className={`bi bi-arrow-${barangay.growth >= 0 ? 'up' : 'down'}`}></i>
                {Math.abs(barangay.growth)}%
              </div>
            </div>
            <div className="barangay-stats">
              <div className="stat">
                <div className="stat-value">{barangay.bookings}</div>
                <div className="stat-label">Bookings</div>
              </div>
              <div className="stat">
                <div className="stat-value">{Math.floor(barangay.bookings * 0.8)}</div>
                <div className="stat-label">Completed</div>
              </div>
            </div>
            <div className="demand-score">
              <div className="demand-bar">
                <div 
                  className="demand-fill"
                  style={{ width: `${(barangay.bookings / 456) * 100}%` }}
                ></div>
              </div>
              <span className="demand-label">Demand Score</span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="bottom-row">
        {/* Most Requested Services Cards */}
        <div className="section-card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Top Service Categories</h3>
              <p className="card-subtitle">By booking volume this month</p>
            </div>
            <Link to="/admin/analytics" className="btn-link">View Details</Link>
          </div>
          <div className="card-body">
            <div className="service-cards">
              {demandAnalytics.mostRequestedServices.slice(0, 3).map((service, idx) => (
                <div key={idx} className="service-card-item">
                  <div className="service-card-icon" style={{ background: `hsl(${idx * 40 + 200}, 75%, 95%)` }}>
                    <i className={`bi bi-${idx === 0 ? 'droplet' : idx === 1 ? 'brush' : 'lightning-charge'} text-primary`}></i>
                  </div>
                  <div className="service-card-info">
                    <div className="service-card-name">{service.service}</div>
                    <div className="service-card-value">{service.requests.toLocaleString()} bookings</div>
                    <div className={`service-card-change ${service.change >= 0 ? 'positive' : 'negative'}`}>
                      <i className={`bi bi-arrow-${service.change >= 0 ? 'up' : 'down'}`}></i>
                      {Math.abs(service.change)}% from last month
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity Timeline */}
        <div className="section-card">
          <div className="card-header">
            <h3 className="card-title">Recent Activity</h3>
            <Link to="/admin/notifications" className="btn-link">View All</Link>
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
    </AdminLayout>
  );
};

export default AdminDashboard;
