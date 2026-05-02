import { useState } from 'react';
import { X, Camera, User, Phone, UserCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { saveUserProfile } from '../../services/userService.js';
import toast from 'react-hot-toast';

const inputCls =
  'w-full px-4 py-2.5 rounded-xl text-sm outline-none border border-[var(--border)] bg-[var(--bg-surface)] text-[var(--ink-primary)] placeholder:text-[var(--ink-muted)] focus:border-[var(--accent)] transition-colors duration-200';

const ProfileModal = ({ onClose, userProfile }) => {
  const { user } = useAuth();
  const [name,    setName]    = useState(userProfile?.name || user?.displayName || '');
  const [phone,   setPhone]   = useState(userProfile?.phone || '');
  const [imgFile, setImgFile] = useState(null);
  const [preview, setPreview] = useState(userProfile?.profile_url || user?.photoURL || null);
  const [loading, setLoading] = useState(false);

  const handleImg = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setImgFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) { toast.error('Name is required.'); return; }
    setLoading(true);
    try {
      await saveUserProfile(user.uid, { name, phone, profile_url: preview }, imgFile);
      toast.success('Profile updated!');
      onClose();
    } catch (err) {
      console.error(err);
      toast.error('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl overflow-hidden animate-fade-up bg-[var(--bg-elevated)] shadow-[var(--shadow-lg)]">

        {/* ── Header ── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-light)]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[var(--accent-subtle)]">
              <UserCircle size={15} className="text-[var(--accent)]" />
            </div>
            <div>
              <h2
                className="text-lg font-bold text-[var(--ink-primary)] leading-tight"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Edit Profile
              </h2>
              <p className="text-xs text-[var(--ink-muted)] leading-tight">Update your info</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded-xl text-[var(--ink-muted)] hover:bg-[var(--bg-surface)] hover:text-[var(--ink-primary)] transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* ── Form ── */}
        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-5">

          {/* Avatar picker */}
          <div className="flex flex-col items-center gap-2">
            <label className="relative cursor-pointer group">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-[var(--bg-surface)] ring-4 ring-[var(--border)] group-hover:ring-[var(--accent)] transition-all duration-200">
                {preview ? (
                  <img src={preview} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center text-2xl font-bold text-[var(--accent)]"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {name?.[0]?.toUpperCase() || '?'}
                  </div>
                )}
              </div>
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Camera size={18} className="text-white" />
              </div>
              <div
                className="absolute bottom-0 right-0 w-6 h-6 rounded-full flex items-center justify-center ring-2 ring-[var(--bg-elevated)]"
                style={{ background: 'var(--accent)' }}
              >
                <Camera size={11} className="text-white" />
              </div>
              <input type="file" accept="image/*" className="hidden" onChange={handleImg} />
            </label>
            <p className="text-xs text-[var(--ink-muted)]">Click to change photo</p>
          </div>

          {/* Divider */}
          <div className="h-px bg-[var(--border-light)]" />

          {/* Full Name */}
          <div className="flex flex-col gap-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-[var(--ink-secondary)] uppercase tracking-wide">
              <User size={12} className="text-[var(--accent)]" />
              Full Name
            </label>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputCls}
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-[var(--ink-secondary)] uppercase tracking-wide">
              <Phone size={12} className="text-[var(--accent)]" />
              Phone
            </label>
            <input
              type="tel"
              placeholder="+91 XXXXX XXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={inputCls}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl text-sm font-medium border border-[var(--border)] text-[var(--ink-secondary)] hover:bg-[var(--bg-surface)] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2 transition-opacity"
              style={{ background: 'var(--accent)' }}
            >
              {loading && (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              {loading ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default ProfileModal;