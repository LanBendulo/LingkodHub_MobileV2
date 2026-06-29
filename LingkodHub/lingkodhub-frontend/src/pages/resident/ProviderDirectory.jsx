import { useState } from 'react';
import { Link } from 'react-router-dom';
import ResidentLayout from '../../layouts/ResidentLayout';
import { mockProviders } from '../../data/mockData';
import './ResidentPages.css';

const ProviderDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  const filteredProviders = mockProviders.filter(provider =>
    provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    provider.services.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const sortedProviders = [...filteredProviders].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'reviews':
        return b.reviews - a.reviews;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const avgRating = (mockProviders.reduce((sum, p) => sum + p.rating, 0) / mockProviders.length).toFixed(1);
  const verifiedProviders = mockProviders.filter(p => p.verified).length;

  return (
    <ResidentLayout>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <div className="breadcrumb-nav">
            <i className="bi bi-house-door"></i>
            <span>Services</span>
            <i className="bi bi-chevron-right"></i>
            <span>Providers</span>
          </div>
          <h1 className="page-title">Provider Directory</h1>
          <p className="page-subtitle">Browse all verified service providers in your area</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        <div className="kpi-card">
          <div className="kpi-header">
            <div className="kpi-icon bg-primary-soft">
              <i className="bi bi-people-fill text-primary"></i>
            </div>
          </div>
          <div className="kpi-body">
            <div className="kpi-value">{mockProviders.length}</div>
            <div className="kpi-label">Total Providers</div>
            <div className="kpi-meta">
              <span className="meta-item">
                <i className="bi bi-check-circle"></i>
                All verified
              </span>
            </div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <div className="kpi-icon bg-success-soft">
              <i className="bi bi-patch-check-fill text-success"></i>
            </div>
          </div>
          <div className="kpi-body">
            <div className="kpi-value">{verifiedProviders}</div>
            <div className="kpi-label">Verified Providers</div>
            <div className="kpi-meta">
              <span className="meta-item">
                <i className="bi bi-shield-check"></i>
                {Math.round((verifiedProviders / mockProviders.length) * 100)}%
              </span>
            </div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <div className="kpi-icon bg-warning-soft">
              <i className="bi bi-star-fill text-warning"></i>
            </div>
          </div>
          <div className="kpi-body">
            <div className="kpi-value">{avgRating}</div>
            <div className="kpi-label">Average Rating</div>
            <div className="kpi-meta">
              <span className="meta-item">
                <i className="bi bi-star"></i>
                Out of 5.0
              </span>
            </div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <div className="kpi-icon bg-info-soft">
              <i className="bi bi-clock-history text-info"></i>
            </div>
          </div>
          <div className="kpi-body">
            <div className="kpi-value">15</div>
            <div className="kpi-label">Avg Response</div>
            <div className="kpi-meta">
              <span className="meta-item">
                <i className="bi bi-lightning"></i>
                Minutes
              </span>
            </div>
          </div>
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
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="rating">Highest Rated</option>
            <option value="reviews">Most Reviews</option>
            <option value="name">Name (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Results Header */}
      <div className="section-header">
        <h2 className="section-title">
          <i className="bi bi-people"></i>
          All Providers
        </h2>
        <span style={{ fontSize: '0.9375rem', color: '#64748b', fontWeight: '500' }}>
          Showing <strong style={{ color: '#0f172a' }}>{sortedProviders.length}</strong> providers
        </span>
      </div>

      {/* Providers Grid */}
      {sortedProviders.length > 0 ? (
        <div className="provider-grid">
          {sortedProviders.map((provider) => (
            <Link key={provider.id} to={`/resident/provider/${provider.id}`} style={{ textDecoration: 'none' }}>
              <div className="provider-card">
                <div className="provider-header">
                  <img
                    src={provider.avatar}
                    alt={provider.name}
                    className="provider-avatar-large"
                  />
                  <div className="provider-info">
                    <h4 className="provider-name">{provider.name}</h4>
                    <div className="provider-rating">
                      <i className="bi bi-star-fill" style={{ color: '#fbbf24', fontSize: '0.875rem' }}></i>
                      <span className="provider-rating-value">{provider.rating}</span>
                      <span className="provider-rating-count">({provider.reviews} reviews)</span>
                    </div>
                    {provider.verified && (
                      <div style={{ marginTop: '0.375rem' }}>
                        <span className="status-badge status-active" style={{ fontSize: '0.6875rem' }}>
                          <i className="bi bi-patch-check-fill me-1"></i>
                          Verified
                        </span>
                      </div>
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
                    <div style={{ marginBottom: '0.375rem' }}>
                      <i className="bi bi-geo-alt me-1"></i>
                      {provider.location}
                    </div>
                    <div style={{ color: '#64748b', fontSize: '0.75rem' }}>
                      <i className="bi bi-clock-history me-1"></i>
                      Responds in ~15 min
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: '700', color: '#2563eb', fontSize: '0.9375rem' }}>
                      ₱{provider.hourlyRate}/hr
                    </div>
                    <div style={{ fontSize: '0.6875rem', color: '#64748b', marginTop: '0.125rem' }}>
                      Starting rate
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="settings-card">
          <div className="settings-card-body text-center py-5">
            <i className="bi bi-search" style={{ fontSize: '4rem', color: '#cbd5e1', marginBottom: '1.5rem', display: 'block' }}></i>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.5rem' }}>No providers found</h3>
            <p style={{ color: '#64748b', marginBottom: '1.25rem', fontSize: '0.9375rem' }}>
              Try a different search term
            </p>
            <button
              className="action-btn action-btn-primary"
              onClick={() => setSearchTerm('')}
              style={{ width: 'auto', padding: '0.625rem 1.5rem', height: 'auto' }}
            >
              Clear Search
            </button>
          </div>
        </div>
      )}
    </ResidentLayout>
  );
};

export default ProviderDirectory;
