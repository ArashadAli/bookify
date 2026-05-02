import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CheckCircle, ArrowLeft, MapPin, CreditCard, ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { createOrder } from '../services/orderService.js';
import toast from 'react-hot-toast';

const STEP = { ADDRESS: 1, PAYMENT: 2, SUCCESS: 3 };

const INPUT =
  'w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200';
const inputStyle = {
  background: 'var(--bg-surface)',
  border: '1px solid var(--border)',
  color: 'var(--ink-primary)',
};

/* ── Address Form ── */
const AddressForm = ({ address, onChange, onNext }) => {
  const fields = [
    { name: 'name',    label: 'Full Name',    placeholder: 'Rahul Sharma',    type: 'text' },
    { name: 'phone',   label: 'Phone',        placeholder: '+91 98765 43210', type: 'tel'  },
    { name: 'street',  label: 'Street / Area',placeholder: '12 MG Road, Banjara Hills', type: 'text' },
    { name: 'city',    label: 'City',         placeholder: 'Hyderabad',       type: 'text' },
    { name: 'state',   label: 'State',        placeholder: 'Telangana',       type: 'text' },
    { name: 'pincode', label: 'PIN Code',     placeholder: '500034',          type: 'text' },
  ];

  const validate = () => {
    for (const f of fields) {
      if (!address[f.name]?.trim()) { toast.error(`${f.label} is required.`); return false; }
    }
    if (!/^\d{6}$/.test(address.pincode)) { toast.error('Enter a valid 6-digit PIN code.'); return false; }
    if (!/^\d{10}$/.test(address.phone.replace(/\D/g, ''))) { toast.error('Enter a valid 10-digit phone number.'); return false; }
    return true;
  };

  return (
    <div
      className="rounded-2xl p-6 md:p-8"
      style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'var(--accent-subtle)' }}>
          <MapPin size={18} style={{ color: 'var(--accent)' }} />
        </div>
        <h2 className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--ink-primary)' }}>
          Delivery Address
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map(({ name, label, placeholder, type }) => (
          <div key={name} className={name === 'street' ? 'sm:col-span-2' : ''}>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--ink-secondary)' }}>
              {label}
            </label>
            <input
              type={type}
              placeholder={placeholder}
              value={address[name]}
              onChange={(e) => onChange(name, e.target.value)}
              className={INPUT}
              style={inputStyle}
            />
          </div>
        ))}
      </div>

      <button
        onClick={() => validate() && onNext()}
        className="w-full mt-6 py-3 rounded-xl font-semibold text-sm text-white transition-opacity hover:opacity-90"
        style={{ background: 'var(--accent)' }}
      >
        Continue to Payment →
      </button>
    </div>
  );
};

/* ── Payment Panel ── */
const PaymentPanel = ({ cartItems, cartTotal, onConfirm, loading, onBack }) => (
  <div
    className="rounded-2xl p-6 md:p-8"
    style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}
  >
    <div className="flex items-center gap-3 mb-6">
      <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'var(--accent-subtle)' }}>
        <CreditCard size={18} style={{ color: 'var(--accent)' }} />
      </div>
      <h2 className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--ink-primary)' }}>
        Payment
      </h2>
    </div>

    {/* Simulated card UI */}
    <div
      className="rounded-xl p-5 mb-6"
      style={{ background: 'linear-gradient(135deg, var(--ink-primary) 0%, var(--ink-secondary) 100%)' }}
    >
      <p className="text-xs font-semibold mb-4 opacity-60 text-white tracking-widest">DEMO CARD</p>
      <p className="text-white font-mono text-lg tracking-widest mb-3">4242  4242  4242  4242</p>
      <div className="flex justify-between text-xs text-white opacity-60">
        <span>VALID THRU 12/29</span>
        <span>CVV •••</span>
      </div>
    </div>

    <div
      className="text-sm rounded-xl px-4 py-3 mb-6 flex items-start gap-2"
      style={{ background: 'var(--accent-subtle)', color: 'var(--ink-secondary)' }}
    >
      <span className="mt-0.5">ℹ️</span>
      <span>This is a demo — no real payment will be processed. Click &ldquo;Pay Now&rdquo; to simulate a successful transaction.</span>
    </div>

    {/* Order items summary */}
    <div className="space-y-2 mb-4">
      {cartItems.map((item) => (
        <div key={item.cartDocId} className="flex justify-between text-sm">
          <span className="truncate mr-2" style={{ color: 'var(--ink-secondary)' }}>{item.bookName}</span>
          <span className="font-medium shrink-0" style={{ color: 'var(--ink-primary)' }}>₹{item.bookPrice}</span>
        </div>
      ))}
    </div>
    <div className="flex justify-between font-bold text-base pt-3" style={{ borderTop: '1px solid var(--border)' }}>
      <span style={{ color: 'var(--ink-primary)' }}>Total</span>
      <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-display)' }}>₹{cartTotal.toFixed(2)}</span>
    </div>

    <div className="flex gap-3 mt-6">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 px-4 py-3 rounded-xl text-sm font-medium transition-colors"
        style={{ border: '1px solid var(--border)', color: 'var(--ink-secondary)' }}
      >
        <ArrowLeft size={14} /> Back
      </button>
      <button
        onClick={onConfirm}
        disabled={loading}
        className="flex-1 py-3 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-opacity hover:opacity-90 disabled:opacity-60"
        style={{ background: 'var(--accent)' }}
      >
        {loading && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
        {loading ? 'Processing…' : `Pay ₹${cartTotal.toFixed(2)}`}
      </button>
    </div>
  </div>
);

/* ── Success Screen ── */
const SuccessScreen = ({ orderId }) => (
  <div
    className="rounded-2xl p-10 text-center animate-fade-up"
    style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-md)' }}
  >
    <CheckCircle size={60} className="mx-auto mb-5" style={{ color: 'var(--success)' }} />
    <h2
      className="text-3xl font-bold mb-2"
      style={{ fontFamily: 'var(--font-display)', color: 'var(--ink-primary)' }}
    >
      Order Placed!
    </h2>
    <p className="text-sm mb-1" style={{ color: 'var(--ink-muted)' }}>
      Your books are on their way 🎉
    </p>
    <p className="text-xs font-mono mb-8" style={{ color: 'var(--ink-muted)' }}>
      Order ID: {orderId}
    </p>
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      <Link
        to="/orders"
        className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white no-underline hover:opacity-90 transition-opacity"
        style={{ background: 'var(--accent)' }}
      >
        <ShoppingBag size={15} /> View My Orders
      </Link>
      <Link
        to="/"
        className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm no-underline transition-colors hover:bg-gray-50"
        style={{ border: '1px solid var(--border)', color: 'var(--ink-secondary)' }}
      >
        Continue Browsing
      </Link>
    </div>
  </div>
);

/* ── Main CheckoutPage ── */
const CheckoutPage = () => {
  const { user }               = useAuth();
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate               = useNavigate();

  const [step, setStep]   = useState(STEP.ADDRESS);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [address, setAddress] = useState({
    name: '', phone: '', street: '', city: '', state: '', pincode: '',
  });

  const handleAddressChange = (field, value) => setAddress((a) => ({ ...a, [field]: value }));

  const handleConfirmPayment = async () => {
    if (cartItems.length === 0) { toast.error('Your cart is empty.'); return; }
    setLoading(true);
    try {
      const id = await createOrder(user.uid, cartItems, address);
      await clearCart();
      setOrderId(id);
      setStep(STEP.SUCCESS);
    } catch (err) {
      console.error(err);
      toast.error('Order failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Redirect if cart is empty and not on success
  if (cartItems.length === 0 && step !== STEP.SUCCESS) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-4"
        style={{ background: 'var(--bg-surface)' }}
      >
        <p className="text-lg" style={{ color: 'var(--ink-muted)' }}>Your cart is empty.</p>
        <Link
          to="/"
          className="px-6 py-3 rounded-xl font-semibold text-white no-underline hover:opacity-90 transition-opacity"
          style={{ background: 'var(--accent)' }}
        >
          Browse Books
        </Link>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen py-10 px-4"
      style={{ background: 'var(--bg-surface)' }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Back link */}
        {step !== STEP.SUCCESS && (
          <Link
            to="/cart"
            className="inline-flex items-center gap-1.5 text-sm no-underline mb-6 transition-colors"
            style={{ color: 'var(--ink-muted)' }}
          >
            <ArrowLeft size={14} /> Back to cart
          </Link>
        )}

        {/* Progress indicator */}
        {step !== STEP.SUCCESS && (
          <div className="flex items-center gap-2 mb-8">
            {[
              { s: STEP.ADDRESS, label: 'Address' },
              { s: STEP.PAYMENT, label: 'Payment' },
            ].map(({ s, label }, idx) => (
              <div key={s} className="flex items-center gap-2">
                {idx > 0 && <div className="w-8 h-px" style={{ background: 'var(--border)' }} />}
                <div className="flex items-center gap-2">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors"
                    style={
                      step >= s
                        ? { background: 'var(--accent)', color: '#fff' }
                        : { background: 'var(--bg-surface)', color: 'var(--ink-muted)', border: '1px solid var(--border)' }
                    }
                  >
                    {idx + 1}
                  </div>
                  <span className="text-sm font-medium hidden sm:inline" style={{ color: step >= s ? 'var(--ink-primary)' : 'var(--ink-muted)' }}>
                    {label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Step content */}
        {step === STEP.ADDRESS && (
          <AddressForm address={address} onChange={handleAddressChange} onNext={() => setStep(STEP.PAYMENT)} />
        )}
        {step === STEP.PAYMENT && (
          <PaymentPanel
            cartItems={cartItems}
            cartTotal={cartTotal}
            onConfirm={handleConfirmPayment}
            loading={loading}
            onBack={() => setStep(STEP.ADDRESS)}
          />
        )}
        {step === STEP.SUCCESS && <SuccessScreen orderId={orderId} />}
      </div>
    </div>
  );
};

export default CheckoutPage;