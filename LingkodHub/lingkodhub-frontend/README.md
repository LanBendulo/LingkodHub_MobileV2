# LingkodHub Frontend

A modern, responsive React-based frontend for LingkodHub - a centralized platform for home service booking and management with service demand trend analytics for Davao City.

## 🚀 Features

### User Roles
- **Residents**: Browse services, book providers, manage bookings, leave reviews
- **Service Providers**: Manage bookings, availability, services, and business analytics
- **Administrators**: Monitor platform activity, view demand analytics, manage users and providers

### Key Features
- ✅ Modern SaaS-style UI with Bootstrap 5
- ✅ Fully responsive mobile-first design
- ✅ Role-based dashboards and navigation
- ✅ Real-time booking management
- ✅ Comprehensive analytics and reporting
- ✅ Provider ratings and reviews system
- ✅ Service demand trend analytics
- ✅ Multi-step booking wizard
- ✅ Calendar and availability management

## 🛠️ Tech Stack

- **React 19.2.6** - UI library
- **Vite 8.0.12** - Build tool
- **React Router DOM 7.6.1** - Routing
- **Bootstrap 5.3.3** - CSS framework
- **Bootstrap Icons 1.11.3** - Icon library
- **Axios 1.7.2** - HTTP client
- **Chart.js 4.4.3** - Data visualization
- **React Chart.js 2 5.2.0** - Chart.js React wrapper

## 📁 Project Structure

```
lingkodhub-frontend/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images, fonts, static files
│   ├── components/        # Reusable components
│   │   ├── common/       # Shared components
│   │   ├── resident/     # Resident-specific components
│   │   ├── provider/     # Provider-specific components
│   │   └── admin/        # Admin-specific components
│   ├── layouts/          # Layout components
│   │   ├── PublicLayout.jsx
│   │   └── DashboardLayout.jsx
│   ├── pages/            # Page components
│   │   ├── public/       # Landing, Login, Register
│   │   ├── resident/     # Resident portal pages
│   │   ├── provider/     # Provider portal pages
│   │   └── admin/        # Admin portal pages
│   ├── context/          # React Context
│   │   └── AuthContext.jsx
│   ├── data/             # Mock data
│   │   └── mockData.js
│   ├── services/         # API services (for future backend integration)
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Utility functions
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm 9.x or higher

### Installation

1. **Navigate to the frontend directory:**
   ```bash
   cd LingkodHub/lingkodhub-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 🎯 Available Pages

### Public Pages (5/5) ✅
- ✅ Landing Page - `/`
- ✅ Login - `/login`
- ✅ Register Resident - `/register/resident`
- ✅ Register Provider - `/register/provider`
- ✅ Forgot Password - `/forgot-password`

### Resident Portal (9/9) ✅
- ✅ Dashboard - `/resident/dashboard`
- ✅ Find Services - `/resident/find-services`
- ✅ Provider Directory - `/resident/providers`
- ✅ Provider Profile - `/resident/provider/:id`
- ✅ Booking Wizard - `/resident/booking/:step?`
- ✅ My Bookings - `/resident/bookings`
- ✅ Reviews - `/resident/reviews`
- ✅ Notifications - `/resident/notifications`
- ✅ Profile - `/resident/profile`

### Provider Portal (7/7) ✅
- ✅ Dashboard - `/provider/dashboard`
- ✅ Booking Requests - `/provider/requests`
- ✅ Availability Calendar - `/provider/calendar`
- ✅ Services Management - `/provider/services`
- ✅ Reviews - `/provider/reviews`
- ✅ Analytics - `/provider/analytics`
- ✅ Profile - `/provider/profile`

### Admin Portal (8/8) ✅
- ✅ Dashboard - `/admin/dashboard`
- ✅ Demand Trend Analytics - `/admin/analytics`
- ✅ User Management - `/admin/users`
- ✅ Provider Management - `/admin/providers`
- ✅ Booking Monitoring - `/admin/bookings`
- ✅ Reports - `/admin/reports`
- ✅ Notifications - `/admin/notifications`
- ✅ Settings - `/admin/settings`

## 🧪 Testing the Application

### Demo Login Credentials

The login page includes quick demo buttons for easy testing:

**Resident Account:**
- Email: `resident@demo.com`
- Password: `demo123`
- Role: Resident

**Provider Account:**
- Email: `provider@demo.com`
- Password: `demo123`
- Role: Service Provider

**Admin Account:**
- Email: `admin@demo.com`
- Password: `demo123`
- Role: Administrator

You can also use any email/password combination - authentication is mocked for demonstration purposes.

## 🎨 Design System

### Color Palette
- **Primary**: #2563eb (Blue)
- **Success**: #10b981 (Green)
- **Warning**: #f59e0b (Orange)
- **Danger**: #ef4444 (Red)
- **Info**: #3b82f6 (Light Blue)
- **Secondary**: #64748b (Gray)

### Typography
- **Font Family**: System fonts (-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto')
- **Headings**: 600 weight, reduced line height
- **Body**: 400 weight, 1.6 line height

### Components
All components follow Bootstrap 5 conventions with custom enhancements:
- Cards with hover effects
- Custom styled forms
- Animated buttons
- Responsive tables
- Custom badges and alerts

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 991px
- **Desktop**: 992px - 1199px
- **Large Desktop**: ≥ 1200px

## 🔄 State Management

Currently using React Context API for:
- Authentication state
- User profile management
- Session persistence via localStorage

## 📊 Mock Data

All data is currently mocked in `src/data/mockData.js`:
- Service categories
- Barangays in Davao City
- Mock providers
- Mock bookings
- Reviews
- Demand analytics
- User data
- Notifications

## 🔌 Backend Integration (Future)

To connect to a backend API:

1. Create API service files in `src/services/`
2. Replace mock data imports with API calls
3. Update `AuthContext` to use real authentication
4. Configure Axios base URL in environment variables

Example:
```javascript
// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
});

export default api;
```

## 🌐 Environment Variables

Create a `.env` file in the frontend root:

```env
VITE_API_URL=http://localhost:8000/api
VITE_APP_NAME=LingkodHub
```

## 📦 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## 🐛 Known Issues & Limitations

1. **Mock Data**: All data is currently mocked. Backend integration pending.
2. **Authentication**: Login is simulated. Real authentication needs to be implemented.
3. **File Uploads**: Avatar uploads are placeholders. File handling needs implementation.
4. **Real-time Updates**: WebSocket/polling for real-time notifications not implemented.
5. **Chart Visualizations**: Chart.js is installed but charts need to be implemented.
6. **Payment Integration**: Payment processing is not implemented.

## 🚀 Future Enhancements

- [ ] Connect to Laravel backend API
- [ ] Implement real authentication with JWT
- [ ] Add real-time notifications with WebSocket
- [ ] Implement Chart.js visualizations
- [ ] Add payment gateway integration (PayMongo, GCash)
- [ ] Implement file upload for avatars and documents
- [ ] Add chat/messaging between residents and providers
- [ ] Implement push notifications
- [ ] Add Progressive Web App (PWA) support
- [ ] Implement advanced search and filters
- [ ] Add map integration for location services
- [ ] Implement booking reminders

## 🤝 Contributing

This is a capstone project. For contributions:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is part of an academic capstone project.

## 👥 Team

**Project**: LingkodHub  
**Focus**: Home Service Booking Platform for Davao City  
**Technology**: React + Vite Frontend (Laravel Backend - separate repository)

## 📞 Support

For questions or issues:
- Email: support@lingkodhub.com
- GitHub Issues: [Create an issue]

## 🎓 Academic Context

This project is developed as part of a capstone project focusing on:
- Service demand trend analytics
- Home service booking optimization
- User experience design
- Modern web development practices
- Responsive design principles

---

**Built with ❤️ for Davao City residents and service providers**
