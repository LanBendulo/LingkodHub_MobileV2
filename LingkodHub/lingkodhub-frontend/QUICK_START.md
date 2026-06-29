# 🚀 LingkodHub Frontend - Quick Start Guide

## ✅ STEP 1 - Environment Verification (COMPLETED)

Your environment is ready:
- ✅ Node.js v24.16.0
- ✅ npm 11.13.0
- ✅ Git 2.49.0.windows.1
- ✅ Dependencies installed

## 🎯 STEP 2 - Start the Development Server

### Option 1: Using npm (Recommended)
```bash
cd LingkodHub/lingkodhub-frontend
npm run dev
```

### Option 2: Using PowerShell directly
```powershell
cd C:\Users\Admin\Capstone\LingkodHub\lingkodhub-frontend
npm run dev
```

The application will start at: **http://localhost:5173**

## 🔐 STEP 3 - Test the Application

### Demo Accounts

Navigate to http://localhost:5173/login and use these demo credentials:

#### 👤 Resident Account
- **Email**: `resident@demo.com`
- **Password**: `demo123`
- **Access**: Book services, manage bookings, leave reviews

#### 🔧 Provider Account
- **Email**: `provider@demo.com`
- **Password**: `demo123`
- **Access**: Manage requests, calendar, services, analytics

#### 👨‍💼 Admin Account
- **Email**: `admin@demo.com`
- **Password**: `demo123`
- **Access**: Full platform management, analytics, reports

**Or** use the quick login buttons on the login page!

## 📱 Features to Test

### As a Resident:
1. **Browse Services** - Go to "Find Services" and filter by category
2. **View Providers** - Check provider profiles with ratings
3. **Book a Service** - Use the booking wizard (4 steps)
4. **Manage Bookings** - View upcoming, pending, and completed bookings
5. **Leave Reviews** - Rate completed services

### As a Provider:
1. **View Dashboard** - Check pending requests and stats
2. **Manage Requests** - Accept or decline booking requests
3. **Set Availability** - Manage your calendar
4. **Service Management** - Add/edit your services
5. **View Analytics** - Check your performance metrics

### As an Admin:
1. **View Dashboard** - Platform-wide overview
2. **Demand Analytics** - Service demand trends by barangay
3. **User Management** - View and manage all users
4. **Provider Management** - Approve/manage providers
5. **Booking Monitoring** - Track all platform bookings
6. **Generate Reports** - Download various reports

## 🎨 UI/UX Highlights

- ✨ Modern SaaS-style design
- 📱 Fully responsive (mobile, tablet, desktop)
- 🎯 Role-based dashboards
- 🔔 Notification system
- 📊 Data visualization ready
- ⚡ Fast navigation and smooth transitions

## 📂 Project Structure Overview

```
src/
├── pages/          # All application pages
│   ├── public/     # Landing, Login, Register (5 pages)
│   ├── resident/   # Resident portal (9 pages)
│   ├── provider/   # Provider portal (7 pages)
│   └── admin/      # Admin portal (8 pages)
├── layouts/        # Reusable layouts
├── components/     # Reusable components
├── context/        # State management
├── data/           # Mock data
└── App.jsx         # Main routing

Total: 29 fully functional pages!
```

## 🔧 Development Tips

### Hot Reload
Changes to your code will automatically reload the browser.

### Check Console
Open browser DevTools (F12) to see any errors or warnings.

### Mock Data
All data is in `src/data/mockData.js`. Modify it to test different scenarios.

### Styling
Global styles are in `src/index.css`. Component-specific styles use Bootstrap classes.

## 🐛 Troubleshooting

### Port Already in Use
If port 5173 is busy:
```bash
npm run dev -- --port 3000
```

### Dependencies Issue
If you encounter dependency errors:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
Clear cache and rebuild:
```bash
npm run build -- --force
```

## 📦 Building for Production

```bash
npm run build
```

Output will be in `dist/` directory. Test the production build:
```bash
npm run preview
```

## 🌐 Page Routes Reference

### Public Routes
- `/` - Landing page
- `/login` - Login page
- `/register/resident` - Resident registration
- `/register/provider` - Provider registration
- `/forgot-password` - Password recovery

### Resident Routes (prefix: `/resident/`)
- `dashboard` - Main dashboard
- `find-services` - Browse and search services
- `providers` - Provider directory
- `provider/:id` - Individual provider profile
- `booking/:step?` - Multi-step booking wizard
- `bookings` - Booking management
- `reviews` - Review management
- `notifications` - Notification center
- `profile` - User profile

### Provider Routes (prefix: `/provider/`)
- `dashboard` - Provider dashboard
- `requests` - Booking request management
- `calendar` - Availability calendar
- `services` - Service management
- `reviews` - Customer reviews
- `analytics` - Business analytics
- `profile` - Business profile

### Admin Routes (prefix: `/admin/`)
- `dashboard` - Admin overview
- `analytics` - Demand trend analytics
- `users` - User management
- `providers` - Provider management
- `bookings` - Booking monitoring
- `reports` - Report generation
- `notifications` - System notifications
- `settings` - Platform settings

## 💡 Pro Tips

1. **Use Browser DevTools** - Inspect elements to see Bootstrap classes
2. **Check Mock Data** - Understand data structure in `mockData.js`
3. **Test Responsive** - Use DevTools device emulation
4. **Try All Roles** - Each role has different features
5. **Check Console** - Helpful development messages

## 📚 Next Steps

1. ✅ Start the dev server
2. ✅ Login with demo accounts
3. ✅ Test all features
4. ✅ Check responsive design
5. 🔄 Connect to Laravel backend (future)
6. 🔄 Implement real authentication
7. 🔄 Add Chart.js visualizations
8. 🔄 Integrate payment gateway

## 🎓 Learning Resources

- React Docs: https://react.dev
- Vite Guide: https://vitejs.dev/guide/
- Bootstrap 5: https://getbootstrap.com/docs/5.3/
- React Router: https://reactrouter.com/
- Axios: https://axios-http.com/

## 🆘 Need Help?

- Check the main README.md for detailed information
- Review CREATE_REMAINING_PAGES.md for architecture details
- Inspect existing pages for code examples
- Check browser console for errors

---

## 🎉 You're All Set!

Run `npm run dev` and start exploring LingkodHub!

**Happy Coding! 🚀**
