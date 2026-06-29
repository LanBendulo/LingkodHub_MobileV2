import { Link } from 'react-router-dom';
import { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { mockProviders } from '../../data/mockData';
import './AdminPages.css';

const ProviderManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterVerified, setFilterVerified] = useState('all');

  const filteredProviders = mockProviders.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         provider.services.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesVerified = filterVerified === 'all' || 
                           (filterVerified === 'verified' && provider.verified) ||
                           (filterVerified === 'unverified' && !provider.verified);
    return matchesSearch && matchesVerified;
  });

  // Calculate stats
  const totalProviders = mockProviders.length;
  const verifiedProviders = mockProviders.filter(p => p.verified).length;
  const totalJobs = mockProviders.reduce((sum, p) => sum + p.completedJobs, 0);
  const avgRating = (mockProviders.reduce((sum, p) => sum + p.rating, 0) / mockProviders.length).toFixed(1);

  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <div className="breadcrumb-nav">
            <i className="bi bi-house-door"></i>
            <span>Dashboard</span>
            <i className="bi bi-chevron-right" style={{ fontSize: '0.7rem', margin: '0 0.25rem' }}></i>
            <span>Provider Management</span>
          </div>
          <h1 className="page-title">Provider Management</h1>
          <p className="page-subtitle">Manage service providers, verify credentials, and monitor performance</p>
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
            <span>Add Provider</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid-small">
        <div className="stat-card-small">
          <div className="stat-label-small">Total Providers</div>
          <div className="stat-value-small">{totalProviders}</div>
        </div>
        <div className="stat-card-small">
          <div className="stat-label-small">Verified</div>
          <div className="stat-value-small">{verifiedProviders}</div>
        </div>
        <div className="stat-card-small">
          <div className="stat-label-small">Completed Jobs</div>
          <div className="stat-value-small">{totalJobs}</div>
        </div>
        <div className="stat-card-small">
          <div className="stat-label-small">Avg Rating</div>
          <div className="stat-value-small">{avgRating}</div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <div className="filter-row">
          <div className="search-input-wrapper">
            <i className="bi bi-search"></i>
            <input
              type="text"
              placeholder="Search providers by name or service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="filter-select"
            value={filterVerified}
            onChange={(e) => setFilterVerified(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="verified">Verified</option>
            <option value="unverified">Unverified</option>
          </select>
          <select className="filter-select">
            <option>All Services</option>
            <option>Plumbing</option>
            <option>Electrical</option>
            <option>Cleaning</option>
            <option>Carpentry</option>
          </select>
          <button className="action-button quaternary" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.625rem 1.125rem',
            borderRadius: '0.5rem',
            border: '1px solid #e2e8f0',
            background: 'white',
            color: '#0f172a',
            fontWeight: 600,
            fontSize: '0.875rem',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}>
            <i className="bi bi-funnel"></i>
            <span>More Filters</span>
          </button>
        </div>
      </div>

      {/* Provider Cards Grid */}
      <div className="provider-grid">
        {filteredProviders.map((provider) => (
          <div key={provider.id} className="provider-card">
            <div className="provider-header">
              <img
                src={provider.avatar}
                alt={provider.name}
                className="provider-avatar-large"
              />
              <div className="provider-info">
                <div className="provider-name">{provider.name}</div>
                <div className="provider-rating">
                  <i className="bi bi-star-fill" style={{ color: '#fbbf24', fontSize: '0.875rem' }}></i>
                  <span className="provider-rating-value">{provider.rating}</span>
                  <span className="provider-rating-count">({provider.reviews} reviews)</span>
                </div>
                {provider.verified && (
                  <span className="status-badge" style={{
                    background: 'rgba(37, 99, 235, 0.1)',
                    color: '#2563eb',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}>
                    <i className="bi bi-patch-check-fill"></i>
                    Verified
                  </span>
                )}
              </div>
            </div>

            <div className="provider-services">
              <div className="provider-services-label">Services Offered</div>
              <div className="service-tags">
                {provider.services.map((service, idx) => (
                  <span key={idx} className="service-tag">
                    {service}
                  </span>
                ))}
              </div>
            </div>

            <div className="provider-meta">
              <div className="provider-stats">
                <i className="bi bi-check-circle" style={{ marginRight: '0.25rem' }}></i>
                {provider.completedJobs} jobs completed
              </div>
              <div className="action-btn-group">
                <button className="action-btn" title="View Profile">
                  <i className="bi bi-eye"></i>
                </button>
                <button className="action-btn" title="Edit Provider">
                  <i className="bi bi-pencil"></i>
                </button>
                <button className="action-btn action-btn-danger" title="Suspend">
                  <i className="bi bi-ban"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default ProviderManagement;
