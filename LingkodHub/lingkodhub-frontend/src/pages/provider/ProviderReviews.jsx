import ProviderLayout from '../../layouts/ProviderLayout';
import '../provider/ProviderPages.css';

const ProviderReviews = () => {
  const reviews = [
    { id: 1, client: 'John Dela Cruz', rating: 5, comment: 'Excellent service! Very professional and efficient. Fixed my plumbing issue quickly.', date: '2026-06-20', service: 'Plumbing', verified: true },
    { id: 2, client: 'Maria Santos', rating: 4, comment: 'Very professional and punctual. Great work quality. Will definitely book again!', date: '2026-06-18', service: 'Electrical', verified: true },
    { id: 3, client: 'Pedro Reyes', rating: 5, comment: 'Highly recommended! Expert work and reasonable rates. Very satisfied.', date: '2026-06-15', service: 'AC Repair', verified: true },
    { id: 4, client: 'Ana Lopez', rating: 5, comment: 'Amazing work! Professional attitude and quality service.', date: '2026-06-12', service: 'Plumbing', verified: false },
    { id: 5, client: 'Carlos Mendoza', rating: 4, comment: 'Good service, arrived on time and completed the job well.', date: '2026-06-10', service: 'Carpentry', verified: true },
  ];

  const averageRating = 4.8;
  const totalReviews = 127;
  const fiveStarCount = 98;
  const fourStarCount = 22;
  const threeStarCount = 5;
  const twoStarCount = 2;
  const oneStarCount = 0;

  return (
    <ProviderLayout>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <div className="breadcrumb-nav">
            <i className="bi bi-house-door"></i>
            <span>Performance</span>
            <i className="bi bi-chevron-right"></i>
            <span>Reviews & Ratings</span>
          </div>
          <h1 className="page-title">Reviews & Ratings</h1>
          <p className="page-subtitle">Track customer feedback and service ratings</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-header">
            <div className="kpi-icon bg-warning-soft">
              <i className="bi bi-star-fill text-warning"></i>
            </div>
            <div className="kpi-trend positive">
              <i className="bi bi-arrow-up"></i>
              <span>+0.2</span>
            </div>
          </div>
          <div className="kpi-body">
            <div className="kpi-value">{averageRating}</div>
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
            <div className="kpi-icon bg-primary-soft">
              <i className="bi bi-chat-square-text-fill text-primary"></i>
            </div>
            <div className="kpi-trend positive">
              <i className="bi bi-arrow-up"></i>
              <span>+12</span>
            </div>
          </div>
          <div className="kpi-body">
            <div className="kpi-value">{totalReviews}</div>
            <div className="kpi-label">Total Reviews</div>
            <div className="kpi-meta">
              <span className="meta-item">
                <i className="bi bi-check-circle"></i>
                All time
              </span>
            </div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <div className="kpi-icon bg-success-soft">
              <i className="bi bi-hand-thumbs-up-fill text-success"></i>
            </div>
          </div>
          <div className="kpi-body">
            <div className="kpi-value">{Math.round((fiveStarCount / totalReviews) * 100)}%</div>
            <div className="kpi-label">5-Star Reviews</div>
            <div className="kpi-meta">
              <span className="meta-item">
                <i className="bi bi-star-fill"></i>
                {fiveStarCount} reviews
              </span>
            </div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <div className="kpi-icon bg-info-soft">
              <i className="bi bi-patch-check-fill text-info"></i>
            </div>
          </div>
          <div className="kpi-body">
            <div className="kpi-value">{Math.round((reviews.filter(r => r.verified).length / reviews.length) * 100)}%</div>
            <div className="kpi-label">Verified Reviews</div>
            <div className="kpi-meta">
              <span className="meta-item">
                <i className="bi bi-shield-check"></i>
                Authentic feedback
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Row */}
      <div className="analytics-row">
        {/* Rating Distribution */}
        <div className="analytics-card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Rating Distribution</h3>
              <p className="card-subtitle">Breakdown of customer ratings</p>
            </div>
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { stars: 5, count: fiveStarCount, percentage: (fiveStarCount / totalReviews) * 100 },
                { stars: 4, count: fourStarCount, percentage: (fourStarCount / totalReviews) * 100 },
                { stars: 3, count: threeStarCount, percentage: (threeStarCount / totalReviews) * 100 },
                { stars: 2, count: twoStarCount, percentage: (twoStarCount / totalReviews) * 100 },
                { stars: 1, count: oneStarCount, percentage: (oneStarCount / totalReviews) * 100 },
              ].map((rating) => (
                <div key={rating.stars} className="service-bar-item">
                  <div className="service-info" style={{ minWidth: '100px' }}>
                    <span className="service-name" style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                      {rating.stars} <i className="bi bi-star-fill" style={{ color: '#fbbf24', fontSize: '0.75rem' }}></i>
                    </span>
                  </div>
                  <div className="service-bar-container">
                    <div 
                      className="service-bar"
                      style={{ 
                        width: `${rating.percentage}%`,
                        background: rating.stars === 5 
                          ? 'linear-gradient(90deg, #10b981 0%, #34d399 100%)'
                          : rating.stars >= 4 
                            ? 'linear-gradient(90deg, #2563eb 0%, #3b82f6 100%)'
                            : rating.stars === 3
                              ? 'linear-gradient(90deg, #fbbf24 0%, #f59e0b 100%)'
                              : 'linear-gradient(90deg, #dc2626 0%, #ef4444 100%)'
                      }}
                    >
                      <span className="service-value">{rating.count}</span>
                    </div>
                  </div>
                  <div className="service-change" style={{ color: '#64748b', minWidth: '60px' }}>
                    {rating.percentage.toFixed(0)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Reviews */}
      <div className="section-header">
        <h2 className="section-title">
          <i className="bi bi-chat-square-text"></i>
          Recent Reviews
        </h2>
      </div>

      <div className="notification-timeline">
        {reviews.map((review) => (
          <div key={review.id} className="notification-item">
            <div className="notification-icon-wrapper icon-primary">
              <i className="bi bi-person-circle"></i>
            </div>
            <div className="notification-content">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <div>
                  <div className="notification-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {review.client}
                    {review.verified && (
                      <i className="bi bi-patch-check-fill" style={{ color: '#2563eb', fontSize: '0.875rem' }} title="Verified Review"></i>
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.25rem' }}>
                    <div className="text-warning">
                      {[...Array(review.rating)].map((_, i) => (
                        <i key={i} className="bi bi-star-fill" style={{ fontSize: '0.8125rem' }}></i>
                      ))}
                      {[...Array(5 - review.rating)].map((_, i) => (
                        <i key={i} className="bi bi-star" style={{ fontSize: '0.8125rem', opacity: 0.3 }}></i>
                      ))}
                    </div>
                    <span className="service-tag" style={{ padding: '0.1875rem 0.5rem', fontSize: '0.6875rem' }}>
                      {review.service}
                    </span>
                  </div>
                </div>
                <span className="notification-time">{review.date}</span>
              </div>
              <div className="notification-message">
                "{review.comment}"
              </div>
            </div>
          </div>
        ))}
      </div>
    </ProviderLayout>
  );
};

export default ProviderReviews;
