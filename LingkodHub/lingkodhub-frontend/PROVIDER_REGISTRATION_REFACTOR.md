# Service Provider Registration Refactor - LingkodHub

## Overview
A comprehensive 6-step service provider onboarding experience with identity and face verification UI demonstrations. This is a **frontend-only prototype** designed to showcase the complete registration journey.

## Important Notice
⚠️ **All verification features are UI demonstrations only:**
- Government ID Upload (UI only)
- OCR Verification (simulated)
- Face Verification (simulated)
- No backend integration
- No actual biometric processing
- No real identity verification

The goal is to create a convincing prototype that demonstrates the complete provider onboarding flow.

---

## Registration Flow

### 6-Step Wizard

```
Step 1: Account Information
  ↓
Step 2: Business Information
  ↓
Step 3: Services Offered
  ↓
Step 4: Identity Verification
  ↓
Step 5: Face Verification
  ↓
Step 6: Review & Submit
```

---

## Step-by-Step Breakdown

### Step 1: Account Information

**Purpose:** Create provider account credentials

**Fields:**
- First Name *
- Last Name *
- Email Address *
- Mobile Number *
- Password * (with strength indicator)
- Confirm Password *

**Features:**
- Password visibility toggle
- Real-time password strength meter (Weak/Good/Strong)
- Philippine mobile number validation (+63 or 0 + 10 digits)
- Email format validation
- Password matching validation

---

### Step 2: Business Information

**Purpose:** Collect business details and Davao City address

**Business Details:**
- Business Name *
- Business Description * (textarea)
- Business Contact Number *
- Years of Experience * (number input)

**Address (Davao City Only):**
- House No. *
- Street *
- Barangay * (dropdown with all 182 barangays)
- District (auto-populated, read-only)
- City (Davao City, read-only)
- Province (Davao del Sur, read-only)
- Postal Code (auto-populated, read-only)

**Features:**
- Searchable barangay dropdown
- Automatic district/postal code population
- Address validation for Davao City only
- Helper text: "All 182 barangays of Davao City available"

---

### Step 3: Services Offered

**Purpose:** Select services and set pricing

**Service Categories:**
1. **Plumbing** (8 services)
   - Leak Repair, Faucet Repair, Toilet Repair, Drain Cleaning, etc.

2. **Electrical** (8 services)
   - Outlet Repair, Switch Replacement, Lighting Installation, etc.

3. **House Cleaning** (8 services)
   - General Cleaning, Deep Cleaning, Move-In/Out Cleaning, etc.

4. **Air Conditioner Cleaning** (8 services)
   - Window-Type, Split-Type, Maintenance, Filter Cleaning, etc.

**Features:**
- Expandable/collapsible categories
- Checkbox selection for each service
- Starting price input (PHP) when service is selected
- Price hint: "This is the starting price shown to residents"
- Selected service counter per category
- Validation: Must select at least 1 service
- Validation: All selected services must have prices

**UI:**
- Category cards with icons and colors
- Smooth expand/collapse animations
- Visual feedback for selected services
- Currency symbol (₱) prefix

---

### Step 4: Identity Verification (UI Demo)

**Purpose:** Simulate government ID verification

**ID Type Selection:**
- Philippine National ID
- Driver's License
- Passport
- UMID
- PRC ID
- Postal ID
- Voter's ID

**Upload Areas:**
- Front of ID (drag & drop or click)
- Back of ID (drag & drop or click)
- Image preview with remove button
- File size limit: 5MB
- Formats: PNG, JPG

**Mock OCR Process:**
1. User uploads both images
2. "Verify Identity" button appears
3. Click triggers animated verification:
   - "Scanning document..." (with spinner)
   - "Analyzing text..." (with spinner)
   - "Verifying information..." (with spinner)
4. After 3 seconds: "✓ Identity Successfully Verified"

**Features:**
- Blue verification notice card
- Processing animation with steps
- Success state with checkmark
- All processing is simulated (no actual OCR)

---

### Step 5: Face Verification (UI Demo)

**Purpose:** Simulate biometric face verification

**UI States:**

**1. Ready State:**
- Camera placeholder with icon
- Instructions:
  - Position your face in the center of the frame
  - Ensure your face is well lit
  - Remove glasses or masks if possible
  - Look directly at the camera
- "Start Verification" button

**2. Verifying State:**
- Mock camera view with face frame overlay
- Circular frame with pulse animation
- Progress indicators:
  - "Detecting face..." (with spinner)
  - "Checking liveness..." (with spinner)
  - "Matching identity..." (with spinner)
- Processing takes 4 seconds

**3. Complete State:**
- Large success checkmark animation
- "Face Verification Completed Successfully"
- Captured face preview (generated placeholder)
- "Retake" button option

**Features:**
- Professional camera UI
- Animated face detection frame
- Verification instructions panel
- No actual camera access required
- No real biometric processing
- All animations are frontend-only

---

### Step 6: Review & Submit

**Purpose:** Final review before submission

**Review Sections:**

**1. Account Information**
- Name, Email, Mobile

**2. Business Information**
- Business Name, Contact, Experience
- Full address with district

**3. Services Offered (Count)**
- List of selected services with prices
- Service name + Starting price (₱)

**4. Verification Status**
- ✓ Identity Verified
- ✓ Face Verified

**Additional Fields:**
- Short Introduction * (textarea)
  - "Write a brief introduction about yourself and your services..."
  - Displayed on provider profile
- Terms and Conditions checkbox *
  - "I agree to the Terms of Service and Privacy Policy"

**Submit Button:**
- Validates all required fields
- Shows loading spinner during submission
- 2-second simulated processing

---

## Success Screen

**Display:**
```
✓ Registration Submitted Successfully

Thank you for applying as a LingkodHub Service Provider.

Your application has been submitted for review.

Status: ⏳ Pending Verification
```

**Verification Timeline:**
- ✓ Account Created
- ✓ Business Information
- ✓ Services Selected (X services registered)
- ✓ Identity Uploaded (Government ID verified)
- ✓ Face Verification Completed (Biometric verification successful)
- ⏳ Awaiting Administrator Approval (Your application is being reviewed)

**Action Buttons:**
- Go to Home
- Back to Login

---

## Design System Compliance

### Colors
- **Primary Blue**: `#2563eb`
- **Light Blue**: `#3b82f6`
- **Dark Navy**: `#0f172a`
- **Gray Shades**: `#64748b`, `#94a3b8`, `#cbd5e1`, `#e2e8f0`
- **Yellow Accent**: `#fbbf24`, `#f59e0b`
- **Red Error**: `#dc2626`
- **Backgrounds**: `#f8fafc`, `#f1f5f9`

### Typography
- **Font Family**: Inter
- **Display**: 2rem - 2.25rem, 800 weight
- **Headings**: 1.25rem - 1.5rem, 700 weight
- **Body**: 0.9375rem - 1rem, 450-500 weight
- **Small**: 0.75rem - 0.875rem, 500-600 weight
- **Letter Spacing**: -0.04em to -0.01em

### Components
- **Border Radius**: 0.625rem - 1rem
- **Shadows**: Soft, layered
- **Buttons**: Gradient backgrounds with hover effects
- **Cards**: White with subtle borders
- **Progress Indicators**: Circular with icons
- **Animations**: Smooth transitions (0.2s - 0.4s)

---

## Features & Interactions

### Progress Indicator
- 6-step horizontal stepper
- Active step highlighted with blue gradient
- Completed steps show checkmark
- Connecting lines animate on completion
- Step icons change based on state

### Form Validation
- Real-time validation on field change
- Clear error messages below fields
- Disabled Continue button until valid
- Password strength indicator
- Philippine phone number format
- Email format validation
- Barangay-based auto-population

### Service Selection
- Expandable category cards
- Visual feedback on selection
- Dynamic price inputs
- Counter shows selected services per category
- Smooth expand/collapse animations

### Image Upload
- Drag & drop or click to upload
- Image preview with remove button
- File size validation (5MB limit)
- Supported formats: PNG, JPG
- Visual upload states

### Verification Animations
- OCR: Multi-step processing animation
- Face: Camera frame with pulse effect
- Loading spinners for processing steps
- Success animations with scale effect

### Navigation
- Back button (appears from Step 2)
- Continue button (disabled until valid)
- Submit button (final step)
- Smooth page transitions
- Scroll to top on step change

---

## Data Structure

### Form Data State
```javascript
{
  // Step 1
  firstName: '',
  lastName: '',
  email: '',
  mobileNumber: '',
  password: '',
  confirmPassword: '',
  
  // Step 2
  businessName: '',
  businessDescription: '',
  businessContactNumber: '',
  yearsOfExperience: '',
  houseNo: '',
  street: '',
  barangay: '',
  district: '', // auto
  city: 'Davao City', // constant
  province: 'Davao del Sur', // constant
  postalCode: '', // auto
  
  // Step 3
  selectedServices: {
    'leak-repair': { selected: true, price: 350 },
    // ...
  },
  expandedCategories: { 'plumbing': true },
  
  // Step 4
  idType: 'national-id',
  idFrontImage: File,
  idFrontPreview: 'data:image...',
  idBackImage: File,
  idBackPreview: 'data:image...',
  
  // Step 5
  faceImage: Blob,
  facePreview: 'data:image...',
  
  // Step 6
  shortIntroduction: '',
  termsAccepted: false,
}
```

### Service Categories Data
```javascript
{
  id: 'plumbing',
  name: 'Plumbing',
  icon: 'bi-droplet-fill',
  color: '#2563eb',
  services: [
    { id: 'leak-repair', name: 'Leak Repair', defaultPrice: 350 },
    // ...
  ]
}
```

---

## File Structure

```
lingkodhub-frontend/src/
├── pages/public/
│   ├── RegisterProvider.jsx (950+ lines)
│   └── RegisterProvider.css (1200+ lines)
├── data/
│   ├── davaoCityBarangays.js (182 barangays)
│   └── servicesData.js (4 categories, 32 services)
```

---

## Mock Behaviors

### OCR Simulation
```javascript
startOCRProcess() {
  1. Set ocrProcessing = true
  2. Wait 3 seconds (setTimeout)
  3. Set ocrComplete = true
  4. Set ocrProcessing = false
  5. Enable Continue button
}
```

### Face Verification Simulation
```javascript
startFaceVerification() {
  1. Set cameraStarted = true
  2. Set faceVerifying = true
  3. Wait 4 seconds (setTimeout)
  4. Generate placeholder image (canvas)
  5. Set faceImage and facePreview
  6. Set faceComplete = true
  7. Set faceVerifying = false
}
```

### Registration Submission
```javascript
handleSubmit() {
  1. Validate Step 6
  2. Set loading = true
  3. Wait 2 seconds (setTimeout)
  4. Call register() from AuthContext
  5. Set showSuccess = true
  6. Display success screen
}
```

---

## Validation Rules

### Step 1
- ✓ All fields required
- ✓ Email format
- ✓ Mobile: (+63|0)[0-9]{10}
- ✓ Password min 8 characters
- ✓ Passwords must match

### Step 2
- ✓ All business fields required
- ✓ Barangay selection required
- ✓ Address fields required

### Step 3
- ✓ At least 1 service selected
- ✓ All selected services have prices > 0

### Step 4
- ✓ ID type selected
- ✓ Front image uploaded
- ✓ Back image uploaded
- ✓ OCR process completed

### Step 5
- ✓ Face verification completed

### Step 6
- ✓ Short introduction filled
- ✓ Terms accepted

---

## Responsive Design

### Desktop (> 1024px)
- Full 900px width card
- 6-step horizontal progress bar
- 2-column layouts for forms
- Side-by-side ID uploads

### Tablet (768px - 1024px)
- Full width card
- Adjusted spacing
- 2-column maintained where possible

### Mobile (< 768px)
- Single column layouts
- Stacked form fields
- Stacked navigation buttons
- Reduced font sizes
- Smaller step indicators
- Touch-friendly buttons

### Small Mobile (< 480px)
- Further reduced spacing
- Smaller icons
- Compact category headers
- Single column throughout

---

## Accessibility Features

- ✓ Semantic HTML structure
- ✓ Proper label associations
- ✓ Clear focus states
- ✓ Keyboard navigation support
- ✓ ARIA labels where needed
- ✓ Color contrast meets WCAG AA
- ✓ Screen reader friendly
- ✓ Reduced motion support
- ✓ High contrast mode support

---

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Modern ES6+ JavaScript
- CSS Grid & Flexbox
- CSS Custom Properties

---

## Performance Optimizations

- Smooth animations (GPU-accelerated)
- Debounced form validation
- Lazy image loading
- Optimized re-renders
- Efficient state management
- Conditional rendering

---

## Testing Checklist

### Manual Testing
- [ ] Complete all 6 steps successfully
- [ ] Test back navigation
- [ ] Verify all validations work
- [ ] Upload ID images (both sides)
- [ ] Trigger OCR animation
- [ ] Complete face verification
- [ ] Select services from all categories
- [ ] Set prices for selected services
- [ ] Review summary accuracy
- [ ] Submit registration
- [ ] View success timeline
- [ ] Test on mobile devices
- [ ] Test keyboard navigation
- [ ] Verify responsive layouts

### Edge Cases
- [ ] Very long business names
- [ ] Maximum file size uploads
- [ ] All 32 services selected
- [ ] Retake face verification
- [ ] Remove uploaded images
- [ ] Browser back/forward buttons

---

## Future Production Features

When moving to production, implement:

### Backend Integration
- [ ] API endpoints for each step
- [ ] Database persistence
- [ ] JWT authentication
- [ ] CSRF protection
- [ ] Rate limiting

### Real Verification
- [ ] Actual OCR implementation
- [ ] Face recognition API integration
- [ ] Government ID validation
- [ ] Admin approval workflow
- [ ] Email verification
- [ ] SMS OTP verification

### Advanced Features
- [ ] Real-time status updates
- [ ] Email notifications
- [ ] SMS notifications
- [ ] Document upload to cloud storage
- [ ] Encrypted credential storage
- [ ] Audit logging
- [ ] Analytics tracking

---

## Known Limitations

⚠️ **Prototype Limitations:**
- No backend persistence
- No actual OCR processing
- No real camera access
- No biometric verification
- No admin approval system
- No email/SMS notifications
- Data lost on page refresh
- Mock authentication only

---

## Usage

```jsx
import RegisterProvider from './pages/public/RegisterProvider';

// In your router
<Route path="/register/provider" element={<RegisterProvider />} />
```

---

## Design Philosophy

### User Experience Goals
1. **Professional** - Conveys trust and credibility
2. **Simple** - Clear steps, no confusion
3. **Fast** - Can complete in 5 minutes
4. **Modern** - Contemporary UI patterns
5. **Accessible** - Works for all users
6. **Responsive** - Great on all devices

### Visual Hierarchy
1. Primary actions (Continue/Submit) - Bold, gradient
2. Secondary actions (Back) - Subtle, outlined
3. Information - Clear typography hierarchy
4. Status indicators - Color-coded, icon-based

### Interaction Patterns
- Progressive disclosure (expand categories)
- Inline validation (immediate feedback)
- Loading states (clear progress indicators)
- Success states (animated confirmations)
- Error states (helpful messages)

---

**Status:** ✅ Complete and Ready for Demo  
**Type:** Frontend Prototype with UI Demonstrations  
**Framework:** React + CSS  
**Design System:** LingkodHub Admin Dashboard  
**Lines of Code:** ~2,150 lines (JSX + CSS + Data)  
**Verification:** UI Demo Only (No Backend)
