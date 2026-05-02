import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/common/ProtectedRoutes.jsx';
import LoadingSpinner from './components/common/LoadingSpinner.jsx';
import HomeLayout from './components/layout/HomeLayout.jsx';

// ── Lazy-loaded pages (code splitting) ──────────────────────────────────────
const HomePage      = lazy(() => import('./pages/HomePage.jsx'));
const LoginPage     = lazy(() => import('./pages/Login.jsx'));
const RegisterPage  = lazy(() => import('./pages/Register.jsx'));
const DashboardPage = lazy(() => import('./pages/Dashboard.jsx'));
const CartPage      = lazy(() => import('./pages/Cart.jsx'));
const CheckoutPage  = lazy(() => import('./pages/CheckoutPage.jsx'));
const OrdersPage    = lazy(() => import('./pages/OrderPage.jsx'));

// ── Fallback for lazy routes ─────────────────────────────────────────────────
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-base)' }}>
    <LoadingSpinner size="lg" label="Loading page…" />
  </div>
);

// ── 404 ─────────────────────────────────────────────────────────────────────
const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ background: 'var(--bg-base)' }}>
    <span className="text-7xl">📚</span>
    <h1 className="text-4xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--ink-primary)' }}>
      Page Not Found
    </h1>
    <p style={{ color: 'var(--ink-muted)' }}>The page you're looking for doesn't exist.</p>
    <a
      href="/"
      className="mt-2 px-6 py-3 rounded-xl font-semibold text-sm text-white no-underline hover:opacity-90 transition-opacity"
      style={{ background: 'var(--accent)' }}
    >
      Go Home
    </a>
  </div>
);

function App() {
  return (
    <>
      {/* ── Global Toast Notifications ── */}
      <Toaster
        position="top-right"
        gutter={10}
        toastOptions={{
          duration: 3500,
          style: {
            fontFamily: 'var(--font-ui)',
            fontSize: '14px',
            borderRadius: '12px',
            background: 'var(--bg-elevated)',
            color: 'var(--ink-primary)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-md)',
            padding: '12px 16px',
          },
          success: {
            iconTheme: { primary: 'var(--success)', secondary: '#fff' },
          },
          error: {
            iconTheme: { primary: 'var(--error)', secondary: '#fff' },
          },
        }}
      />

      {/* ── Routes ── */}
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public routes with shared layout (navbar + category bar) */}
          <Route path="/" element={<HomeLayout />}>
            <Route index element={<HomePage />} />
          </Route>

          {/* Auth routes */}
          <Route path="/login"  element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={<ProtectedRoute><DashboardPage /></ProtectedRoute>}
          />
          <Route
            path="/cart"
            element={<ProtectedRoute><CartPage /></ProtectedRoute>}
          />
          <Route
            path="/checkout"
            element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>}
          />
          <Route
            path="/orders"
            element={<ProtectedRoute><OrdersPage /></ProtectedRoute>}
          />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;