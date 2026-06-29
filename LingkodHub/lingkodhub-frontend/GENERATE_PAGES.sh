#!/bin/bash

# Script to generate placeholder pages for LingkodHub

# Create directories
mkdir -p src/pages/resident
mkdir -p src/pages/provider
mkdir -p src/pages/admin

# Function to create a placeholder page
create_page() {
  local file=$1
  local component=$2
  local role=$3
  local title=$4

  cat > "$file" << 'EOF'
import DashboardLayout from '../../layouts/DashboardLayout';

const COMPONENT_NAME = () => {
  const menuItems = MENU_ITEMS;

  return (
    <DashboardLayout role="ROLE" menuItems={menuItems}>
      <div className="mb-4">
        <h2 className="fw-bold mb-1">TITLE</h2>
        <p className="text-muted mb-0">DESCRIPTION</p>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body p-5 text-center">
          <i className="bi bi-gear text-muted fs-1 mb-3"></i>
          <h5 className="mb-2">Page Under Construction</h5>
          <p className="text-muted mb-0">
            This page is being developed. Check back soon!
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default COMPONENT_NAME;
EOF

  # Replace placeholders
  sed -i "s/COMPONENT_NAME/$component/g" "$file"
  sed -i "s/ROLE/$role/g" "$file"
  sed -i "s/TITLE/$title/g" "$file"
}

echo "Generating placeholder pages..."

# Resident pages
create_page "src/pages/resident/ProviderDirectory.jsx" "ProviderDirectory" "resident" "Provider Directory"
create_page "src/pages/resident/ProviderProfile.jsx" "ProviderProfile" "resident" "Provider Profile"
create_page "src/pages/resident/BookingWizard.jsx" "BookingWizard" "resident" "Book a Service"
create_page "src/pages/resident/MyBookings.jsx" "MyBookings" "resident" "My Bookings"
create_page "src/pages/resident/ResidentReviews.jsx" "ResidentReviews" "resident" "My Reviews"
create_page "src/pages/resident/ResidentNotifications.jsx" "ResidentNotifications" "resident" "Notifications"
create_page "src/pages/resident/ResidentProfile.jsx" "ResidentProfile" "resident" "My Profile"

# Provider pages
create_page "src/pages/provider/ProviderDashboard.jsx" "ProviderDashboard" "provider" "Dashboard"
create_page "src/pages/provider/BookingRequests.jsx" "BookingRequests" "provider" "Booking Requests"
create_page "src/pages/provider/AvailabilityCalendar.jsx" "AvailabilityCalendar" "provider" "Availability Calendar"
create_page "src/pages/provider/ServicesManagement.jsx" "ServicesManagement" "provider" "Services Management"
create_page "src/pages/provider/ProviderReviews.jsx" "ProviderReviews" "provider" "Reviews"
create_page "src/pages/provider/ProviderAnalytics.jsx" "ProviderAnalytics" "provider" "Analytics"
create_page "src/pages/provider/ProviderProfilePage.jsx" "ProviderProfilePage" "provider" "My Profile"

# Admin pages
create_page "src/pages/admin/AdminDashboard.jsx" "AdminDashboard" "admin" "Admin Dashboard"
create_page "src/pages/admin/DemandTrendAnalytics.jsx" "DemandTrendAnalytics" "admin" "Demand Analytics"
create_page "src/pages/admin/UserManagement.jsx" "UserManagement" "admin" "User Management"
create_page "src/pages/admin/ProviderManagement.jsx" "ProviderManagement" "admin" "Provider Management"
create_page "src/pages/admin/BookingMonitoring.jsx" "BookingMonitoring" "admin" "Booking Monitoring"
create_page "src/pages/admin/Reports.jsx" "Reports" "admin" "Reports"
create_page "src/pages/admin/AdminNotifications.jsx" "AdminNotifications" "admin" "Notifications"
create_page "src/pages/admin/Settings.jsx" "Settings" "admin" "Settings"

echo "Done! All placeholder pages created."
