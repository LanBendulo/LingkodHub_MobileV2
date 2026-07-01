// Provider Mock Data for complete workflow demonstration

export const mockBookingsProvider = [
  {
    id: 'BK-2026-001',
    resident: {
      name: 'Maria Santos',
      avatar: 'https://ui-avatars.com/api/?name=Maria+Santos&background=2563eb&color=fff',
      phone: '+63 912 345 6789',
      email: 'maria.santos@email.com',
    },
    service: {
      name: 'Leak Repair',
      category: 'Plumbing',
      icon: 'bi-droplet-fill',
    },
    date: '2026-07-05',
    time: '10:00 AM',
    address: {
      full: '123 JP Laurel Avenue, Poblacion District, Davao City 8000',
      house: '123',
      street: 'JP Laurel Avenue',
      barangay: 'Poblacion District',
      city: 'Davao City',
      postal: '8000',
    },
    problemDescription: 'My kitchen sink has been leaking since yesterday. Water is dripping from under the sink basin. The leak seems to be coming from the pipe connection.',
    images: [
      'https://via.placeholder.com/400x300/2563eb/ffffff?text=Leak+Photo+1',
      'https://via.placeholder.com/400x300/3b82f6/ffffff?text=Leak+Photo+2',
    ],
    pricing: {
      suggested: 350,
      provider: 370,
      duration: '1-2 hours',
    },
    status: 'pending',
    createdAt: '2026-07-01T14:30:00',
    updatedAt: '2026-07-01T14:30:00',
  },
  {
    id: 'BK-2026-002',
    resident: {
      name: 'Pedro Cruz',
      avatar: 'https://ui-avatars.com/api/?name=Pedro+Cruz&background=2563eb&color=fff',
      phone: '+63 923 456 7890',
      email: 'pedro.cruz@email.com',
    },
    service: {
      name: 'Drain Unclogging',
      category: 'Plumbing',
      icon: 'bi-droplet-fill',
    },
    date: '2026-07-05',
    time: '02:00 PM',
    address: {
      full: '456 Roxas Avenue, Buhangin, Davao City 8000',
      house: '456',
      street: 'Roxas Avenue',
      barangay: 'Buhangin',
      city: 'Davao City',
      postal: '8000',
    },
    problemDescription: 'Bathroom drain is completely clogged. Water not draining at all. Need urgent help.',
    images: [],
    pricing: {
      suggested: 300,
      provider: 300,
      duration: '30-45 mins',
    },
    status: 'confirmed',
    createdAt: '2026-06-29T10:15:00',
    confirmedAt: '2026-06-29T11:00:00',
    updatedAt: '2026-06-29T11:00:00',
  },
  {
    id: 'BK-2026-003',
    resident: {
      name: 'Ana Reyes',
      avatar: 'https://ui-avatars.com/api/?name=Ana+Reyes&background=2563eb&color=fff',
      phone: '+63 934 567 8901',
      email: 'ana.reyes@email.com',
    },
    service: {
      name: 'Pipe Installation',
      category: 'Plumbing',
      icon: 'bi-droplet-fill',
    },
    date: '2026-07-02',
    time: '09:00 AM',
    address: {
      full: '789 Quimpo Boulevard, Talomo, Davao City 8000',
      house: '789',
      street: 'Quimpo Boulevard',
      barangay: 'Talomo',
      city: 'Davao City',
      postal: '8000',
    },
    problemDescription: 'Need to install new water pipes for kitchen renovation. Materials already purchased.',
    images: [
      'https://via.placeholder.com/400x300/10b981/ffffff?text=Pipe+Materials',
    ],
    pricing: {
      suggested: 450,
      provider: 450,
      duration: '2-3 hours',
    },
    status: 'in-progress',
    createdAt: '2026-06-25T16:20:00',
    confirmedAt: '2026-06-25T17:00:00',
    startedAt: '2026-07-02T09:05:00',
    updatedAt: '2026-07-02T09:05:00',
  },
  {
    id: 'BK-2026-004',
    resident: {
      name: 'Carlos Mendoza',
      avatar: 'https://ui-avatars.com/api/?name=Carlos+Mendoza&background=2563eb&color=fff',
      phone: '+63 945 678 9012',
      email: 'carlos.mendoza@email.com',
    },
    service: {
      name: 'Faucet Replacement',
      category: 'Plumbing',
      icon: 'bi-droplet-fill',
    },
    date: '2026-06-28',
    time: '11:00 AM',
    address: {
      full: '321 Bolton Street, Agdao, Davao City 8000',
      house: '321',
      street: 'Bolton Street',
      barangay: 'Agdao',
      city: 'Davao City',
      postal: '8000',
    },
    problemDescription: 'Old faucet is broken and leaking. Need replacement with new faucet I purchased.',
    images: [],
    pricing: {
      suggested: 250,
      provider: 250,
      duration: '30 mins',
    },
    status: 'completed',
    createdAt: '2026-06-20T08:45:00',
    confirmedAt: '2026-06-20T09:30:00',
    startedAt: '2026-06-28T11:05:00',
    completedAt: '2026-06-28T11:35:00',
    updatedAt: '2026-06-28T11:35:00',
    review: {
      rating: 5,
      comment: 'Excellent service! Very professional and quick. Fixed everything perfectly. Highly recommend!',
      date: '2026-06-28T12:00:00',
    },
  },
  {
    id: 'BK-2026-005',
    resident: {
      name: 'Lisa Garcia',
      avatar: 'https://ui-avatars.com/api/?name=Lisa+Garcia&background=2563eb&color=fff',
      phone: '+63 956 789 0123',
      email: 'lisa.garcia@email.com',
    },
    service: {
      name: 'Toilet Repair',
      category: 'Plumbing',
      icon: 'bi-droplet-fill',
    },
    date: '2026-06-15',
    time: '03:00 PM',
    address: {
      full: '654 Pichon Street, Poblacion, Davao City 8000',
      house: '654',
      street: 'Pichon Street',
      barangay: 'Poblacion',
      city: 'Davao City',
      postal: '8000',
    },
    problemDescription: 'Toilet keeps running water. Flush mechanism not working properly.',
    images: [],
    pricing: {
      suggested: 280,
      provider: 280,
      duration: '45 mins',
    },
    status: 'declined',
    createdAt: '2026-06-10T13:20:00',
    declinedAt: '2026-06-10T14:00:00',
    declinedReason: 'Schedule conflict - fully booked',
    updatedAt: '2026-06-10T14:00:00',
  },
  {
    id: 'BK-2026-006',
    resident: {
      name: 'Roberto Tan',
      avatar: 'https://ui-avatars.com/api/?name=Roberto+Tan&background=2563eb&color=fff',
      phone: '+63 917 890 1234',
      email: 'roberto.tan@email.com',
    },
    service: {
      name: 'Water Heater Installation',
      category: 'Plumbing',
      icon: 'bi-droplet-fill',
    },
    date: '2026-07-06',
    time: '08:00 AM',
    address: {
      full: '987 Davao Street, Matina, Davao City 8000',
      house: '987',
      street: 'Davao Street',
      barangay: 'Matina',
      city: 'Davao City',
      postal: '8000',
    },
    problemDescription: 'Need to install new electric water heater in bathroom. All materials ready.',
    images: [
      'https://via.placeholder.com/400x300/8b5cf6/ffffff?text=Water+Heater',
    ],
    pricing: {
      suggested: 500,
      provider: 550,
      duration: '2-3 hours',
    },
    status: 'confirmed',
    createdAt: '2026-07-01T09:00:00',
    confirmedAt: '2026-07-01T10:15:00',
    updatedAt: '2026-07-01T10:15:00',
  },
];

export const mockProviderServices = [
  {
    id: 1,
    name: 'Leak Repair',
    category: 'Plumbing',
    icon: 'bi-droplet-fill',
    price: 350,
    duration: '1-2 hours',
    active: true,
    bookings: 45,
    rating: 4.8,
  },
  {
    id: 2,
    name: 'Drain Unclogging',
    category: 'Plumbing',
    icon: 'bi-droplet-fill',
    price: 300,
    duration: '30-60 mins',
    active: true,
    bookings: 38,
    rating: 4.9,
  },
  {
    id: 3,
    name: 'Pipe Installation',
    category: 'Plumbing',
    icon: 'bi-droplet-fill',
    price: 450,
    duration: '2-3 hours',
    active: true,
    bookings: 31,
    rating: 4.7,
  },
  {
    id: 4,
    name: 'Faucet Replacement',
    category: 'Plumbing',
    icon: 'bi-droplet-fill',
    price: 250,
    duration: '30 mins',
    active: true,
    bookings: 52,
    rating: 4.9,
  },
  {
    id: 5,
    name: 'Toilet Repair',
    category: 'Plumbing',
    icon: 'bi-droplet-fill',
    price: 280,
    duration: '45 mins',
    active: true,
    bookings: 29,
    rating: 4.6,
  },
  {
    id: 6,
    name: 'Water Heater Installation',
    category: 'Plumbing',
    icon: 'bi-droplet-fill',
    price: 550,
    duration: '2-3 hours',
    active: false,
    bookings: 15,
    rating: 4.8,
  },
];

export const mockProviderAvailability = {
  monday: { available: true, startTime: '08:00', endTime: '17:00', breakStart: '12:00', breakEnd: '13:00' },
  tuesday: { available: true, startTime: '08:00', endTime: '17:00', breakStart: '12:00', breakEnd: '13:00' },
  wednesday: { available: true, startTime: '08:00', endTime: '17:00', breakStart: '12:00', breakEnd: '13:00' },
  thursday: { available: true, startTime: '08:00', endTime: '17:00', breakStart: '12:00', breakEnd: '13:00' },
  friday: { available: true, startTime: '08:00', endTime: '17:00', breakStart: '12:00', breakEnd: '13:00' },
  saturday: { available: true, startTime: '09:00', endTime: '15:00', breakStart: '', breakEnd: '' },
  sunday: { available: false, startTime: '', endTime: '', breakStart: '', breakEnd: '' },
};

export const mockProviderReviews = [
  {
    id: 1,
    resident: {
      name: 'Carlos Mendoza',
      avatar: 'https://ui-avatars.com/api/?name=Carlos+Mendoza&background=2563eb&color=fff',
    },
    service: 'Faucet Replacement',
    rating: 5,
    comment: 'Excellent service! Very professional and quick. Fixed everything perfectly. Highly recommend!',
    date: '2026-06-28',
    bookingId: 'BK-2026-004',
  },
  {
    id: 2,
    resident: {
      name: 'Maria Santos',
      avatar: 'https://ui-avatars.com/api/?name=Maria+Santos&background=2563eb&color=fff',
    },
    service: 'Leak Repair',
    rating: 5,
    comment: 'Great work! Arrived on time and fixed the leak quickly. Very clean and professional.',
    date: '2026-06-20',
    bookingId: 'BK-2026-007',
  },
  {
    id: 3,
    resident: {
      name: 'Pedro Cruz',
      avatar: 'https://ui-avatars.com/api/?name=Pedro+Cruz&background=2563eb&color=fff',
    },
    service: 'Drain Unclogging',
    rating: 4,
    comment: 'Good service overall. Took a bit longer than expected but got the job done well.',
    date: '2026-06-15',
    bookingId: 'BK-2026-008',
  },
];

// Helper functions
export const getBookingsByStatus = (status) => {
  return mockBookingsProvider.filter(b => b.status === status);
};

export const getTodaysBookings = () => {
  const today = new Date().toISOString().split('T')[0];
  return mockBookingsProvider.filter(b => b.date === today);
};

export const getUpcomingBookings = () => {
  const today = new Date();
  return mockBookingsProvider
    .filter(b => b.status === 'confirmed' && new Date(b.date) >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date));
};

export const calculateProviderStats = (bookings = mockBookingsProvider) => {
  const completed = bookings.filter(b => b.status === 'completed');
  const pending = bookings.filter(b => b.status === 'pending');
  const confirmed = bookings.filter(b => b.status === 'confirmed');
  const inProgress = bookings.filter(b => b.status === 'in-progress');
  
  const totalEarnings = completed.reduce((sum, b) => sum + b.pricing.provider, 0);
  const averageRating = completed
    .filter(b => b.review)
    .reduce((sum, b) => sum + b.review.rating, 0) / (completed.filter(b => b.review).length || 1);
  
  const totalRequests = bookings.filter(b => ['confirmed', 'completed'].includes(b.status)).length;
  const acceptanceRate = totalRequests > 0 
    ? ((totalRequests / (totalRequests + bookings.filter(b => b.status === 'declined').length)) * 100).toFixed(0)
    : 0;

  return {
    completedJobs: completed.length,
    pendingRequests: pending.length,
    confirmedBookings: confirmed.length,
    inProgress: inProgress.length,
    totalEarnings,
    averageRating: averageRating.toFixed(1),
    acceptanceRate,
    responseTime: '15 mins',
  };
};
