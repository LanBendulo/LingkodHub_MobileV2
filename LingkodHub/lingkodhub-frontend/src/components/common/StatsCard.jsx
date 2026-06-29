const StatsCard = ({ title, value, change, icon, color = 'primary', trend }) => {
  const colorClass = {
    primary: 'bg-primary',
    success: 'bg-success',
    warning: 'bg-warning',
    danger: 'bg-danger',
    info: 'bg-info',
    secondary: 'bg-secondary',
  }[color];

  const lightColorClass = {
    primary: 'bg-primary-subtle',
    success: 'bg-success-subtle',
    warning: 'bg-warning-subtle',
    danger: 'bg-danger-subtle',
    info: 'bg-info-subtle',
    secondary: 'bg-secondary-subtle',
  }[color];

  return (
    <div className="stats-card">
      <div className={`stats-card-icon ${lightColorClass}`}>
        <i className={`bi ${icon} text-${color}`}></i>
      </div>
      
      <div className="stats-card-title">{title}</div>
      <div className="stats-card-value">{value}</div>
      
      {change !== undefined && (
        <div className={`stats-card-change ${change >= 0 ? 'positive' : 'negative'}`}>
          <i className={`bi bi-arrow-${change >= 0 ? 'up' : 'down'} me-1`}></i>
          {Math.abs(change)}% {trend || 'from last month'}
        </div>
      )}
    </div>
  );
};

export default StatsCard;
