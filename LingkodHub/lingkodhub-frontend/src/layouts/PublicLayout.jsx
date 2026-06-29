import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const PublicLayout = ({ children }) => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-vh-100 d-flex flex-column">
      <nav 
        className={`navbar navbar-expand-lg navbar-light fixed-top transition-all ${
          scrolled ? 'shadow-sm' : ''
        }`}
        style={{
          background: scrolled 
            ? 'rgba(255, 255, 255, 0.95)' 
            : location.pathname === '/' 
              ? 'rgba(255, 255, 255, 0.1)' 
              : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s ease',
          borderBottom: scrolled ? '1px solid rgba(226, 232, 240, 0.8)' : '1px solid transparent',
        }}
      >
        <div className="container">
          <Link to="/" className="navbar-brand d-flex align-items-center">
            <div 
              className="rounded-3 d-flex align-items-center justify-content-center me-2"
              style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
              }}
            >
              <i className="bi bi-house-gear-fill text-white fs-5"></i>
            </div>
            <span 
              className="fw-bold fs-4" 
              style={{ 
                color: scrolled || location.pathname !== '/' ? '#1e293b' : '#1e293b',
                letterSpacing: '-0.02em'
              }}
            >
              LingkodHub
            </span>
          </Link>
          
          <button
            className="navbar-toggler border-0 shadow-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            style={{
              color: scrolled || location.pathname !== '/' ? '#1e293b' : '#1e293b'
            }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-lg-center">
              <li className="nav-item">
                <Link 
                  to="/login" 
                  className="nav-link fw-semibold px-3"
                  style={{
                    color: scrolled || location.pathname !== '/' ? '#64748b' : '#64748b',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#2563eb'}
                  onMouseLeave={(e) => e.target.style.color = scrolled || location.pathname !== '/' ? '#64748b' : '#64748b'}
                >
                  Login
                </Link>
              </li>
              <li className="nav-item ms-lg-2">
                <Link 
                  to="/register/resident" 
                  className="btn btn-primary px-4 py-2 shadow-sm"
                  style={{
                    borderRadius: '10px',
                    fontWeight: '600',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 10px 20px rgba(37, 99, 235, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  Get Started
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      
      <main className="flex-grow-1" style={{ marginTop: location.pathname === '/' ? '0' : '76px' }}>
        {children}
      </main>
      
      <footer className="bg-dark text-white py-5 mt-auto">
        <div className="container py-4">
          <div className="row g-4">
            <div className="col-lg-4 mb-4 mb-lg-0">
              <div className="d-flex align-items-center mb-3">
                <div 
                  className="rounded-3 d-flex align-items-center justify-content-center me-2"
                  style={{
                    width: '40px',
                    height: '40px',
                    background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                  }}
                >
                  <i className="bi bi-house-gear-fill text-white"></i>
                </div>
                <span className="fw-bold fs-5">LingkodHub</span>
              </div>
              <p className="text-white" style={{ opacity: 0.7, lineHeight: '1.7' }}>
                Your trusted platform for home services in Davao City. Connecting residents with verified professionals since 2026.
              </p>
              <div className="d-flex gap-2 mt-3">
                <a href="#" className="btn btn-sm btn-outline-light rounded-circle" style={{ width: '36px', height: '36px', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#" className="btn btn-sm btn-outline-light rounded-circle" style={{ width: '36px', height: '36px', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="bi bi-twitter"></i>
                </a>
                <a href="#" className="btn btn-sm btn-outline-light rounded-circle" style={{ width: '36px', height: '36px', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="#" className="btn btn-sm btn-outline-light rounded-circle" style={{ width: '36px', height: '36px', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="bi bi-linkedin"></i>
                </a>
              </div>
            </div>
            
            <div className="col-lg-2 col-md-4 col-6">
              <h6 className="fw-bold mb-3 text-white">Company</h6>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <Link to="/" className="text-white text-decoration-none" style={{ opacity: 0.7, transition: 'opacity 0.2s ease' }} onMouseEnter={(e) => e.target.style.opacity = 1} onMouseLeave={(e) => e.target.style.opacity = 0.7}>
                    About Us
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/" className="text-white text-decoration-none" style={{ opacity: 0.7, transition: 'opacity 0.2s ease' }} onMouseEnter={(e) => e.target.style.opacity = 1} onMouseLeave={(e) => e.target.style.opacity = 0.7}>
                    Careers
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/" className="text-white text-decoration-none" style={{ opacity: 0.7, transition: 'opacity 0.2s ease' }} onMouseEnter={(e) => e.target.style.opacity = 1} onMouseLeave={(e) => e.target.style.opacity = 0.7}>
                    Press
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/" className="text-white text-decoration-none" style={{ opacity: 0.7, transition: 'opacity 0.2s ease' }} onMouseEnter={(e) => e.target.style.opacity = 1} onMouseLeave={(e) => e.target.style.opacity = 0.7}>
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="col-lg-2 col-md-4 col-6">
              <h6 className="fw-bold mb-3 text-white">Services</h6>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <Link to="/register/resident" className="text-white text-decoration-none" style={{ opacity: 0.7, transition: 'opacity 0.2s ease' }} onMouseEnter={(e) => e.target.style.opacity = 1} onMouseLeave={(e) => e.target.style.opacity = 0.7}>
                    For Residents
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/register/provider" className="text-white text-decoration-none" style={{ opacity: 0.7, transition: 'opacity 0.2s ease' }} onMouseEnter={(e) => e.target.style.opacity = 1} onMouseLeave={(e) => e.target.style.opacity = 0.7}>
                    For Providers
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/login" className="text-white text-decoration-none" style={{ opacity: 0.7, transition: 'opacity 0.2s ease' }} onMouseEnter={(e) => e.target.style.opacity = 1} onMouseLeave={(e) => e.target.style.opacity = 0.7}>
                    Pricing
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/" className="text-white text-decoration-none" style={{ opacity: 0.7, transition: 'opacity 0.2s ease' }} onMouseEnter={(e) => e.target.style.opacity = 1} onMouseLeave={(e) => e.target.style.opacity = 0.7}>
                    Categories
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="col-lg-2 col-md-4 col-6">
              <h6 className="fw-bold mb-3 text-white">Support</h6>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <Link to="/" className="text-white text-decoration-none" style={{ opacity: 0.7, transition: 'opacity 0.2s ease' }} onMouseEnter={(e) => e.target.style.opacity = 1} onMouseLeave={(e) => e.target.style.opacity = 0.7}>
                    Help Center
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/" className="text-white text-decoration-none" style={{ opacity: 0.7, transition: 'opacity 0.2s ease' }} onMouseEnter={(e) => e.target.style.opacity = 1} onMouseLeave={(e) => e.target.style.opacity = 0.7}>
                    Safety
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/" className="text-white text-decoration-none" style={{ opacity: 0.7, transition: 'opacity 0.2s ease' }} onMouseEnter={(e) => e.target.style.opacity = 1} onMouseLeave={(e) => e.target.style.opacity = 0.7}>
                    Terms
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/" className="text-white text-decoration-none" style={{ opacity: 0.7, transition: 'opacity 0.2s ease' }} onMouseEnter={(e) => e.target.style.opacity = 1} onMouseLeave={(e) => e.target.style.opacity = 0.7}>
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="col-lg-2 col-md-12">
              <h6 className="fw-bold mb-3 text-white">Contact</h6>
              <p className="text-white mb-2" style={{ opacity: 0.7, fontSize: '0.9rem' }}>
                <i className="bi bi-envelope me-2"></i>
                support@lingkodhub.com
              </p>
              <p className="text-white mb-2" style={{ opacity: 0.7, fontSize: '0.9rem' }}>
                <i className="bi bi-telephone me-2"></i>
                (082) 123-4567
              </p>
              <p className="text-white mb-0" style={{ opacity: 0.7, fontSize: '0.9rem' }}>
                <i className="bi bi-geo-alt me-2"></i>
                Davao City, Philippines
              </p>
            </div>
          </div>
          
          <hr className="my-4" style={{ opacity: 0.2 }} />
          
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
              <p className="mb-0 text-white" style={{ opacity: 0.6, fontSize: '0.9rem' }}>
                &copy; 2026 LingkodHub. All rights reserved.
              </p>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <div className="d-inline-flex gap-3">
                <Link to="/" className="text-white text-decoration-none" style={{ opacity: 0.6, fontSize: '0.9rem', transition: 'opacity 0.2s ease' }} onMouseEnter={(e) => e.target.style.opacity = 1} onMouseLeave={(e) => e.target.style.opacity = 0.6}>
                  Privacy Policy
                </Link>
                <span className="text-white" style={{ opacity: 0.6 }}>•</span>
                <Link to="/" className="text-white text-decoration-none" style={{ opacity: 0.6, fontSize: '0.9rem', transition: 'opacity 0.2s ease' }} onMouseEnter={(e) => e.target.style.opacity = 1} onMouseLeave={(e) => e.target.style.opacity = 0.6}>
                  Terms of Service
                </Link>
                <span className="text-white" style={{ opacity: 0.6 }}>•</span>
                <Link to="/" className="text-white text-decoration-none" style={{ opacity: 0.6, fontSize: '0.9rem', transition: 'opacity 0.2s ease' }} onMouseEnter={(e) => e.target.style.opacity = 1} onMouseLeave={(e) => e.target.style.opacity = 0.6}>
                  Cookies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
