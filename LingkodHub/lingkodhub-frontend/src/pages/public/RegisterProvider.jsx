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
import { serviceCategories, idTypes } from '../../data/servicesData';
import './RegisterProvider.css';

const RegisterProvider = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Verification states
  const [ocrProcessing, setOcrProcessing] = useState(false);
  const [ocrComplete, setOcrComplete] = useState(false);
  const [faceVerifying, setFaceVerifying] = useState(false);
  const [faceComplete, setFaceComplete] = useState(false);
  const [cameraStarted, setCameraStarted] = useState(false);

  const [formData, setFormData] = useState({
    // Step 1: Account Information
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    password: '',
    confirmPassword: '',
    
    // Step 2: Business Information
    businessName: '',
    businessDescription: '',
    businessContactNumber: '',
    yearsOfExperience: '',
    houseNo: '',
    street: '',
    barangay: '',
    district: '',
    city: DAVAO_CITY,
    province: DAVAO_PROVINCE,
    postalCode: '',
    
    // Step 3: Services
    selectedServices: {}, // { serviceId: { selected: true, price: 350 } }
    expandedCategories: {},
    
    // Step 4: Identity Verification
    idType: '',
    idFrontImage: null,
    idFrontPreview: null,
    idBackImage: null,
    idBackPreview: null,
    
    // Step 5: Face Verification
    faceImage: null,
    facePreview: null,
    
    // Step 6: Profile
    businessLogo: null,
    businessLogoPreview: null,
    profilePhoto: null,
    profilePhotoPreview: null,
    shortIntroduction: '',
    termsAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'barangay') {
      const selectedBarangay = findBarangayByName(value);
      if (selectedBarangay) {
        setFormData(prev => ({
          ...prev,
          barangay: value,
          district: selectedBarangay.district,
          postalCode: selectedBarangay.postalCode,
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageUpload = (e, fieldName, previewFieldName) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) {
        setErrors(prev => ({
          ...prev,
          [fieldName]: 'File size must be less than 5MB',
        }));
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          [fieldName]: file,
          [previewFieldName]: reader.result,
        }));
        setErrors(prev => ({ ...prev, [fieldName]: '' }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (fieldName, previewFieldName) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: null,
      [previewFieldName]: null,
    }));
  };

  const toggleCategory = (categoryId) => {
    setFormData(prev => ({
      ...prev,
      expandedCategories: {
        ...prev.expandedCategories,
        [categoryId]: !prev.expandedCategories[categoryId],
      },
    }));
  };

  const toggleService = (serviceId) => {
    setFormData(prev => {
      const current = prev.selectedServices[serviceId];
      if (current?.selected) {
        const updated = { ...prev.selectedServices };
        delete updated[serviceId];
        return { ...prev, selectedServices: updated };
      } else {
        const service = serviceCategories
          .flatMap(c => c.services)
          .find(s => s.id === serviceId);
        return {
          ...prev,
          selectedServices: {
            ...prev.selectedServices,
            [serviceId]: {
              selected: true,
              price: service?.defaultPrice || 0,
            },
          },
        };
      }
    });
  };

  const updateServicePrice = (serviceId, price) => {
    setFormData(prev => ({
      ...prev,
      selectedServices: {
        ...prev.selectedServices,
        [serviceId]: {
          ...prev.selectedServices[serviceId],
          price: parseFloat(price) || 0,
        },
      },
    }));
  };

  // Validation functions
  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!/^(\+63|0)[0-9]{10}$/.test(formData.mobileNumber.replace(/\s/g, ''))) {
      newErrors.mobileNumber = 'Please enter a valid Philippine mobile number';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    
    if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required';
    if (!formData.businessDescription.trim()) newErrors.businessDescription = 'Business description is required';
    if (!formData.businessContactNumber.trim()) newErrors.businessContactNumber = 'Business contact number is required';
    if (!formData.yearsOfExperience) newErrors.yearsOfExperience = 'Years of experience is required';
    if (!formData.houseNo.trim()) newErrors.houseNo = 'House number is required';
    if (!formData.street.trim()) newErrors.street = 'Street is required';
    if (!formData.barangay) newErrors.barangay = 'Please select your barangay';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const selectedCount = Object.keys(formData.selectedServices).length;
    if (selectedCount === 0) {
      setErrors({ services: 'Please select at least one service' });
      return false;
    }
    
    // Check if all selected services have prices
    for (const [serviceId, data] of Object.entries(formData.selectedServices)) {
      if (!data.price || data.price <= 0) {
        setErrors({ services: 'Please set a price for all selected services' });
        return false;
      }
    }
    
    return true;
  };

  const validateStep4 = () => {
    const newErrors = {};
    
    if (!formData.idType) newErrors.idType = 'Please select an ID type';
    if (!formData.idFrontImage) newErrors.idFrontImage = 'Please upload front of ID';
    if (!formData.idBackImage) newErrors.idBackImage = 'Please upload back of ID';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep5 = () => {
    if (!faceComplete) {
      setErrors({ face: 'Please complete face verification' });
      return false;
    }
    return true;
  };

  const validateStep6 = () => {
    const newErrors = {};
    
    if (!formData.shortIntroduction.trim()) {
      newErrors.shortIntroduction = 'Please provide a short introduction';
    }
    
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'You must accept the terms and conditions';
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

  // Mock OCR Process
  const startOCRProcess = () => {
    setOcrProcessing(true);
    setOcrComplete(false);
    
    // Simulate OCR processing
    setTimeout(() => {
      setOcrComplete(true);
      setOcrProcessing(false);
    }, 3000);
  };

  // Mock Face Verification Process
  const startFaceVerification = () => {
    setCameraStarted(true);
    setFaceVerifying(true);
    setFaceComplete(false);
    
    // Simulate camera capture and verification
    setTimeout(() => {
      // Simulate face capture
      const canvas = document.createElement('canvas');
      canvas.width = 640;
      canvas.height = 480;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(0, 0, 640, 480);
      ctx.fillStyle = '#64748b';
      ctx.font = '24px Inter';
      ctx.textAlign = 'center';
      ctx.fillText('Face Captured', 320, 240);
      
      canvas.toBlob((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData(prev => ({
            ...prev,
            faceImage: blob,
            facePreview: reader.result,
          }));
        };
        reader.readAsDataURL(blob);
      });
      
      setFaceVerifying(false);
      setFaceComplete(true);
    }, 4000);
  };

  const retakeFaceVerification = () => {
    setCameraStarted(false);
    setFaceComplete(false);
    setFormData(prev => ({
      ...prev,
      faceImage: null,
      facePreview: null,
    }));
  };

  const handleNext = () => {
    let isValid = false;
    
    switch (currentStep) {
      case 1:
        isValid = validateStep1();
        break;
      case 2:
        isValid = validateStep2();
        break;
      case 3:
        isValid = validateStep3();
        break;
      case 4:
        isValid = validateStep4();
        if (isValid && !ocrComplete && !ocrProcessing) {
          startOCRProcess();
          return;
        }
        break;
      case 5:
        isValid = true; // Allow skipping face verification
        break;
      case 6:
        isValid = validateStep6();
        break;
      default:
        isValid = true;
    }
    
    if (isValid) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep6()) return;
    
    setLoading(true);
    
    // Simulate submission
    setTimeout(async () => {
      try {
        await register({
          name: `${formData.firstName} ${formData.lastName}`,
          businessName: formData.businessName,
          email: formData.email,
          phone: formData.mobileNumber,
          role: 'provider',
        });
        setShowSuccess(true);
      } catch (err) {
        setErrors({ submit: 'Registration failed. Please try again.' });
      } finally {
        setLoading(false);
      }
    }, 2000);
  };

  const getStepValidation = (step) => {
    switch (step) {
      case 1:
        return formData.firstName && formData.lastName && formData.email && 
               formData.mobileNumber && formData.password && formData.confirmPassword;
      case 2:
        return formData.businessName && formData.businessDescription && 
               formData.businessContactNumber && formData.yearsOfExperience &&
               formData.houseNo && formData.street && formData.barangay;
      case 3:
        return Object.keys(formData.selectedServices).length > 0;
      case 4:
        return formData.idType && formData.idFrontImage && formData.idBackImage;
      case 5:
        return true; // Allow proceeding even if face verification not complete
      case 6:
        return formData.termsAccepted;
      default:
        return true;
    }
  };

  if (showSuccess) {
    return (
      <PublicLayout>
        <div className="registration-container">
          <div className="registration-success-provider">
            <div className="success-icon">
              <i className="bi bi-check-circle-fill"></i>
            </div>
            <h1 className="success-title">Registration Submitted Successfully</h1>
            <p className="success-subtitle">Thank you for applying as a LingkodHub Service Provider.</p>
            <p className="success-message">
              Your application has been submitted for review. Our team will verify your information and 
              activate your account within 24-48 hours.
            </p>

            <div className="status-badge-provider">
              <i className="bi bi-clock-history"></i> Pending Verification
            </div>

            <div className="verification-timeline">
              <div className="timeline-item completed">
                <div className="timeline-icon">
                  <i className="bi bi-check"></i>
                </div>
                <div className="timeline-content">
                  <h4>Account Created</h4>
                  <p>Your account has been created</p>
                </div>
              </div>

              <div className="timeline-item completed">
                <div className="timeline-icon">
                  <i className="bi bi-check"></i>
                </div>
                <div className="timeline-content">
                  <h4>Business Information</h4>
                  <p>Business details submitted</p>
                </div>
              </div>

              <div className="timeline-item completed">
                <div className="timeline-icon">
                  <i className="bi bi-check"></i>
                </div>
                <div className="timeline-content">
                  <h4>Services Selected</h4>
                  <p>{Object.keys(formData.selectedServices).length} services registered</p>
                </div>
              </div>

              <div className="timeline-item completed">
                <div className="timeline-icon">
                  <i className="bi bi-check"></i>
                </div>
                <div className="timeline-content">
                  <h4>Identity Uploaded</h4>
                  <p>Government ID verified</p>
                </div>
              </div>

              <div className="timeline-item completed">
                <div className="timeline-icon">
                  <i className="bi bi-check"></i>
                </div>
                <div className="timeline-content">
                  <h4>Face Verification Completed</h4>
                  <p>Biometric verification successful</p>
                </div>
              </div>

              <div className="timeline-item pending">
                <div className="timeline-icon">
                  <i className="bi bi-clock"></i>
                </div>
                <div className="timeline-content">
                  <h4>Awaiting Administrator Approval</h4>
                  <p>Your application is being reviewed</p>
                </div>
              </div>
            </div>

            <div className="success-actions">
              <button 
                className="btn btn-primary btn-lg"
                onClick={() => navigate('/')}
              >
                Go to Home
              </button>
              <button 
                className="btn btn-secondary btn-lg"
                onClick={() => navigate('/login')}
              >
                Back to Login
              </button>
            </div>
          </div>
        </div>
      </PublicLayout>
    );
  }

  const steps = [
    { number: 1, label: 'Account', icon: 'bi-person' },
    { number: 2, label: 'Business', icon: 'bi-briefcase' },
    { number: 3, label: 'Services', icon: 'bi-tools' },
    { number: 4, label: 'Identity', icon: 'bi-card-checklist' },
    { number: 5, label: 'Face Verify', icon: 'bi-person-badge' },
    { number: 6, label: 'Review', icon: 'bi-check-circle' },
  ];

  return (
    <PublicLayout>
      <div className="registration-container">
        <div className="registration-card-provider">
          {/* Header */}
          <div className="registration-header">
            <i className="bi bi-briefcase-fill registration-icon"></i>
            <h2 className="registration-title">Become a Service Provider</h2>
            <p className="registration-subtitle">
              Join LingkodHub and grow your business in Davao City
            </p>
          </div>

          {/* Progress Steps */}
          <div className="progress-steps-provider">
            {steps.map((step, index) => (
              <div key={step.number}>
                <div
                  className={`progress-step ${currentStep >= step.number ? 'active' : ''} ${
                    currentStep > step.number ? 'completed' : ''
                  }`}
                >
                  <div className="step-number">
                    {currentStep > step.number ? (
                      <i className="bi bi-check"></i>
                    ) : (
                      <i className={step.icon}></i>
                    )}
                  </div>
                  <div className="step-label">{step.label}</div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`progress-line ${currentStep > step.number ? 'completed' : ''}`}></div>
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Account Information */}
            {currentStep === 1 && (
              <div className="registration-step">
                <h3 className="step-title">Account Information</h3>
                <p className="step-description">Create your service provider account</p>

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
                    Mobile Number <span className="text-danger">*</span>
                  </label>
                  <input
                    type="tel"
                    className={`form-input-enhanced ${errors.mobileNumber ? 'is-invalid' : ''}`}
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    placeholder="+63 XXX XXX XXXX"
                  />
                  {errors.mobileNumber && (
                    <div className="invalid-feedback">{errors.mobileNumber}</div>
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

            {/* Step 2: Business Information */}
            {currentStep === 2 && (
              <div className="registration-step">
                <h3 className="step-title">Business Information</h3>
                <p className="step-description">Tell us about your business in Davao City</p>

                <div className="mb-3">
                  <label className="form-label-enhanced">
                    Business Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-input-enhanced ${errors.businessName ? 'is-invalid' : ''}`}
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    placeholder="e.g., Juan's Plumbing Services"
                  />
                  {errors.businessName && (
                    <div className="invalid-feedback">{errors.businessName}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label-enhanced">
                    Business Description <span className="text-danger">*</span>
                  </label>
                  <textarea
                    className={`form-input-enhanced ${errors.businessDescription ? 'is-invalid' : ''}`}
                    name="businessDescription"
                    value={formData.businessDescription}
                    onChange={handleChange}
                    placeholder="Describe your business and services..."
                    rows="4"
                  ></textarea>
                  {errors.businessDescription && (
                    <div className="invalid-feedback">{errors.businessDescription}</div>
                  )}
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label-enhanced">
                      Business Contact Number <span className="text-danger">*</span>
                    </label>
                    <input
                      type="tel"
                      className={`form-input-enhanced ${errors.businessContactNumber ? 'is-invalid' : ''}`}
                      name="businessContactNumber"
                      value={formData.businessContactNumber}
                      onChange={handleChange}
                      placeholder="+63 XXX XXX XXXX"
                    />
                    {errors.businessContactNumber && (
                      <div className="invalid-feedback">{errors.businessContactNumber}</div>
                    )}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label-enhanced">
                      Years of Experience <span className="text-danger">*</span>
                    </label>
                    <input
                      type="number"
                      className={`form-input-enhanced ${errors.yearsOfExperience ? 'is-invalid' : ''}`}
                      name="yearsOfExperience"
                      value={formData.yearsOfExperience}
                      onChange={handleChange}
                      placeholder="e.g., 5"
                      min="0"
                    />
                    {errors.yearsOfExperience && (
                      <div className="invalid-feedback">{errors.yearsOfExperience}</div>
                    )}
                  </div>
                </div>

                <h4 className="section-subtitle">Business Address</h4>

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
                  <div className="mb-3">
                    <label className="form-label-enhanced">Postal Code</label>
                    <div className="form-input-readonly">
                      <i className="bi bi-mailbox"></i>
                      {formData.postalCode}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Services Offered */}
            {currentStep === 3 && (
              <div className="registration-step">
                <h3 className="step-title">Services Offered</h3>
                <p className="step-description">Select the services you provide and set your starting prices</p>

                {errors.services && (
                  <div className="alert alert-danger mb-3">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    {errors.services}
                  </div>
                )}

                <div className="services-grid">
                  {serviceCategories.map((category) => (
                    <div key={category.id} className="service-category-card">
                      <div 
                        className="category-header"
                        onClick={() => toggleCategory(category.id)}
                      >
                        <div className="category-info">
                          <i className={`bi ${category.icon} category-icon`} style={{ color: category.color }}></i>
                          <h4 className="category-name">{category.name}</h4>
                        </div>
                        <div className="category-toggle">
                          {Object.keys(formData.selectedServices).filter(id => 
                            category.services.some(s => s.id === id)
                          ).length > 0 && (
                            <span className="selected-count">
                              {Object.keys(formData.selectedServices).filter(id => 
                                category.services.some(s => s.id === id)
                              ).length} selected
                            </span>
                          )}
                          <i className={`bi bi-chevron-${formData.expandedCategories[category.id] ? 'up' : 'down'}`}></i>
                        </div>
                      </div>

                      {formData.expandedCategories[category.id] && (
                        <div className="category-services">
                          {category.services.map((service) => {
                            const isSelected = formData.selectedServices[service.id]?.selected;
                            return (
                              <div key={service.id} className="service-item">
                                <div className="service-checkbox-wrapper">
                                  <input
                                    type="checkbox"
                                    id={service.id}
                                    checked={isSelected || false}
                                    onChange={() => toggleService(service.id)}
                                    className="service-checkbox"
                                  />
                                  <label htmlFor={service.id} className="service-label">
                                    {service.name}
                                  </label>
                                </div>

                                {isSelected && (
                                  <div className="service-price-input">
                                    <label className="price-label">Starting Price</label>
                                    <div className="price-input-wrapper">
                                      <span className="currency">₱</span>
                                      <input
                                        type="number"
                                        className="price-input"
                                        value={formData.selectedServices[service.id]?.price || ''}
                                        onChange={(e) => updateServicePrice(service.id, e.target.value)}
                                        placeholder="0"
                                        min="0"
                                      />
                                    </div>
                                    <small className="price-hint">
                                      This is the starting price shown to residents
                                    </small>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Identity Verification */}
            {currentStep === 4 && (
              <div className="registration-step">
                <h3 className="step-title">Identity Verification</h3>
                <p className="step-description">Upload a valid government-issued ID for verification</p>

                <div className="verification-notice">
                  <i className="bi bi-shield-check"></i>
                  <div>
                    <h4>Why we need this</h4>
                    <p>We verify all service providers to ensure the safety and trust of our community.</p>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label-enhanced">
                    ID Type <span className="text-danger">*</span>
                  </label>
                  <select
                    className={`form-input-enhanced ${errors.idType ? 'is-invalid' : ''}`}
                    name="idType"
                    value={formData.idType}
                    onChange={handleChange}
                  >
                    <option value="">Select ID type</option>
                    {idTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                  {errors.idType && (
                    <div className="invalid-feedback">{errors.idType}</div>
                  )}
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label-enhanced">
                      Front of ID <span className="text-danger">*</span>
                    </label>
                    {!formData.idFrontPreview ? (
                      <label className="id-upload-area">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, 'idFrontImage', 'idFrontPreview')}
                          style={{ display: 'none' }}
                        />
                        <i className="bi bi-cloud-upload"></i>
                        <p>Click to upload front of ID</p>
                        <small>PNG, JPG up to 5MB</small>
                      </label>
                    ) : (
                      <div className="id-preview-container">
                        <img src={formData.idFrontPreview} alt="ID Front" className="id-preview" />
                        <button
                          type="button"
                          className="btn-remove-image"
                          onClick={() => removeImage('idFrontImage', 'idFrontPreview')}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    )}
                    {errors.idFrontImage && (
                      <div className="invalid-feedback d-block">{errors.idFrontImage}</div>
                    )}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label-enhanced">
                      Back of ID <span className="text-danger">*</span>
                    </label>
                    {!formData.idBackPreview ? (
                      <label className="id-upload-area">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, 'idBackImage', 'idBackPreview')}
                          style={{ display: 'none' }}
                        />
                        <i className="bi bi-cloud-upload"></i>
                        <p>Click to upload back of ID</p>
                        <small>PNG, JPG up to 5MB</small>
                      </label>
                    ) : (
                      <div className="id-preview-container">
                        <img src={formData.idBackPreview} alt="ID Back" className="id-preview" />
                        <button
                          type="button"
                          className="btn-remove-image"
                          onClick={() => removeImage('idBackImage', 'idBackPreview')}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    )}
                    {errors.idBackImage && (
                      <div className="invalid-feedback d-block">{errors.idBackImage}</div>
                    )}
                  </div>
                </div>

                {formData.idFrontImage && formData.idBackImage && (
                  <div className="ocr-status-card">
                    <div className="ocr-header">
                      <i className="bi bi-cpu"></i>
                      <h4>Identity Verification</h4>
                    </div>

                    {!ocrProcessing && !ocrComplete && (
                      <div className="ocr-ready">
                        <i className="bi bi-check-circle"></i>
                        <p>ID images uploaded successfully</p>
                        <button
                          type="button"
                          className="btn-verify"
                          onClick={startOCRProcess}
                        >
                          Verify Identity
                        </button>
                      </div>
                    )}

                    {ocrProcessing && (
                      <div className="ocr-processing">
                        <div className="processing-steps">
                          <div className="processing-step active">
                            <div className="step-spinner"></div>
                            <span>Scanning document...</span>
                          </div>
                          <div className="processing-step active">
                            <div className="step-spinner"></div>
                            <span>Analyzing text...</span>
                          </div>
                          <div className="processing-step active">
                            <div className="step-spinner"></div>
                            <span>Verifying information...</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {ocrComplete && (
                      <div className="ocr-complete">
                        <i className="bi bi-check-circle-fill"></i>
                        <h5>Identity Successfully Verified</h5>
                        <p>Your identity has been verified. You can proceed to the next step.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Step 5: Face Verification */}
            {currentStep === 5 && (
              <div className="registration-step">
                <h3 className="step-title">Face Verification</h3>
                <p className="step-description">Complete biometric verification to secure your account</p>

                <div className="verification-notice">
                  <i className="bi bi-person-check"></i>
                  <div>
                    <h4>Biometric Security</h4>
                    <p>Face verification ensures that you are the rightful owner of this account.</p>
                  </div>
                </div>

                {!cameraStarted && !faceComplete && (
                  <div className="face-verification-container">
                    <div className="camera-placeholder">
                      <i className="bi bi-camera-video"></i>
                      <h4>Ready for Face Verification</h4>
                      <p>Center your face inside the frame</p>
                      <p className="hint">Good lighting improves verification quality</p>
                    </div>

                    <div className="verification-instructions">
                      <h5>Instructions:</h5>
                      <ul>
                        <li>
                          <i className="bi bi-check-circle"></i>
                          Position your face in the center of the frame
                        </li>
                        <li>
                          <i className="bi bi-check-circle"></i>
                          Ensure your face is well lit
                        </li>
                        <li>
                          <i className="bi bi-check-circle"></i>
                          Remove glasses or masks if possible
                        </li>
                        <li>
                          <i className="bi bi-check-circle"></i>
                          Look directly at the camera
                        </li>
                      </ul>
                    </div>

                    <button
                      type="button"
                      className="btn-start-verification"
                      onClick={startFaceVerification}
                    >
                      <i className="bi bi-camera"></i>
                      Start Verification
                    </button>
                  </div>
                )}

                {faceVerifying && (
                  <div className="face-verification-container">
                    <div className="camera-active">
                      <div className="face-frame">
                        <div className="face-overlay"></div>
                      </div>
                    </div>

                    <div className="verification-progress">
                      <div className="progress-step-verif active">
                        <div className="step-spinner"></div>
                        <span>Detecting face...</span>
                      </div>
                      <div className="progress-step-verif active">
                        <div className="step-spinner"></div>
                        <span>Checking liveness...</span>
                      </div>
                      <div className="progress-step-verif active">
                        <div className="step-spinner"></div>
                        <span>Matching identity...</span>
                      </div>
                    </div>
                  </div>
                )}

                {faceComplete && (
                  <div className="face-verification-container">
                    <div className="verification-success">
                      <i className="bi bi-check-circle-fill"></i>
                      <h4>Face Verification Completed Successfully</h4>
                      <p>Your biometric data has been securely verified</p>
                      
                      {formData.facePreview && (
                        <div className="face-capture-preview">
                          <img src={formData.facePreview} alt="Face Capture" />
                        </div>
                      )}

                      <button
                        type="button"
                        className="btn-retake"
                        onClick={retakeFaceVerification}
                      >
                        <i className="bi bi-arrow-repeat"></i>
                        Retake
                      </button>
                    </div>
                  </div>
                )}

                {errors.face && (
                  <div className="alert alert-danger mt-3">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    {errors.face}
                  </div>
                )}
              </div>
            )}

            {/* Step 6: Review & Submit */}
            {currentStep === 6 && (
              <div className="registration-step">
                <h3 className="step-title">Review & Submit</h3>
                <p className="step-description">Review your information before submitting</p>

                <div className="review-section">
                  <h4 className="review-section-title">
                    <i className="bi bi-person-circle"></i> Account Information
                  </h4>
                  <div className="review-grid">
                    <div className="review-item">
                      <span className="review-label">Name:</span>
                      <span className="review-value">{formData.firstName} {formData.lastName}</span>
                    </div>
                    <div className="review-item">
                      <span className="review-label">Email:</span>
                      <span className="review-value">{formData.email}</span>
                    </div>
                    <div className="review-item">
                      <span className="review-label">Mobile:</span>
                      <span className="review-value">{formData.mobileNumber}</span>
                    </div>
                  </div>
                </div>

                <div className="review-section">
                  <h4 className="review-section-title">
                    <i className="bi bi-briefcase"></i> Business Information
                  </h4>
                  <div className="review-grid">
                    <div className="review-item">
                      <span className="review-label">Business Name:</span>
                      <span className="review-value">{formData.businessName}</span>
                    </div>
                    <div className="review-item">
                      <span className="review-label">Contact Number:</span>
                      <span className="review-value">{formData.businessContactNumber}</span>
                    </div>
                    <div className="review-item">
                      <span className="review-label">Experience:</span>
                      <span className="review-value">{formData.yearsOfExperience} years</span>
                    </div>
                    <div className="review-item full-width">
                      <span className="review-label">Description:</span>
                      <span className="review-value">{formData.businessDescription}</span>
                    </div>
                    <div className="review-item full-width">
                      <span className="review-label">Address:</span>
                      <span className="review-value">
                        {formData.houseNo} {formData.street}, {formData.barangay}<br />
                        {formData.district}<br />
                        {formData.city}, {formData.province} {formData.postalCode}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="review-section">
                  <h4 className="review-section-title">
                    <i className="bi bi-tools"></i> Services Offered ({Object.keys(formData.selectedServices).length})
                  </h4>
                  <div className="services-review">
                    {Object.entries(formData.selectedServices).map(([serviceId, data]) => {
                      const service = serviceCategories
                        .flatMap(c => c.services)
                        .find(s => s.id === serviceId);
                      return (
                        <div key={serviceId} className="service-review-item">
                          <span className="service-name">{service?.name}</span>
                          <span className="service-price">₱{data.price}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="review-section">
                  <h4 className="review-section-title">
                    <i className="bi bi-shield-check"></i> Verification Status
                  </h4>
                  <div className="verification-status-grid">
                    <div className="status-item verified">
                      <i className="bi bi-check-circle-fill"></i>
                      <span>Identity Verified</span>
                    </div>
                    <div className="status-item verified">
                      <i className="bi bi-check-circle-fill"></i>
                      <span>Face Verified</span>
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label-enhanced">
                    Short Introduction <span className="text-danger">*</span>
                  </label>
                  <textarea
                    className={`form-input-enhanced ${errors.shortIntroduction ? 'is-invalid' : ''}`}
                    name="shortIntroduction"
                    value={formData.shortIntroduction}
                    onChange={handleChange}
                    placeholder="Write a brief introduction about yourself and your services..."
                    rows="4"
                  ></textarea>
                  {errors.shortIntroduction && (
                    <div className="invalid-feedback">{errors.shortIntroduction}</div>
                  )}
                  <small className="form-hint">
                    This will be displayed on your provider profile
                  </small>
                </div>

                <div className="terms-checkbox">
                  <input
                    type="checkbox"
                    id="termsAccepted"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                    className="terms-input"
                  />
                  <label htmlFor="termsAccepted" className="terms-label">
                    I agree to the <Link to="/terms" target="_blank">Terms of Service</Link> and{' '}
                    <Link to="/privacy" target="_blank">Privacy Policy</Link>
                  </label>
                </div>
                {errors.termsAccepted && (
                  <div className="invalid-feedback d-block">{errors.termsAccepted}</div>
                )}

                {errors.submit && (
                  <div className="alert alert-danger mt-3">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    {errors.submit}
                  </div>
                )}
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
              
              {currentStep < 6 ? (
                <button
                  type="button"
                  className="btn btn-next"
                  onClick={handleNext}
                  disabled={!getStepValidation(currentStep) || (currentStep === 4 && ocrProcessing)}
                >
                  {currentStep === 4 && ocrProcessing ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Verifying...
                    </>
                  ) : (
                    <>
                      Continue <i className="bi bi-arrow-right"></i>
                    </>
                  )}
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn btn-submit"
                  disabled={loading || !getStepValidation(6)}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-check-circle me-2"></i>
                      Submit Registration
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
              Looking for services?{' '}
              <Link to="/register/resident" className="footer-link">
                Register as Resident
              </Link>
            </p>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default RegisterProvider;
