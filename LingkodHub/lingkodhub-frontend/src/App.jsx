import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Public Pages
import LandingPage from './pages/public/LandingPage';
import LoginPage from './pages/public/LoginPage';
import RegisterResident from './pages/public/RegisterResident';
import RegisterProvider from './pages/public/RegisterProvider';
import ForgotPassword from './pages/public/ForgotPassword';

// Resident Pages
import ResidentDashboard from './pages/resident/ResidentDashboard';
import FindServices from './pages/resident/FindServices';
import ProviderDirectory from './pages/resident/ProviderDirectory';
import ProviderProfile from './pages/resident/ProviderProfile';
import BookingWizard from './pages/resident/BookingWizard';
import BookService from './pages/resident/BookService';
import MyBookings from './pages/resident/MyBookings';
import BookingDetails from './pages/resident/BookingDetails';
import ResidentReviews from './pages/resident/ResidentReviews';
import ResidentNotifications from './pages/resident/ResidentNotifications';
import ResidentProfile from './pages/resident/ResidentProfile';

// Provider Pages
import ProviderDashboard from './pages/provider/ProviderDashboard';
import BookingRequests from './pages/provider/BookingRequests';
import BookingDetailsProvider from './pages/provider/BookingDetailsProvider';
import TodaysSchedule from './pages/provider/TodaysSchedule';
import ServiceInProgress from './pages/provider/ServiceInProgress';
import AvailabilityCalendar from './pages/provider/AvailabilityCalendar';
import ServicesManagement from './pages/provider/ServicesManagement';
import ProviderReviews from './pages/provider/ProviderReviews';
import ProviderAnalytics from './pages/provider/ProviderAnalytics';
import ProviderProfilePage from './pages/provider/ProviderProfilePage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import DemandTrendAnalytics from './pages/admin/DemandTrendAnalytics';
import UserManagement from './pages/admin/UserManagement';
import ProviderManagement from './pages/admin/ProviderManagement';
import BookingMonitoring from './pages/admin/BookingMonitoring';
import Reports from './pages/admin/Reports';
import AdminNotifications from './pages/admin/AdminNotifications';
import Settings from './pages/admin/Settings';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register/resident" element={<RegisterResident />} />
        <Route path="/register/provider" element={<RegisterProvider />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Resident Routes */}
        <Route path="/resident/dashboard" element={<ResidentDashboard />} />
        <Route path="/resident/find-services" element={<FindServices />} />
        <Route path="/resident/providers" element={<ProviderDirectory />} />
        <Route path="/resident/provider/:id" element={<ProviderProfile />} />
        <Route path="/resident/booking/:step?" element={<BookingWizard />} />
        <Route path="/resident/book-service" element={<BookService />} />
        <Route path="/resident/bookings" element={<MyBookings />} />
        <Route path="/resident/bookings/:bookingId" element={<BookingDetails />} />
        <Route path="/resident/reviews" element={<ResidentReviews />} />
        <Route path="/resident/notifications" element={<ResidentNotifications />} />
        <Route path="/resident/profile" element={<ResidentProfile />} />

        {/* Provider Routes */}
        <Route path="/provider/dashboard" element={<ProviderDashboard />} />
        <Route path="/provider/requests" element={<BookingRequests />} />
        <Route path="/provider/booking/:bookingId" element={<BookingDetailsProvider />} />
        <Route path="/provider/todays-schedule" element={<TodaysSchedule />} />
        <Route path="/provider/service-in-progress/:bookingId" element={<ServiceInProgress />} />
        <Route path="/provider/calendar" element={<AvailabilityCalendar />} />
        <Route path="/provider/services" element={<ServicesManagement />} />
        <Route path="/provider/reviews" element={<ProviderReviews />} />
        <Route path="/provider/analytics" element={<ProviderAnalytics />} />
        <Route path="/provider/profile" element={<ProviderProfilePage />} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/analytics" element={<DemandTrendAnalytics />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/providers" element={<ProviderManagement />} />
        <Route path="/admin/bookings" element={<BookingMonitoring />} />
        <Route path="/admin/reports" element={<Reports />} />
        <Route path="/admin/notifications" element={<AdminNotifications />} />
        <Route path="/admin/settings" element={<Settings />} />

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
