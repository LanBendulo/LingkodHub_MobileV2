import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import PublicLayout from '../../layouts/PublicLayout';
import { 
  sortedBarangays, 
  findBarangayByName,
  DAVAO_CITY,
  DAVAO_PROVINCE 
} from '../../data/davaoCityBarangays';
import './RegisterResident.css';

const RegisterResident = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    // Step 1: Account Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    
    // Step 2: Address Information
    houseNo: '',
    street: '',
    barangay: '',
    district: '',
    city: DAVAO_CITY,
    province: DAVAO_PROVINCE,
    postalCode: '',
    
    // Step 3: Profile
    profilePhoto: null,
    profilePhotoPreview: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Special handling for barangay selection
    if (name === 'barangay') {
      const selectedBarangay = findBarangayByName(value);
      if (selectedBarangay) {
        setFormData(prev => ({
          ...prev,
          barangay: value,
          district: selectedBarangay.district,
          postalCode: selectedBarangay.postalCode,
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: value,
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) { // 5MB limit
        setErrors(prev => ({
          ...prev,
          profilePhoto: 'File size must be less than 5MB',
        }));
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          profilePhoto: file,
          profilePhotoPreview: reader.result,
        }));
        setErrors(prev => ({
          ...prev,
          profilePhoto: '',
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setFormData(prev => ({
      ...prev,
      profilePhoto: null,
      profilePhotoPreview: null,
    }));
  };

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^(\+63|0)[0-9]{10}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid Philippine phone number';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    
    if (!formData.houseNo.trim()) {
      newErrors.houseNo = 'House number is required';
    }
    
    if (!formData.street.trim()) {
      newErrors.street = 'Street is required';
    }
    
    if (!formData.barangay) {
      newErrors.barangay = 'Please select your barangay';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getPasswordStrength = () => {
    const password = formData.password;
    if (!password) return { strength: 0, label: '', color: '' };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    
    if (strength <= 2) return { strength: 33, label: 'Weak', color: '#dc2626' };
    if (strength <= 3) return { strength: 66, label: 'Good', color: '#fbbf24' };
    return { strength: 100, label: 'Strong', color: '#2563eb' };
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(async () => {
      try {
        await register({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          address: `${formData.houseNo} ${formData.street}, ${formData.barangay}, ${formData.city}, ${formData.province} ${formData.postalCode}`,
          barangay: formData.barangay,
          role: 'resident',
        });
        setShowSuccess(true);
      } catch (err) {
        setErrors({ submit: 'Registration failed. Please try again.' });
      } finally {
        setLoading(false);
      }
    }, 1500);
  };

  const isStep1Valid = () => {
    return formData.firstName && formData.lastName && formData.email && 
           formData.phone && formData.password && formData.confirmPassword &&
           formData.password === formData.confirmPassword;
  };

  const isStep2Valid = () => {
    return formData.houseNo && formData.street && formData.barangay;
  };

  if (showSuccess) {
    return (
      <PublicLayout>
        <div className="registration-container">
          <div className="registration-success">
            <div className="success-icon">
              <i className="bi bi-check-circle-fill"></i>
            </div>
            <h1 className="success-title">Registration Successful</h1>
            <p className="success-subtitle">Welcome to LingkodHub!</p>
            <p className="success-message">
              Your account has been created successfully. You can now start exploring 
              trusted service providers in your barangay.
            </p>
            <div className="success-actions">
              <button 
                className="btn btn-primary btn-lg"
                onClick={() => navigate('/resident/dashboard')}
              >
                Go to Dashboard
              </button>
              <button 
                className="btn btn-secondary btn-lg"
                onClick={() => navigate('/resident/find-services')}
              >
                Browse Services
              </button>
            </div>
          </div>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="registration-container">
        <div className="registration-card">
          {/* Header */}
          <div className="registration-header">
            <i className="bi bi-person-plus-fill registration-icon"></i>
            <h2 className="registration-title">Create Resident Account</h2>
            <p className="registration-subtitle">
              Join LingkodHub and find trusted service providers in your community
            </p>
          </div>

          {/* Progress Steps */}
          <div className="progress-steps">
            <div className={`progress-step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
              <div className="step-number">
                {currentStep > 1 ? <i className="bi bi-check"></i> : '1'}
              </div>
              <div className="step-label">Account</div>
            </div>
            <div className={`progress-line ${currentStep > 1 ? 'completed' : ''}`}></div>
            <div className={`progress-step ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
              <div className="step-number">
                {currentStep > 2 ? <i className="bi bi-check"></i> : '2'}
              </div>
              <div className="step-label">Address</div>
            </div>
            <div className={`progress-line ${currentStep > 2 ? 'completed' : ''}`}></div>
            <div className={`progress-step ${currentStep >= 3 ? 'active' : ''}`}>
              <div className="step-number">3</div>
              <div className="step-label">Profile</div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Account Information */}
            {currentStep === 1 && (
              <div className="registration-step">
                <h3 className="step-title">Account Information</h3>
                <p className="step-description">Create your login credentials</p>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label-enhanced">
                      First Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-input-enhanced ${errors.firstName ? 'is-invalid' : ''}`}
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Enter your first name"
                    />
                    {errors.firstName && (
                      <div className="invalid-feedback">{errors.firstName}</div>
                    )}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label-enhanced">
                      Last Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-input-enhanced ${errors.lastName ? 'is-invalid' : ''}`}
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Enter your last name"
                    />
                    {errors.lastName && (
                      <div className="invalid-feedback">{errors.lastName}</div>
                    )}
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label-enhanced">
                    Email Address <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    className={`form-input-enhanced ${errors.email ? 'is-invalid' : ''}`}
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label-enhanced">
                    Phone Number <span className="text-danger">*</span>
                  </label>
                  <input
                    type="tel"
                    className={`form-input-enhanced ${errors.phone ? 'is-invalid' : ''}`}
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+63 XXX XXX XXXX"
                  />
                  {errors.phone && (
                    <div className="invalid-feedback">{errors.phone}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label-enhanced">
                    Password <span className="text-danger">*</span>
                  </label>
                  <div className="password-input-wrapper">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className={`form-input-enhanced ${errors.password ? 'is-invalid' : ''}`}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a strong password"
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <i className={`bi bi-eye${showPassword ? '-slash' : ''}`}></i>
                    </button>
                  </div>
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                  {formData.password && (
                    <div className="password-strength">
                      <div className="strength-bar">
                        <div 
                          className="strength-fill" 
                          style={{ 
                            width: `${getPasswordStrength().strength}%`,
                            backgroundColor: getPasswordStrength().color 
                          }}
                        ></div>
                      </div>
                      <span 
                        className="strength-label" 
                        style={{ color: getPasswordStrength().color }}
                      >
                        {getPasswordStrength().label}
                      </span>
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <label className="form-label-enhanced">
                    Confirm Password <span className="text-danger">*</span>
                  </label>
                  <div className="password-input-wrapper">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      className={`form-input-enhanced ${errors.confirmPassword ? 'is-invalid' : ''}`}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Re-enter your password"
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      <i className={`bi bi-eye${showConfirmPassword ? '-slash' : ''}`}></i>
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <div className="invalid-feedback">{errors.confirmPassword}</div>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Address Information */}
            {currentStep === 2 && (
              <div className="registration-step">
                <h3 className="step-title">Address Information</h3>
                <p className="step-description">Help us locate service providers near you in Davao City</p>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label-enhanced">
                      House No. <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-input-enhanced ${errors.houseNo ? 'is-invalid' : ''}`}
                      name="houseNo"
                      value={formData.houseNo}
                      onChange={handleChange}
                      placeholder="e.g., 123"
                    />
                    {errors.houseNo && (
                      <div className="invalid-feedback">{errors.houseNo}</div>
                    )}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label-enhanced">
                      Street <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-input-enhanced ${errors.street ? 'is-invalid' : ''}`}
                      name="street"
                      value={formData.street}
                      onChange={handleChange}
                      placeholder="e.g., JP Laurel Avenue"
                    />
                    {errors.street && (
                      <div className="invalid-feedback">{errors.street}</div>
                    )}
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label-enhanced">
                    Barangay <span className="text-danger">*</span>
                  </label>
                  <select
                    className={`form-input-enhanced barangay-select ${errors.barangay ? 'is-invalid' : ''}`}
                    name="barangay"
                    value={formData.barangay}
                    onChange={handleChange}
                  >
                    <option value="">Select your barangay</option>
                    {sortedBarangays.map((barangay, index) => (
                      <option key={index} value={barangay.name}>
                        {barangay.name}
                      </option>
                    ))}
                  </select>
                  {errors.barangay && (
                    <div className="invalid-feedback">{errors.barangay}</div>
                  )}
                  <div className="form-hint">
                    <i className="bi bi-info-circle"></i> All 182 barangays of Davao City available
                  </div>
                </div>

                {formData.barangay && (
                  <div className="mb-3">
                    <label className="form-label-enhanced">District</label>
                    <div className="form-input-readonly">
                      <i className="bi bi-building"></i>
                      {formData.district}
                    </div>
                  </div>
                )}

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label-enhanced">City</label>
                    <div className="form-input-readonly">
                      <i className="bi bi-geo-alt-fill"></i>
                      {DAVAO_CITY}
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label-enhanced">Province</label>
                    <div className="form-input-readonly">
                      <i className="bi bi-map"></i>
                      {DAVAO_PROVINCE}
                    </div>
                  </div>
                </div>

                {formData.barangay && (
                  <div className="mb-4">
                    <label className="form-label-enhanced">Postal Code</label>
                    <div className="form-input-readonly">
                      <i className="bi bi-mailbox"></i>
                      {formData.postalCode}
                    </div>
                  </div>
                )}

                {/* Map Placeholder */}
                <div className="map-placeholder">
                  <i className="bi bi-geo-alt"></i>
                  <p>Interactive map selection will be available in the production version.</p>
                  <small>You'll be able to pinpoint your exact location on a map</small>
                </div>
              </div>
            )}

            {/* Step 3: Profile */}
            {currentStep === 3 && (
              <div className="registration-step">
                <h3 className="step-title">Profile Photo</h3>
                <p className="step-description">Add a photo to personalize your account</p>

                <div className="photo-upload-section">
                  {!formData.profilePhotoPreview ? (
                    <label className="photo-upload-area">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        style={{ display: 'none' }}
                      />
                      <div className="upload-icon">
                        <i className="bi bi-cloud-upload"></i>
                      </div>
                      <p className="upload-text">Click to upload profile photo</p>
                      <p className="upload-hint">PNG, JPG up to 5MB</p>
                    </label>
                  ) : (
                    <div className="photo-preview-container">
                      <div className="photo-preview">
                        <img src={formData.profilePhotoPreview} alt="Profile preview" />
                      </div>
                      <button
                        type="button"
                        className="btn-remove-photo"
                        onClick={removePhoto}
                      >
                        <i className="bi bi-trash"></i> Remove Photo
                      </button>
                    </div>
                  )}
                  {errors.profilePhoto && (
                    <div className="invalid-feedback d-block">{errors.profilePhoto}</div>
                  )}
                </div>

                {/* Summary */}
                <div className="registration-summary">
                  <h4 className="summary-title">Registration Summary</h4>
                  
                  <div className="summary-section">
                    <div className="summary-label">
                      <i className="bi bi-person"></i> Name
                    </div>
                    <div className="summary-value">
                      {formData.firstName} {formData.lastName}
                    </div>
                  </div>

                  <div className="summary-section">
                    <div className="summary-label">
                      <i className="bi bi-envelope"></i> Email
                    </div>
                    <div className="summary-value">{formData.email}</div>
                  </div>

                  <div className="summary-section">
                    <div className="summary-label">
                      <i className="bi bi-telephone"></i> Phone
                    </div>
                    <div className="summary-value">{formData.phone}</div>
                  </div>

                  <div className="summary-section">
                    <div className="summary-label">
                      <i className="bi bi-geo-alt"></i> Address
                    </div>
                    <div className="summary-value">
                      {formData.houseNo} {formData.street}, {formData.barangay}<br />
                      {formData.district}<br />
                      {formData.city}, {formData.province} {formData.postalCode}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {errors.submit && (
              <div className="alert alert-danger">
                <i className="bi bi-exclamation-triangle me-2"></i>
                {errors.submit}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="registration-actions">
              {currentStep > 1 && (
                <button
                  type="button"
                  className="btn btn-back"
                  onClick={handleBack}
                >
                  <i className="bi bi-arrow-left"></i> Back
                </button>
              )}
              
              {currentStep < 3 ? (
                <button
                  type="button"
                  className="btn btn-next"
                  onClick={handleNext}
                  disabled={currentStep === 1 ? !isStep1Valid() : !isStep2Valid()}
                >
                  Continue <i className="bi bi-arrow-right"></i>
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn btn-submit"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-check-circle me-2"></i>
                      Create Account
                    </>
                  )}
                </button>
              )}
            </div>
          </form>

          {/* Footer Links */}
          <div className="registration-footer">
            <p className="footer-text">
              Already have an account?{' '}
              <Link to="/login" className="footer-link">
                Sign In
              </Link>
            </p>
            <p className="footer-text">
              Want to offer services?{' '}
              <Link to="/register/provider" className="footer-link">
                Register as Provider
              </Link>
            </p>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default RegisterResident;
