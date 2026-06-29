import { useParams, Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { mockProviders } from '../../data/mockData';

const ProviderProfile = () => {
  const { id } = useParams();
  const provider = mockProviders.find(p => p.id === parseInt(id)) || mockProviders[0];

  const menuItems = [
    { path: '/resident/dashboard', label: 'Dashboard', icon: 'bi-speedometer2' },
    { path: '/resident/find-services', label: 'Find Services', icon: 'bi-search' },
    { path: '/resident/providers', label: 'Providers', icon: 'bi-people' },
    { path: '/resident/bookings', label: 'My Bookings', icon: 'bi-calendar-check' },
    { path: '/resident/reviews', label: 'Reviews', icon: 'bi-star' },
    { path: '/resident/notifications', label: 'Notifications', icon: 'bi-bell', badge: 3 },
    { path: '/resident/profile', label: 'Profile', icon: 'bi-person' },
  ];

  return (
    <DashboardLayout role="resident" menuItems={menuItems}>
      <div className="mb-4">
        <Link to="/resident/providers" className="text-decoration-none text-muted">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Providers
        </Link>
      </div>

      <div className="row g-4">
        {/* Provider Info Card */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body text-center p-4">
              <img
                src={provider.avatar}
                alt={provider.name}
                className="rounded-circle mb-3"
                width="120"
                height="120"
              />
              <h4 className="mb-1">
                {provider.name}
                {provider.verified && (
                  <i className="bi bi-patch-check-fill text-primary ms-2"></i>
                )}
              </h4>
              <div className="text-warning mb-3">
                <i className="bi bi-star-fill"></i>
                <span className="text-dark ms-1 fw-semibold">{provider.rating}</span>
                <span className="text-muted ms-1">({provider.reviews} reviews)</span>
              </div>

              <Link to="/resident/booking/service" className="btn btn-primary w-100 mb-2">
                <i className="bi bi-calendar-check me-2"></i>
                Book Now
              </Link>
              <button className="btn btn-outline-primary w-100">
                <i className="bi bi-chat-dots me-2"></i>
                Send Message
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="mb-3">Quick Stats</h6>
              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Response Time</span>
                <span className="fw-semibold">{provider.responseTime}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Completed Jobs</span>
                <span className="fw-semibold">{provider.completedJobs}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Hourly Rate</span>
                <span className="fw-semibold text-primary">₱{provider.hourlyRate}/hr</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="text-muted">Availability</span>
                <span className={`badge ${
                  provider.availability === 'Available Now' 
                    ? 'bg-success' 
                    : 'bg-warning'
                }`}>
                  {provider.availability}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-lg-8">
          {/* About */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body p-4">
              <h5 className="mb-3">About</h5>
              <p className="text-muted mb-4">{provider.about}</p>

              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-geo-alt text-primary me-2"></i>
                    <span>{provider.location}</span>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-briefcase text-primary me-2"></i>
                    <span>{provider.completedJobs} jobs completed</span>
                  </div>
                </div>
              </div>

              <h6 className="mb-3">Services Offered</h6>
              <div className="d-flex flex-wrap gap-2 mb-4">
                {provider.services.map((service, index) => (
                  <span key={index} className="badge bg-primary-subtle text-primary px-3 py-2">
                    {service}
                  </span>
                ))}
              </div>

              <h6 className="mb-3">Skills & Expertise</h6>
              <div className="d-flex flex-wrap gap-2 mb-4">
                {provider.skills.map((skill, index) => (
                  <span key={index} className="badge bg-light text-dark border px-3 py-2">
                    <i className="bi bi-check-circle-fill text-success me-1"></i>
                    {skill}
                  </span>
                ))}
              </div>

              <h6 className="mb-3">Certifications</h6>
              <div className="d-flex flex-wrap gap-2">
                {provider.certifications.map((cert, index) => (
                  <span key={index} className="badge bg-success-subtle text-success px-3 py-2">
                    <i className="bi bi-award me-1"></i>
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h5 className="mb-4">Reviews ({provider.reviews})</h5>
              
              {/* Review Summary */}
              <div className="row g-3 mb-4 pb-4 border-bottom">
                <div className="col-md-4 text-center">
                  <div className="display-4 fw-bold text-primary mb-2">{provider.rating}</div>
                  <div className="text-warning mb-2">
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-half"></i>
                  </div>
                  <div className="text-muted">{provider.reviews} reviews</div>
                </div>
                <div className="col-md-8">
                  {[5, 4, 3, 2, 1].map(rating => (
                    <div key={rating} className="d-flex align-items-center mb-2">
                      <span className="me-2">{rating} ⭐</span>
                      <div className="progress flex-grow-1 me-2" style={{ height: '8px' }}>
                        <div
                          className="progress-bar bg-warning"
                          style={{ width: `${rating === 5 ? 80 : rating === 4 ? 15 : 5}%` }}
                        ></div>
                      </div>
                      <span className="text-muted small">{rating === 5 ? '80%' : rating === 4 ? '15%' : '5%'}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Individual Reviews */}
              <div className="space-y-4">
                {[1, 2, 3].map((review) => (
                  <div key={review} className="mb-4 pb-4 border-bottom">
                    <div className="d-flex align-items-start mb-2">
                      <img
                        src={`https://ui-avatars.com/api/?name=User+${review}&background=random`}
                        alt="Reviewer"
                        className="rounded-circle me-3"
                        width="40"
                        height="40"
                      />
                      <div className="flex-grow-1">
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <h6 className="mb-0">User {review}</h6>
                            <div className="text-warning small">
                              <i className="bi bi-star-fill"></i>
                              <i className="bi bi-star-fill"></i>
                              <i className="bi bi-star-fill"></i>
                              <i className="bi bi-star-fill"></i>
                              <i className="bi bi-star-fill"></i>
                            </div>
                          </div>
                          <small className="text-muted">{review} week{review > 1 ? 's' : ''} ago</small>
                        </div>
                        <p className="text-muted mt-2 mb-0">
                          Excellent service! Very professional and thorough. Highly recommended!
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProviderProfile;
