import { useState } from 'react';
import ProviderLayout from '../../layouts/ProviderLayout';
import { serviceCategories } from '../../data/mockData';
import './ProviderPages.css';

const ServicesManagement = () => {
  const [services, setServices] = useState([
    { id: 1, name: 'Plumbing', rate: 350, active: true, bookings: 45, rating: 4.8, icon: 'bi-droplet' },
    { id: 2, name: 'Electrical', rate: 400, active: true, bookings: 38, rating: 4.9, icon: 'bi-lightning-charge' },
    { id: 3, name: 'AC Repair', rate: 450, active: false, bookings: 22, rating: 4.7, icon: 'bi-wind' },
    { id: 4, name: 'Carpentry', rate: 380, active: true, bookings: 31, rating: 4.6, icon: 'bi-hammer' },
  ]);

  const activeServices = services.filter(s => s.active).length;
  const totalBookings = services.reduce((sum, s) => sum + s.bookings, 0);
  const avgRating = (services.reduce((sum, s) => sum + s.rating, 0) / services.length).toFixed(1);
  const monthlyRevenue = services.reduce((sum, s) => sum + (s.rate * s.bookings), 0);


  return (
    <ProviderLayout>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <div className="breadcrumb-nav">
            <i className="bi bi-house-door"></i>
            <span>Operations</span>
            <i className="bi bi-chevron-right"></i>
            <span>Services Management</span>
          </div>
          <h1 className="page-title">Services Management</h1>
          <p className="page-subtitle">Manage your service offerings, rates, and availability</p>
        </div>
        <button className="action-btn action-btn-primary" style={{ width: 'auto', padding: '0.625rem 1.5rem', height: 'auto' }}>
          <i className="bi bi-plus-circle me-2"></i>
          Add New Service
        </button>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-header">
            <div className="kpi-icon bg-primary-soft">
              <i className="bi bi-tools text-primary"></i>
            </div>
            <div className="kpi-trend positive">
              <i className="bi bi-arrow-up"></i>
              <span>+2</span>
            </div>
          </div>
          <div className="kpi-body">
            <div className="kpi-value">{activeServices}</div>
            <div className="kpi-label">Active Services</div>
            <div className="kpi-meta">
              <span className="meta-item">
                <i className="bi bi-check-circle"></i>
                {services.length} total
              </span>
            </div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <div className="kpi-icon bg-success-soft">
              <i className="bi bi-calendar-check text-success"></i>
            </div>
            <div className="kpi-trend positive">
              <i className="bi bi-arrow-up"></i>
              <span>+15%</span>
            </div>
          </div>
          <div className="kpi-body">
            <div className="kpi-value">{totalBookings}</div>
            <div className="kpi-label">Total Bookings</div>
            <div className="kpi-meta">
              <span className="meta-item">
                <i className="bi bi-graph-up"></i>
                All services
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
                Across all services
              </span>
            </div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <div className="kpi-icon bg-info-soft">
              <i className="bi bi-currency-dollar text-info"></i>
            </div>
            <div className="kpi-trend positive">
              <i className="bi bi-arrow-up"></i>
              <span>+18%</span>
            </div>
          </div>
          <div className="kpi-body">
            <div className="kpi-value">₱{(monthlyRevenue / 1000).toFixed(1)}K</div>
            <div className="kpi-label">Revenue (Est.)</div>
            <div className="kpi-meta">
              <span className="meta-item">
                <i className="bi bi-graph-up"></i>
                This month
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="section-header">
        <h2 className="section-title">
          <i className="bi bi-tools"></i>
          Your Services
        </h2>
      </div>

      <div className="provider-grid">
        {services.map((service) => (
          <div key={service.id} className="provider-card">
            <div className="provider-header" style={{ marginBottom: '1.125rem' }}>
              <div style={{ 
                width: '56px', 
                height: '56px', 
                borderRadius: '0.75rem',
                background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)',
                border: '1px solid rgba(37, 99, 235, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.75rem',
                color: '#2563eb'
              }}>
                <i className={service.icon}></i>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <h4 className="provider-name" style={{ margin: 0 }}>{service.name}</h4>
                  <span className={`status-badge ${service.active ? 'status-active' : 'status-inactive'}`}>
                    {service.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="provider-rating">
                  <i className="bi bi-star-fill" style={{ color: '#fbbf24', fontSize: '0.875rem' }}></i>
                  <span className="provider-rating-value">{service.rating}</span>
                  <span className="provider-rating-count">({service.bookings} bookings)</span>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '1.125rem' }}>
              <div style={{ 
                padding: '1rem', 
                background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                borderRadius: '0.625rem',
                border: '1px solid #f1f5f9',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.375rem' }}>
                  Hourly Rate
                </div>
                <div style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a', lineHeight: '1', letterSpacing: '-0.04em' }}>
                  ₱{service.rate}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>
                  per hour
                </div>
              </div>
            </div>

            <div className="provider-meta" style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1rem', marginTop: '1rem' }}>
              <div className="action-btn-group">
                <button className="action-btn" title="Edit Service">
                  <i className="bi bi-pencil"></i>
                </button>
                <button className="action-btn" title="View Analytics">
                  <i className="bi bi-graph-up"></i>
                </button>
                <button className="action-btn action-btn-danger" title="Delete Service">
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Add Service Card */}
        <div className="provider-card" style={{ 
          background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
          border: '2px dashed #cbd5e1',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '320px',
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#2563eb';
          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(37, 99, 235, 0.02) 0%, #ffffff 100%)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = '#cbd5e1';
          e.currentTarget.style.background = 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)';
        }}
        >
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1rem'
          }}>
            <i className="bi bi-plus-lg" style={{ fontSize: '1.75rem', color: '#2563eb' }}></i>
          </div>
          <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.375rem' }}>
            Add New Service
          </h4>
          <p style={{ fontSize: '0.8125rem', color: '#64748b', margin: 0, textAlign: 'center' }}>
            Expand your offerings
          </p>
        </div>
      </div>

      {/* Available Service Categories */}
      <div className="section-header" style={{ marginTop: '2.5rem' }}>
        <h2 className="section-title">
          <i className="bi bi-grid-3x3-gap"></i>
          Available Service Categories
        </h2>
      </div>

      <div className="settings-card">
        <div className="settings-card-body">
          <div className="service-tags" style={{ gap: '0.75rem' }}>
            {serviceCategories.map((cat) => {
              const isOffered = services.some(s => s.name === cat.name);
              return (
                <div
                  key={cat.id}
                  style={{
                    padding: '0.75rem 1.125rem',
                    background: isOffered 
                      ? 'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)'
                      : 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                    border: isOffered ? '1px solid #2563eb' : '1px solid #e2e8f0',
                    borderRadius: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.625rem',
                    cursor: isOffered ? 'default' : 'pointer',
                    transition: 'all 0.15s ease',
                    opacity: isOffered ? 1 : 0.8
                  }}
                  onMouseEnter={(e) => {
                    if (!isOffered) {
                      e.currentTarget.style.borderColor = '#2563eb';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isOffered) {
                      e.currentTarget.style.borderColor = '#e2e8f0';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  <i className={`${cat.icon}`} style={{ fontSize: '1.125rem', color: isOffered ? '#2563eb' : '#64748b' }}></i>
                  <span style={{ fontSize: '0.875rem', fontWeight: '600', color: isOffered ? '#2563eb' : '#0f172a' }}>
                    {cat.name}
                  </span>
                  {isOffered && (
                    <i className="bi bi-check-circle-fill" style={{ fontSize: '0.875rem', color: '#2563eb', marginLeft: 'auto' }}></i>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </ProviderLayout>
  );
};

export default ServicesManagement;
