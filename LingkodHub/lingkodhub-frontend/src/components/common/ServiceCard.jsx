import { Link } from 'react-router-dom';

const ServiceCard = ({ service }) => {
  return (
    <div className="col">
      <div className="card h-100 border-0 shadow-sm hover-shadow-lg transition">
        <div className="card-body text-center p-4">
          <div
            className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
            style={{
              width: '80px',
              height: '80px',
              backgroundColor: `${service.color}15`,
            }}
          >
            <i
              className={`bi ${service.icon} fs-1`}
              style={{ color: service.color }}
            ></i>
          </div>
          <h5 className="card-title mb-2">{service.name}</h5>
          <p className="text-muted small mb-0">Professional service</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
