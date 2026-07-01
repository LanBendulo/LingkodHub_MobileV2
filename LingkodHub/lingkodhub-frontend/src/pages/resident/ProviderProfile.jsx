import { useParams, useNavigate } from 'react-router-dom';
import ResidentLayout from '../../layouts/ResidentLayout';
import { mockProviders } from '../../data/mockData';
import './ProviderProfile.css';

const ProviderProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const provider = mockProviders.find(p => p.id === parseInt(id)) || mockProviders[0];

  // Mock enhanced data
  const enhancedProvider = {
    ...provider,
    yearsOfExperience: 5,
    responseRate: '98%',
    memberSince: '2024',
    languages: ['English', 'Filipino'],
    workingHours: 'Mon-Sat: 8:00 AM - 6:00 PM',
    serviceAreas: ['Matina', 'Bajada', 'Talomo', 'Buhangin', 'Toril'],
    verifications: [
      { label: 'Verified Provider', verified: true },
      { label: 'Government ID Verified', verified: true },
      { label: 'Face Verified', verified: true },
      { label: 'Background Checked', verified: false },
    ],
    servicesDetailed: [
      { name: 'Leak Repair', category: 'Plumbing', icon: 'bi-droplet-fill', price: 350, duration: '30-60 mins' },
      { name: 'Pipe Installation', category: 'Plumbing', icon: 'bi-droplet-fill', price: 450, duration: '1-2 hours' },
      { name: 'Drain Unclogging', category: 'Plumbing', icon: 'bi-droplet-fill', price: 300, duration: '30-45 mins' },
      { name: 'Faucet Replacement', category: 'Plumbing', icon: 'bi-droplet-fill', price: 250, duration: '30 mins' },
    ],
  };

  const handleBookService = (service) => {
    navigate('/resident/book-service', {
      state: {
        provider: {
          id: provider.id,
          name: provider.name,
          owner: provider.name,
          avatar: provider.avatar,
          verified: provider.verified,
          rating: provider.rating,
          reviews: provider.reviews,
          completedJobs: provider.completedJobs,
        },
        service: {
          id: service.name.toLowerCase().replace(/\s+/g, '-'),
          name: service.name,
          category: service.category,
          icon: service.icon,
          providerPrice: service.price,
          suggestedPrice: Math.round(service.price * 0.95),
          estimatedDuration: service.duration,
          pricingLabel: 'Fair Pricing',
        },
      },
    });
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <i key={`full-${i}`} className="bi bi-star-fill"></i>
        ))}
        {hasHalfStar && <i className="bi bi-star-half"></i>}
        {[...Array(emptyStars)].map((_, i) => (
          <i key={`empty-${i}`} className="bi bi-star"></i>
        ))}
      </>
    );
  };

  return (
    <ResidentLayout>
      <div className="provider-profile-container">
        {/* Breadcrumb */}
        <div className="breadcrumb-nav">
          <i className="bi bi-house-door"></i>
          <i className="bi bi-chevron-right"></i>
          <span className="breadcrumb-link" onClick={() => navigate('/resident/providers')}>Providers</span>
          <i className="bi bi-chevron-right"></i>
          <span>{provider.name}</span>
        </div>

        {/* Header Card */}
        <div className="provider-header-card">
          <div className="provider-header-content">
            <div className="provider-avatar-section">
              <img 
                src={provider.avatar} 
                alt={provider.name}
                className="provider-avatar-hero"
              />
              {provider.availability === 'Available Now' && (
                <div className="availability-badge">
                  <i className="bi bi-circle-fill"></i>
                  Available Today
                </div>
              )}
            </div>

            <div className="provider-header-info">
              <div className="provider-name-row">
                <h1 className="provider-name-hero">{provider.name}</h1>
                {provider.verified && (
                  <span className="verified-badge-hero">
                    <i className="bi bi-patch-check-fill"></i>
                    Verified
                  </span>
                )}
              </div>

              <div className="provider-meta-row">
                <div className="rating-hero">
                  <span className="rating-value">{provider.rating}</span>
                  <div className="stars-hero">
                    {renderStars(provider.rating)}
                  </div>
                  <span className="reviews-count">({provider.reviews} reviews)</span>
                </div>
                <div className="meta-separator">•</div>
                <div className="meta-item">
                  <i className="bi bi-check-circle"></i>
                  {provider.completedJobs} completed jobs
                </div>
                <div className="meta-separator">•</div>
                <div className="meta-item">
                  <i className="bi bi-calendar"></i>
                  {enhancedProvider.yearsOfExperience} years experience
                </div>
                <div className="meta-separator">•</div>
                <div className="meta-item">
                  <i className="bi bi-geo-alt"></i>
                  {provider.location}
                </div>
              </div>

              <div className="provider-actions-hero">
                <button 
                  className="btn-book-hero"
                  onClick={() => handleBookService(enhancedProvider.servicesDetailed[0])}
                >
                  <i className="bi bi-calendar-check"></i>
                  Book Service
                </button>
                <button className="btn-message-hero">
                  <i className="bi bi-chat-dots"></i>
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="provider-grid">
          {/* Main Content */}
          <div className="provider-main">
            {/* Services Grid */}
            <div className="section-card">
              <h2 className="section-title">
                <i className="bi bi-tools"></i>
                Services Offered
              </h2>
              <div className="services-grid">
                {enhancedProvider.servicesDetailed.map((service, index) => (
                  <div key={index} className="service-card">
                    <div className="service-card-header">
                      <div className="service-icon">
                        <i className={service.icon}></i>
                      </div>
                      <div>
                        <div className="service-category">{service.category}</div>
                        <h3 className="service-name">{service.name}</h3>
                      </div>
                    </div>
                    <div className="service-card-body">
                      <div className="service-detail">
                        <span className="detail-label">Starting at</span>
                        <span className="detail-price">₱{service.price}</span>
                      </div>
                      <div className="service-detail">
                        <span className="detail-label">Duration</span>
                        <span className="detail-duration">{service.duration}</span>
                      </div>
                    </div>
                    <button 
                      className="btn-book-service"
                      onClick={() => handleBookService(service)}
                    >
                      Book Now
                      <i className="bi bi-arrow-right"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* About Section */}
            <div className="section-card">
              <h2 className="section-title">
                <i className="bi bi-info-circle"></i>
                About
              </h2>
              <p className="about-text">{provider.about}</p>
              
              <div className="about-details">
                <div className="about-detail-item">
                  <i className="bi bi-clock-history"></i>
                  <div>
                    <div className="about-detail-label">Working Hours</div>
                    <div className="about-detail-value">{enhancedProvider.workingHours}</div>
                  </div>
                </div>
                <div className="about-detail-item">
                  <i className="bi bi-translate"></i>
                  <div>
                    <div className="about-detail-label">Languages</div>
                    <div className="about-detail-value">{enhancedProvider.languages.join(', ')}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills & Certifications */}
            <div className="section-card">
              <h2 className="section-title">
                <i className="bi bi-award"></i>
                Skills & Certifications
              </h2>
              
              <h3 className="subsection-title">Skills & Expertise</h3>
              <div className="skills-grid">
                {provider.skills.map((skill, index) => (
                  <div key={index} className="skill-badge">
                    <i className="bi bi-check-circle-fill"></i>
                    {skill}
                  </div>
                ))}
              </div>

              <h3 className="subsection-title">Certifications</h3>
              <div className="certifications-grid">
                {provider.certifications.map((cert, index) => (
                  <div key={index} className="certification-badge">
                    <i className="bi bi-award"></i>
                    {cert}
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            <div className="section-card">
              <h2 className="section-title">
                <i className="bi bi-star"></i>
                Reviews ({provider.reviews})
              </h2>

              {/* Rating Summary */}
              <div className="rating-summary">
                <div className="rating-summary-left">
                  <div className="rating-large">{provider.rating}</div>
                  <div className="stars-large">
                    {renderStars(provider.rating)}
                  </div>
                  <div className="rating-label">{provider.reviews} reviews</div>
                </div>

                <div className="rating-distribution">
                  {[5, 4, 3, 2, 1].map(rating => (
                    <div key={rating} className="distribution-row">
                      <span className="distribution-label">{rating}</span>
                      <i className="bi bi-star-fill"></i>
                      <div className="distribution-bar">
                        <div 
                          className="distribution-fill"
                          style={{ width: `${rating === 5 ? 80 : rating === 4 ? 15 : 5}%` }}
                        ></div>
                      </div>
                      <span className="distribution-percent">{rating === 5 ? '80%' : rating === 4 ? '15%' : '5%'}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Individual Reviews */}
              <div className="reviews-list">
                {[
                  { name: 'Maria Santos', service: 'Leak Repair', rating: 5, date: '2 weeks ago', review: 'Excellent service! Very professional and thorough. Fixed my kitchen sink leak quickly and explained everything clearly. Highly recommended!' },
                  { name: 'Pedro Cruz', service: 'Pipe Installation', rating: 5, date: '1 month ago', review: 'Great work! Arrived on time and completed the job efficiently. Very clean and professional. Will definitely hire again.' },
                  { name: 'Ana Reyes', service: 'Drain Unclogging', rating: 4, date: '1 month ago', review: 'Good service overall. Took a bit longer than expected but got the job done well. Fair pricing.' },
                ].map((review, index) => (
                  <div key={index} className="review-card">
                    <div className="review-header">
                      <img 
                        src={`https://ui-avatars.com/api/?name=${review.name.replace(' ', '+')}&background=2563eb&color=fff`}
                        alt={review.name}
                        className="reviewer-avatar"
                      />
                      <div className="reviewer-info">
                        <div className="reviewer-name">{review.name}</div>
                        <div className="review-meta">
                          <div className="review-stars">
                            {renderStars(review.rating)}
                          </div>
                          <span className="review-separator">•</span>
                          <span className="review-date">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="review-service">
                      <i className="bi bi-tools"></i>
                      {review.service}
                    </div>
                    <p className="review-text">{review.review}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="provider-sidebar">
            {/* Provider Summary */}
            <div className="sidebar-card sticky-sidebar">
              <h3 className="sidebar-title">Provider Summary</h3>
              
              <div className="summary-stats">
                <div className="summary-stat">
                  <div className="stat-icon-wrapper">
                    <i className="bi bi-clock-history"></i>
                  </div>
                  <div>
                    <div className="stat-value">{provider.responseTime}</div>
                    <div className="stat-label">Response Time</div>
                  </div>
                </div>

                <div className="summary-stat">
                  <div className="stat-icon-wrapper">
                    <i className="bi bi-check-circle"></i>
                  </div>
                  <div>
                    <div className="stat-value">{provider.completedJobs}</div>
                    <div className="stat-label">Completed Jobs</div>
                  </div>
                </div>

                <div className="summary-stat">
                  <div className="stat-icon-wrapper">
                    <i className="bi bi-star-fill"></i>
                  </div>
                  <div>
                    <div className="stat-value">{provider.rating}</div>
                    <div className="stat-label">Average Rating</div>
                  </div>
                </div>

                <div className="summary-stat">
                  <div className="stat-icon-wrapper">
                    <i className="bi bi-graph-up-arrow"></i>
                  </div>
                  <div>
                    <div className="stat-value">{enhancedProvider.responseRate}</div>
                    <div className="stat-label">Response Rate</div>
                  </div>
                </div>

                <div className="summary-stat">
                  <div className="stat-icon-wrapper">
                    <i className="bi bi-calendar-check"></i>
                  </div>
                  <div>
                    <div className="stat-value">{enhancedProvider.memberSince}</div>
                    <div className="stat-label">Member Since</div>
                  </div>
                </div>

                <div className="summary-stat">
                  <div className="stat-icon-wrapper">
                    <i className="bi bi-cash-coin"></i>
                  </div>
                  <div>
                    <div className="stat-value">₱{provider.hourlyRate}/hr</div>
                    <div className="stat-label">Price Range</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust & Verification */}
            <div className="sidebar-card">
              <h3 className="sidebar-title">
                <i className="bi bi-shield-check"></i>
                Trust & Verification
              </h3>
              <div className="verification-badges">
                {enhancedProvider.verifications.map((item, index) => (
                  <div 
                    key={index} 
                    className={`verification-item ${item.verified ? 'verified' : 'not-verified'}`}
                  >
                    <i className={item.verified ? 'bi bi-check-circle-fill' : 'bi bi-x-circle-fill'}></i>
                    {item.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Service Area */}
            <div className="sidebar-card">
              <h3 className="sidebar-title">
                <i className="bi bi-geo-alt"></i>
                Service Area
              </h3>
              <div className="service-area-list">
                {enhancedProvider.serviceAreas.map((area, index) => (
                  <div key={index} className="service-area-item">
                    <i className="bi bi-check-circle-fill"></i>
                    {area}
                  </div>
                ))}
              </div>
              <div className="service-area-note">
                <i className="bi bi-info-circle"></i>
                Serving Davao City
              </div>
            </div>
          </div>
        </div>
      </div>
    </ResidentLayout>
  );
};

export default ProviderProfile;
