import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { demandAnalytics, mockProviders } from '../../data/mockData';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import './DemandTrendAnalytics.css';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DemandTrendAnalytics = () => {
  const [timeFilter, setTimeFilter] = useState('30d');

  // Calculate metrics
  const totalRequests = demandAnalytics.mostRequestedServices.reduce((sum, s) => sum + s.requests, 0);
  const avgResponseTime = '18 min';
  const completionRate = '94%';
  const satisfaction = '4.7';

  // Chart data for Most Requested Services
  const chartData = {
    labels: demandAnalytics.mostRequestedServices.map(s => s.service),
    datasets: [
      {
        label: 'Requests',
        data: demandAnalytics.mostRequestedServices.map(s => s.requests),
        backgroundColor: 'rgba(37, 99, 235, 0.8)',
        borderColor: 'rgba(37, 99, 235, 1)',
        borderWidth: 0,
        borderRadius: 6,
        barThickness: 28,
      }
    ]
  };

  const chartOptions = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: '#0f172a',
        padding: 12,
        titleColor: '#fff',
        bodyColor: '#e2e8f0',
        borderColor: '#1e293b',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: function(context) {
            return context.parsed.x.toLocaleString() + ' requests';
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: true,
          color: '#f1f5f9',
          drawBorder: false
        },
        ticks: {
          color: '#64748b',
          font: {
            size: 11,
            weight: 500
          }
        },
        border: {
          display: false
        }
      },
      y: {
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          color: '#0f172a',
          font: {
            size: 12,
            weight: 600
          },
          padding: 8
        },
        border: {
          display: false
        }
      }
    }
  };

  // Top performing providers
  const topProviders = mockProviders.slice(0, 5);

  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <div className="breadcrumb-nav">
            <i className="bi bi-house-door"></i>
            <span>Dashboard</span>
            <i className="bi bi-chevron-right" style={{ fontSize: '0.7rem', margin: '0 0.25rem' }}></i>
            <span>Demand Analytics</span>
          </div>
          <h1 className="page-title">Demand Analytics</h1>
          <p className="page-subtitle">Analyze service demand trends, category distribution, provider performance, and growth patterns across Davao City</p>
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
              <i className="bi bi-graph-up-arrow text-primary"></i>
            </div>
            <div className="kpi-trend positive">
              <i className="bi bi-arrow-up"></i>
              <span>+12%</span>
            </div>
          </div>
          <div className="kpi-body">
            <div className="kpi-value">{totalRequests.toLocaleString()}</div>
            <div className="kpi-label">Total Requests</div>
            <div className="kpi-meta">
              <span className="meta-item">
                <i className="bi bi-calendar"></i>
                Last 30 days
              </span>
            </div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <div className="kpi-icon bg-primary-soft">
              <i className="bi bi-clock-history text-primary"></i>
            </div>
            <div className="kpi-trend positive">
              <i className="bi bi-arrow-down"></i>
              <span>-8%</span>
            </div>
          </div>
          <div className="kpi-body">
            <div className="kpi-value">{avgResponseTime}</div>
            <div className="kpi-label">Avg Response Time</div>
            <div className="kpi-meta">
              <span className="meta-item">
                <i className="bi bi-check-circle"></i>
                Improved
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
              <span>+5%</span>
            </div>
          </div>
          <div className="kpi-body">
            <div className="kpi-value">{completionRate}</div>
            <div className="kpi-label">Completion Rate</div>
            <div className="kpi-meta">
              <span className="meta-item">
                <i className="bi bi-graph-up"></i>
                Trending up
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
              <span>+3%</span>
            </div>
          </div>
          <div className="kpi-body">
            <div className="kpi-value">{satisfaction}/5</div>
            <div className="kpi-label">Customer Satisfaction</div>
            <div className="kpi-meta">
              <span className="meta-item">
                <i className="bi bi-people"></i>
                2,431 reviews
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Analytics Section */}
      <div className="analytics-row">
        {/* Service Demand Chart */}
        <div className="analytics-card large">
          <div className="card-header">
            <div>
              <h3 className="card-title">Most Requested Services</h3>
              <p className="card-subtitle">Service demand distribution across all barangays</p>
            </div>
            <Link to="/admin/reports" className="btn-link">
              Export Data <i className="bi bi-arrow-right"></i>
            </Link>
          </div>
          <div className="card-body">
            <div style={{ height: '380px' }}>
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="analytics-card small">
          <div className="card-header">
            <h3 className="card-title">Category Distribution</h3>
          </div>
          <div className="card-body">
            <div className="category-list">
              {demandAnalytics.categoryDistribution.map((cat, idx) => (
                <div key={idx} className="category-item">
                  <div className="category-header">
                    <span className="category-name">{cat.category}</span>
                    <span className="category-percent">{cat.percentage}%</span>
                  </div>
                  <div className="category-bar-container">
                    <div 
                      className="category-bar"
                      style={{ width: `${cat.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Analytics Row */}
      <div className="analytics-row">
        {/* Top Performing Barangays */}
        <div className="analytics-card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Top Performing Barangays</h3>
              <p className="card-subtitle">Ranked by booking volume and growth</p>
            </div>
            <Link to="/admin/barangay-insights" className="btn-link">
              View All <i className="bi bi-arrow-right"></i>
            </Link>
          </div>
          <div className="card-body">
            <div className="ranking-list">
              {demandAnalytics.barangayTrends.slice(0, 5).map((barangay, idx) => (
                <div key={idx} className="ranking-item">
                  <div className="ranking-badge">#{idx + 1}</div>
                  <div className="ranking-content">
                    <div className="ranking-name">{barangay.barangay}</div>
                    <div className="ranking-meta">{barangay.bookings} bookings</div>
                  </div>
                  <div className={`ranking-change ${barangay.growth >= 0 ? 'positive' : 'negative'}`}>
                    <i className={`bi bi-arrow-${barangay.growth >= 0 ? 'up' : 'down'}`}></i>
                    {Math.abs(barangay.growth)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Provider Performance */}
        <div className="analytics-card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Provider Performance</h3>
              <p className="card-subtitle">Top-rated service providers</p>
            </div>
            <Link to="/admin/providers" className="btn-link">
              View All <i className="bi bi-arrow-right"></i>
            </Link>
          </div>
          <div className="card-body">
            <div className="provider-list">
              {topProviders.map((provider, idx) => (
                <div key={idx} className="provider-item">
                  <div className="provider-avatar">
                    <img src={provider.avatar} alt={provider.name} />
                  </div>
                  <div className="provider-content">
                    <div className="provider-name">{provider.name}</div>
                    <div className="provider-meta">{provider.completedJobs} jobs completed</div>
                  </div>
                  <div className="provider-rating">
                    <i className="bi bi-star-fill"></i>
                    <span>{provider.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Trends Table */}
      <div className="analytics-card-full">
        <div className="card-header">
          <div>
            <h3 className="card-title">Monthly Performance Trends</h3>
            <p className="card-subtitle">Historical booking and revenue data</p>
          </div>
          <Link to="/admin/reports" className="btn-link">
            View Details <i className="bi bi-arrow-right"></i>
          </Link>
        </div>
        <div className="card-body">
          <div className="trends-table">
            <table>
              <thead>
                <tr>
                  <th>Month</th>
                  <th className="text-end">Bookings</th>
                  <th className="text-end">Revenue</th>
                  <th className="text-end">Avg. Value</th>
                  <th className="text-end">Growth</th>
                </tr>
              </thead>
              <tbody>
                {demandAnalytics.monthlyTrends.map((month, index) => {
                  const prevMonth = demandAnalytics.monthlyTrends[index - 1];
                  const change = prevMonth 
                    ? ((month.bookings - prevMonth.bookings) / prevMonth.bookings * 100).toFixed(1)
                    : 0;
                  const avgValue = (month.revenue / month.bookings).toFixed(0);
                  return (
                    <tr key={index}>
                      <td className="month-cell">{month.month} 2026</td>
                      <td className="text-end value-cell">{month.bookings.toLocaleString()}</td>
                      <td className="text-end value-cell">₱{(month.revenue / 1000).toFixed(1)}K</td>
                      <td className="text-end value-cell">₱{Number(avgValue).toLocaleString()}</td>
                      <td className="text-end">
                        {prevMonth && (
                          <span className={`trend-badge ${change >= 0 ? 'positive' : 'negative'}`}>
                            <i className={`bi bi-arrow-${change >= 0 ? 'up' : 'down'}`}></i>
                            {Math.abs(change)}%
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="insights-grid">
        <div className="insight-card insight-primary">
          <div className="insight-icon">
            <i className="bi bi-lightbulb-fill"></i>
          </div>
          <div className="insight-content">
            <h4 className="insight-title">Key Insight</h4>
            <p className="insight-text">
              Plumbing services show the highest demand with 22% market share. 
              Consider increasing provider capacity in this category.
            </p>
          </div>
        </div>

        <div className="insight-card insight-warning">
          <div className="insight-icon">
            <i className="bi bi-exclamation-triangle-fill"></i>
          </div>
          <div className="insight-content">
            <h4 className="insight-title">Attention Needed</h4>
            <p className="insight-text">
              Tugbok barangay shows declining growth (-3%). 
              Investigation needed to identify and address service gaps.
            </p>
          </div>
        </div>

        <div className="insight-card insight-info">
          <div className="insight-icon">
            <i className="bi bi-graph-up-arrow"></i>
          </div>
          <div className="insight-content">
            <h4 className="insight-title">Growth Opportunity</h4>
            <p className="insight-text">
              Calinan shows 22% growth rate. Excellent opportunity for 
              provider expansion and marketing efforts.
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DemandTrendAnalytics;
