import { Link } from 'react-router-dom';

const ProviderCard = ({ provider, linkPrefix = '/resident' }) => {
  return (
    <div className="card h-100 border-0 shadow-sm">
      <div className="card-body">
        <div className="d-flex align-items-start mb-3">
          <img
            src={provider.avatar}
            alt={provider.name}
            className="rounded-circle me-3"
            width="60"
            height="60"
          />
          <div className="flex-grow-1">
            <h5 className="mb-1">
              {provider.name}
              {provider.verified && (
                <i className="bi bi-patch-check-fill text-primary ms-2" title="Verified"></i>
              )}
            </h5>
            <div className="text-warning mb-1">
              <i className="bi bi-star-fill"></i>
              <span className="text-dark ms-1 fw-semibold">{provider.rating}</span>
              <span className="text-muted ms-1">({provider.reviews} reviews)</span>
            </div>
            <small className="text-muted">
              <i className="bi bi-geo-alt me-1"></i>
              {provider.location}
            </small>
          </div>
        </div>

        <div className="mb-3">
          {provider.services.map((service, index) => (
            <span key={index} className="badge bg-light text-dark me-1 mb-1 border">
              {service}
            </span>
          ))}
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3 small text-muted">
          <div>
            <i className="bi bi-check-circle me-1"></i>
            {provider.completedJobs} jobs
          </div>
          <div>
            <i className="bi bi-clock me-1"></i>
            {provider.responseTime}
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <div>
            <span className="text-muted small">Starting at</span>
            <div className="fs-5 fw-bold text-primary">₱{provider.hourlyRate}/hr</div>
          </div>
          <Link
            to={`${linkPrefix}/provider/${provider.id}`}
            className="btn btn-primary"
          >
            View Profile
          </Link>
        </div>

        {provider.availability && (
          <div className="mt-3 pt-3 border-top">
            <span className={`badge ${
              provider.availability === 'Available Now'
                ? 'bg-success'
                : 'bg-warning'
            }`}>
              {provider.availability}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProviderCard;
