# ServiceFlow - Frontend Booking Platform

Teaching-friendly React (JSX) project with mock APIs, Redux Toolkit, and Tailwind CSS.

Live Deployment Link - https://booking-service-app-lac.vercel.app/

## Features
- **Authentication System**: Login and Register pages with password visibility toggle
  - Default credentials: `user@example.com` / `password123`
  - Protected routes for authenticated features
  - Persistent authentication state with localStorage
- **Service Listing**: Hero section with statistics, search, filters, sorting, pagination, loading and empty states
- **Custom UI Components**: Beautiful dropdown component with animations and keyboard navigation
- **Service Details**: Gallery, highlights, and related services
- **Booking Flow**: React Hook Form, custom calendar date picker, custom time picker, and localStorage persistence
  - Authentication required to book services
  - Scrollable modal with body scroll lock
  - Two-column layout (inputs on left, date picker on right)
  - Comprehensive form validation with JavaScript-level validation
  - Phone field input restrictions (prevents text entry, allows only digits and formatting characters)
  - Animated success confirmation with green checkmark
  - Direct navigation to bookings page after confirmation
- **Favorites**: Save services to favorites with localStorage persistence
  - Authentication required to save favorites
- **AI FAQ Assistant**: Gemini 2.5 Flash integration (free tier) with rule-based fallback and typing indicator
- **Dark Mode**: Toggle and responsive UI

## Folder Structure
- `src/components`
  - `auth/` - Authentication components (ProtectedRoute)
  - `assistant/` - AI chat assistant components
  - `booking/` - Booking form, modal, date picker, time picker, and success components
  - `common/` - Shared components (EmptyState, ErrorState)
  - `layout/` - Layout components (Navbar, Footer)
  - `services/` - Service-related components (ServiceCard, FilterBar)
  - `ui/` - Reusable UI components (Button, Dropdown, Badge, etc.)
- `src/pages` - Page components (ServicesPage, LoginPage, RegisterPage, etc.)
- `src/store` - Redux store and slices (services, booking, auth, favorites, ui, chat)
- `src/services` - API service layer (mock data)
- `src/hooks` - Custom React hooks
- `src/data` - Static JSON data files
- `src/utils` - Utility functions (formatting, validation, filtering)
- `src/styles` - Global styles and CSS

## Routes
- `/` - Services listing page (public)
- `/services/:id` - Service details page (public)
- `/login` - Login page (public)
- `/register` - Registration page (public)
- `/bookings` - My bookings page (protected - requires authentication)
- `/favorites` - Favorites page (protected - requires authentication)

## Authentication
- **Default Credentials**:
  - Email: `user@example.com`
  - Password: `password123`
- **Features**:
  - Login/Register with form validation
  - Password visibility toggle (eye icon)
  - Protected routes for authenticated features
  - Automatic redirect to login when accessing protected routes
  - Authentication required for:
    - Booking services
    - Saving favorites
    - Viewing bookings page
    - Viewing favorites page

## Mock API Endpoints (Simulated)
- `GET /services` -> `getServices()`
- `GET /services/:id` -> `getServiceById()`
- `POST /booking` -> `postBooking()`
- `GET /faqs` -> `getFaqs()`
- `POST /ai-chat` -> `sendChatMessage()` (rule-based)

## Teaching Roadmap (5-6 Hours)
1. Setup and Tailwind (30-45m)
2. Layout and reusable UI (45-60m)
3. Mock data and API layer (30-45m)
4. Redux Toolkit slices and thunks (45-60m)
5. Authentication system (45-60m)
   - Login/Register pages
   - Protected routes
   - Auth state management
6. Search, filter, pagination (30-45m)
   - Custom Dropdown component
7. Booking flow and form validation (45-60m)
8. AI assistant and UI polish (30-45m)
9. Wrap-up: accessibility and best practices (15-20m)

## Key Components

### UI Components
- **Dropdown**: Custom dropdown with animations, keyboard navigation, and dark mode support
- **Button**: Multiple variants (primary, secondary, outline, ghost)
- **Badge**: Category and status badges
- **Toast**: Notification system for user feedback
- **Pagination**: Page navigation component
- **RatingStars**: Star rating display

### Authentication
- **LoginPage**: Login form with password visibility toggle
- **RegisterPage**: Registration form with validation
- **ProtectedRoute**: Route guard for authenticated pages

### Services
- **ServiceCard**: Service listing card with favorite toggle
- **FilterBar**: Advanced filtering with custom dropdowns
- **SearchBar**: Real-time search with debouncing
- **Hero Section**: Statistics display (Total services, Categories, Avg. response) in horizontal row layout with beautiful typography

### Booking
- **BookingModal**: Scrollable modal with body scroll lock, prevents background scrolling
- **BookingForm**: Two-column layout with inputs on left, date picker on right
  - JavaScript-level form validation for all fields
  - Phone field with input restrictions (prevents text entry)
  - Input maxLength restrictions (name: 100, email: 255, phone: 13, notes: 500)
- **DatePicker**: Custom calendar component with month navigation
- **TimePicker**: Custom time picker with hour/minute selection dropdown
- **BookingSuccess**: Animated success screen with green checkmark animation and navigation to bookings page
- **Validation Utilities**: Reusable validation functions for phone, name, and email

## Interview and Real-world Discussion Points
- Tradeoffs of client-side filtering vs server-side filtering
- Handling stale data, caching, and optimistic updates
- State modeling: when to use Redux vs local component state
- Authentication patterns: protected routes, token management, session persistence
- Accessibility patterns for modals, dialogs, and custom components
- Designing for latency, skeletons, and empty states
- Form validation strategies and user experience

## Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Technology Stack
- **React 19** - UI library
- **React Router DOM 7** - Client-side routing
- **Redux Toolkit** - State management
- **React Hook Form** - Form handling and validation
- **Framer Motion** - Animations
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Vite** - Build tool

## Optional: Gemini API
- Create an API key in Google AI Studio.
- Create a `.env` file in the project root:
```
VITE_GEMINI_API_KEY=your_key_here
VITE_GEMINI_MODEL=gemini-2.5-flash
```
- The assistant will use Gemini automatically when the key is present.
- Uses Gemini 2.5 Flash (free tier) with v1beta API endpoint.
- Falls back to rule-based responses if API key is missing or request fails.

## Redux Store Structure
- `services` - Service listing, filters, pagination
- `booking` - Booking management
- `auth` - Authentication state
- `favorites` - Favorite services
- `ui` - UI state (theme, modals, toasts)
- `chat` - AI assistant chat state
