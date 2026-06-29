import { Link } from 'react-router-dom';
import AdminLayout from '../../layouts/AdminLayout';
import './AdminPages.css';

const Reports = () => {
  const reportCategories = [
    {
      icon: 'bi-file-earmark-bar-graph',
      title: 'Revenue Report',
      desc: 'Comprehensive revenue analysis with monthly breakdowns and trends',
      period: 'Monthly',
      lastGenerated: '2 hours ago'
    },
    {
      icon: 'bi-file-earmark-person',
      title: 'User Activity Report',
      desc: 'User engagement metrics, active users, and retention analysis',
      period: 'Weekly',
      lastGenerated: '1 day ago'
    },
    {
      icon: 'bi-file-earmark-check',
      title: 'Booking Analytics',
      desc: 'Booking statistics, completion rates, and service demand patterns',
      period: 'Daily',
      lastGenerated: '3 hours ago'
    },
    {
      icon: 'bi-file-earmark-text',
      title: 'Provider Performance',
      desc: 'Provider ratings, completion metrics, and service quality analysis',
      period: 'Monthly',
      lastGenerated: '5 hours ago'
    },
    {
      icon: 'bi-file-earmark-spreadsheet',
      title: 'Financial Summary',
      desc: 'Platform earnings, provider payouts, and commission tracking',
      period: 'Monthly',
      lastGenerated: '1 day ago'
    },
    {
      icon: 'bi-file-earmark-medical',
      title: 'Service Quality Report',
      desc: 'Customer satisfaction scores, reviews, and complaint analysis',
      period: 'Weekly',
      lastGenerated: '4 hours ago'
    },
    {
      icon: 'bi-file-earmark-arrow-up',
      title: 'Growth Analytics',
      desc: 'Platform growth metrics, new registrations, and expansion trends',
      period: 'Monthly',
      lastGenerated: '2 days ago'
    },
    {
      icon: 'bi-file-earmark-lock',
      title: 'Security Audit',
      desc: 'Security events, access logs, and compliance monitoring',
      period: 'Weekly',
      lastGenerated: '6 hours ago'
    }
  ];

  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <div className="breadcrumb-nav">
            <i className="bi bi-house-door"></i>
            <span>Dashboard</span>
            <i className="bi bi-chevron-right" style={{ fontSize: '0.7rem', margin: '0 0.25rem' }}></i>
            <span>Reports</span>
          </div>
          <h1 className="page-title">Reports & Analytics</h1>
          <p className="page-subtitle">Generate comprehensive reports and export platform analytics data</p>
        </div>
        <div className="header-actions-right">
          <button className="action-button primary" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.625rem 1.125rem',
            borderRadius: '0.5rem',
            border: '1px solid #2563eb',
            background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
            color: 'white',
            fontWeight: 600,
            fontSize: '0.875rem',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            boxShadow: '0 1px 2px rgba(37, 99, 235, 0.2)'
          }}>
            <i className="bi bi-plus-lg"></i>
            <span>Custom Report</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="stats-grid-small">
        <div className="stat-card-small">
          <div className="stat-label-small">Reports Generated</div>
          <div className="stat-value-small">2,431</div>
        </div>
        <div className="stat-card-small">
          <div className="stat-label-small">This Month</div>
          <div className="stat-value-small">156</div>
        </div>
        <div className="stat-card-small">
          <div className="stat-label-small">Scheduled</div>
          <div className="stat-value-small">8</div>
        </div>
        <div className="stat-card-small">
          <div className="stat-label-small">Exports</div>
          <div className="stat-value-small">892</div>
        </div>
      </div>

      {/* Report Categories */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '1.125rem',
        marginBottom: '1.75rem'
      }}>
        {reportCategories.map((report, index) => (
          <div key={index} className="report-card">
            <div className="report-icon">
              <i className={`bi ${report.icon}`}></i>
            </div>
            <h3 className="report-title">{report.title}</h3>
            <p className="report-desc">{report.desc}</p>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.875rem',
              fontSize: '0.75rem',
              color: '#64748b'
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <i className="bi bi-clock-history"></i>
                {report.period}
              </span>
              <span>Generated {report.lastGenerated}</span>
            </div>
            <button style={{
              width: '100%',
              padding: '0.625rem',
              borderRadius: '0.5rem',
              border: '1px solid #2563eb',
              background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
              color: 'white',
              fontWeight: 600,
              fontSize: '0.875rem',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}>
              <i className="bi bi-download"></i>
              Generate Report
            </button>
          </div>
        ))}
      </div>

      {/* Recent Exports */}
      <div className="admin-table-card">
        <div style={{
          padding: '1.25rem 1.375rem',
          borderBottom: '1px solid #f1f5f9',
          background: 'linear-gradient(180deg, #fafbfc 0%, #ffffff 100%)'
        }}>
          <h3 style={{
            fontSize: '1.0625rem',
            fontWeight: 700,
            color: '#0f172a',
            margin: 0,
            letterSpacing: '-0.02em'
          }}>Recent Exports</h3>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Report Name</th>
              <th>Type</th>
              <th>Date Generated</th>
              <th>Size</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ fontWeight: 600 }}>Revenue Report - June 2026</td>
              <td><span className="service-tag">PDF</span></td>
              <td>2026-06-22 10:30 AM</td>
              <td>2.4 MB</td>
              <td><span className="status-badge status-completed">Ready</span></td>
              <td>
                <div className="action-btn-group">
                  <button className="action-btn action-btn-primary" title="Download">
                    <i className="bi bi-download"></i>
                  </button>
                  <button className="action-btn" title="Share">
                    <i className="bi bi-share"></i>
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td style={{ fontWeight: 600 }}>User Activity Report - Q2 2026</td>
              <td><span className="service-tag">Excel</span></td>
              <td>2026-06-21 03:15 PM</td>
              <td>1.8 MB</td>
              <td><span className="status-badge status-completed">Ready</span></td>
              <td>
                <div className="action-btn-group">
                  <button className="action-btn action-btn-primary" title="Download">
                    <i className="bi bi-download"></i>
                  </button>
                  <button className="action-btn" title="Share">
                    <i className="bi bi-share"></i>
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td style={{ fontWeight: 600 }}>Provider Performance - May 2026</td>
              <td><span className="service-tag">PDF</span></td>
              <td>2026-06-20 09:45 AM</td>
              <td>3.1 MB</td>
              <td><span className="status-badge status-completed">Ready</span></td>
              <td>
                <div className="action-btn-group">
                  <button className="action-btn action-btn-primary" title="Download">
                    <i className="bi bi-download"></i>
                  </button>
                  <button className="action-btn" title="Share">
                    <i className="bi bi-share"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default Reports;
