import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { serviceCategories, mockProviders, barangays } from '../../data/mockData';

const BookingWizard = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    serviceCategory: '',
    provider: '',
    date: '',
    time: '',
    duration: '1',
    address: '',
    barangay: '',
    description: '',
  });

  const menuItems = [
    { path: '/resident/dashboard', label: 'Dashboard', icon: 'bi-speedometer2' },
    { path: '/resident/find-services', label: 'Find Services', icon: 'bi-search' },
    { path: '/resident/providers', label: 'Providers', icon: 'bi-people' },
    { path: '/resident/bookings', label: 'My Bookings', icon: 'bi-calendar-check' },
    { path: '/resident/reviews', label: 'Reviews', icon: 'bi-star' },
    { path: '/resident/notifications', label: 'Notifications', icon: 'bi-bell', badge: 3 },
    { path: '/resident/profile', label: 'Profile', icon: 'bi-person' },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock submission
    alert('Booking request submitted successfully!');
    navigate('/resident/bookings');
  };

  const selectedProvider = mockProviders.find(p => p.id === parseInt(formData.provider));

  return (
    <DashboardLayout role="resident" menuItems={menuItems}>
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="mb-4">
            <h2 className="fw-bold mb-1">Book a Service</h2>
            <p className="text-muted mb-0">Follow the steps to complete your booking</p>
          </div>

          {/* Progress Steps */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between">
                {[1, 2, 3, 4].map((stepNum) => (
                  <div key={stepNum} className="text-center flex-grow-1">
                    <div
                      className={`rounded-circle d-inline-flex align-items-center justify-content-center mb-2 ${
                        step >= stepNum
                          ? 'bg-primary text-white'
                          : 'bg-light text-muted'
                      }`}
                      style={{ width: '40px', height: '40px' }}
                    >
                      {step > stepNum ? (
                        <i className="bi bi-check-lg"></i>
                      ) : (
                        stepNum
                      )}
                    </div>
                    <div className="small fw-semibold">
                      {stepNum === 1 && 'Service'}
                      {stepNum === 2 && 'Provider'}
                      {stepNum === 3 && 'Schedule'}
                      {stepNum === 4 && 'Confirm'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Select Service */}
            {step === 1 && (
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                  <h5 className="mb-4">Select a Service</h5>
                  <div className="row row-cols-2 row-cols-md-3 g-3">
                    {serviceCategories.map((service) => (
                      <div key={service.id} className="col">
                        <input
                          type="radio"
                          className="btn-check"
                          name="serviceCategory"
                          id={`service-${service.id}`}
                          value={service.name}
                          checked={formData.serviceCategory === service.name}
                          onChange={handleChange}
                        />
                        <label
                          className="btn btn-outline-primary w-100 h-100 text-center p-3"
                          htmlFor={`service-${service.id}`}
                        >
                          <i className={`bi ${service.icon} fs-2 d-block mb-2`}></i>
                          <span className="small fw-semibold">{service.name}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Select Provider */}
            {step === 2 && (
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                  <h5 className="mb-4">Choose a Provider</h5>
                  <div className="list-group">
                    {mockProviders
                      .filter(p => p.services.includes(formData.serviceCategory))
                      .map((provider) => (
                        <label
                          key={provider.id}
                          className={`list-group-item list-group-item-action cursor-pointer ${
                            formData.provider === provider.id.toString() ? 'active' : ''
                          }`}
                        >
                          <input
                            type="radio"
                            name="provider"
                            value={provider.id}
                            checked={formData.provider === provider.id.toString()}
                            onChange={handleChange}
                            className="d-none"
                          />
                          <div className="d-flex align-items-center">
                            <img
                              src={provider.avatar}
                              alt={provider.name}
                              className="rounded-circle me-3"
                              width="60"
                              height="60"
                            />
                            <div className="flex-grow-1">
                              <h6 className="mb-1">{provider.name}</h6>
                              <div className="small mb-1">
                                <span className="text-warning">⭐ {provider.rating}</span>
                                <span className="text-muted ms-2">({provider.reviews} reviews)</span>
                              </div>
                              <div className="small text-muted">
                                ₱{provider.hourlyRate}/hr • {provider.location}
                              </div>
                            </div>
                            <div className="text-end">
                              <span className={`badge ${
                                provider.availability === 'Available Now'
                                  ? 'bg-success'
                                  : 'bg-warning'
                              }`}>
                                {provider.availability}
                              </span>
                            </div>
                          </div>
                        </label>
                      ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Schedule */}
            {step === 3 && (
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                  <h5 className="mb-4">Schedule Your Service</h5>
                  
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Date</label>
                      <input
                        type="date"
                        className="form-control"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Time</label>
                      <select
                        className="form-select"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select time</option>
                        {Array.from({ length: 10 }, (_, i) => i + 8).map((hour) => (
                          <option key={hour} value={`${hour}:00`}>
                            {hour}:00 {hour < 12 ? 'AM' : 'PM'}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-12">
                      <label className="form-label">Estimated Duration (hours)</label>
                      <select
                        className="form-select"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        required
                      >
                        <option value="1">1 hour</option>
                        <option value="2">2 hours</option>
                        <option value="3">3 hours</option>
                        <option value="4">4 hours</option>
                        <option value="6">6 hours</option>
                        <option value="8">8 hours (Full day)</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <label className="form-label">Barangay</label>
                      <select
                        className="form-select"
                        name="barangay"
                        value={formData.barangay}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Barangay</option>
                        {barangays.map((bar, idx) => (
                          <option key={idx} value={bar}>{bar}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-12">
                      <label className="form-label">Service Address</label>
                      <textarea
                        className="form-control"
                        name="address"
                        rows="2"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter complete address"
                        required
                      ></textarea>
                    </div>
                    <div className="col-12">
                      <label className="form-label">Additional Details</label>
                      <textarea
                        className="form-control"
                        name="description"
                        rows="3"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Describe what needs to be done..."
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Confirm */}
            {step === 4 && (
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                  <h5 className="mb-4">Confirm Your Booking</h5>
                  
                  <div className="row g-4">
                    <div className="col-md-8">
                      <div className="mb-4">
                        <h6 className="text-muted mb-2">Service</h6>
                        <p className="mb-0 fw-semibold">{formData.serviceCategory}</p>
                      </div>
                      
                      {selectedProvider && (
                        <div className="mb-4">
                          <h6 className="text-muted mb-2">Provider</h6>
                          <div className="d-flex align-items-center">
                            <img
                              src={selectedProvider.avatar}
                              alt={selectedProvider.name}
                              className="rounded-circle me-3"
                              width="50"
                              height="50"
                            />
                            <div>
                              <p className="mb-0 fw-semibold">{selectedProvider.name}</p>
                              <small className="text-muted">
                                ⭐ {selectedProvider.rating} ({selectedProvider.reviews} reviews)
                              </small>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className="mb-4">
                        <h6 className="text-muted mb-2">Schedule</h6>
                        <p className="mb-0">
                          <i className="bi bi-calendar me-2"></i>
                          {formData.date} at {formData.time}
                        </p>
                        <p className="mb-0">
                          <i className="bi bi-clock me-2"></i>
                          Duration: {formData.duration} hour(s)
                        </p>
                      </div>
                      
                      <div className="mb-4">
                        <h6 className="text-muted mb-2">Location</h6>
                        <p className="mb-0">
                          <i className="bi bi-geo-alt me-2"></i>
                          {formData.address}, {formData.barangay}
                        </p>
                      </div>
                      
                      {formData.description && (
                        <div>
                          <h6 className="text-muted mb-2">Details</h6>
                          <p className="mb-0">{formData.description}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="col-md-4">
                      <div className="card bg-light border-0">
                        <div className="card-body">
                          <h6 className="mb-3">Cost Summary</h6>
                          <div className="d-flex justify-content-between mb-2">
                            <span>Service Fee</span>
                            <span>₱{selectedProvider ? selectedProvider.hourlyRate * parseInt(formData.duration) : 0}</span>
                          </div>
                          <div className="d-flex justify-content-between mb-2">
                            <span>Platform Fee</span>
                            <span>₱50</span>
                          </div>
                          <hr />
                          <div className="d-flex justify-content-between">
                            <strong>Total</strong>
                            <strong className="text-primary">
                              ₱{selectedProvider ? (selectedProvider.hourlyRate * parseInt(formData.duration)) + 50 : 50}
                            </strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="card border-0 shadow-sm mt-4">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={handleBack}
                    disabled={step === 1}
                  >
                    <i className="bi bi-arrow-left me-2"></i>
                    Back
                  </button>
                  
                  {step < 4 ? (
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleNext}
                      disabled={
                        (step === 1 && !formData.serviceCategory) ||
                        (step === 2 && !formData.provider) ||
                        (step === 3 && (!formData.date || !formData.time || !formData.address))
                      }
                    >
                      Next
                      <i className="bi bi-arrow-right ms-2"></i>
                    </button>
                  ) : (
                    <button type="submit" className="btn btn-success">
                      <i className="bi bi-check-lg me-2"></i>
                      Confirm Booking
                    </button>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BookingWizard;
