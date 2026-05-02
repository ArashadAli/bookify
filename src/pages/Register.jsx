import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '../context/AuthContext.jsx';
import toast from 'react-hot-toast';

const INPUT = 'w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200';

const RegisterPage = () => {
  const { signUp, signInWithGoogle, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [confirm,  setConfirm]  = useState('');
  const [showPwd,  setShowPwd]  = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [done,     setDone]     = useState(false);

  useEffect(() => { if (isLoggedIn) navigate('/dashboard', { replace: true }); }, [isLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !confirm) { toast.error('All fields are required.'); return; }
    if (password.length < 6) { toast.error('Password must be at least 6 characters.'); return; }
    if (password !== confirm)  { toast.error('Passwords do not match.'); return; }
    setLoading(true);
    try {
      await signUp(email, password);
      setDone(true);
    } catch (err) {
      const msg = err.code === 'auth/email-already-in-use'
        ? 'An account with this email already exists.'
        : err.message || 'Registration failed.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      toast.success('Account created!');
      navigate('/dashboard');
    } catch {
      toast.error('Google sign-in failed.');
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ background: 'var(--bg-surface)' }}
      >
        <div
          className="text-center p-10 rounded-2xl max-w-sm w-full animate-fade-up"
          style={{ background: 'var(--bg-elevated)', boxShadow: 'var(--shadow-lg)' }}
        >
          <CheckCircle size={52} className="mx-auto mb-4" style={{ color: 'var(--success)' }} />
          <h2
            className="text-2xl font-bold mb-2"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--ink-primary)' }}
          >
            Check your inbox
          </h2>
          <p className="text-sm mb-6" style={{ color: 'var(--ink-muted)' }}>
            We&apos;ve sent a verification link to <strong>{email}</strong>. Click it to activate your account.
          </p>
          <Link
            to="/login"
            className="block py-3 px-6 rounded-xl font-semibold text-sm text-white no-underline text-center hover:opacity-90 transition-opacity"
            style={{ background: 'var(--accent)' }}
          >
            Go to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ background: 'var(--bg-surface)' }}
    >
      <div className="w-full max-w-sm animate-fade-up">
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
              Create account
            </h1>
            <p className="text-sm mt-1" style={{ color: 'var(--ink-muted)' }}>
              Join Bookify — buy and sell books
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--ink-secondary)' }}>Email</label>
              <input
                type="email" placeholder="you@example.com" value={email}
                onChange={(e) => setEmail(e.target.value)} autoComplete="email"
                className={INPUT}
                style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', color: 'var(--ink-primary)' }}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--ink-secondary)' }}>Password</label>
              <div className="relative">
                <input
                  type={showPwd ? 'text' : 'password'} placeholder="Min. 6 characters" value={password}
                  onChange={(e) => setPassword(e.target.value)} autoComplete="new-password"
                  className={INPUT + ' pr-11'}
                  style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', color: 'var(--ink-primary)' }}
                />
                <button type="button" onClick={() => setShowPwd((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--ink-muted)' }}>
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--ink-secondary)' }}>Confirm Password</label>
              <input
                type="password" placeholder="Repeat password" value={confirm}
                onChange={(e) => setConfirm(e.target.value)} autoComplete="new-password"
                className={INPUT}
                style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', color: 'var(--ink-primary)' }}
              />
            </div>

            <button
              type="submit" disabled={loading}
              className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2"
              style={{ background: 'var(--accent)' }}
            >
              {loading && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
              {loading ? 'Creating account…' : 'Create Account'}
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <hr className="flex-1" style={{ borderColor: 'var(--border)' }} />
            <span className="text-xs" style={{ color: 'var(--ink-muted)' }}>or</span>
            <hr className="flex-1" style={{ borderColor: 'var(--border)' }} />
          </div>

          <button
            onClick={handleGoogle} disabled={loading}
            className="w-full py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2.5 transition-colors hover:bg-gray-50 disabled:opacity-60"
            style={{ border: '1px solid var(--border)', color: 'var(--ink-secondary)' }}
          >
            <FcGoogle size={18} /> Continue with Google
          </button>

          <p className="text-center text-sm mt-6" style={{ color: 'var(--ink-muted)' }}>
            Already have an account?{' '}
            <Link to="/login" className="font-semibold no-underline" style={{ color: 'var(--accent)' }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;