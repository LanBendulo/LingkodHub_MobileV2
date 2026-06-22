import { useState } from 'react';
import ResidentLayout from '../../layouts/ResidentLayout';
import { useAuth } from '../../context/AuthContext';
import { barangays } from '../../data/mockData';
import '../resident/ResidentPages.css';

const ResidentProfile = () => {
  const { user, updateProfile } = useAuth();
  const [activeSection, setActiveSection] = useState('personal');
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+63 912 345 6789',
    address: '123 Main Street',
    barangay: 'Poblacion',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile({ name: formData.name });
    setEditing(false);
  };

  return (
    <ResidentLayout>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Account Settings</h1>
          <p className="page-subtitle">Manage your profile and preferences</p>
        </div>
      </div>

      <div className="row g-4">
        {/* Profile Overview Card */}
        <div className="col-lg-4">
          <div className="settings-card">
            <div className="settings-card-body" style={{ textAlign: 'center' }}>
              <div style={{ position: 'relative', display: 'inline-block', marginBottom: '1rem' }}>
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="rounded-circle"
                  width="120"
                  height="120"
                  style={{ border: '4px solid #F8FAFC', objectFit: 'cover' }}
                />
                <button 
                  style={{ 
                    position: 'absolute',
                    bottom: '0', 
                    right: '0', 
                    width: '36px', 
                    height: '36px',
                    padding: '0',
                    borderRadius: '50%',
                    border: '2px solid white',
                    background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
                    color: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.875rem',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                  title="Change Photo"
                >
                  <i className="bi bi-camera"></i>
                </button>
              </div>
              <h5 style={{ marginBottom: '0.25rem', fontSize: '1.125rem', fontWeight: 700, color: '#0f172a' }}>{user?.name}</h5>
              <p style={{ color: '#64748b', marginBottom: '1rem', fontSize: '0.875rem' }}>{user?.email}</p>
              
              <div style={{ marginBottom: '1rem' }}>
                <span className="status-badge" style={{ background: 'rgba(37, 99, 235, 0.1)', color: '#2563eb' }}>
                  <i className="bi bi-check-circle-fill me-1"></i>
                  Account Verified
                </span>
              </div>

              <div style={{ textAlign: 'left', marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.625rem' }}>
                  <span style={{ color: '#64748b', fontSize: '0.8125rem', fontWeight: 500 }}>Member Since</span>
                  <span style={{ fontWeight: 700, fontSize: '0.8125rem', color: '#0f172a' }}>Jan 2024</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.625rem' }}>
                  <span style={{ color: '#64748b', fontSize: '0.8125rem', fontWeight: 500 }}>Total Bookings</span>
                  <span style={{ fontWeight: 700, fontSize: '0.8125rem', color: '#0f172a' }}>12</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#64748b', fontSize: '0.8125rem', fontWeight: 500 }}>Reviews Given</span>
                  <span style={{ fontWeight: 700, fontSize: '0.8125rem', color: '#0f172a' }}>8</span>
                </div>
              </div>
            </div>
          </div>

          {/* Settings Navigation */}
          <div className="settings-card">
            <div className="settings-card-body" style={{ padding: 0 }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <button 
                  onClick={() => setActiveSection('personal')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.875rem 1.25rem',
                    border: 'none',
                    borderBottom: '1px solid #f1f5f9',
                    background: activeSection === 'personal' ? 'linear-gradient(90deg, rgba(37, 99, 235, 0.06) 0%, transparent 100%)' : 'transparent',
                    color: activeSection === 'personal' ? '#2563eb' : '#0f172a',
                    fontSize: '0.875rem',
                    fontWeight: activeSection === 'personal' ? 700 : 500,
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.15s ease',
                    borderLeft: activeSection === 'personal' ? '3px solid #2563eb' : '3px solid transparent'
                  }}
                >
                  <i className="bi bi-person" style={{ fontSize: '1.125rem' }}></i>
                  <span>Personal Information</span>
                </button>
                <button 
                  onClick={() => setActiveSection('security')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.875rem 1.25rem',
                    border: 'none',
                    borderBottom: '1px solid #f1f5f9',
                    background: activeSection === 'security' ? 'linear-gradient(90deg, rgba(37, 99, 235, 0.06) 0%, transparent 100%)' : 'transparent',
                    color: activeSection === 'security' ? '#2563eb' : '#0f172a',
                    fontSize: '0.875rem',
                    fontWeight: activeSection === 'security' ? 700 : 500,
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.15s ease',
                    borderLeft: activeSection === 'security' ? '3px solid #2563eb' : '3px solid transparent'
                  }}
                >
                  <i className="bi bi-shield-lock" style={{ fontSize: '1.125rem' }}></i>
                  <span>Security</span>
                </button>
                <button 
                  onClick={() => setActiveSection('notifications')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.875rem 1.25rem',
                    border: 'none',
                    borderBottom: '1px solid #f1f5f9',
                    background: activeSection === 'notifications' ? 'linear-gradient(90deg, rgba(37, 99, 235, 0.06) 0%, transparent 100%)' : 'transparent',
                    color: activeSection === 'notifications' ? '#2563eb' : '#0f172a',
                    fontSize: '0.875rem',
                    fontWeight: activeSection === 'notifications' ? 700 : 500,
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.15s ease',
                    borderLeft: activeSection === 'notifications' ? '3px solid #2563eb' : '3px solid transparent'
                  }}
                >
                  <i className="bi bi-bell" style={{ fontSize: '1.125rem' }}></i>
                  <span>Notifications</span>
                </button>
                <button 
                  onClick={() => setActiveSection('preferences')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.875rem 1.25rem',
                    border: 'none',
                    background: activeSection === 'preferences' ? 'linear-gradient(90deg, rgba(37, 99, 235, 0.06) 0%, transparent 100%)' : 'transparent',
                    color: activeSection === 'preferences' ? '#2563eb' : '#0f172a',
                    fontSize: '0.875rem',
                    fontWeight: activeSection === 'preferences' ? 700 : 500,
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.15s ease',
                    borderLeft: activeSection === 'preferences' ? '3px solid #2563eb' : '3px solid transparent'
                  }}
                >
                  <i className="bi bi-sliders" style={{ fontSize: '1.125rem' }}></i>
                  <span>Preferences</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Settings Content */}
        <div className="col-lg-8">
          {/* Personal Information Section */}
          {activeSection === 'personal' && (
            <div className="settings-card">
              <div className="settings-card-header">
                <div style={{ flex: 1 }}>
                  <h5 className="settings-card-title">Personal Information</h5>
                  <p style={{ margin: 0, fontSize: '0.8125rem', color: '#64748b' }}>Update your personal details</p>
                </div>
                {!editing && (
                  <button
                    onClick={() => setEditing(true)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.625rem 1.125rem',
                      borderRadius: '0.5rem',
                      border: '1px solid #2563eb',
                      background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
                      color: 'white',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <i className="bi bi-pencil"></i>
                    Edit
                  </button>
                )}
              </div>
              <div className="settings-card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="form-group-enhanced">
                        <label className="form-label-enhanced">Full Name</label>
                        <input
                          type="text"
                          className="form-input-enhanced"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
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
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
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
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          disabled={!editing}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group-enhanced">
                        <label className="form-label-enhanced">Barangay</label>
                        <select
                          className="form-input-enhanced"
                          name="barangay"
                          value={formData.barangay}
                          onChange={handleChange}
                          disabled={!editing}
                        >
                          {barangays.map((bar, idx) => (
                            <option key={idx} value={bar}>{bar}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group-enhanced">
                        <label className="form-label-enhanced">Complete Address</label>
                        <textarea
                          className="form-input-enhanced"
                          name="address"
                          rows="3"
                          value={formData.address}
                          onChange={handleChange}
                          disabled={!editing}
                          style={{ resize: 'vertical' }}
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  {editing && (
                    <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.5rem' }}>
                      <button 
                        type="submit" 
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.625rem 1.125rem',
                          borderRadius: '0.5rem',
                          border: '1px solid #2563eb',
                          background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
                          color: 'white',
                          fontWeight: 600,
                          fontSize: '0.875rem',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <i className="bi bi-check-lg"></i>
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditing(false)}
                        style={{
                          padding: '0.625rem 1.125rem',
                          borderRadius: '0.5rem',
                          border: '1px solid #e2e8f0',
                          background: 'white',
                          color: '#64748b',
                          fontWeight: 600,
                          fontSize: '0.875rem',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>
          )}

          {/* Security Section */}
          {activeSection === 'security' && (
            <div className="settings-card">
              <div className="settings-card-header">
                <div>
                  <h5 className="settings-card-title">Security Settings</h5>
                  <p style={{ margin: 0, fontSize: '0.8125rem', color: '#64748b' }}>Manage your password and security options</p>
                </div>
              </div>
              <div className="settings-card-body">
                <form>
                  <div className="row g-3">
                    <div className="col-12">
                      <div className="form-group-enhanced">
                        <label className="form-label-enhanced">Current Password</label>
                        <input type="password" className="form-input-enhanced" />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group-enhanced">
                        <label className="form-label-enhanced">New Password</label>
                        <input type="password" className="form-input-enhanced" />
                        <small style={{ color: '#64748b', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>Must be at least 8 characters</small>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group-enhanced">
                        <label className="form-label-enhanced">Confirm New Password</label>
                        <input type="password" className="form-input-enhanced" />
                      </div>
                    </div>
                  </div>
                  <div style={{ marginTop: '1.25rem' }}>
                    <button 
                      type="submit"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.625rem 1.125rem',
                        borderRadius: '0.5rem',
                        border: '1px solid #2563eb',
                        background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '0.875rem',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <i className="bi bi-shield-check"></i>
                      Update Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Notifications Section */}
          {activeSection === 'notifications' && (
            <div className="settings-card">
              <div className="settings-card-header">
                <div>
                  <h5 className="settings-card-title">Notification Preferences</h5>
                  <p style={{ margin: 0, fontSize: '0.8125rem', color: '#64748b' }}>Manage how you receive notifications</p>
                </div>
              </div>
              <div className="settings-card-body">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div className="form-switch-enhanced">
                    <div>
                      <div className="form-switch-label">Email Notifications</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>Receive booking updates via email</div>
                    </div>
                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" defaultChecked style={{ cursor: 'pointer' }} />
                    </div>
                  </div>
                  <div className="form-switch-enhanced">
                    <div>
                      <div className="form-switch-label">SMS Notifications</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>Get text messages for important updates</div>
                    </div>
                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" defaultChecked style={{ cursor: 'pointer' }} />
                    </div>
                  </div>
                  <div className="form-switch-enhanced">
                    <div>
                      <div className="form-switch-label">Booking Reminders</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>Reminders before scheduled services</div>
                    </div>
                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" defaultChecked style={{ cursor: 'pointer' }} />
                    </div>
                  </div>
                  <div className="form-switch-enhanced">
                    <div>
                      <div className="form-switch-label">Promotional Emails</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>Receive special offers and promotions</div>
                    </div>
                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" style={{ cursor: 'pointer' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Preferences Section */}
          {activeSection === 'preferences' && (
            <div className="settings-card">
              <div className="settings-card-header">
                <div>
                  <h5 className="settings-card-title">App Preferences</h5>
                  <p style={{ margin: 0, fontSize: '0.8125rem', color: '#64748b' }}>Customize your experience</p>
                </div>
              </div>
              <div className="settings-card-body">
                <div className="row g-3">
                  <div className="col-12">
                    <div className="form-group-enhanced">
                      <label className="form-label-enhanced">Preferred Language</label>
                      <select className="form-input-enhanced">
                        <option>English</option>
                        <option>Filipino</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group-enhanced">
                      <label className="form-label-enhanced">Timezone</label>
                      <select className="form-input-enhanced">
                        <option>Asia/Manila (GMT+8)</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group-enhanced">
                      <label className="form-label-enhanced">Currency</label>
                      <select className="form-input-enhanced">
                        <option>PHP (₱)</option>
                        <option>USD ($)</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: '1.25rem' }}>
                  <button 
                    type="submit"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.625rem 1.125rem',
                      borderRadius: '0.5rem',
                      border: '1px solid #2563eb',
                      background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
                      color: 'white',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <i className="bi bi-check-lg"></i>
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ResidentLayout>
  );
};

export default ResidentProfile;
