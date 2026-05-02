import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BookOpen, Eye, EyeOff } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '../context/AuthContext.jsx';
import toast from 'react-hot-toast';

const INPUT = 'w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200';

const LoginPage = () => {
  const { signIn, signInWithGoogle, isLoggedIn } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();
  const from      = location.state?.from?.pathname || '/dashboard';

  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPwd,  setShowPwd]  = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [gLoading, setGLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => { if (isLoggedIn) navigate(from, { replace: true }); }, [isLoggedIn, navigate, from]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) { toast.error('Please fill in all fields.'); return; }
    setLoading(true);
    try {
      await signIn(email, password);
      toast.success('Welcome back!');
    } catch (err) {
      const msg = err.code === 'auth/invalid-credential'
        ? 'Invalid email or password.'
        : err.message || 'Login failed.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setGLoading(true);
    try {
      await signInWithGoogle();
      toast.success('Signed in with Google!');
    } catch (err) {
      toast.error('Google sign-in failed. Please try again.');
    } finally {
      setGLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ background: 'var(--bg-surface)' }}
    >
      <div className="w-full max-w-sm animate-fade-up">
        {/* Card */}
        <div
          className="rounded-2xl p-8"
          style={{ background: 'var(--bg-elevated)', boxShadow: 'var(--shadow-lg)' }}
        >
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
              style={{ background: 'var(--accent-subtle)' }}
            >
              <BookOpen size={22} style={{ color: 'var(--accent)' }} />
            </div>
            <h1
              className="text-2xl font-bold"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--ink-primary)' }}
            >
              Welcome back
            </h1>
            <p className="text-sm mt-1" style={{ color: 'var(--ink-muted)' }}>
              Sign in to your Bookify account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--ink-secondary)' }}>
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className={INPUT}
                style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', color: 'var(--ink-primary)' }}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--ink-secondary)' }}>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPwd ? 'text' : 'password'}
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className={INPUT + ' pr-11'}
                  style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', color: 'var(--ink-primary)' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: 'var(--ink-muted)' }}
                >
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2"
              style={{ background: 'var(--accent)' }}
            >
              {loading && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <hr className="flex-1" style={{ borderColor: 'var(--border)' }} />
            <span className="text-xs" style={{ color: 'var(--ink-muted)' }}>or</span>
            <hr className="flex-1" style={{ borderColor: 'var(--border)' }} />
          </div>

          {/* Google */}
          <button
            onClick={handleGoogle}
            disabled={gLoading}
            className="w-full py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2.5 transition-colors hover:bg-gray-50 disabled:opacity-60"
            style={{ border: '1px solid var(--border)', color: 'var(--ink-secondary)' }}
          >
            {gLoading ? (
              <span className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <FcGoogle size={18} />
            )}
            Continue with Google
          </button>

          {/* Sign up link */}
          <p className="text-center text-sm mt-6" style={{ color: 'var(--ink-muted)' }}>
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="font-semibold no-underline" style={{ color: 'var(--accent)' }}>
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;