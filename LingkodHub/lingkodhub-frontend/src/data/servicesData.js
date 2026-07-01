/**
 * Service Categories and Offerings for LingkodHub
 * Used in Provider Registration and throughout the platform
 */

export const serviceCategories = [
  {
    id: 'plumbing',
    name: 'Plumbing',
    icon: 'bi-droplet-fill',
    color: '#2563eb',
    services: [
      { id: 'leak-repair', name: 'Leak Repair', defaultPrice: 350 },
      { id: 'faucet-repair', name: 'Faucet Repair', defaultPrice: 300 },
      { id: 'toilet-repair', name: 'Toilet Repair', defaultPrice: 400 },
      { id: 'drain-cleaning', name: 'Drain Cleaning', defaultPrice: 500 },
      { id: 'pipe-replacement', name: 'Pipe Replacement', defaultPrice: 800 },
      { id: 'water-heater-repair', name: 'Water Heater Repair', defaultPrice: 600 },
      { id: 'sink-installation', name: 'Sink Installation', defaultPrice: 700 },
      { id: 'shower-installation', name: 'Shower Installation', defaultPrice: 1200 },
    ]
  },
  {
    id: 'electrical',
    name: 'Electrical',
    icon: 'bi-lightning-charge-fill',
    color: '#fbbf24',
    services: [
      { id: 'outlet-repair', name: 'Outlet Repair', defaultPrice: 250 },
      { id: 'switch-replacement', name: 'Switch Replacement', defaultPrice: 200 },
      { id: 'lighting-installation', name: 'Lighting Installation', defaultPrice: 500 },
      { id: 'ceiling-fan-installation', name: 'Ceiling Fan Installation', defaultPrice: 800 },
      { id: 'wiring-inspection', name: 'Wiring Inspection', defaultPrice: 600 },
      { id: 'breaker-replacement', name: 'Breaker Replacement', defaultPrice: 400 },
      { id: 'electrical-troubleshooting', name: 'Electrical Troubleshooting', defaultPrice: 500 },
      { id: 'panel-upgrade', name: 'Panel Upgrade', defaultPrice: 3000 },
    ]
  },
  {
    id: 'house-cleaning',
    name: 'House Cleaning',
    icon: 'bi-house-fill',
    color: '#2563eb',
    services: [
      { id: 'general-cleaning', name: 'General Cleaning', defaultPrice: 800 },
      { id: 'deep-cleaning', name: 'Deep Cleaning', defaultPrice: 1500 },
      { id: 'move-in-cleaning', name: 'Move-In Cleaning', defaultPrice: 2000 },
      { id: 'move-out-cleaning', name: 'Move-Out Cleaning', defaultPrice: 2000 },
      { id: 'kitchen-cleaning', name: 'Kitchen Cleaning', defaultPrice: 600 },
      { id: 'bathroom-cleaning', name: 'Bathroom Cleaning', defaultPrice: 500 },
      { id: 'window-cleaning', name: 'Window Cleaning', defaultPrice: 400 },
      { id: 'carpet-cleaning', name: 'Carpet Cleaning', defaultPrice: 1000 },
    ]
  },
  {
    id: 'aircon-cleaning',
    name: 'Air Conditioner Cleaning',
    icon: 'bi-snow',
    color: '#2563eb',
    services: [
      { id: 'window-type-cleaning', name: 'Window-Type Cleaning', defaultPrice: 500 },
      { id: 'split-type-cleaning', name: 'Split-Type Cleaning', defaultPrice: 800 },
      { id: 'basic-maintenance', name: 'Basic Maintenance', defaultPrice: 600 },
      { id: 'filter-cleaning', name: 'Filter Cleaning', defaultPrice: 300 },
      { id: 'inspection', name: 'Inspection', defaultPrice: 400 },
      { id: 'freon-recharge', name: 'Freon Recharge', defaultPrice: 1200 },
      { id: 'compressor-repair', name: 'Compressor Repair', defaultPrice: 2000 },
      { id: 'installation', name: 'Installation', defaultPrice: 1500 },
    ]
  }
];

// Helper function to get all services flat
export const getAllServices = () => {
  return serviceCategories.flatMap(category => 
    category.services.map(service => ({
      ...service,
      categoryId: category.id,
      categoryName: category.name,
    }))
  );
};

// Helper function to get services by category
export const getServicesByCategory = (categoryId) => {
  const category = serviceCategories.find(c => c.id === categoryId);
  return category ? category.services : [];
};

// ID Types for verification
export const idTypes = [
  { value: 'national-id', label: 'Philippine National ID' },
  { value: 'drivers-license', label: "Driver's License" },
  { value: 'passport', label: 'Passport' },
  { value: 'umid', label: 'UMID' },
  { value: 'prc-id', label: 'PRC ID' },
  { value: 'postal-id', label: 'Postal ID' },
  { value: 'voters-id', label: "Voter's ID" },
];
