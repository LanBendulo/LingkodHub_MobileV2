import { useState } from 'react';
import { Link } from 'react-router-dom';
import ResidentLayout from '../../layouts/ResidentLayout';
import { serviceCategories, mockProviders, barangays } from '../../data/mockData';
import './ResidentPages.css';

const FindServices = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBarangay, setSelectedBarangay] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  const filteredProviders = mockProviders.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         provider.services.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = !selectedCategory || provider.services.includes(selectedCategory);
    const matchesBarangay = !selectedBarangay || provider.location.includes(selectedBarangay);
    return matchesSearch && matchesCategory && matchesBarangay;
  });

  const sortedProviders = [...filteredProviders].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'price-low':
        return a.hourlyRate - b.hourlyRate;
      case 'price-high':
        return b.hourlyRate - a.hourlyRate;
      case 'reviews':
        return b.reviews - a.reviews;
      default:
        return 0;
    }
  });

  return (
    <ResidentLayout>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <div className="breadcrumb-nav">
            <i className="bi bi-house-door"></i>
            <span>Services</span>
            <i className="bi bi-chevron-right"></i>
            <span>Find Services</span>
          </div>
          <h1 className="page-title">Find Services</h1>
          <p className="page-subtitle">Browse and book trusted service providers in your area</p>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="stats-grid-small">
        <div className="stat-card-small">
          <div className="stat-label-small">Total Providers</div>
          <div className="stat-value-small">{mockProviders.length}</div>
        </div>
        <div className="stat-card-small">
          <div className="stat-label-small">Service Categories</div>
          <div className="stat-value-small">{serviceCategories.length}</div>
        </div>
        <div className="stat-card-small">
          <div className="stat-label-small">Avg Response Time</div>
          <div className="stat-value-small">15 min</div>
        </div>
        <div className="stat-card-small">
          <div className="stat-label-small">Avg Rating</div>
          <div className="stat-value-small">4.7 ⭐</div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <div className="filter-row">
          <div className="search-input-wrapper">
            <i className="bi bi-search"></i>
            <input
              type="text"
              placeholder="Search services or providers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="filter-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {serviceCategories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>

          <select
            className="filter-select"
            value={selectedBarangay}
            onChange={(e) => setSelectedBarangay(e.target.value)}
          >
            <option value="">All Areas</option>
            {barangays.map((bar, idx) => (
              <option key={idx} value={bar}>
                {bar}
              </option>
            ))}
          </select>

          <select
            className="filter-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="rating">Highest Rated</option>
            <option value="reviews">Most Reviews</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Service Categories Quick Filter */}
      <div className="section-header">
        <h2 className="section-title">
          <i className="bi bi-grid-3x3-gap"></i>
          Browse by Category
        </h2>
        {selectedCategory && (
          <button
            className="btn-link"
            onClick={() => setSelectedCategory('')}
            style={{ color: '#dc2626' }}
          >
            <i className="bi bi-x-circle me-1"></i>
            Clear Filter
          </button>
        )}
      </div>

      <div className="provider-grid" style={{ marginBottom: '2rem' }}>
        {serviceCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(selectedCategory === category.name ? '' : category.name)}
            style={{
              background: selectedCategory === category.name
                ? 'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)'
                : 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
              border: selectedCategory === category.name ? '2px solid #2563eb' : '1px solid #e2e8f0',
              borderRadius: '0.75rem',
              padding: '1.25rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              textAlign: 'center',
              width: '100%',
              boxShadow: selectedCategory === category.name ? '0 4px 6px -1px rgba(37, 99, 235, 0.2)' : '0 1px 3px rgba(0, 0, 0, 0.05)'
            }}
            onMouseEnter={(e) => {
              if (selectedCategory !== category.name) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedCategory !== category.name) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
              }
            }}
          >
            <div style={{
              width: '56px',
              height: '56px',
              margin: '0 auto 0.875rem',
              borderRadius: '0.625rem',
              background: selectedCategory === category.name
                ? 'linear-gradient(135deg, rgba(37, 99, 235, 0.15) 0%, rgba(59, 130, 246, 0.08) 100%)'
                : 'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.75rem',
              color: '#2563eb'
            }}>
              <i className={category.icon}></i>
            </div>
            <div style={{ fontWeight: '700', color: selectedCategory === category.name ? '#2563eb' : '#0f172a', fontSize: '0.9375rem', letterSpacing: '-0.01em' }}>
              {category.name}
            </div>
          </button>
        ))}
      </div>

      {/* Results Header */}
      <div className="section-header">
        <h2 className="section-title">
          <i className="bi bi-people"></i>
          Available Providers
        </h2>
        <span style={{ fontSize: '0.9375rem', color: '#64748b', fontWeight: '500' }}>
          Found <strong style={{ color: '#0f172a' }}>{sortedProviders.length}</strong> providers
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
                    <i className="bi bi-geo-alt me-1"></i>
                    {provider.location}
                  </div>
                  <div style={{ fontWeight: '700', color: '#2563eb', fontSize: '0.9375rem' }}>
                    ₱{provider.hourlyRate}/hr
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
              Try adjusting your search or filter criteria
            </p>
            <button
              className="action-btn action-btn-primary"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
                setSelectedBarangay('');
              }}
              style={{ width: 'auto', padding: '0.625rem 1.5rem', height: 'auto' }}
            >
              Clear All Filters
            </button>
          </div>
        </div>
      )}
    </ResidentLayout>
  );
};

export default FindServices;
