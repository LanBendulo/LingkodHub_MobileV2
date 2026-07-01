# Provider Workflow - Testing Guide

## 🧪 How to Test the Complete Provider Workflow

### Prerequisites
```bash
cd lingkodhub-frontend
npm install
npm run dev
```

Navigate to: `http://localhost:5173/provider/dashboard`

---

## 📋 Test Scenario 1: Accept a Booking Request

**Goal:** Accept a pending booking and move it to confirmed status

### Steps:
1. **Go to Dashboard** (`/provider/dashboard`)
   - ✅ Verify "Pending Requests" shows 1
   - ✅ Verify "Today's Schedule" widget is visible

2. **View Pending Requests**
   - Click "View All" in Pending Requests section
   - OR click "Booking Requests" in sidebar
   - ✅ Verify BookingRequests page loads
   - ✅ Verify tabs show: All (6), Pending (1), Confirmed (2), In Progress (1), Completed (1), Declined (1)

3. **View Booking Details**
   - Click "View Details" on booking BK-2026-001 (Maria Santos - Leak Repair)
   - ✅ Verify BookingDetailsProvider page loads
   - ✅ Verify resident information displays (avatar, name, phone, email)
   - ✅ Verify service details display (Leak Repair, Plumbing, ₱370)
   - ✅ Verify problem description displays
   - ✅ Verify service address displays
   - ✅ Verify uploaded photos display (2 images)
   - ✅ Verify "Accept Booking" and "Decline Booking" buttons are visible

4. **Accept the Booking**
   - Click "Accept Booking" button
   - ✅ Verify modal appears with confirmation message
   - ✅ Verify modal shows booking details (service, date, time, price)
   - Click "Accept Booking" in modal
   - ✅ Verify redirected to BookingRequests page with "Confirmed" tab active
   - ✅ Verify booking BK-2026-001 now shows status "CONFIRMED"
   - ✅ Verify Pending count decreased to 0
   - ✅ Verify Confirmed count increased to 3

5. **Verify State Persistence**
   - Refresh the page (F5)
   - ✅ Verify booking still shows as "Confirmed"
   - ✅ Verify counts remain updated

---

## 📋 Test Scenario 2: View Today's Schedule

**Goal:** See all jobs scheduled for today

### Steps:
1. **Navigate to Today's Schedule**
   - From Dashboard, click "Today's Schedule" in Quick Actions
   - OR click "Today's Schedule" in sidebar
   - ✅ Verify TodaysSchedule page loads
   - ✅ Verify current time displays in header (e.g., "10:30 AM")
   - ✅ Verify stats show: Total Jobs Today, Confirmed, In Progress, Upcoming

2. **Verify Today's Bookings**
   - ✅ Verify booking BK-2026-002 (Pedro Cruz - Drain Unclogging) displays
     - Time: 02:00 PM
     - Status: CONFIRMED
   - ✅ Verify booking BK-2026-003 (Ana Reyes - Pipe Installation) displays
     - Time: 09:00 AM
     - Status: IN PROGRESS
   - ✅ Verify jobs are sorted chronologically (09:00 AM before 02:00 PM)

3. **Test Quick Actions**
   - Click "Navigate" button on BK-2026-002
   - ✅ Verify Google Maps opens in new tab with address
   - Click "Call" button on BK-2026-002
   - ✅ Verify phone dialer opens with +63 923 456 7890
   - Click "View" button on BK-2026-002
   - ✅ Verify navigates to BookingDetailsProvider page

4. **Verify Empty State**
   - Change mock data date to a past/future date
   - Refresh page
   - ✅ Verify "No jobs scheduled for today" message displays
   - ✅ Verify "View Booking Requests" button appears

---

## 📋 Test Scenario 3: Start and Complete a Service

**Goal:** Start a confirmed booking and complete it

### Steps:
1. **Start Service from Today's Schedule**
   - Go to Today's Schedule page
   - Find booking BK-2026-002 (Drain Unclogging - CONFIRMED)
   - Click "View" button
   - ✅ Verify BookingDetailsProvider page loads
   - ✅ Verify "Start Service" button is visible (booking is confirmed and scheduled for today)

2. **Confirm Start Service**
   - Click "Start Service" button
   - ✅ Verify modal appears asking for confirmation
   - ✅ Verify modal shows service details
   - Click "Start Service" in modal
   - ✅ Verify redirected to ServiceInProgress page

3. **Verify Service In Progress Page**
   - ✅ Verify service timer displays (e.g., 00:00:05, 00:00:06...)
   - ✅ Verify timer increments every second
   - ✅ Verify job information displays (service, category, duration, price)
   - ✅ Verify problem description displays
   - ✅ Verify resident contact card displays with avatar
   - ✅ Verify service address displays
   - ✅ Verify "Service Notes" textarea is editable
   - ✅ Verify "Complete Service" button is prominent and green

4. **Add Provider Notes**
   - Type in Service Notes field: "Fixed clogged bathroom drain. Used plunger and drain snake. Tested water flow. All working properly."
   - ✅ Verify text appears in textarea

5. **Test Contact Actions**
   - Click "Call Resident" button
   - ✅ Verify phone dialer opens
   - Click "Get Directions" button
   - ✅ Verify Google Maps opens in new tab

6. **Complete the Service**
   - Click "Complete Service" button
   - ✅ Verify modal appears with confirmation
   - ✅ Verify modal shows service details and duration
   - Click "Complete Service" in modal
   - ✅ Verify redirected to BookingRequests page with "Completed" tab active
   - ✅ Verify booking BK-2026-002 now shows status "COMPLETED"
   - ✅ Verify Confirmed count decreased
   - ✅ Verify Completed count increased

7. **Verify Dashboard Updates**
   - Navigate to Dashboard
   - ✅ Verify "Completed Jobs" increased
   - ✅ Verify "Monthly Earnings" increased by ₱300
   - ✅ Verify Today's Schedule widget no longer shows the completed booking

---

## 📋 Test Scenario 4: Decline a Booking Request

**Goal:** Decline a pending booking with reason

### Steps:
1. **Navigate to Pending Requests**
   - Go to Booking Requests page
   - Click "Pending" tab
   - ✅ Verify at least 1 pending booking displays

2. **View Booking to Decline**
   - Click "View Details" on a pending booking
   - ✅ Verify BookingDetailsProvider loads

3. **Decline the Booking**
   - Click "Decline Booking" button
   - ✅ Verify modal appears
   - ✅ Verify textarea for decline reason displays
   - Type reason: "Schedule conflict - fully booked"
   - Click "Decline Booking" button in modal
   - ✅ Verify redirected to BookingRequests with "Declined" tab active
   - ✅ Verify booking shows status "DECLINED"
   - ✅ Verify Pending count decreased
   - ✅ Verify Declined count increased

4. **View Declined Booking Details**
   - Click "View Details" on the declined booking
   - ✅ Verify BookingDetailsProvider loads
   - ✅ Verify status badge shows "DECLINED"
   - ✅ Verify no Accept/Decline buttons show (already declined)

---

## 📋 Test Scenario 5: Continue an In-Progress Service

**Goal:** Resume tracking an already started service

### Steps:
1. **View In Progress from Dashboard**
   - Go to Dashboard
   - ✅ Verify "Today's Schedule" widget shows at least 1 IN PROGRESS booking
   - Click "Continue" button on the in-progress booking
   - ✅ Verify navigates to ServiceInProgress page

2. **Verify Timer Persistence**
   - ✅ Verify timer shows elapsed time since service started
   - ✅ Verify timer continues incrementing
   - Note: Timer calculates from `startedAt` timestamp

3. **Complete from In Progress**
   - Click "Complete Service"
   - ✅ Verify modal shows total service duration
   - Confirm completion
   - ✅ Verify service marked as completed

---

## 📋 Test Scenario 6: Tab Filtering

**Goal:** Filter bookings by status using tabs

### Steps:
1. **Go to Booking Requests page**
   - ✅ Verify tabs display with counts: All, Pending, Confirmed, In Progress, Completed, Declined

2. **Test Each Tab**
   - Click "All" tab
     - ✅ Verify all bookings display (6 total)
   - Click "Pending" tab
     - ✅ Verify only pending bookings display
     - ✅ Verify tab count matches displayed bookings
   - Click "Confirmed" tab
     - ✅ Verify only confirmed bookings display
   - Click "In Progress" tab
     - ✅ Verify only in-progress bookings display
   - Click "Completed" tab
     - ✅ Verify only completed bookings display
     - ✅ Verify bookings show review rating if available
   - Click "Declined" tab
     - ✅ Verify only declined bookings display

3. **Test URL Parameter**
   - Navigate to `/provider/requests?tab=confirmed`
   - ✅ Verify Confirmed tab is automatically selected
   - ✅ Verify only confirmed bookings display

---

## 📋 Test Scenario 7: Responsive Design

**Goal:** Verify pages work on different screen sizes

### Steps:
1. **Desktop (>1024px)**
   - Open Chrome DevTools (F12)
   - Set viewport to 1920x1080
   - Navigate through all provider pages
   - ✅ Verify two-column layouts display properly
   - ✅ Verify sidebars are sticky
   - ✅ Verify grids show multiple columns

2. **Tablet (768px-1024px)**
   - Set viewport to 768x1024
   - ✅ Verify layouts stack to single column
   - ✅ Verify sidebars move below main content
   - ✅ Verify all buttons remain accessible

3. **Mobile (<768px)**
   - Set viewport to 375x667 (iPhone SE)
   - ✅ Verify all cards are full-width
   - ✅ Verify buttons are touch-friendly (min 44x44px)
   - ✅ Verify text remains readable
   - ✅ Verify no horizontal scrolling

---

## 📋 Test Scenario 8: State Persistence (localStorage)

**Goal:** Verify booking data persists across page refreshes

### Steps:
1. **Make Changes**
   - Accept a booking (status changes to confirmed)
   - Start a service (status changes to in-progress)
   - Add provider notes to a service
   - Decline a booking with reason

2. **Refresh Browser**
   - Press F5 or Ctrl+R
   - ✅ Verify all status changes persist
   - ✅ Verify counts remain updated
   - ✅ Verify provider notes saved
   - ✅ Verify decline reason saved

3. **Open in New Tab**
   - Open `/provider/dashboard` in new tab
   - ✅ Verify same data displays
   - ✅ Verify stats are calculated from persisted data

4. **Clear localStorage (Optional)**
   - Open DevTools Console
   - Run: `localStorage.removeItem('provider_bookings')`
   - Refresh page
   - ✅ Verify mock data reloads
   - ✅ Verify all bookings reset to default state

---

## 🐛 Known Limitations (Frontend Only Demo)

1. **No Backend**
   - All data stored in localStorage
   - Data doesn't sync across devices
   - Data lost on localStorage clear

2. **Mock Features**
   - Phone calls open dialer but don't actually call
   - Messages show alert (not implemented)
   - Photo uploads show alert (not implemented)
   - Google Maps links work but no API key needed

3. **Notifications**
   - No real-time notifications
   - No push notifications
   - Status changes don't notify resident

4. **Authentication**
   - No real login/logout
   - No role-based access control
   - Anyone can access provider pages

---

## ✅ Testing Checklist

Use this checklist to verify all features work:

**Dashboard:**
- [ ] KPI cards display correct numbers
- [ ] Today's Schedule widget shows today's bookings
- [ ] Pending Requests widget shows pending bookings
- [ ] Quick Actions links work
- [ ] Recent Activity displays

**Booking Requests:**
- [ ] All tabs work (All, Pending, Confirmed, In Progress, Completed, Declined)
- [ ] Tab counts are accurate
- [ ] Booking cards display all information
- [ ] View Details button navigates correctly
- [ ] Status badges show correct colors

**Booking Details Provider:**
- [ ] Resident information displays
- [ ] Service details display
- [ ] Problem description displays
- [ ] Address displays with Google Maps link
- [ ] Uploaded photos display (if any)
- [ ] Timeline displays for confirmed+ bookings
- [ ] Accept/Decline buttons work (pending only)
- [ ] Start Service button works (confirmed + today only)
- [ ] Complete Service button works (in-progress only)
- [ ] Call/Message buttons work
- [ ] All modals display correctly

**Today's Schedule:**
- [ ] Current time displays and updates
- [ ] Stats cards show correct counts
- [ ] Bookings display chronologically
- [ ] "Next" badge shows on upcoming job
- [ ] Quick actions work (View, Start, Call, Navigate)
- [ ] Empty state shows when no jobs today

**Service In Progress:**
- [ ] Service timer displays and increments
- [ ] Timer calculates from startedAt timestamp
- [ ] Job information displays
- [ ] Problem description displays
- [ ] Resident contact card displays
- [ ] Service address displays
- [ ] Provider notes textarea works
- [ ] Complete Service button works
- [ ] Report Issue button works
- [ ] Call/Message/Directions buttons work

**State Management:**
- [ ] Status changes persist on refresh
- [ ] Provider notes persist
- [ ] Decline reasons persist
- [ ] Stats recalculate on changes
- [ ] localStorage updates correctly

**Responsive Design:**
- [ ] Desktop layout (>1024px)
- [ ] Tablet layout (768-1024px)
- [ ] Mobile layout (<768px)
- [ ] No horizontal scrolling
- [ ] Touch-friendly buttons

---

## 🎯 Success Criteria

All tests pass = Provider Workflow Phase 1 is fully functional! ✅

**Expected Results:**
- All pages load without errors
- All buttons perform expected actions
- All modals display correctly
- All status changes persist
- All stats calculate correctly
- All layouts are responsive
- All navigation works smoothly

---

**Last Updated:** July 1, 2026  
**Version:** 1.0  
**Status:** Phase 1 Complete
