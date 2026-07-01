import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PublicLayout from '../../layouts/PublicLayout';
import { serviceCategories } from '../../data/mockData';

const LandingPage = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <PublicLayout>
      {/* Hero Section - Full Screen */}
      <section 
        className="position-relative overflow-hidden"
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(180deg, #F8FAFC 0%, #EFF6FF 100%)',
        }}
      >
        <div className="container" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
          <div className="row align-items-center min-vh-100">
            {/* Left Side - Content */}
            <div className="col-lg-6 mb-5 mb-lg-0">
              <div className="hero-content" style={{ animation: 'fadeInUp 0.8s ease-out' }}>
                {/* Trust Badge */}
                <div className="d-inline-flex align-items-center gap-2 mb-4 px-4 py-2 rounded-pill bg-white shadow-sm">
                  <span className="badge bg-primary-subtle text-primary border-0">
                    <i className="bi bi-patch-check-fill me-1"></i>
                    Trusted Platform
                  </span>
                  <span className="small text-muted">10,000+ Happy Residents</span>
                </div>

                {/* Main Headline */}
                <h1 
                  className="display-3 fw-bold mb-4" 
                  style={{ 
                    lineHeight: '1.1',
                    color: '#1e293b',
                    letterSpacing: '-0.02em'
                  }}
                >
                  Find Trusted Home Service Providers in{' '}
                  <span 
                    style={{
                      color: '#2563EB'
                    }}
                  >
                    Davao City
                  </span>
                </h1>

                {/* Subheadline */}
                <p className="lead mb-4" style={{ fontSize: '1.25rem', color: '#475569', lineHeight: '1.7' }}>
                  Connect with verified plumbers, electricians, cleaners, technicians, and home maintenance professionals in minutes.
                </p>

                {/* CTA Buttons */}
                <div className="d-flex flex-wrap gap-3 mb-5">
                  <Link 
                    to="/register/resident" 
                    className="btn btn-lg px-4 py-3 shadow-lg"
                    style={{
                      background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                      border: 'none',
                      color: 'white',
                      borderRadius: '12px',
                      fontWeight: '600',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 20px 40px rgba(37, 99, 235, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 10px 25px rgba(37, 99, 235, 0.2)';
                    }}
                  >
                    Get Started
                    <i className="bi bi-arrow-right ms-2"></i>
                  </Link>
                  <Link 
                    to="/login" 
                    className="btn btn-lg px-4 py-3"
                    style={{
                      background: 'white',
                      border: '2px solid #e2e8f0',
                      color: '#475569',
                      borderRadius: '12px',
                      fontWeight: '600',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.borderColor = '#2563eb';
                      e.target.style.color = '#2563eb';
                      e.target.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.borderColor = '#e2e8f0';
                      e.target.style.color = '#475569';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    Browse Services
                  </Link>
                </div>

                {/* Trust Indicators */}
                <div className="d-flex flex-wrap gap-4 align-items-center">
                  <div className="d-flex align-items-center">
                    <div 
                      className="d-flex align-items-center justify-content-center me-2"
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                      }}
                    >
                      <i className="bi bi-star-fill text-white"></i>
                    </div>
                    <div>
                      <div className="fw-bold" style={{ fontSize: '0.875rem', color: '#1e293b' }}>10,000+</div>
                      <div className="small text-muted">Residents</div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <div 
                      className="d-flex align-items-center justify-content-center me-2"
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                      }}
                    >
                      <i className="bi bi-patch-check-fill text-white"></i>
                    </div>
                    <div>
                      <div className="fw-bold" style={{ fontSize: '0.875rem', color: '#1e293b' }}>Verified</div>
                      <div className="small text-muted">Providers</div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <div 
                      className="d-flex align-items-center justify-content-center me-2"
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                      }}
                    >
                      <i className="bi bi-lightning-charge-fill text-white"></i>
                    </div>
                    <div>
                      <div className="fw-bold" style={{ fontSize: '0.875rem', color: '#1e293b' }}>Fast</div>
                      <div className="small text-muted">Booking</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Floating Dashboard Mockup */}
            <div className="col-lg-6">
              <div 
                className="position-relative"
                style={{
                  animation: 'float 6s ease-in-out infinite',
                }}
              >
                {/* Main Dashboard Card */}
                <div 
                  className="bg-white rounded-4 shadow-lg p-4 position-relative"
                  style={{
                    backdropFilter: 'blur(10px)',
                    background: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid rgba(226, 232, 240, 0.8)',
                  }}
                >
                  {/* Verification Badge - Floating */}
                  <div 
                    className="position-absolute bg-primary text-white px-3 py-2 rounded-pill shadow-lg d-flex align-items-center gap-2"
                    style={{
                      top: '-15px',
                      right: '20px',
                      animation: 'pulse 2s ease-in-out infinite',
                    }}
                  >
                    <i className="bi bi-shield-check"></i>
                    <span className="small fw-semibold">Verified Platform</span>
                  </div>

                  {/* Active Booking Card */}
                  <div className="mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h6 className="mb-0 fw-bold" style={{ color: '#1e293b' }}>Active Booking</h6>
                      <span className="badge bg-primary-subtle text-primary">In Progress</span>
                    </div>
                    <div className="card border-0 shadow-sm p-3" style={{ background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)', borderRadius: '12px' }}>
                      <div className="d-flex align-items-start gap-3">
                        <div 
                          className="rounded-circle bg-primary d-flex align-items-center justify-content-center"
                          style={{ width: '48px', height: '48px', minWidth: '48px' }}
                        >
                          <i className="bi bi-wrench-adjustable text-white fs-5"></i>
                        </div>
                        <div className="flex-grow-1">
                          <div className="fw-semibold mb-1">Plumbing Service</div>
                          <div className="small text-muted mb-2">Juan Dela Cruz • Today at 2:00 PM</div>
                          <div className="progress" style={{ height: '6px', borderRadius: '3px' }}>
                            <div className="progress-bar" style={{ width: '65%', background: 'linear-gradient(90deg, #2563eb 0%, #3b82f6 100%)' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stats Row */}
                  <div className="row g-2 mb-3">
                    <div className="col-6">
                      <div className="card border-0 p-3 text-center" style={{ background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', borderRadius: '12px' }}>
                        <div className="text-warning mb-1">
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                        </div>
                        <div className="fw-bold" style={{ fontSize: '1.5rem', color: '#1e293b' }}>4.9</div>
                        <div className="small text-muted">Average Rating</div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="card border-0 p-3 text-center" style={{ background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)', borderRadius: '12px' }}>
                        <i className="bi bi-check-circle-fill text-primary fs-3 mb-1"></i>
                        <div className="fw-bold" style={{ fontSize: '1.5rem', color: '#1e293b' }}>145</div>
                        <div className="small text-muted">Completed</div>
                      </div>
                    </div>
                  </div>

                  {/* Mini Chart */}
                  <div className="card border-0 p-3" style={{ background: '#f8fafc', borderRadius: '12px' }}>
                    <div className="small fw-semibold mb-2" style={{ color: '#64748b' }}>Booking Trends</div>
                    <div className="d-flex align-items-end gap-1" style={{ height: '60px' }}>
                      <div className="flex-grow-1 bg-primary rounded-top" style={{ height: '40%', opacity: 0.6 }}></div>
                      <div className="flex-grow-1 bg-primary rounded-top" style={{ height: '65%', opacity: 0.7 }}></div>
                      <div className="flex-grow-1 bg-primary rounded-top" style={{ height: '45%', opacity: 0.6 }}></div>
                      <div className="flex-grow-1 bg-primary rounded-top" style={{ height: '80%', opacity: 0.8 }}></div>
                      <div className="flex-grow-1 bg-primary rounded-top" style={{ height: '100%' }}></div>
                      <div className="flex-grow-1 bg-primary rounded-top" style={{ height: '55%', opacity: 0.7 }}></div>
                      <div className="flex-grow-1 bg-primary rounded-top" style={{ height: '70%', opacity: 0.8 }}></div>
                    </div>
                  </div>
                </div>

                {/* Floating Provider Card */}
                <div 
                  className="position-absolute bg-white rounded-3 shadow-lg p-3 d-none d-lg-block"
                  style={{
                    bottom: '-20px',
                    left: '-40px',
                    width: '220px',
                    animation: 'float 5s ease-in-out infinite 0.5s',
                    backdropFilter: 'blur(10px)',
                    background: 'rgba(255, 255, 255, 0.95)',
                  }}
                >
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <img 
                      src="https://ui-avatars.com/api/?name=Maria+Santos&background=2563eb&color=fff" 
                      alt="Provider"
                      className="rounded-circle"
                      width="40"
                      height="40"
                    />
                    <div>
                      <div className="fw-semibold small">Maria Santos</div>
                      <div className="text-warning small">
                        <i className="bi bi-star-fill"></i> 4.9
                      </div>
                    </div>
                  </div>
                  <div className="badge bg-primary-subtle text-primary w-100">
                    <i className="bi bi-clock me-1"></i>
                    Available Now
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Animated Background Elements */}
        <div className="position-absolute" style={{ top: '10%', right: '5%', opacity: 0.1 }}>
          <i className="bi bi-gear-fill" style={{ fontSize: '120px', color: '#2563eb' }}></i>
        </div>
        <div className="position-absolute" style={{ bottom: '10%', left: '5%', opacity: 0.1 }}>
          <i className="bi bi-house-fill" style={{ fontSize: '100px', color: '#10b981' }}></i>
        </div>

        <style>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-20px);
            }
          }

          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.05);
            }
          }
        `}</style>
      </section>

      {/* Services Section - Premium Cards */}
      <section className="py-5" style={{ background: '#ffffff' }}>
        <div className="container py-5">
          <div className="text-center mb-5">
            <span className="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill mb-3">
              <i className="bi bi-tools me-2"></i>
              Services We Offer
            </span>
            <h2 className="display-5 fw-bold mb-3" style={{ color: '#1e293b' }}>
              Everything You Need,{' '}
              <span style={{
                background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                One Platform
              </span>
            </h2>
            <p className="lead text-muted" style={{ maxWidth: '700px', margin: '0 auto' }}>
              From quick fixes to major renovations, connect with verified professionals for any home service
            </p>
          </div>
          
          <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4">
            {[
              { name: 'Plumbing', icon: 'bi-wrench-adjustable', color: '#3b82f6', desc: 'Pipes, leaks & repairs' },
              { name: 'Electrical', icon: 'bi-lightning-charge', color: '#f59e0b', desc: 'Wiring & installations' },
              { name: 'Cleaning', icon: 'bi-brush', color: '#10b981', desc: 'Deep & regular cleaning' },
              { name: 'AC Repair', icon: 'bi-fan', color: '#06b6d4', desc: 'Cooling solutions' },
            ].map((service, index) => (
              <div key={index} className="col">
                <Link
                  to="/register/resident"
                  className="text-decoration-none"
                >
                  <div 
                    className="card border-0 shadow-sm h-100 text-center position-relative overflow-hidden"
                    style={{
                      borderRadius: '16px',
                      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                      e.currentTarget.style.boxShadow = `0 20px 40px ${service.color}25`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
                    }}
                  >
                    <div className="card-body p-4">
                      <div
                        className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3 position-relative"
                        style={{
                          width: '70px',
                          height: '70px',
                          background: `linear-gradient(135deg, ${service.color}15 0%, ${service.color}25 100%)`,
                        }}
                      >
                        <i
                          className={`bi ${service.icon} fs-2`}
                          style={{ color: service.color }}
                        ></i>
                      </div>
                      <h6 className="card-title mb-2 fw-bold" style={{ color: '#1e293b' }}>
                        {service.name}
                      </h6>
                      <p className="small text-muted mb-0">{service.desc}</p>
                    </div>
                    {/* Hover Background Effect */}
                    <div 
                      className="position-absolute top-0 start-0 w-100 h-100"
                      style={{
                        background: `linear-gradient(135deg, ${service.color}05 0%, ${service.color}10 100%)`,
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = 0}
                    ></div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <Link to="/register/resident" className="btn btn-lg btn-primary px-5 py-3" style={{ borderRadius: '12px' }}>
              Explore All Services
              <i className="bi bi-arrow-right ms-2"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose LingkodHub - Premium Feature Cards */}
      <section className="py-5" style={{ background: 'linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%)' }}>
        <div className="container py-5">
          <div className="text-center mb-5">
            <span className="badge bg-success-subtle text-success px-3 py-2 rounded-pill mb-3">
              <i className="bi bi-check-circle me-2"></i>
              Why Choose Us
            </span>
            <h2 className="display-5 fw-bold mb-3" style={{ color: '#1e293b' }}>
              Built for Trust & Reliability
            </h2>
            <p className="lead text-muted" style={{ maxWidth: '700px', margin: '0 auto' }}>
              We've created the safest and most efficient way to find home service providers in Davao City
            </p>
          </div>
          
          <div className="row g-4">
            {[
              {
                icon: 'bi-shield-check',
                color: '#10b981',
                title: 'Verified Professionals',
                desc: 'Every provider undergoes strict background checks and verification. Your safety is our priority.',
                features: ['Background Verified', 'Skill Certified', 'Identity Confirmed']
              },
              {
                icon: 'bi-lock-fill',
                color: '#3b82f6',
                title: 'Secure Booking',
                desc: 'Track and manage all your bookings securely. Complete transparency from start to finish.',
                features: ['Secure Payments', 'Real-time Tracking', 'Money-back Guarantee']
              },
              {
                icon: 'bi-graph-up-arrow',
                color: '#8b5cf6',
                title: 'Demand Insights',
                desc: 'Data-driven service visibility helps you find the best providers based on demand analytics.',
                features: ['Smart Matching', 'Peak Time Insights', 'Quality Ratings']
              },
            ].map((feature, index) => (
              <div key={index} className="col-lg-4">
                <div 
                  className="card border-0 h-100 shadow-sm"
                  style={{
                    borderRadius: '20px',
                    transition: 'all 0.3s ease',
                    background: 'white',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = `0 20px 40px ${feature.color}20`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
                  }}
                >
                  <div className="card-body p-4 p-lg-5">
                    <div 
                      className="rounded-3 d-inline-flex align-items-center justify-content-center mb-4"
                      style={{
                        width: '64px',
                        height: '64px',
                        background: `linear-gradient(135deg, ${feature.color}15 0%, ${feature.color}25 100%)`,
                      }}
                    >
                      <i className={`bi ${feature.icon} fs-2`} style={{ color: feature.color }}></i>
                    </div>
                    <h4 className="fw-bold mb-3" style={{ color: '#1e293b' }}>{feature.title}</h4>
                    <p className="text-muted mb-4" style={{ lineHeight: '1.7' }}>{feature.desc}</p>
                    <ul className="list-unstyled">
                      {feature.features.map((item, idx) => (
                        <li key={idx} className="mb-2 d-flex align-items-center">
                          <i className="bi bi-check-circle-fill me-2" style={{ color: feature.color }}></i>
                          <span className="small">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - Animated Counters */}
      <section className="py-5 bg-white">
        <div className="container py-5">
          <div className="row text-center g-4">
            {[
              { value: '10,000+', label: 'Residents', icon: 'bi-people-fill', color: '#3b82f6' },
              { value: '1,500+', label: 'Service Providers', icon: 'bi-briefcase-fill', color: '#10b981' },
              { value: '25,000+', label: 'Completed Bookings', icon: 'bi-check-circle-fill', color: '#8b5cf6' },
              { value: '98%', label: 'Customer Satisfaction', icon: 'bi-star-fill', color: '#f59e0b' },
            ].map((stat, index) => (
              <div key={index} className="col-6 col-md-3">
                <div 
                  className="p-4"
                  style={{
                    borderRadius: '16px',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `${stat.color}05`;
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <i 
                    className={`bi ${stat.icon} fs-1 mb-3`} 
                    style={{ color: stat.color }}
                  ></i>
                  <div className="display-4 fw-bold mb-2" style={{ color: '#1e293b' }}>{stat.value}</div>
                  <div className="text-muted fw-semibold">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-5" style={{ background: 'linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%)' }}>
        <div className="container py-5">
          <div className="text-center mb-5">
            <span className="badge bg-warning-subtle text-warning px-3 py-2 rounded-pill mb-3">
              <i className="bi bi-chat-quote me-2"></i>
              Testimonials
            </span>
            <h2 className="display-5 fw-bold mb-3" style={{ color: '#1e293b' }}>
              Loved by Davao Residents
            </h2>
            <p className="lead text-muted">
              Hear from our happy customers across the city
            </p>
          </div>

          <div className="row g-4">
            {[
              {
                name: 'Maria Rodriguez',
                barangay: 'Poblacion',
                rating: 5,
                feedback: 'LingkodHub made it so easy to find a reliable electrician. Booking was smooth, and the service was excellent!',
                avatar: 'Maria+Rodriguez',
              },
              {
                name: 'Carlos Tan',
                barangay: 'Matina',
                rating: 5,
                feedback: 'I love how transparent the platform is. You can see reviews, ratings, and availability all in one place.',
                avatar: 'Carlos+Tan',
              },
              {
                name: 'Jennifer Lim',
                barangay: 'Lanang',
                rating: 5,
                feedback: 'The providers are all verified and professional. I feel safe booking services through LingkodHub.',
                avatar: 'Jennifer+Lim',
              },
            ].map((testimonial, index) => (
              <div key={index} className="col-lg-4">
                <div 
                  className="card border-0 h-100 shadow-sm"
                  style={{
                    borderRadius: '20px',
                    transition: 'all 0.3s ease',
                    background: 'white',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
                  }}
                >
                  <div className="card-body p-4 p-lg-5">
                    <div className="text-warning mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <i key={i} className="bi bi-star-fill"></i>
                      ))}
                    </div>
                    <p className="mb-4" style={{ lineHeight: '1.7', color: '#475569', fontSize: '1.05rem' }}>
                      "{testimonial.feedback}"
                    </p>
                    <div className="d-flex align-items-center">
                      <img 
                        src={`https://ui-avatars.com/api/?name=${testimonial.avatar}&background=random&size=48`}
                        alt={testimonial.name}
                        className="rounded-circle me-3"
                        width="48"
                        height="48"
                      />
                      <div>
                        <div className="fw-bold" style={{ color: '#1e293b' }}>{testimonial.name}</div>
                        <div className="small text-muted">
                          <i className="bi bi-geo-alt me-1"></i>
                          {testimonial.barangay}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section - Premium */}
      <section className="py-5 bg-white">
        <div className="container py-5">
          <div 
            className="rounded-4 overflow-hidden shadow-lg position-relative"
            style={{
              background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
            }}
          >
            <div className="row g-0 align-items-center">
              <div className="col-lg-7 p-5 p-lg-6 text-white">
                <span className="badge bg-white text-primary px-3 py-2 rounded-pill mb-3">
                  <i className="bi bi-rocket-takeoff me-2"></i>
                  Get Started Today
                </span>
                <h2 className="display-5 fw-bold mb-3 text-white">
                  Ready to Experience Better Home Services?
                </h2>
                <p className="lead mb-4 text-white" style={{ opacity: 0.9 }}>
                  Join thousands of satisfied customers who trust LingkodHub for their home service needs. Quick, reliable, and verified.
                </p>
                <div className="d-flex flex-wrap gap-3">
                  <Link 
                    to="/register/resident" 
                    className="btn btn-lg px-4 py-3 shadow"
                    style={{
                      background: 'white',
                      color: '#2563eb',
                      borderRadius: '12px',
                      fontWeight: '600',
                      border: 'none',
                    }}
                  >
                    Sign Up Now
                    <i className="bi bi-arrow-right ms-2"></i>
                  </Link>
                  <Link 
                    to="/login" 
                    className="btn btn-lg px-4 py-3"
                    style={{
                      background: 'rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      borderRadius: '12px',
                      fontWeight: '600',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    Browse Services
                  </Link>
                </div>
              </div>
              <div className="col-lg-5 p-5 p-lg-6 bg-white">
                <h4 className="fw-bold mb-4" style={{ color: '#1e293b' }}>
                  Are You a Service Provider?
                </h4>
                <p className="text-muted mb-4">
                  Grow your business by joining our platform. Connect with customers and manage bookings efficiently.
                </p>
                <ul className="list-unstyled mb-4">
                  <li className="mb-2 d-flex align-items-center">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    <span>Increase your visibility</span>
                  </li>
                  <li className="mb-2 d-flex align-items-center">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    <span>Manage bookings efficiently</span>
                  </li>
                  <li className="mb-2 d-flex align-items-center">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    <span>Build your reputation</span>
                  </li>
                  <li className="mb-2 d-flex align-items-center">
                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                    <span>Get paid securely</span>
                  </li>
                </ul>
                <Link 
                  to="/register/provider" 
                  className="btn btn-primary btn-lg w-100"
                  style={{ borderRadius: '12px', fontWeight: '600' }}
                >
                  Join as Provider
                  <i className="bi bi-arrow-right ms-2"></i>
                </Link>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="position-absolute" style={{ top: '20px', right: '20px', opacity: 0.1 }}>
              <i className="bi bi-stars" style={{ fontSize: '80px', color: 'white' }}></i>
            </div>
            <div className="position-absolute" style={{ bottom: '20px', left: '20px', opacity: 0.1 }}>
              <i className="bi bi-lightning-charge-fill" style={{ fontSize: '60px', color: 'white' }}></i>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default LandingPage;
