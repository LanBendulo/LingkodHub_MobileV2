import { useState } from 'react';
import ProviderLayout from '../../layouts/ProviderLayout';
import '../provider/ProviderPages.css';

const ProviderAnalytics = () => {
  const [timeFilter, setTimeFilter] = useState('30d');

  const earningsData = [
    { month: 'Jan', earnings: 35000, bookings: 28 },
    { month: 'Feb', earnings: 42000, bookings: 32 },
    { month: 'Mar', earnings: 48000, bookings: 38 },
    { month: 'Apr', earnings: 55000, bookings: 42 },
    { month: 'May', earnings: 62000, bookings: 48 },
    { month: 'Jun', earnings: 45200, bookings: 36 },
  ];

  const servicePerformance = [
    { service: 'Plumbing', bookings: 145, revenue: 50750, rating: 4.8, growth: 22 },
    { service: 'Electrical', bookings: 128, revenue: 51200, rating: 4.9, growth: 18 },
    { service: 'AC Repair', bookings: 98, revenue: 44100, rating: 4.7, growth: 15 },
    { service: 'Carpentry', bookings: 87, revenue: 33060, rating: 4.6, growth: 12 },
  ];

  const totalEarnings = 125500;
  const completedJobs = 458;
  const responseRate = 98;
  const avgRating = 4.8;

  return (
    <ProviderLayout>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <div className="breadcrumb-nav">
            <i className="bi bi-house-door"></i>
            <span>Analytics</span>
          </div>
          <h1 className="page-title">Business Analytics</h1>
          <p className="page-subtitle">Track earnings, performance, and growth metrics</p>
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
            <div className="kpi-icon bg-success-soft">
              <i className="bi bi-currency-dollar text-success"></i>
            </div>
            <div className="kpi-trend positive">
              <i className="bi bi-arrow-up"></i>
              <span>+18%</span>
            </div>
          </div>
          <div className="kpi-body">
            <div className="kpi-value">₱{(totalEarnings / 1000).toFixed(1)}K</div>
            <div className="kpi-label">Total Earnings</div>
            <div className="kpi-meta">
              <span className="meta-item">
                <i className="bi bi-graph-up"></i>
                Last 6 months
              </span>
            </div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <div className="kpi-icon bg-primary-soft">
              <i className="bi bi-check-circle-fill text-primary"></i>
            </div>
            <div className="kpi-trend positive">
              <i className="bi bi-arrow-up"></i>
              <span>+12%</span>
            </div>
          </div>
          <div className="kpi-body">
            <div className="kpi-value">{completedJobs}</div>
            <div className="kpi-label">Jobs Completed</div>
            <div className="kpi-meta">
              <span className="meta-item">
                <i className="bi bi-calendar-check"></i>
                All time
              </span>
            </div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <div className="kpi-icon bg-info-soft">
              <i className="bi bi-clock-history text-info"></i>
            </div>
            <div className="kpi-trend positive">
              <i className="bi bi-arrow-up"></i>
              <span>+5%</span>
            </div>
          </div>
          <div className="kpi-body">
            <div className="kpi-value">{responseRate}%</div>
            <div className="kpi-label">Response Rate</div>
            <div className="kpi-meta">
              <span className="meta-item">
                <i className="bi bi-lightning"></i>
                Last 30 days
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
              <span>+0.3</span>
            </div>
          </div>
          <div className="kpi-body">
            <div className="kpi-value">{avgRating}</div>
            <div className="kpi-label">Average Rating</div>
            <div className="kpi-meta">
              <span className="meta-item">
                <i className="bi bi-star"></i>
                127 reviews
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Service Performance */}
      <div className="section-header">
        <h2 className="section-title">
          <i className="bi bi-bar-chart-fill"></i>
          Service Performance
        </h2>
      </div>

      <div className="analytics-card large" style={{ marginBottom: '1.75rem' }}>
        <div className="card-header">
          <div>
            <h3 className="card-title">Top Performing Services</h3>
            <p className="card-subtitle">Revenue and booking metrics by service type</p>
          </div>
        </div>
        <div className="card-body">
          <div className="service-chart">
            {servicePerformance.map((service, idx) => (
              <div key={idx} className="service-bar-item">
                <div className="service-info">
                  <span className="service-rank">#{idx + 1}</span>
                  <span className="service-name">{service.service}</span>
                </div>
                <div className="service-bar-container">
                  <div 
                    className="service-bar"
                    style={{ width: `${(service.bookings / servicePerformance[0].bookings) * 100}%` }}
                  >
                    <span className="service-value">{service.bookings} bookings</span>
                  </div>
                </div>
                <div style={{ minWidth: '90px', textAlign: 'right' }}>
                  <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '0.875rem', marginBottom: '0.125rem' }}>
                    ₱{(service.revenue / 1000).toFixed(1)}K
                  </div>
                  <div className={`service-change ${service.growth >= 0 ? 'positive' : 'negative'}`} style={{ fontSize: '0.75rem' }}>
                    <i className={`bi bi-arrow-${service.growth >= 0 ? 'up' : 'down'}`}></i>
                    {Math.abs(service.growth)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bottom-row">
        {/* Monthly Earnings Trend */}
        <div className="section-card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Monthly Earnings</h3>
              <p className="card-subtitle">Last 6 months performance</p>
            </div>
          </div>
          <div className="card-body">
            <div className="admin-table-card" style={{ border: 'none', boxShadow: 'none' }}>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Bookings</th>
                    <th className="text-end">Earnings</th>
                  </tr>
                </thead>
                <tbody>
                  {earningsData.map((data, idx) => (
                    <tr key={idx}>
                      <td>
                        <div style={{ fontWeight: '700', color: '#0f172a' }}>{data.month} 2026</div>
                      </td>
                      <td>
                        <div style={{ fontWeight: '600', color: '#64748b' }}>{data.bookings}</div>
                      </td>
                      <td className="text-end">
                        <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '0.9375rem' }}>
                          ₱{(data.earnings / 1000).toFixed(1)}K
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Key Insights */}
        <div className="section-card">
          <div className="card-header">
            <h3 className="card-title">
              <i className="bi bi-lightbulb me-2"></i>
              Key Insights
            </h3>
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ 
                padding: '1rem', 
                background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(59, 130, 246, 0.04) 100%)',
                borderLeft: '3px solid #2563eb',
                borderRadius: '0.5rem'
              }}>
                <div style={{ fontSize: '0.875rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.375rem' }}>
                  <i className="bi bi-graph-up-arrow me-2" style={{ color: '#2563eb' }}></i>
                  Strong Growth
                </div>
                <div style={{ fontSize: '0.8125rem', color: '#64748b', lineHeight: '1.5' }}>
                  Your bookings increased by 18% this month compared to last month.
                </div>
              </div>

              <div style={{ 
                padding: '1rem', 
                background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.08) 0%, rgba(245, 158, 11, 0.04) 100%)',
                borderLeft: '3px solid #fbbf24',
                borderRadius: '0.5rem'
              }}>
                <div style={{ fontSize: '0.875rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.375rem' }}>
                  <i className="bi bi-star-fill me-2" style={{ color: '#fbbf24' }}></i>
                  Top Service
                </div>
                <div style={{ fontSize: '0.8125rem', color: '#64748b', lineHeight: '1.5' }}>
                  Plumbing is your most requested service with 145 bookings and ₱50.7K revenue.
                </div>
              </div>

              <div style={{ 
                padding: '1rem', 
                background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(59, 130, 246, 0.04) 100%)',
                borderLeft: '3px solid #2563eb',
                borderRadius: '0.5rem'
              }}>
                <div style={{ fontSize: '0.875rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.375rem' }}>
                  <i className="bi bi-trophy me-2" style={{ color: '#2563eb' }}></i>
                  High Performance
                </div>
                <div style={{ fontSize: '0.8125rem', color: '#64748b', lineHeight: '1.5' }}>
                  You maintain a 98% response rate, keeping you competitive in the marketplace.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProviderLayout>
  );
};

export default ProviderAnalytics;
