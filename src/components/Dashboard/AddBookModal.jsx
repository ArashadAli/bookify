import { useState } from 'react';
import { X, Upload, BookOpen, User, Tag, IndianRupee, AlignLeft, Image } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { addBook } from '../../services/bookService.js';
import { CATEGORIES } from '../../hooks/useBooks.js';
import toast from 'react-hot-toast';

const InputWrapper = ({ label, icon: Icon, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="flex items-center gap-1.5 text-xs font-semibold text-[var(--ink-secondary)] uppercase tracking-wide">
      <Icon size={12} className="text-[var(--accent)]" />
      {label}
    </label>
    {children}
  </div>
);

const inputCls =
  'w-full px-4 py-2.5 rounded-xl text-sm outline-none border border-[var(--border)] bg-[var(--bg-surface)] text-[var(--ink-primary)] placeholder:text-[var(--ink-muted)] focus:border-[var(--accent)] transition-colors duration-200';

const AddBookModal = ({ onClose, onSuccess }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    bookName: '', authorName: '', bookCategory: '', bookPrice: '',
    bookDescription: '', bookImage: null,
  });
  const [preview, setPreview] = useState(null);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm((f) => ({ ...f, bookImage: file }));
    setPreview(URL.createObjectURL(file));
  };

  const removeImage = (e) => {
    e.preventDefault();
    setPreview(null);
    setForm((f) => ({ ...f, bookImage: null }));
  };

  const validate = () => {
    const { bookName, authorName, bookCategory, bookPrice, bookDescription, bookImage } = form;
    if (!bookName || !authorName || !bookCategory || !bookPrice || !bookDescription || !bookImage) {
      toast.error('Please fill in all fields.');
      return false;
    }
    if (isNaN(Number(bookPrice)) || Number(bookPrice) <= 0) {
      toast.error('Enter a valid price.');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      await addBook(user.uid, form);
      toast.success('Book listed successfully!');
      onSuccess?.();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error('Failed to upload book. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl overflow-hidden animate-fade-up bg-[var(--bg-elevated)] shadow-[var(--shadow-lg)]">

        {/* ── Header ── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-light)]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[var(--accent-subtle)] flex items-center justify-center">
              <BookOpen size={15} className="text-[var(--accent)]" />
            </div>
            <div>
              <h2
                className="text-lg font-bold text-[var(--ink-primary)] leading-tight"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                List a Book
              </h2>
              <p className="text-xs text-[var(--ink-muted)] leading-tight">Fill in the details below</p>
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
        <div className="px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto">

          {/* Title + Author side by side on sm+ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputWrapper label="Book Title" icon={BookOpen}>
              <input
                type="text"
                placeholder="e.g. The Great Gatsby"
                value={form.bookName}
                onChange={set('bookName')}
                className={inputCls}
              />
            </InputWrapper>

            <InputWrapper label="Author" icon={User}>
              <input
                type="text"
                placeholder="e.g. F. Scott Fitzgerald"
                value={form.authorName}
                onChange={set('authorName')}
                className={inputCls}
              />
            </InputWrapper>
          </div>

          {/* Category + Price side by side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputWrapper label="Category" icon={Tag}>
              <select
                value={form.bookCategory}
                onChange={set('bookCategory')}
                className={inputCls}
              >
                <option value="">Select…</option>
                {CATEGORIES.filter((c) => c !== 'All').map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </InputWrapper>

            <InputWrapper label="Price (₹)" icon={IndianRupee}>
              <input
                type="number"
                placeholder="e.g. 149"
                value={form.bookPrice}
                onChange={set('bookPrice')}
                min="1"
                className={inputCls}
              />
            </InputWrapper>
          </div>

          {/* Description */}
          <InputWrapper label="Description" icon={AlignLeft}>
            <textarea
              rows={3}
              placeholder="Describe the book's condition and content…"
              value={form.bookDescription}
              onChange={set('bookDescription')}
              className={inputCls + ' resize-none'}
            />
          </InputWrapper>

          {/* Image Upload */}
          <InputWrapper label="Cover Image" icon={Image}>
            {preview ? (
              <div className="relative w-full rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--bg-surface)]">
                <img
                  src={preview}
                  alt="preview"
                  className="w-full h-40 object-cover"
                />
                <button
                  onClick={removeImage}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                >
                  <X size={13} />
                </button>
                <div className="px-3 py-2 flex items-center gap-2">
                  <span className="text-xs text-[var(--ink-muted)]">Cover uploaded</span>
                  <label className="ml-auto text-xs font-medium text-[var(--accent)] cursor-pointer hover:underline">
                    Change
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                  </label>
                </div>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center gap-2.5 w-full py-8 rounded-xl cursor-pointer border-2 border-dashed border-[var(--border)] bg-[var(--bg-surface)] hover:border-[var(--accent)] hover:bg-[var(--accent-subtle)] transition-colors duration-200 group">
                <div className="w-10 h-10 rounded-xl bg-[var(--border)] flex items-center justify-center group-hover:bg-[var(--accent-subtle)] transition-colors">
                  <Upload size={18} className="text-[var(--ink-muted)] group-hover:text-[var(--accent)] transition-colors" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-[var(--ink-secondary)] group-hover:text-[var(--accent)] transition-colors">
                    Click to upload
                  </p>
                  <p className="text-xs text-[var(--ink-muted)] mt-0.5">PNG, JPG, WEBP up to 5MB</p>
                </div>
                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </label>
            )}
          </InputWrapper>
        </div>

        {/* ── Footer ── */}
        <div className="px-6 py-4 flex gap-3 border-t border-[var(--border-light)] bg-[var(--bg-surface)]">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-sm font-medium border border-[var(--border)] text-[var(--ink-secondary)] hover:bg-[var(--bg-elevated)] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white bg-[var(--accent)] hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2 transition-opacity"
          >
            {loading && (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            {loading ? 'Uploading…' : 'List Book'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default AddBookModal;