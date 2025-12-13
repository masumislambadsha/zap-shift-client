# 🚚 Zap Shift — Client (Pilot Version)

[![Demo](https://img.shields.io/badge/CLIENT-PILOT-orange?style=for-the-badge&logo=react)](https://github.com/masumislambadsha/zap-shift-client-pv)
[![Release](https://img.shields.io/github/v/release/masumislambadsha/zap-shift-client-pv?label=release&color=informational)](https://github.com/masumislambadsha/zap-shift-client-pv/releases)
[![License](https://img.shields.io/github/license/masumislambadsha/zap-shift-client-pv?color=blue)](./LICENSE)
[![Status](https://img.shields.io/badge/status-%20pilot-brightgreen.svg)](#)
[![Node](https://img.shields.io/badge/node-%3E%3D16-brightgreen.svg)](https://nodejs.org/)

> A fast, conversion-minded React + Vite frontend for Zap Shift — book parcels, track deliveries, pay with Stripe, and manage shipments with a clean UX.

---

## 💥 WHO THIS README IS FOR

- Product people who want to demo parcel booking flows.
- Frontend engineers shipping a polished client for delivery services.
- Designers who care about micro-interactions, forms, and conversion.

If you love boring UI, this project might not be for you.

---

## ✨ QUICK PITCH — WHAT THIS IS

Zap Shift — Client (pv) is the Vite + React frontend that pairs with the Zap Shift Server. It provides parcel booking, checkout (Stripe), real-time-ish tracking UI, rider selection, and user account flows. Built for speed, clarity, and conversion.

Audience: logistics teams, small couriers, and frontend engineers shipping delivery experiences.

---

## 🔗 LIVE DEMO

- Production / Preview: https://zap-shift-cfce9.web.app/
  - Production: https://zap-shift-cfce9.web.app/
  - Preview: https://zap-shift-cfce9.web.app/



---

## ⚔️ FEATURES

- 📦 Parcel booking flow — pickup, dropoff, size/weight, cost estimate
- 💳 Stripe Checkout (front-end) integration for payments
- 🔐 Firebase auth (email/password + social) and token forwarding to server
- 📍 Pickup/dropoff map selection (React-Leaflet)
- 🧭 Tracking UI — enter tracking ID and see timeline of events
- 🛵 Rider view — accept delivery assignments, update status
- 🧾 Payment & Order history in account dashboard
- 🎨 Theming with TailwindCSS (light/dark ready)
- ⚡ Vite-powered fast dev experience + optimized builds
- ♿ Accessibility-minded components

---

## 🧰 TECHNOLOGY STACK

| Area        | Technology                                    |
|-------------|-----------------------------------------------|
| Framework   | React + Vite                                  |
| Styling     | TailwindCSS (+ optional DaisyUI)              |
| State/Data  | React Query (optional), React Context, Axios  |
| Animations  | Framer Motion                                 |
| Maps        | Leaflet / React-Leaflet                       |
| Payments    | Stripe (Checkout / Elements)                  |
| Auth        | Firebase Auth                                 |
| Icons       | react-icons / lucide-react                    |
| Dev tooling | ESLint, Prettier, Vite                        |

---

## 📦 EXACT NPM PACKAGES (sync with package.json)

Dependencies (examples commonly used in this project type):

- react
- react-dom
- vite
- axios
- firebase
- react-router-dom
- @tanstack/react-query
- framer-motion
- leaflet
- react-leaflet
- tailwindcss
- daisyui (optional)
- react-icons
- react-hook-form
- react-hot-toast
- swiper
- stripe-js / @stripe/stripe-js
- lottie-react
- sweetalert2

DevDependencies:

- @vitejs/plugin-react
- eslint
- prettier
- @types/react (if TypeScript)
- vite

To keep this list exact, run:
```bash
cat package.json | jq -r '.dependencies + .devDependencies | keys[]'
```

---

## 🚦 QUICKSTART — GET RUNNING

1. Clone
```bash
git clone https://github.com/masumislambadsha/zap-shift-client-pv.git
cd zap-shift-client-pv
```

2. Install
```bash
npm install
# or
yarn
```

3. Environment
```bash
cp .env.example .env
# Fill VITE_ variables: VITE_API_URL, VITE_FIREBASE_*, VITE_STRIPE_PK, etc.
```

4. Run in development
```bash
npm run dev
# open http://localhost:5173
```

Build & preview:
```bash
npm run build
npm run preview
```

---

## ⚙️ VITE ENV VARS (IMPORTANT)

Vite only exposes env vars that start with VITE_. Example .env:

```
VITE_API_URL=https://zap-shift-server.example.com
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_STRIPE_PK=pk_live_...
```

Do NOT commit secrets. Use platform secrets for CI/CD and hosting.

---

## 🗺 ROUTES / PAGES (EXPECTED)

- / — Home: hero, quick-book form, featured services
- /book — Parcel booking flow (pickup, dropoff, details)
- /checkout — Payment flow (Stripe)
- /tracking — Enter tracking ID & view timeline
- /products/services — Service types and prices
- /auth/login — Login / Register
- /account — Profile, orders, payments
- /dashboard — Rider / Admin dashboard (protected)

Adjust to match your actual router.

---

## 📁 SUGGESTED FOLDER STRUCTURE

This reflects a typical Zap Shift client layout — adjust to your repo:

```
zap-shift-client-pv
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── Booking/
│   │   │   ├── BookingForm.jsx
│   │   │   └── BookingSummary.jsx
│   │   ├── Checkout/
│   │   │   └── CheckoutForm.jsx
│   │   ├── Navbar/
│   │   │   └── Navbar.jsx
│   │   ├── Footer/
│   │   │   └── Footer.jsx
│   │   ├── Tracking/
│   │   │   └── TrackingView.jsx
│   │   └── Shared/
│   │       └── LoadingSpinner.jsx
│   ├── contexts/
│   │   └── AuthContext.jsx
│   ├── hooks/
│   │   ├── useAuth.jsx
│   │   ├── useBookings.jsx
│   │   └── useAxiosSecure.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Book.jsx
│   │   ├── Checkout.jsx
│   │   ├── Tracking.jsx
│   │   └── Account.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   └── main.jsx
├── .env.example
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

Tip: run tree to produce an exact snapshot:
```bash
npx tree-cli -a -I 'node_modules|dist'
# or
tree -a -I 'node_modules|dist' -L 4
```

---

## 🧭 DESIGN & UX PHILOSOPHY

- Clear forms and inline validation reduce abandonment.
- Show price + ETA early during booking.
- Micro‑interactions (motion, toasts) communicate success & errors.
- Accessibility: proper labels, keyboard-friendly controls, ARIA where required.

---

## 🧪 TESTING & QUALITY

- Add integration tests with Jest + React Testing Library and Playwright/Cypress for critical flows (booking → checkout → tracking).
- Linting: ESLint + Prettier recommended.
- Consider adding GitHub Actions to run tests and build before deploy.

---

## 🛠️ CONTRIBUTING

1. Fork → Branch (feature/<name> / fix/<name>) → Commit → PR
2. Run linters and tests locally
3. Keep changes focused and document UX/behavioral changes
4. Use semantic commit messages

---

## 📬 CONTACT

- GitHub: [masumislambadsha](https://github.com/masumislambadsha)
- Email: <mohammadbadsha468@gmail.com>
- LinkedIn: [Masum Islam Badsha](https://www.linkedin.com/in/masum-islam-badsha/)

---

> “Make it easy to ship, easy to use, and delightful to come back to.”

---

## 📜 LICENSE

MIT © masumislambadsha — See [LICENSE](./LICENSE)
