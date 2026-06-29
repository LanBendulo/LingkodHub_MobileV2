import { useState } from 'react';
import { Link } from 'react-router-dom';
import PublicLayout from '../../layouts/PublicLayout';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 1500);
  };

  return (
    <PublicLayout>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="card border-0 shadow-lg">
              <div className="card-body p-5">
                {!submitted ? (
                  <>
                    <div className="text-center mb-4">
                      <i className="bi bi-lock-fill text-primary fs-1 mb-3"></i>
                      <h2 className="fw-bold mb-2">Forgot Password?</h2>
                      <p className="text-muted">
                        Enter your email and we'll send you instructions to reset your password
                      </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <label className="form-label">Email Address</label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary w-100 mb-3"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2"></span>
                            Sending...
                          </>
                        ) : (
                          'Send Reset Link'
                        )}
                      </button>
                    </form>

                    <div className="text-center mt-4">
                      <Link to="/login" className="text-primary text-decoration-none">
                        <i className="bi bi-arrow-left me-2"></i>
                        Back to Login
                      </Link>
                    </div>
                  </>
                ) : (
                  <div className="text-center">
                    <i className="bi bi-check-circle-fill text-success fs-1 mb-3"></i>
                    <h3 className="fw-bold mb-3">Check Your Email</h3>
                    <p className="text-muted mb-4">
                      We've sent password reset instructions to <strong>{email}</strong>
                    </p>
                    <Link to="/login" className="btn btn-primary">
                      Back to Login
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default ForgotPassword;
