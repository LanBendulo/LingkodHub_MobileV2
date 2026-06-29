import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import PublicLayout from '../../layouts/PublicLayout';
import { barangays, serviceCategories } from '../../data/mockData';

const RegisterProvider = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    services: [],
    barangay: '',
    address: '',
    experience: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleServiceToggle = (serviceId) => {
    const services = formData.services.includes(serviceId)
      ? formData.services.filter(id => id !== serviceId)
      : [...formData.services, serviceId];
    
    setFormData({ ...formData, services });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.services.length === 0) {
      setError('Please select at least one service');
      setLoading(false);
      return;
    }

    try {
      await register({
        name: formData.businessName,
        ownerName: formData.ownerName,
        email: formData.email,
        phone: formData.phone,
        services: formData.services,
        barangay: formData.barangay,
        address: formData.address,
        experience: formData.experience,
        role: 'provider',
      });
      navigate('/provider/dashboard');
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PublicLayout>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card border-0 shadow-lg">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <i className="bi bi-briefcase-fill text-success fs-1 mb-3"></i>
                  <h2 className="fw-bold mb-2">Become a Service Provider</h2>
                  <p className="text-muted">Join LingkodHub and grow your business</p>
                </div>

                {error && (
                  <div className="alert alert-danger">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <h5 className="mb-3">Business Information</h5>
                    
                    <div className="mb-3">
                      <label className="form-label">Business Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Owner Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="ownerName"
                        value={formData.ownerName}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Email Address</label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Phone Number</label>
                        <input
                          type="tel"
                          className="form-control"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Years of Experience</label>
                      <input
                        type="number"
                        className="form-control"
                        name="experience"
                        min="0"
                        value={formData.experience}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <h5 className="mb-3">Services Offered</h5>
                    <div className="row row-cols-2 row-cols-md-3 g-3">
                      {serviceCategories.map((service) => (
                        <div key={service.id} className="col">
                          <div
                            className={`card h-100 cursor-pointer ${
                              formData.services.includes(service.id) ? 'border-primary bg-primary-subtle' : ''
                            }`}
                            onClick={() => handleServiceToggle(service.id)}
                            style={{ cursor: 'pointer' }}
                          >
                            <div className="card-body text-center p-3">
                              <i className={`bi ${service.icon} fs-4 mb-2`} style={{ color: service.color }}></i>
                              <div className="small fw-semibold">{service.name}</div>
                              {formData.services.includes(service.id) && (
                                <i className="bi bi-check-circle-fill text-primary mt-2"></i>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h5 className="mb-3">Service Location</h5>
                    
                    <div className="mb-3">
                      <label className="form-label">Barangay</label>
                      <select
                        className="form-select"
                        name="barangay"
                        value={formData.barangay}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Barangay</option>
                        {barangays.map((barangay, index) => (
                          <option key={index} value={barangay}>
                            {barangay}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Complete Address</label>
                      <textarea
                        className="form-control"
                        name="address"
                        rows="2"
                        value={formData.address}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h5 className="mb-3">Account Security</h5>
                    
                    <div className="mb-3">
                      <label className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Confirm Password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-check mb-4">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="terms"
                      required
                    />
                    <label className="form-check-label" htmlFor="terms">
                      I agree to the Terms of Service and Privacy Policy
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-success w-100 mb-3"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Creating account...
                      </>
                    ) : (
                      'Register as Provider'
                    )}
                  </button>
                </form>

                <div className="text-center mt-4">
                  <p className="text-muted mb-0">
                    Already have an account?{' '}
                    <Link to="/login" className="text-primary fw-semibold">
                      Sign In
                    </Link>
                  </p>
                  <p className="text-muted mt-2 mb-0">
                    Looking for services?{' '}
                    <Link to="/register/resident" className="text-primary fw-semibold">
                      Register as Resident
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default RegisterProvider;
