import { useState } from 'react';
import ProviderLayout from '../../layouts/ProviderLayout';
import './ProviderPages.css';

const AvailabilityCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [timeSlots, setTimeSlots] = useState([
    { time: '8:00 AM', available: true, booked: false },
    { time: '9:00 AM', available: true, booked: true },
    { time: '10:00 AM', available: true, booked: false },
    { time: '11:00 AM', available: false, booked: false },
    { time: '12:00 PM', available: true, booked: false },
    { time: '1:00 PM', available: true, booked: false },
    { time: '2:00 PM', available: true, booked: true },
    { time: '3:00 PM', available: true, booked: false },
    { time: '4:00 PM', available: true, booked: false },
    { time: '5:00 PM', available: false, booked: false },
  ]);

  const availableSlots = timeSlots.filter(s => s.available && !s.booked).length;
  const bookedSlots = timeSlots.filter(s => s.booked).length;
  const blockedSlots = timeSlots.filter(s => !s.available).length;
  const totalSlots = timeSlots.length;


  const toggleSlot = (index) => {
    const newSlots = [...timeSlots];
    if (!newSlots[index].booked) {
      newSlots[index].available = !newSlots[index].available;
      setTimeSlots(newSlots);
    }
  };

  const enableAllSlots = () => {
    setTimeSlots(timeSlots.map(slot => ({ ...slot, available: !slot.booked ? true : slot.available })));
  };

  const disableAllSlots = () => {
    setTimeSlots(timeSlots.map(slot => ({ ...slot, available: slot.booked ? slot.available : false })));
  };

  return (
    <ProviderLayout>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <div className="breadcrumb-nav">
            <i className="bi bi-house-door"></i>
            <span>Operations</span>
            <i className="bi bi-chevron-right"></i>
            <span>Availability Calendar</span>
          </div>
          <h1 className="page-title">Availability Calendar</h1>
          <p className="page-subtitle">Manage your schedule and time slot availability</p>
        </div>
        <div className="header-actions-right">
          <input
            type="date"
            className="filter-select"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={{ width: 'auto', minWidth: '180px' }}
          />
        </div>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        <div className="kpi-card">
          <div className="kpi-header">
            <div className="kpi-icon bg-primary-soft">
              <i className="bi bi-calendar-check-fill text-primary"></i>
            </div>
          </div>
          <div className="kpi-body">
            <div className="kpi-value">{availableSlots}</div>
            <div className="kpi-label">Available Slots</div>
            <div className="kpi-meta">
              <span className="meta-item">
                <i className="bi bi-clock"></i>
                Open for booking
              </span>
            </div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <div className="kpi-icon bg-success-soft">
              <i className="bi bi-bookmark-check-fill text-success"></i>
            </div>
          </div>
          <div className="kpi-body">
            <div className="kpi-value">{bookedSlots}</div>
            <div className="kpi-label">Booked Slots</div>
            <div className="kpi-meta">
              <span className="meta-item">
                <i className="bi bi-person-check"></i>
                Confirmed bookings
              </span>
            </div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <div className="kpi-icon bg-warning-soft">
              <i className="bi bi-slash-circle-fill text-warning"></i>
            </div>
          </div>
          <div className="kpi-body">
            <div className="kpi-value">{blockedSlots}</div>
            <div className="kpi-label">Blocked Slots</div>
            <div className="kpi-meta">
              <span className="meta-item">
                <i className="bi bi-lock"></i>
                Unavailable
              </span>
            </div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <div className="kpi-icon bg-info-soft">
              <i className="bi bi-clock-history text-info"></i>
            </div>
          </div>
          <div className="kpi-body">
            <div className="kpi-value">{totalSlots}</div>
            <div className="kpi-label">Total Slots</div>
            <div className="kpi-meta">
              <span className="meta-item">
                <i className="bi bi-calendar3"></i>
                {Math.round((availableSlots / totalSlots) * 100)}% available
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Calendar Section */}
      <div className="analytics-row">
        <div className="analytics-card large">
          <div className="card-header">
            <div>
              <h3 className="card-title">Time Slot Management</h3>
              <p className="card-subtitle">Set your availability for {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </div>
          <div className="card-body">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
              {timeSlots.map((slot, index) => (
                <div
                  key={index}
                  onClick={() => toggleSlot(index)}
                  style={{
                    padding: '1.25rem',
                    background: slot.booked 
                      ? 'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)'
                      : slot.available 
                        ? 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)'
                        : 'linear-gradient(135deg, #fee2e2 0%, #fef2f2 100%)',
                    border: slot.booked
                      ? '2px solid #2563eb'
                      : slot.available
                        ? '1px solid #e2e8f0'
                        : '1px solid #fecaca',
                    borderRadius: '0.75rem',
                    cursor: slot.booked ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    opacity: slot.booked || slot.available ? 1 : 0.7,
                    boxShadow: slot.available && !slot.booked ? '0 1px 3px rgba(0, 0, 0, 0.05)' : 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (!slot.booked) {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = slot.available && !slot.booked ? '0 1px 3px rgba(0, 0, 0, 0.05)' : 'none';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <div style={{ fontSize: '1.125rem', fontWeight: '700', color: '#0f172a', letterSpacing: '-0.02em' }}>
                      {slot.time}
                    </div>
                    {slot.booked ? (
                      <i className="bi bi-bookmark-check-fill" style={{ fontSize: '1.25rem', color: '#2563eb' }}></i>
                    ) : slot.available ? (
                      <i className="bi bi-check-circle-fill" style={{ fontSize: '1.25rem', color: '#10b981' }}></i>
                    ) : (
                      <i className="bi bi-x-circle-fill" style={{ fontSize: '1.25rem', color: '#dc2626' }}></i>
                    )}
                  </div>
                  <div>
                    {slot.booked ? (
                      <span className="status-badge status-confirmed" style={{ fontSize: '0.75rem' }}>
                        <i className="bi bi-lock-fill me-1"></i>
                        Booked
                      </span>
                    ) : slot.available ? (
                      <span className="status-badge status-active" style={{ fontSize: '0.75rem' }}>
                        <i className="bi bi-unlock-fill me-1"></i>
                        Available
                      </span>
                    ) : (
                      <span className="status-badge status-cancelled" style={{ fontSize: '0.75rem' }}>
                        <i className="bi bi-slash-circle me-1"></i>
                        Blocked
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="analytics-card small">
          <div className="card-header">
            <h3 className="card-title">Quick Actions</h3>
          </div>
          <div className="card-body">
            <div className="quick-actions">
              <button onClick={enableAllSlots} className="action-button primary">
                <div className="action-icon-title">
                  <i className="bi bi-check-circle"></i>
                  <span className="action-title">Enable All Slots</span>
                </div>
                <span className="action-desc">Make all slots available for booking</span>
              </button>
              <button onClick={disableAllSlots} className="action-button secondary">
                <div className="action-icon-title">
                  <i className="bi bi-x-circle"></i>
                  <span className="action-title">Disable All Slots</span>
                </div>
                <span className="action-desc">Block all time slots</span>
                </button>
              <button className="action-button tertiary">
                <div className="action-icon-title">
                  <i className="bi bi-calendar-week"></i>
                  <span className="action-title">Copy to Week</span>
                </div>
                <span className="action-desc">Replicate schedule for next 7 days</span>
              </button>
              <button className="action-button quaternary">
                <div className="action-icon-title">
                  <i className="bi bi-arrow-clockwise"></i>
                  <span className="action-title">Reset</span>
                </div>
                <span className="action-desc">Restore default availability</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Legend and Tips */}
      <div className="section-card">
        <div className="card-header">
          <h3 className="card-title">
            <i className="bi bi-info-circle me-2"></i>
            Calendar Legend & Tips
          </h3>
        </div>
        <div className="card-body">
          <div className="row g-4">
            <div className="col-md-6">
              <h6 style={{ fontSize: '0.875rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.875rem', letterSpacing: '-0.01em' }}>
                Slot Status
              </h6>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <i className="bi bi-check-circle-fill" style={{ fontSize: '1.25rem', color: '#10b981' }}></i>
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#0f172a' }}>Available</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Open for client bookings</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <i className="bi bi-bookmark-check-fill" style={{ fontSize: '1.25rem', color: '#2563eb' }}></i>
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#0f172a' }}>Booked</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Confirmed appointment</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <i className="bi bi-x-circle-fill" style={{ fontSize: '1.25rem', color: '#dc2626' }}></i>
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#0f172a' }}>Blocked</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Not available for booking</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <h6 style={{ fontSize: '0.875rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.875rem', letterSpacing: '-0.01em' }}>
                Pro Tips
              </h6>
              <ul style={{ fontSize: '0.8125rem', color: '#64748b', lineHeight: '1.6', paddingLeft: '1.25rem', margin: 0 }}>
                <li style={{ marginBottom: '0.5rem' }}>Click any available slot to block/unblock it</li>
                <li style={{ marginBottom: '0.5rem' }}>Booked slots cannot be modified</li>
                <li style={{ marginBottom: '0.5rem' }}>Use quick actions to manage multiple slots at once</li>
                <li style={{ marginBottom: '0.5rem' }}>Changes are saved automatically</li>
                <li>Keep your calendar updated to maximize bookings</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ProviderLayout>
  );
};

export default AvailabilityCalendar;
