import { useState } from 'react';
import ProviderLayout from '../../layouts/ProviderLayout';
import { useAuth } from '../../context/AuthContext';
import '../provider/ProviderPages.css';

const ProviderProfilePage = () => {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [activeSection, setActiveSection] = useState('profile');

  const profileSections = [
    { id: 'profile', label: 'Profile Overview', icon: 'bi-person' },
    { id: 'business', label: 'Business Information', icon: 'bi-briefcase' },
    { id: 'verification', label: 'Verification', icon: 'bi-patch-check' },
    { id: 'preferences', label: 'Preferences', icon: 'bi-sliders' },
  ];

  return (
    <ProviderLayout>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <div className="breadcrumb-nav">
            <i className="bi bi-house-door"></i>
            <span>Account</span>
            <i className="bi bi-chevron-right"></i>
            <span>Profile</span>
          </div>
          <h1 className="page-title">Provider Profile</h1>
          <p className="page-subtitle">Manage your account and business information</p>
        </div>
      </div>

      <div className="row g-4">
        {/* Profile Navigation */}
        <div className="col-lg-3">
          <div className="settings-card">
            <div className="settings-card-header">
              <h3 className="settings-card-title">Settings</h3>
            </div>
            <div style={{ padding: '0.75rem' }}>
              {profileSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`settings-nav-item ${activeSection === section.id ? 'active' : ''}`}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: 'none',
                    background: activeSection === section.id ? 'rgba(37, 99, 235, 0.08)' : 'transparent',
                    borderRadius: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    fontSize: '0.875rem',
                    fontWeight: activeSection === section.id ? '700' : '500',
                    color: activeSection === section.id ? '#2563eb' : '#64748b',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    marginBottom: '0.375rem',
                    textAlign: 'left'
                  }}
                >
                  <i className={section.icon} style={{ fontSize: '1.125rem' }}></i>
                  {section.label}
                </button>
              ))}
            </div>
          </div>

          {/* Profile Card */}
          <div className="settings-card" style={{ marginTop: '1rem' }}>
            <div className="settings-card-body" style={{ textAlign: 'center' }}>
              <img 
                src={user?.avatar} 
                alt={user?.name} 
                style={{ 
                  width: '96px', 
                  height: '96px', 
                  borderRadius: '0.75rem', 
                  border: '3px solid #e2e8f0',
                  marginBottom: '1rem'
                }} 
              />
              <h4 style={{ fontSize: '1.0625rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.375rem' }}>
                {user?.name}
              </h4>
              <p style={{ fontSize: '0.8125rem', color: '#64748b', marginBottom: '1rem' }}>
                {user?.email}
              </p>
              <div className="status-badge status-active" style={{ marginBottom: '0.75rem' }}>
                <i className="bi bi-patch-check-fill me-1"></i>
                Verified Provider
              </div>
              <button 
                className="action-btn" 
                style={{ width: '100%', padding: '0.625rem', height: 'auto', fontWeight: '600' }}
              >
                <i className="bi bi-camera me-2"></i>
                Change Photo
              </button>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="col-lg-9">
          {/* Profile Overview */}
          {activeSection === 'profile' && (
            <div>
              <div className="settings-card" style={{ marginBottom: '1.5rem' }}>
                <div className="settings-card-header">
                  <h3 className="settings-card-title">Profile Overview</h3>
                </div>
                <div className="settings-card-body">
                  <div className="row g-4">
                    <div className="col-md-6">
                      <div className="form-group-enhanced">
                        <label className="form-label-enhanced">Full Name</label>
                        <input
                          type="text"
                          className="form-input-enhanced"
                          defaultValue={user?.name}
                          disabled={!editing}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group-enhanced">
                        <label className="form-label-enhanced">Email Address</label>
                        <input
                          type="email"
                          className="form-input-enhanced"
                          defaultValue={user?.email}
                          disabled={!editing}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group-enhanced">
                        <label className="form-label-enhanced">Phone Number</label>
                        <input
                          type="tel"
                          className="form-input-enhanced"
                          defaultValue="+63 912 345 6789"
                          disabled={!editing}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group-enhanced">
                        <label className="form-label-enhanced">Location</label>
                        <input
                          type="text"
                          className="form-input-enhanced"
                          defaultValue="Davao City"
                          disabled={!editing}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group-enhanced">
                        <label className="form-label-enhanced">About / Bio</label>
                        <textarea
                          className="form-input-enhanced"
                          rows="4"
                          disabled={!editing}
                          defaultValue="Professional service provider with 10+ years of experience in home services. Specializing in plumbing, electrical work, and general maintenance."
                        />
                      </div>
                    </div>
                  </div>
                  <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem' }}>
                    {!editing ? (
                      <button
                        className="action-btn action-btn-primary"
                        onClick={() => setEditing(true)}
                        style={{ width: 'auto', padding: '0.625rem 1.5rem', height: 'auto' }}
                      >
                        <i className="bi bi-pencil me-2"></i>
                        Edit Profile
                      </button>
                    ) : (
                      <>
                        <button
                          className="action-btn action-btn-primary"
                          onClick={() => setEditing(false)}
                          style={{ width: 'auto', padding: '0.625rem 1.5rem', height: 'auto' }}
                        >
                          <i className="bi bi-check-circle me-2"></i>
                          Save Changes
                        </button>
                        <button
                          className="action-btn"
                          onClick={() => setEditing(false)}
                          style={{ width: 'auto', padding: '0.625rem 1.5rem', height: 'auto' }}
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Statistics */}
              <div className="stats-grid-small">
                <div className="stat-card-small">
                  <div className="stat-label-small">Member Since</div>
                  <div className="stat-value-small" style={{ fontSize: '1.125rem' }}>Jan 2024</div>
                </div>
                <div className="stat-card-small">
                  <div className="stat-label-small">Response Rate</div>
                  <div className="stat-value-small" style={{ fontSize: '1.125rem' }}>98%</div>
                </div>
                <div className="stat-card-small">
                  <div className="stat-label-small">Completed Jobs</div>
                  <div className="stat-value-small" style={{ fontSize: '1.125rem' }}>458</div>
                </div>
                <div className="stat-card-small">
                  <div className="stat-label-small">Rating</div>
                  <div className="stat-value-small" style={{ fontSize: '1.125rem' }}>4.8 ⭐</div>
                </div>
              </div>
            </div>
          )}

          {/* Business Information */}
          {activeSection === 'business' && (
            <div className="settings-card">
              <div className="settings-card-header">
                <h3 className="settings-card-title">Business Information</h3>
              </div>
              <div className="settings-card-body">
                <div className="row g-4">
                  <div className="col-md-6">
                    <div className="form-group-enhanced">
                      <label className="form-label-enhanced">Business Name</label>
                      <input
                        type="text"
                        className="form-input-enhanced"
                        defaultValue="Juan's Professional Services"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group-enhanced">
                      <label className="form-label-enhanced">Business Type</label>
                      <select className="form-input-enhanced">
                        <option>Sole Proprietor</option>
                        <option>Partnership</option>
                        <option>Corporation</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group-enhanced">
                      <label className="form-label-enhanced">Years of Experience</label>
                      <input
                        type="number"
                        className="form-input-enhanced"
                        defaultValue="10"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group-enhanced">
                      <label className="form-label-enhanced">Service Area</label>
                      <input
                        type="text"
                        className="form-input-enhanced"
                        defaultValue="Davao City & Surrounding Areas"
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group-enhanced">
                      <label className="form-label-enhanced">Business Description</label>
                      <textarea
                        className="form-input-enhanced"
                        rows="4"
                        defaultValue="We provide reliable and professional home services including plumbing, electrical work, AC repair, and general maintenance. Licensed and insured."
                      />
                    </div>
                  </div>
                </div>
                <button
                  className="action-btn action-btn-primary"
                  style={{ width: 'auto', padding: '0.625rem 1.5rem', height: 'auto', marginTop: '1.5rem' }}
                >
                  <i className="bi bi-check-circle me-2"></i>
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Verification */}
          {activeSection === 'verification' && (
            <div>
              <div className="settings-card" style={{ marginBottom: '1.5rem' }}>
                <div className="settings-card-header">
                  <h3 className="settings-card-title">Account Verification</h3>
                </div>
                <div className="settings-card-body">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.125rem', background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(59, 130, 246, 0.04) 100%)', borderRadius: '0.625rem', border: '1px solid rgba(37, 99, 235, 0.2)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <i className="bi bi-patch-check-fill" style={{ fontSize: '2rem', color: '#2563eb' }}></i>
                        <div>
                          <div style={{ fontWeight: '700', color: '#0f172a', marginBottom: '0.25rem' }}>Identity Verified</div>
                          <div style={{ fontSize: '0.8125rem', color: '#64748b' }}>Government ID verified</div>
                        </div>
                      </div>
                      <span className="status-badge status-active">Verified</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.125rem', background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(59, 130, 246, 0.04) 100%)', borderRadius: '0.625rem', border: '1px solid rgba(37, 99, 235, 0.2)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <i className="bi bi-envelope-check-fill" style={{ fontSize: '2rem', color: '#2563eb' }}></i>
                        <div>
                          <div style={{ fontWeight: '700', color: '#0f172a', marginBottom: '0.25rem' }}>Email Verified</div>
                          <div style={{ fontSize: '0.8125rem', color: '#64748b' }}>{user?.email}</div>
                        </div>
                      </div>
                      <span className="status-badge status-active">Verified</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.125rem', background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(59, 130, 246, 0.04) 100%)', borderRadius: '0.625rem', border: '1px solid rgba(37, 99, 235, 0.2)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <i className="bi bi-phone-fill" style={{ fontSize: '2rem', color: '#2563eb' }}></i>
                        <div>
                          <div style={{ fontWeight: '700', color: '#0f172a', marginBottom: '0.25rem' }}>Phone Verified</div>
                          <div style={{ fontSize: '0.8125rem', color: '#64748b' }}>+63 912 345 6789</div>
                        </div>
                      </div>
                      <span className="status-badge status-active">Verified</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="settings-card">
                <div className="settings-card-header">
                  <h3 className="settings-card-title">Documents</h3>
                </div>
                <div className="settings-card-body">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: '#f8fafc', borderRadius: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <i className="bi bi-file-earmark-text" style={{ fontSize: '1.5rem', color: '#64748b' }}></i>
                        <div>
                          <div style={{ fontWeight: '600', color: '#0f172a', fontSize: '0.875rem' }}>Business Permit</div>
                          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Uploaded Jan 15, 2024</div>
                        </div>
                      </div>
                      <span className="status-badge status-active">Approved</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: '#f8fafc', borderRadius: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <i className="bi bi-file-earmark-text" style={{ fontSize: '1.5rem', color: '#64748b' }}></i>
                        <div>
                          <div style={{ fontWeight: '600', color: '#0f172a', fontSize: '0.875rem' }}>Insurance Certificate</div>
                          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Uploaded Jan 15, 2024</div>
                        </div>
                      </div>
                      <span className="status-badge status-active">Approved</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Preferences */}
          {activeSection === 'preferences' && (
            <div className="settings-card">
              <div className="settings-card-header">
                <h3 className="settings-card-title">Notification Preferences</h3>
              </div>
              <div className="settings-card-body">
                <div className="form-switch-enhanced">
                  <div>
                    <div className="form-switch-label">Booking Notifications</div>
                    <small style={{ color: '#64748b', fontSize: '0.8125rem' }}>Get notified when you receive new booking requests</small>
                  </div>
                  <input type="checkbox" className="form-check-input" defaultChecked />
                </div>
                <div className="form-switch-enhanced">
                  <div>
                    <div className="form-switch-label">Email Notifications</div>
                    <small style={{ color: '#64748b', fontSize: '0.8125rem' }}>Receive email updates about your bookings and account</small>
                  </div>
                  <input type="checkbox" className="form-check-input" defaultChecked />
                </div>
                <div className="form-switch-enhanced">
                  <div>
                    <div className="form-switch-label">SMS Notifications</div>
                    <small style={{ color: '#64748b', fontSize: '0.8125rem' }}>Get SMS alerts for urgent booking updates</small>
                  </div>
                  <input type="checkbox" className="form-check-input" />
                </div>
                <div className="form-switch-enhanced">
                  <div>
                    <div className="form-switch-label">Marketing Updates</div>
                    <small style={{ color: '#64748b', fontSize: '0.8125rem' }}>Receive tips, promotions, and platform updates</small>
                  </div>
                  <input type="checkbox" className="form-check-input" defaultChecked />
                </div>
                <button
                  className="action-btn action-btn-primary"
                  style={{ width: 'auto', padding: '0.625rem 1.5rem', height: 'auto', marginTop: '1.5rem' }}
                >
                  <i className="bi bi-check-circle me-2"></i>
                  Save Preferences
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </ProviderLayout>
  );
};

export default ProviderProfilePage;
