const LoadingSpinner = ({ size = 'md', text = 'Loading...' }) => {
  const sizeClass = {
    sm: 'spinner-border-sm',
    md: '',
    lg: 'spinner-border-lg',
  }[size];

  return (
    <div className="spinner-container">
      <div className="text-center">
        <div className={`spinner-border text-primary ${sizeClass}`} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        {text && <p className="mt-3 text-muted">{text}</p>}
      </div>
    </div>
  );
};

export default LoadingSpinner;
