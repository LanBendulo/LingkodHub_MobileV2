import { useState } from 'react';
import ResidentLayout from '../../layouts/ResidentLayout';
import { mockReviews } from '../../data/mockData';
import '../resident/ResidentPages.css';

const ResidentReviews = () => {
  const [filterType, setFilterType] = useState('all');

  // Calculate review statistics
  const totalReviews = mockReviews.length;
  const avgRating = (mockReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1);
  const pendingResponses = mockReviews.filter(r => !r.response).length;
  const recentReviews = mockReviews.filter(r => {
    const reviewDate = new Date(r.date);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return reviewDate >= thirtyDaysAgo;
  }).length;

  const filteredReviews = mockReviews.filter(review => {
    if (filterType === 'with-response') return review.response;
    if (filterType === 'no-response') return !review.response;
    return true;
  });

  return (
    <ResidentLayout>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">My Reviews</h1>
          <p className="page-subtitle">Reviews you've left for service providers</p>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="kpi-card">
            <div className="kpi-card-accent"></div>
            <div className="kpi-card-content">
              <div className="kpi-label">Total Reviews</div>
              <div className="kpi-value">{totalReviews}</div>
              <div className="kpi-change positive">
                <i className="bi bi-arrow-up"></i>
                All time
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="kpi-card">
            <div className="kpi-card-accent"></div>
            <div className="kpi-card-content">
              <div className="kpi-label">Average Rating</div>
              <div className="kpi-value">{avgRating}</div>
              <div className="kpi-change">
                <i className="bi bi-star-fill text-warning"></i>
                Out of 5.0
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="kpi-card">
            <div className="kpi-card-accent"></div>
            <div className="kpi-card-content">
              <div className="kpi-label">Recent (30 days)</div>
              <div className="kpi-value">{recentReviews}</div>
              <div className="kpi-change">
                <i className="bi bi-calendar3"></i>
                Last month
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="kpi-card">
            <div className="kpi-card-accent"></div>
            <div className="kpi-card-content">
              <div className="kpi-label">Pending Responses</div>
              <div className="kpi-value">{pendingResponses}</div>
              <div className="kpi-change">
                <i className="bi bi-chat-dots"></i>
                Awaiting reply
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => setFilterType('all')}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              border: filterType === 'all' ? '1px solid #2563eb' : '1px solid #e2e8f0',
              background: filterType === 'all' ? 'rgba(37, 99, 235, 0.1)' : 'white',
              color: filterType === 'all' ? '#2563eb' : '#64748b',
              fontWeight: 600,
              fontSize: '0.8125rem',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            All Reviews ({totalReviews})
          </button>
          <button
            onClick={() => setFilterType('with-response')}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              border: filterType === 'with-response' ? '1px solid #2563eb' : '1px solid #e2e8f0',
              background: filterType === 'with-response' ? 'rgba(37, 99, 235, 0.1)' : 'white',
              color: filterType === 'with-response' ? '#2563eb' : '#64748b',
              fontWeight: 600,
              fontSize: '0.8125rem',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            With Response ({totalReviews - pendingResponses})
          </button>
          <button
            onClick={() => setFilterType('no-response')}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              border: filterType === 'no-response' ? '1px solid #2563eb' : '1px solid #e2e8f0',
              background: filterType === 'no-response' ? 'rgba(37, 99, 235, 0.1)' : 'white',
              color: filterType === 'no-response' ? '#2563eb' : '#64748b',
              fontWeight: 600,
              fontSize: '0.8125rem',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            No Response ({pendingResponses})
          </button>
        </div>
      </div>

      {/* Reviews Timeline */}
      <div className="notification-timeline">
        {filteredReviews.map((review) => (
          <div key={review.id} className="notification-item">
            <div className="notification-icon-wrapper" style={{ background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%)' }}>
              <i className="bi bi-star-fill" style={{ color: '#FBBF24' }}></i>
            </div>
            <div className="notification-content">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <img
                    src={review.booking.provider.avatar}
                    alt={review.booking.provider.name}
                    className="rounded-circle"
                    width="40"
                    height="40"
                    style={{ border: '2px solid #e2e8f0' }}
                  />
                  <div>
                    <h6 className="notification-title mb-0">{review.booking.provider.name}</h6>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.125rem' }}>
                      {review.booking.service}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ color: '#FBBF24', display: 'flex', gap: '0.125rem' }}>
                    {[...Array(review.rating)].map((_, i) => (
                      <i key={i} className="bi bi-star-fill" style={{ fontSize: '0.875rem' }}></i>
                    ))}
                  </div>
                  <span className="notification-time">{review.date}</span>
                </div>
              </div>
              <p className="notification-message">{review.comment}</p>
              {review.response && (
                <div style={{ 
                  marginTop: '0.875rem',
                  padding: '0.875rem 1rem', 
                  backgroundColor: '#F8FAFC', 
                  borderLeft: '3px solid #2563EB',
                  borderRadius: '0.375rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <i className="bi bi-reply-fill" style={{ color: '#2563eb', fontSize: '0.875rem' }}></i>
                    <strong style={{ fontSize: '0.8125rem', color: '#2563eb', fontWeight: 700 }}>Provider Response</strong>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.8125rem', color: '#64748b', lineHeight: 1.5 }}>{review.response}</p>
                </div>
              )}
              {!review.response && (
                <div style={{ marginTop: '0.5rem' }}>
                  <span className="status-badge status-pending">
                    <i className="bi bi-clock me-1"></i>
                    Awaiting response
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </ResidentLayout>
  );
};

export default ResidentReviews;
