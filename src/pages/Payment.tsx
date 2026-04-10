import { useState, useCallback, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart, useAuth } from '../store';
import { formatPrice } from '../utils/format';

// ── Utils ─────────────────────────────────────────────────────────────────────
const luhn = (num) => {
  const digits = num.replace(/\D/g, '');
  if (digits.length < 13) return false;
  let sum = 0, alt = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let n = parseInt(digits[i], 10);
    if (alt) { n *= 2; if (n > 9) n -= 9; }
    sum += n;
    alt = !alt;
  }
  return sum % 10 === 0;
};

const formatCardNumber = (v) =>
  v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trimEnd();

const formatExpiry = (v) => {
  const d = v.replace(/\D/g, '').slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
};

// ── OrderSummary ──────────────────────────────────────────────────────────────
const OrderSummary = ({ items, getCartSubtotal, getCartShipping, getCartTotal }) => (
  <div className="border border-white/[0.06] p-6 self-start sticky top-24">
    <p className="text-white/25 text-[10px] tracking-[0.25em] uppercase mb-6">Order Summary</p>
    <div className="space-y-4 mb-6 pb-6 border-b border-white/[0.06]">
      {items.map((item) => (
        <div key={`${item.id}-${item.size}-${item.color}`} className="flex justify-between text-sm gap-4">
          <div>
            <p className="text-white/70 font-medium leading-tight">{item.name}</p>
            <p className="text-white/30 text-xs mt-0.5">{item.brand} · Qty {item.quantity}</p>
          </div>
          <p className="text-white/60 flex-shrink-0">{formatPrice(item.price * item.quantity)}</p>
        </div>
      ))}
    </div>
    <div className="space-y-2 mb-6 pb-6 border-b border-white/[0.06]">
      <div className="flex justify-between text-sm">
        <span className="text-white/40">Subtotal</span>
        <span className="text-white/60">{formatPrice(getCartSubtotal())}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-white/40">Shipping</span>
        <span className="text-white/60">{getCartShipping() === 0 ? 'Free' : formatPrice(getCartShipping())}</span>
      </div>
    </div>
    <div className="flex justify-between">
      <span className="text-white font-semibold">Total</span>
      <span className="text-white font-bold text-lg">{formatPrice(getCartTotal())}</span>
    </div>
  </div>
);

// ── Stepper ───────────────────────────────────────────────────────────────────
const STEPS = ['Cart', 'Shipping', 'Payment'];

const Stepper = ({ current }) => (
  <div className="flex items-center gap-4 mb-8" role="navigation" aria-label="Checkout steps">
    {STEPS.map((label, i) => {
      const step = i + 1;
      const active = current >= step;
      return (
        <Fragment key={label}>
          {i > 0 && <div className="flex-1 h-px bg-gray-200" />}
          <div className={`flex items-center gap-2 ${active ? 'text-brand' : 'text-gray'}`}>
            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${active ? 'bg-brand text-white' : 'bg-gray-200 text-gray-500'}`}>
              {step}
            </span>
            <span className="text-sm font-medium hidden sm:block">{label}</span>
          </div>
        </Fragment>
      );
    })}
  </div>
);

// ── Page ──────────────────────────────────────────────────────────────────────
const Payment = () => {
  const navigate = useNavigate();
  const { items, getCartSubtotal, getCartShipping, getCartTotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();

  const [step,         setStep]         = useState(isAuthenticated ? 1 : 0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardError,    setCardError]    = useState('');
  const [formData,     setFormData]     = useState({
    fullName:   user?.username || '',
    email:      user?.email    || '',
    address:    '',
    city:       '',
    postalCode: '',
    country:    'France',
    cardNumber: '',
    cardName:   '',
    expiryDate: '',
    cvv:        '',
  });

  const set = useCallback((field) => (e) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value })), []);

  const handleShippingSubmit = useCallback((e) => {
    e.preventDefault();
    setStep(2);
  }, []);

  const handlePaymentSubmit = useCallback(async (e) => {
    e.preventDefault();
    setCardError('');
    if (!luhn(formData.cardNumber)) {
      setCardError('Invalid card number.');
      return;
    }
    setIsProcessing(true);
    setFormData((prev) => ({ ...prev, cardNumber: '', cvv: '', expiryDate: '', cardName: '' }));
    await new Promise((r) => setTimeout(r, 2000));
    clearCart();
    setIsProcessing(false);
    setStep(3);
  }, [formData.cardNumber, clearCart]);

  if (items.length === 0 && step !== 3) {
    return (
      <div className="bg-[#0a0a0a] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/20 text-sm tracking-widest uppercase mb-6">Your cart is empty</p>
          <button className="text-white text-xs tracking-[0.2em] uppercase border-b border-white/20 pb-0.5 hover:border-white transition-colors" onClick={() => navigate('/shop')}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      <div className="border-b border-white/[0.06] py-10">
        <div className="container">
          <p className="text-white/30 text-[11px] tracking-[0.25em] uppercase mb-3">Checkout</p>
          <h1 className="text-white" style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 0.95 }}>
            Secure Checkout
          </h1>
        </div>
      </div>

        {step === 0 && (
          <div className="container py-16 max-w-md mx-auto text-center">
            <p className="text-white/40 text-sm mb-6">Please sign in to continue</p>
            <button className="w-full py-4 bg-white text-[#0a0a0a] text-xs font-bold tracking-[0.2em] uppercase hover:bg-white/90 transition-colors" onClick={() => navigate('/login', { state: { from: { pathname: '/checkout' } } })}>
              Sign In
            </button>
          </div>
        )}

        {step === 1 && (
          <div className="container py-12 grid lg:grid-cols-2 gap-12">
            <div>
              <p className="text-white/30 text-[11px] tracking-[0.25em] uppercase mb-6">Step 1 of 2</p>
              <h2 className="text-white mb-6" style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.5rem' }}>Shipping Information</h2>
              <form onSubmit={handleShippingSubmit} className="space-y-4" noValidate>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="fullName" className="block text-white/30 text-[11px] tracking-[0.2em] uppercase mb-2">Full Name</label>
                    <input id="fullName" type="text" value={formData.fullName} onChange={set('fullName')} className="input w-full" required autoComplete="name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-white/30 text-[11px] tracking-[0.2em] uppercase mb-2">Email</label>
                    <input id="email" type="email" value={formData.email} onChange={set('email')} className="input w-full" required autoComplete="email" />
                  </div>
                </div>
                <div>
                  <label htmlFor="address" className="block text-white/30 text-[11px] tracking-[0.2em] uppercase mb-2">Address</label>
                  <input id="address" type="text" value={formData.address} onChange={set('address')} className="input w-full" required autoComplete="street-address" />
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-white/30 text-[11px] tracking-[0.2em] uppercase mb-2">City</label>
                    <input id="city" type="text" value={formData.city} onChange={set('city')} className="input w-full" required autoComplete="address-level2" />
                  </div>
                  <div>
                    <label htmlFor="postalCode" className="block text-white/30 text-[11px] tracking-[0.2em] uppercase mb-2">Postal Code</label>
                    <input id="postalCode" type="text" value={formData.postalCode} onChange={set('postalCode')} className="input w-full" required autoComplete="postal-code" />
                  </div>
                  <div>
                    <label htmlFor="country" className="block text-white/30 text-[11px] tracking-[0.2em] uppercase mb-2">Country</label>
                    <input id="country" type="text" value={formData.country} onChange={set('country')} className="input w-full" required autoComplete="country-name" />
                  </div>
                </div>
                <button className="w-full py-4 bg-white text-[#0a0a0a] text-xs font-bold tracking-[0.2em] uppercase hover:bg-white/90 transition-colors mt-2" type="submit">Continue to Payment</button>
              </form>
            </div>
            <OrderSummary items={items} getCartSubtotal={getCartSubtotal} getCartShipping={getCartShipping} getCartTotal={getCartTotal} />
          </div>
        )}

        {step === 2 && (
          <div className="container py-12 grid lg:grid-cols-2 gap-12">
            <div>
              <p className="text-white/30 text-[11px] tracking-[0.25em] uppercase mb-6">Step 2 of 2</p>
              <h2 className="text-white mb-6" style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.5rem' }}>Payment</h2>

              <div className="border border-white/10 bg-white/[0.03] px-4 py-3 mb-6 text-white/40 text-xs flex gap-2" role="note">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 mt-0.5 flex-shrink-0"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>
                Demo mode — no real payment is processed.
              </div>

              {cardError && (
                <div role="alert" className="border border-accent/30 bg-accent/5 text-accent/80 px-4 py-3 text-xs mb-6" aria-live="assertive">{cardError}</div>
              )}

              <form onSubmit={handlePaymentSubmit} className="space-y-5" noValidate>
                <div>
                  <label htmlFor="cardNumber" className="block text-white/30 text-[11px] tracking-[0.2em] uppercase mb-2">Card Number</label>
                  <input id="cardNumber" type="text" inputMode="numeric" value={formData.cardNumber} onChange={(e) => setFormData((p) => ({ ...p, cardNumber: formatCardNumber(e.target.value) }))} className="input w-full font-mono tracking-widest" placeholder="1234 5678 9012 3456" maxLength={19} autoComplete="cc-number" required />
                </div>
                <div>
                  <label htmlFor="cardName" className="block text-white/30 text-[11px] tracking-[0.2em] uppercase mb-2">Name on Card</label>
                  <input id="cardName" type="text" value={formData.cardName} onChange={set('cardName')} className="input w-full" autoComplete="cc-name" required />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiryDate" className="block text-white/30 text-[11px] tracking-[0.2em] uppercase mb-2">Expiry</label>
                    <input id="expiryDate" type="text" inputMode="numeric" value={formData.expiryDate} onChange={(e) => setFormData((p) => ({ ...p, expiryDate: formatExpiry(e.target.value) }))} className="input w-full" placeholder="MM/YY" maxLength={5} autoComplete="cc-exp" required />
                  </div>
                  <div>
                    <label htmlFor="cvv" className="block text-white/30 text-[11px] tracking-[0.2em] uppercase mb-2">CVV</label>
                    <input id="cvv" type="password" inputMode="numeric" value={formData.cvv} onChange={(e) => setFormData((p) => ({ ...p, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))} className="input w-full" placeholder="•••" maxLength={4} autoComplete="cc-csc" required />
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" className="flex-1 py-4 border border-white/10 text-white/40 text-xs tracking-[0.2em] uppercase hover:text-white hover:border-white/30 transition-colors" onClick={() => setStep(1)}>Back</button>
                  <button type="submit" className="flex-1 py-4 bg-white text-[#0a0a0a] text-xs font-bold tracking-[0.2em] uppercase hover:bg-white/90 transition-colors disabled:opacity-50" disabled={isProcessing}>
                    {isProcessing ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-spin mx-auto"><circle cx="12" cy="12" r="10" strokeDasharray="60" strokeDashoffset="30"/></svg> : `Pay ${formatPrice(getCartTotal())}`}
                  </button>
                </div>
              </form>
            </div>
            <OrderSummary items={items} getCartSubtotal={getCartSubtotal} getCartShipping={getCartShipping} getCartTotal={getCartTotal} />
          </div>
        )}

        {step === 3 && (
          <div className="container py-24 text-center max-w-md mx-auto">
            <div className="w-12 h-12 border border-white/20 flex items-center justify-center mx-auto mb-8" role="status" aria-live="polite">
              <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <p className="text-white/30 text-[11px] tracking-[0.25em] uppercase mb-3">Confirmed</p>
            <h2 className="text-white mb-4" style={{ fontFamily: "'DM Serif Display', serif", fontSize: '2rem' }}>Order Received</h2>
            <p className="text-white/40 text-sm mb-10">Thank you for your purchase. Your timepiece is being prepared for dispatch.</p>
            <div className="flex items-center justify-center gap-8">
              <button
                className="text-white text-xs tracking-[0.2em] uppercase border-b border-white/20 pb-0.5 hover:border-white transition-colors"
                onClick={() => navigate('/shop')}
              >
                Continue Shopping
              </button>
              <span className="w-px h-4 bg-white/10" aria-hidden="true" />
              <button
                className="text-white/40 text-xs tracking-[0.2em] uppercase hover:text-white transition-colors"
                onClick={() => navigate('/profile')}
              >
                View Orders
              </button>
            </div>
          </div>
        )}
    </div>
  );
};

export default Payment;
