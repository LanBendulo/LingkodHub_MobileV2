import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ResidentLayout from '../../layouts/ResidentLayout';
import { sortedBarangays, findBarangayByName, DAVAO_CITY } from '../../data/davaoCityBarangays';
import './BookService.css';

const BookService = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { provider, service } = location.state || {};
  
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const [bookingData, setBookingData] = useState({
    // Step 1: Service Details (pre-filled)
    provider: provider || {
      id: 1,
      name: "Juan's Plumbing Services",
      owner: "Juan Dela Cruz",
      rating: 4.9,
      reviews: 127,
      verified: true,
      avatar: "https://ui-avatars.com/api/?name=Juan+Dela+Cruz&background=2563eb&color=fff",
      completedJobs: 145,
    },
    service: service || {
      id: 'leak-repair',
      name: 'Leak Repair',
      category: 'Plumbing',
      icon: 'bi-droplet-fill',
      providerPrice: 370,
      suggestedPrice: 350,
      estimatedDuration: '1-2 hours',
      pricingLabel: 'Fair Pricing',
    },
    
    // Step 2: Booking Details
    preferredDate: '',
    preferredTime: '',
    houseNo: '',
    street: '',
    barangay: '',
    district: '',
    postalCode: '',
    city: DAVAO_CITY,
    problemDescription: '',
    images: [],
    imagePreviews: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'barangay') {
      const selectedBarangay = findBarangayByName(value);
      if (selectedBarangay) {
        setBookingData(prev => ({
          ...prev,
          barangay: value,
          district: selectedBarangay.district,
          postalCode: selectedBarangay.postalCode,
        }));
      }
    } else {
      setBookingData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    if (bookingData.images.length + files.length > 5) {
      setErrors(prev => ({ ...prev, images: 'Maximum 5 images allowed' }));
      return;
    }
    
    const newImages = [];
    const newPreviews = [];
    
    files.forEach(file => {
      if (file.size > 5000000) {
        setErrors(prev => ({ ...prev, images: 'Each file must be less than 5MB' }));
        return;
      }
      
      newImages.push(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result);
        if (newPreviews.length === files.length) {
          setBookingData(prev => ({
            ...prev,
            images: [...prev.images, ...newImages],
            imagePreviews: [...prev.imagePreviews, ...newPreviews],
          }));
        }
      };
      reader.readAsDataURL(file);
    });
    
    setErrors(prev => ({ ...prev, images: '' }));
  };

  const removeImage = (index) => {
    setBookingData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
      imagePreviews: prev.imagePreviews.filter((_, i) => i !== index),
    }));
  };

  const validateStep2 = () => {
    const newErrors = {};
    
    if (!bookingData.preferredDate) newErrors.preferredDate = 'Preferred date is required';
    if (!bookingData.preferredTime) newErrors.preferredTime = 'Preferred time is required';
    if (!bookingData.houseNo.trim()) newErrors.houseNo = 'House number is required';
    if (!bookingData.street.trim()) newErrors.street = 'Street is required';
    if (!bookingData.barangay) newErrors.barangay = 'Barangay is required';
    if (!bookingData.problemDescription.trim()) newErrors.problemDescription = 'Problem description is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 2 && !validateStep2()) {
      return;
    }
    setCurrentStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setShowSuccess(true);
    }, 1500);
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getPricingBadge = (label) => {
    const badges = {
      'Fair Pricing': { color: '#2563eb', bg: 'rgba(37, 99, 235, 0.1)', icon: 'bi-check-circle-fill' },
      'Premium Pricing': { color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.1)', icon: 'bi-star-fill' },
      'Budget Friendly': { color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)', icon: 'bi-piggy-bank-fill' },
    };
    return badges[label] || badges['Fair Pricing'];
  };

  if (showSuccess) {
    return (
      <ResidentLayout>
        <div className="booking-success-container">
          <div className="booking-success-card">
            <div className="success-icon-large">
              <i className="bi bi-check-circle-fill"></i>
            </div>
            
            <h1 className="success-title">Booking Submitted Successfully</h1>
            <p className="success-subtitle">Your booking request has been sent to the provider.</p>
            
            <div className="status-badge-current">
              <i className="bi bi-clock-history"></i>
              Pending Provider Approval
            </div>

            <div className="booking-timeline-success">
              <div className="timeline-item-success completed">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h4>Booking Submitted</h4>
                  <p>Your request has been sent</p>
                </div>
              </div>
              
              <div className="timeline-item-success active">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h4>Waiting for Provider Response</h4>
                  <p>Usually responds within 1 hour</p>
                </div>
              </div>
              
              <div className="timeline-item-success">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h4>Booking Confirmed</h4>
                  <p>Provider accepts your request</p>
                </div>
              </div>
              
              <div className="timeline-item-success">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h4>In Progress</h4>
                  <p>Service is being performed</p>
                </div>
              </div>
              
              <div className="timeline-item-success">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h4>Completed</h4>
                  <p>Service finished successfully</p>
                </div>
              </div>
            </div>

            <div className="success-actions">
              <button 
                className="btn btn-primary btn-lg"
                onClick={() => navigate('/resident/bookings')}
              >
                <i className="bi bi-calendar-check me-2"></i>
                View My Bookings
              </button>
              <button 
                className="btn btn-secondary btn-lg"
                onClick={() => navigate('/resident/dashboard')}
              >
                <i className="bi bi-house me-2"></i>
                Return to Dashboard
              </button>
            </div>
          </div>
        </div>
      </ResidentLayout>
    );
  }

  const steps = [
    { number: 1, label: 'Service Details', icon: 'bi-info-circle' },
    { number: 2, label: 'Booking Details', icon: 'bi-calendar-check' },
    { number: 3, label: 'Review & Confirm', icon: 'bi-check-circle' },
  ];

  const pricingBadge = getPricingBadge(bookingData.service.pricingLabel);

  return (
    <ResidentLayout>
      <div className="booking-container">
        <div className="booking-card">
          {/* Header */}
          <div className="booking-header">
            <button 
              className="btn-back-header"
              onClick={() => navigate(-1)}
            >
              <i className="bi bi-arrow-left"></i>
            </button>
            <div>
              <h2 className="booking-title">Book Service</h2>
              <p className="booking-subtitle">Complete your booking in 3 easy steps</p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="booking-progress-steps">
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
            {/* Step 1: Service Details */}
            {currentStep === 1 && (
              <div className="booking-step">
                <h3 className="step-title">Service Details</h3>
                <p className="step-description">Review the service and provider information</p>

                {/* Provider Card */}
                <div className="provider-info-card">
                  <div className="provider-header-info">
                    <img 
                      src={bookingData.provider.avatar} 
                      alt={bookingData.provider.name}
                      className="provider-avatar-large"
                    />
                    <div className="provider-details">
                      <div className="provider-name-row">
                        <h4>{bookingData.provider.name}</h4>
                        {bookingData.provider.verified && (
                          <span className="verified-badge">
                            <i className="bi bi-patch-check-fill"></i> Verified
                          </span>
                        )}
                      </div>
                      <div className="provider-meta-row">
                        <div className="rating-display">
                          <i className="bi bi-star-fill"></i>
                          <span className="rating-value">{bookingData.provider.rating}</span>
                          <span className="rating-count">({bookingData.provider.reviews} reviews)</span>
                        </div>
                        <div className="jobs-completed">
                          <i className="bi bi-check-circle"></i>
                          {bookingData.provider.completedJobs} completed jobs
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Service Card */}
                <div className="service-info-card">
                  <div className="service-header-row">
                    <div className="service-icon-wrapper">
                      <i className={`bi ${bookingData.service.icon}`}></i>
                    </div>
                    <div>
                      <div className="service-category">{bookingData.service.category}</div>
                      <h4 className="service-name">{bookingData.service.name}</h4>
                    </div>
                  </div>

                  <div className="service-details-grid">
                    <div className="service-detail-item">
                      <span className="detail-label">Provider Starting Price</span>
                      <span className="detail-value price">₱{bookingData.service.providerPrice}</span>
                    </div>
                    <div className="service-detail-item">
                      <span className="detail-label">Platform Suggested Price</span>
                      <span className="detail-value price suggested">₱{bookingData.service.suggestedPrice}</span>
                    </div>
                    <div className="service-detail-item">
                      <span className="detail-label">Estimated Duration</span>
                      <span className="detail-value">{bookingData.service.estimatedDuration}</span>
                    </div>
                    <div className="service-detail-item">
                      <span className="detail-label">Pricing</span>
                      <span 
                        className="pricing-badge"
                        style={{ 
                          color: pricingBadge.color,
                          background: pricingBadge.bg 
                        }}
                      >
                        <i className={`bi ${pricingBadge.icon}`}></i>
                        {bookingData.service.pricingLabel}
                      </span>
                    </div>
                  </div>

                  <div className="pricing-notice">
                    <i className="bi bi-info-circle"></i>
                    <div>
                      <strong>Pricing Notice</strong>
                      <p>This provider's pricing is within the normal market range. Final cost may vary based on job complexity.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Booking Details */}
            {currentStep === 2 && (
              <div className="booking-step">
                <h3 className="step-title">Booking Details</h3>
                <p className="step-description">Provide booking information and service location</p>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label-enhanced">
                      Preferred Date <span className="text-danger">*</span>
                    </label>
                    <input
                      type="date"
                      className={`form-input-enhanced ${errors.preferredDate ? 'is-invalid' : ''}`}
                      name="preferredDate"
                      value={bookingData.preferredDate}
                      onChange={handleChange}
                      min={getTodayDate()}
                    />
                    {errors.preferredDate && (
                      <div className="invalid-feedback">{errors.preferredDate}</div>
                    )}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label-enhanced">
                      Preferred Time <span className="text-danger">*</span>
                    </label>
                    <select
                      className={`form-input-enhanced ${errors.preferredTime ? 'is-invalid' : ''}`}
                      name="preferredTime"
                      value={bookingData.preferredTime}
                      onChange={handleChange}
                    >
                      <option value="">Select time</option>
                      <option value="08:00 AM">08:00 AM</option>
                      <option value="09:00 AM">09:00 AM</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:00 AM">11:00 AM</option>
                      <option value="01:00 PM">01:00 PM</option>
                      <option value="02:00 PM">02:00 PM</option>
                      <option value="03:00 PM">03:00 PM</option>
                      <option value="04:00 PM">04:00 PM</option>
                    </select>
                    {errors.preferredTime && (
                      <div className="invalid-feedback">{errors.preferredTime}</div>
                    )}
                  </div>
                </div>

                <h4 className="section-subtitle">Service Address</h4>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label-enhanced">
                      House No. <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-input-enhanced ${errors.houseNo ? 'is-invalid' : ''}`}
                      name="houseNo"
                      value={bookingData.houseNo}
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
                      value={bookingData.street}
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
                    className={`form-input-enhanced ${errors.barangay ? 'is-invalid' : ''}`}
                    name="barangay"
                    value={bookingData.barangay}
                    onChange={handleChange}
                  >
                    <option value="">Select barangay</option>
                    {sortedBarangays.map((barangay, index) => (
                      <option key={index} value={barangay.name}>
                        {barangay.name}
                      </option>
                    ))}
                  </select>
                  {errors.barangay && (
                    <div className="invalid-feedback">{errors.barangay}</div>
                  )}
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label-enhanced">City</label>
                    <div className="form-input-readonly">
                      <i className="bi bi-geo-alt-fill"></i>
                      {bookingData.city}
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label-enhanced">Postal Code</label>
                    <div className="form-input-readonly">
                      <i className="bi bi-mailbox"></i>
                      {bookingData.postalCode || '----'}
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label-enhanced">
                    Problem Description <span className="text-danger">*</span>
                  </label>
                  <textarea
                    className={`form-input-enhanced ${errors.problemDescription ? 'is-invalid' : ''}`}
                    name="problemDescription"
                    value={bookingData.problemDescription}
                    onChange={handleChange}
                    placeholder="Describe the problem in detail. Example: My kitchen sink has been leaking since yesterday..."
                    rows="4"
                  ></textarea>
                  {errors.problemDescription && (
                    <div className="invalid-feedback">{errors.problemDescription}</div>
                  )}
                  <small className="form-hint">
                    Provide as much detail as possible to help the provider prepare
                  </small>
                </div>

                <div className="mb-3">
                  <label className="form-label-enhanced">
                    Upload Photos (Optional)
                  </label>
                  <div className="image-upload-section">
                    {bookingData.imagePreviews.length < 5 && (
                      <label className="image-upload-area">
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageUpload}
                          style={{ display: 'none' }}
                        />
                        <i className="bi bi-cloud-upload"></i>
                        <p>Click to upload photos</p>
                        <small>Up to 5 images, 5MB each</small>
                      </label>
                    )}
                    
                    {bookingData.imagePreviews.length > 0 && (
                      <div className="image-previews-grid">
                        {bookingData.imagePreviews.map((preview, index) => (
                          <div key={index} className="image-preview-item">
                            <img src={preview} alt={`Preview ${index + 1}`} />
                            <button
                              type="button"
                              className="btn-remove-image"
                              onClick={() => removeImage(index)}
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {errors.images && (
                    <div className="invalid-feedback d-block">{errors.images}</div>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Review & Confirm */}
            {currentStep === 3 && (
              <div className="booking-step">
                <h3 className="step-title">Review & Confirm</h3>
                <p className="step-description">Review your booking details before confirming</p>

                {/* Provider Summary */}
                <div className="review-section">
                  <h4 className="review-section-title">
                    <i className="bi bi-person-circle"></i> Provider Information
                  </h4>
                  <div className="provider-review-card">
                    <img 
                      src={bookingData.provider.avatar} 
                      alt={bookingData.provider.name}
                      className="provider-avatar-review"
                    />
                    <div>
                      <h5>{bookingData.provider.name}</h5>
                      <div className="provider-meta-review">
                        <span className="rating">
                          <i className="bi bi-star-fill"></i> {bookingData.provider.rating}
                        </span>
                        {bookingData.provider.verified && (
                          <span className="verified">
                            <i className="bi bi-patch-check-fill"></i> Verified
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Service Summary */}
                <div className="review-section">
                  <h4 className="review-section-title">
                    <i className="bi bi-tools"></i> Service Information
                  </h4>
                  <div className="review-grid">
                    <div className="review-item">
                      <span className="review-label">Service:</span>
                      <span className="review-value">{bookingData.service.name}</span>
                    </div>
                    <div className="review-item">
                      <span className="review-label">Category:</span>
                      <span className="review-value">{bookingData.service.category}</span>
                    </div>
                    <div className="review-item">
                      <span className="review-label">Date:</span>
                      <span className="review-value">{bookingData.preferredDate}</span>
                    </div>
                    <div className="review-item">
                      <span className="review-label">Time:</span>
                      <span className="review-value">{bookingData.preferredTime}</span>
                    </div>
                  </div>
                </div>

                {/* Address Summary */}
                <div className="review-section">
                  <h4 className="review-section-title">
                    <i className="bi bi-geo-alt"></i> Service Address
                  </h4>
                  <div className="address-review">
                    {bookingData.houseNo} {bookingData.street}, {bookingData.barangay}<br />
                    {bookingData.city} {bookingData.postalCode}
                  </div>
                </div>

                {/* Problem Description */}
                <div className="review-section">
                  <h4 className="review-section-title">
                    <i className="bi bi-chat-left-text"></i> Problem Description
                  </h4>
                  <p className="problem-description-review">
                    {bookingData.problemDescription}
                  </p>
                </div>

                {/* Uploaded Images */}
                {bookingData.imagePreviews.length > 0 && (
                  <div className="review-section">
                    <h4 className="review-section-title">
                      <i className="bi bi-images"></i> Uploaded Photos ({bookingData.imagePreviews.length})
                    </h4>
                    <div className="images-review-grid">
                      {bookingData.imagePreviews.map((preview, index) => (
                        <img key={index} src={preview} alt={`Photo ${index + 1}`} className="review-image" />
                      ))}
                    </div>
                  </div>
                )}

                {/* Pricing Summary */}
                <div className="pricing-summary-card">
                  <h4 className="pricing-summary-title">Pricing Summary</h4>
                  <div className="pricing-row">
                    <span>Platform Suggested Price:</span>
                    <span className="price-value">₱{bookingData.service.suggestedPrice}</span>
                  </div>
                  <div className="pricing-row">
                    <span>Provider Starting Price:</span>
                    <span className="price-value">₱{bookingData.service.providerPrice}</span>
                  </div>
                  <div className="pricing-row">
                    <span>Estimated Duration:</span>
                    <span>{bookingData.service.estimatedDuration}</span>
                  </div>
                  <div className="pricing-notice-small">
                    <i className="bi bi-info-circle"></i>
                    Final price will be confirmed by the provider based on actual work required
                  </div>
                </div>
              </div>
            )}
            
            {/* Navigation Buttons */}
            <div className="booking-actions">
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
                      Submitting...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-check-circle me-2"></i>
                      Confirm Booking
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </ResidentLayout>
  );
};

export default BookService;
