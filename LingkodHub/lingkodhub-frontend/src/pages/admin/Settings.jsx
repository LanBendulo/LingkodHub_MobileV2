import { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import '../admin/AdminPages.css';

const Settings = () => {
  const [activeSection, setActiveSection] = useState('general');
  const [settings, setSettings] = useState({
    siteName: 'LingkodHub',
    contactEmail: 'support@lingkodhub.com',
    supportPhone: '+63 912 345 6789',
    platformFee: 50,
    maxBookingsPerDay: 10,
    bookingCancellationWindow: 24,
    enableNotifications: true,
    emailAlerts: true,
    smsAlerts: false,
    maintenanceMode: false,
    allowProviderRegistration: true,
    requireProviderVerification: true,
    minProviderRating: 4.0,
    analyticsTracking: true,
    publicDashboard: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Settings saved successfully!');
  };

  const settingsSections = [
    { id: 'general', label: 'General', icon: 'bi-gear' },
    { id: 'platform', label: 'Platform Settings', icon: 'bi-sliders' },
    { id: 'permissions', label: 'User Permissions', icon: 'bi-shield-check' },
    { id: 'notifications', label: 'Notifications', icon: 'bi-bell' },
    { id: 'analytics', label: 'Analytics', icon: 'bi-graph-up' },
    { id: 'system', label: 'System Preferences', icon: 'bi-cpu' },
  ];

  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="page-header" style={{ marginBottom: '2rem' }}>
        <div>
          <div className="breadcrumb-nav">
            <i className="bi bi-house-door"></i>
            <span>System</span>
            <i className="bi bi-chevron-right"></i>
            <span>Settings</span>
          </div>
          <h1 className="page-title">Platform Settings</h1>
          <p className="page-subtitle">Manage system configuration and preferences</p>
        </div>
      </div>

      <div className="row g-4">
        {/* Settings Navigation */}
        <div className="col-lg-3">
          <div className="settings-card">
            <div className="settings-card-header">
              <h3 className="settings-card-title">Configuration</h3>
            </div>
            <div style={{ padding: '0.75rem' }}>
              {settingsSections.map((section) => (
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

          {/* System Info Card */}
          <div className="settings-card" style={{ marginTop: '1rem' }}>
            <div className="settings-card-header">
              <h3 className="settings-card-title">System Info</h3>
            </div>
            <div className="settings-card-body">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.875rem', fontSize: '0.875rem' }}>
                <span style={{ color: '#64748b', fontWeight: '500' }}>Version</span>
                <span style={{ fontWeight: '700', color: '#0f172a' }}>1.0.0</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.875rem', fontSize: '0.875rem' }}>
                <span style={{ color: '#64748b', fontWeight: '500' }}>Environment</span>
                <span className="status-badge status-active">Production</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                <span style={{ color: '#64748b', fontWeight: '500' }}>Last Updated</span>
                <span style={{ fontWeight: '700', color: '#0f172a' }}>2026-06-22</span>
              </div>
            </div>
          </div>
        </div>

        {/* Settings Content */}
        <div className="col-lg-9">
          <form onSubmit={handleSubmit}>
            {/* General Settings */}
            {activeSection === 'general' && (
              <div className="settings-card">
                <div className="settings-card-header">
                  <h3 className="settings-card-title">General Settings</h3>
                </div>
                <div className="settings-card-body">
                  <div className="form-group-enhanced">
                    <label className="form-label-enhanced">Site Name</label>
                    <input
                      type="text"
                      className="form-input-enhanced"
                      value={settings.siteName}
                      onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                    />
                  </div>
                  <div className="form-group-enhanced">
                    <label className="form-label-enhanced">Contact Email</label>
                    <input
                      type="email"
                      className="form-input-enhanced"
                      value={settings.contactEmail}
                      onChange={(e) => setSettings({...settings, contactEmail: e.target.value})}
                    />
                  </div>
                  <div className="form-group-enhanced">
                    <label className="form-label-enhanced">Support Phone</label>
                    <input
                      type="tel"
                      className="form-input-enhanced"
                      value={settings.supportPhone}
                      onChange={(e) => setSettings({...settings, supportPhone: e.target.value})}
                    />
                  </div>
                  <button type="submit" className="action-btn action-btn-primary" style={{ width: 'auto', padding: '0.625rem 1.5rem', height: 'auto' }}>
                    <i className="bi bi-check-circle me-2"></i>
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* Platform Settings */}
            {activeSection === 'platform' && (
              <div className="settings-card">
                <div className="settings-card-header">
                  <h3 className="settings-card-title">Platform Settings</h3>
                </div>
                <div className="settings-card-body">
                  <div className="form-group-enhanced">
                    <label className="form-label-enhanced">Platform Fee (₱)</label>
                    <input
                      type="number"
                      className="form-input-enhanced"
                      value={settings.platformFee}
                      onChange={(e) => setSettings({...settings, platformFee: parseInt(e.target.value)})}
                    />
                    <small style={{ display: 'block', marginTop: '0.375rem', color: '#64748b', fontSize: '0.8125rem' }}>
                      Fee charged per completed booking transaction
                    </small>
                  </div>
                  <div className="form-group-enhanced">
                    <label className="form-label-enhanced">Max Bookings Per Day</label>
                    <input
                      type="number"
                      className="form-input-enhanced"
                      value={settings.maxBookingsPerDay}
                      onChange={(e) => setSettings({...settings, maxBookingsPerDay: parseInt(e.target.value)})}
                    />
                  </div>
                  <div className="form-group-enhanced">
                    <label className="form-label-enhanced">Booking Cancellation Window (hours)</label>
                    <input
                      type="number"
                      className="form-input-enhanced"
                      value={settings.bookingCancellationWindow}
                      onChange={(e) => setSettings({...settings, bookingCancellationWindow: parseInt(e.target.value)})}
                    />
                    <small style={{ display: 'block', marginTop: '0.375rem', color: '#64748b', fontSize: '0.8125rem' }}>
                      Minimum hours before service start time to allow cancellation
                    </small>
                  </div>
                  <button type="submit" className="action-btn action-btn-primary" style={{ width: 'auto', padding: '0.625rem 1.5rem', height: 'auto' }}>
                    <i className="bi bi-check-circle me-2"></i>
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* User Permissions */}
            {activeSection === 'permissions' && (
              <div className="settings-card">
                <div className="settings-card-header">
                  <h3 className="settings-card-title">User Permissions</h3>
                </div>
                <div className="settings-card-body">
                  <div className="form-switch-enhanced">
                    <div>
                      <div className="form-switch-label">Allow Provider Registration</div>
                      <small style={{ color: '#64748b', fontSize: '0.8125rem' }}>Enable public provider sign-up</small>
                    </div>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={settings.allowProviderRegistration}
                      onChange={(e) => setSettings({...settings, allowProviderRegistration: e.target.checked})}
                    />
                  </div>
                  <div className="form-switch-enhanced">
                    <div>
                      <div className="form-switch-label">Require Provider Verification</div>
                      <small style={{ color: '#64748b', fontSize: '0.8125rem' }}>Mandate admin approval before providers go live</small>
                    </div>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={settings.requireProviderVerification}
                      onChange={(e) => setSettings({...settings, requireProviderVerification: e.target.checked})}
                    />
                  </div>
                  <div className="form-group-enhanced">
                    <label className="form-label-enhanced">Minimum Provider Rating</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="5"
                      className="form-input-enhanced"
                      value={settings.minProviderRating}
                      onChange={(e) => setSettings({...settings, minProviderRating: parseFloat(e.target.value)})}
                    />
                    <small style={{ display: 'block', marginTop: '0.375rem', color: '#64748b', fontSize: '0.8125rem' }}>
                      Minimum rating required to remain active on platform
                    </small>
                  </div>
                  <button type="submit" className="action-btn action-btn-primary" style={{ width: 'auto', padding: '0.625rem 1.5rem', height: 'auto' }}>
                    <i className="bi bi-check-circle me-2"></i>
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* Notifications */}
            {activeSection === 'notifications' && (
              <div className="settings-card">
                <div className="settings-card-header">
                  <h3 className="settings-card-title">Notification Preferences</h3>
                </div>
                <div className="settings-card-body">
                  <div className="form-switch-enhanced">
                    <div>
                      <div className="form-switch-label">Enable Notifications</div>
                      <small style={{ color: '#64748b', fontSize: '0.8125rem' }}>Master switch for all notifications</small>
                    </div>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={settings.enableNotifications}
                      onChange={(e) => setSettings({...settings, enableNotifications: e.target.checked})}
                    />
                  </div>
                  <div className="form-switch-enhanced">
                    <div>
                      <div className="form-switch-label">Email Alerts</div>
                      <small style={{ color: '#64748b', fontSize: '0.8125rem' }}>Send email notifications for critical events</small>
                    </div>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={settings.emailAlerts}
                      onChange={(e) => setSettings({...settings, emailAlerts: e.target.checked})}
                      disabled={!settings.enableNotifications}
                    />
                  </div>
                  <div className="form-switch-enhanced">
                    <div>
                      <div className="form-switch-label">SMS Alerts</div>
                      <small style={{ color: '#64748b', fontSize: '0.8125rem' }}>Send SMS notifications (requires SMS gateway)</small>
                    </div>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={settings.smsAlerts}
                      onChange={(e) => setSettings({...settings, smsAlerts: e.target.checked})}
                      disabled={!settings.enableNotifications}
                    />
                  </div>
                  <button type="submit" className="action-btn action-btn-primary" style={{ width: 'auto', padding: '0.625rem 1.5rem', height: 'auto' }}>
                    <i className="bi bi-check-circle me-2"></i>
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* Analytics */}
            {activeSection === 'analytics' && (
              <div className="settings-card">
                <div className="settings-card-header">
                  <h3 className="settings-card-title">Analytics Settings</h3>
                </div>
                <div className="settings-card-body">
                  <div className="form-switch-enhanced">
                    <div>
                      <div className="form-switch-label">Analytics Tracking</div>
                      <small style={{ color: '#64748b', fontSize: '0.8125rem' }}>Enable platform usage and demand analytics tracking</small>
                    </div>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={settings.analyticsTracking}
                      onChange={(e) => setSettings({...settings, analyticsTracking: e.target.checked})}
                    />
                  </div>
                  <div className="form-switch-enhanced">
                    <div>
                      <div className="form-switch-label">Public Dashboard</div>
                      <small style={{ color: '#64748b', fontSize: '0.8125rem' }}>Make analytics dashboard publicly accessible</small>
                    </div>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={settings.publicDashboard}
                      onChange={(e) => setSettings({...settings, publicDashboard: e.target.checked})}
                    />
                  </div>
                  <button type="submit" className="action-btn action-btn-primary" style={{ width: 'auto', padding: '0.625rem 1.5rem', height: 'auto' }}>
                    <i className="bi bi-check-circle me-2"></i>
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* System Preferences */}
            {activeSection === 'system' && (
              <>
                <div className="settings-card" style={{ marginBottom: '1.5rem' }}>
                  <div className="settings-card-header">
                    <h3 className="settings-card-title">System Preferences</h3>
                  </div>
                  <div className="settings-card-body">
                    <div className="form-switch-enhanced">
                      <div>
                        <div className="form-switch-label">Maintenance Mode</div>
                        <small style={{ color: '#64748b', fontSize: '0.8125rem' }}>Temporarily disable platform for maintenance</small>
                      </div>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={settings.maintenanceMode}
                        onChange={(e) => setSettings({...settings, maintenanceMode: e.target.checked})}
                      />
                    </div>
                    <button type="submit" className="action-btn action-btn-primary" style={{ width: 'auto', padding: '0.625rem 1.5rem', height: 'auto' }}>
                      <i className="bi bi-check-circle me-2"></i>
                      Save Changes
                    </button>
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="settings-card" style={{ borderColor: '#fee2e2' }}>
                  <div className="settings-card-header" style={{ background: 'linear-gradient(180deg, #fef2f2 0%, #ffffff 100%)', borderBottom: '1px solid #fee2e2' }}>
                    <h3 className="settings-card-title" style={{ color: '#dc2626' }}>
                      <i className="bi bi-exclamation-triangle me-2"></i>
                      Danger Zone
                    </h3>
                  </div>
                  <div className="settings-card-body">
                    <div style={{ marginBottom: '1.25rem' }}>
                      <div style={{ fontWeight: '600', fontSize: '0.875rem', color: '#0f172a', marginBottom: '0.375rem' }}>
                        Clear Platform Cache
                      </div>
                      <p style={{ fontSize: '0.8125rem', color: '#64748b', marginBottom: '0.75rem' }}>
                        Remove all cached data to resolve performance issues. This action is reversible.
                      </p>
                      <button
                        type="button"
                        className="action-btn-group"
                        style={{
                          padding: '0.625rem 1.25rem',
                          border: '1px solid #dc2626',
                          borderRadius: '0.5rem',
                          background: 'white',
                          color: '#dc2626',
                          fontWeight: '700',
                          fontSize: '0.875rem',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                        onMouseEnter={(e) => e.target.style.background = 'rgba(220, 38, 38, 0.05)'}
                        onMouseLeave={(e) => e.target.style.background = 'white'}
                      >
                        <i className="bi bi-trash me-2"></i>
                        Clear Cache
                      </button>
                    </div>
                    <div>
                      <div style={{ fontWeight: '600', fontSize: '0.875rem', color: '#0f172a', marginBottom: '0.375rem' }}>
                        Reset Database
                      </div>
                      <p style={{ fontSize: '0.8125rem', color: '#64748b', marginBottom: '0.75rem' }}>
                        <strong style={{ color: '#dc2626' }}>Warning:</strong> This will permanently delete all data and reset the platform to factory settings. This action cannot be undone.
                      </p>
                      <button
                        type="button"
                        className="action-btn-group"
                        style={{
                          padding: '0.625rem 1.25rem',
                          border: '1px solid #dc2626',
                          borderRadius: '0.5rem',
                          background: '#dc2626',
                          color: 'white',
                          fontWeight: '700',
                          fontSize: '0.875rem',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                        onMouseEnter={(e) => e.target.style.background = '#b91c1c'}
                        onMouseLeave={(e) => e.target.style.background = '#dc2626'}
                      >
                        <i className="bi bi-exclamation-triangle me-2"></i>
                        Reset Database
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Settings;
