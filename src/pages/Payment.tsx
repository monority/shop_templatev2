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
  <div className="card p-6 sticky top-24">
    <h3 className="font-semibold text-lg mb-4 text-dark">Order Summary</h3>
    <div className="space-y-3 mb-4">
      {items.map((item) => (
        <div key={`${item.id}-${item.size}-${item.color}`} className="flex justify-between text-sm">
          <div>
            <p className="font-medium text-dark">{item.name}</p>
            <p className="text-gray">{item.brand} · Size {item.size}</p>
            <p className="text-gray">Qty: {item.quantity}</p>
          </div>
          <p className="font-medium text-dark">{formatPrice(item.price * item.quantity)}</p>
        </div>
      ))}
    </div>
    <div className="flex justify-between py-2 border-b border-gray-100">
      <span className="text-gray">Subtotal</span>
      <span className="font-semibold">{formatPrice(getCartSubtotal())}</span>
    </div>
    <div className="flex justify-between py-2 border-b border-gray-100">
      <span className="text-gray">Shipping</span>
      <span className="font-semibold">{getCartShipping() === 0 ? 'Free' : formatPrice(getCartShipping())}</span>
    </div>
    <div className="flex justify-between pt-4">
      <span className="font-bold text-dark">Total</span>
      <span className="font-bold text-brand text-xl">{formatPrice(getCartTotal())}</span>
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
      <div className="bg-light min-h-screen pt-24 pb-12">
        <div className="container text-center py-16">
          <h1 className="text-3xl font-bold text-dark mb-4">Your cart is empty</h1>
          <p className="text-gray mb-6">Add some items before checkout</p>
          <button className="btn btn-primary" onClick={() => navigate('/shop')}>Continue Shopping</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-light min-h-screen pt-24 pb-12">
      <div className="container">
        <h1 className="text-3xl font-bold text-dark mb-8">Checkout</h1>
        <Stepper current={step} />

        {step === 0 && (
          <div className="max-w-md mx-auto text-center">
            <p className="text-gray mb-4">Please sign in to continue</p>
            <button className="btn btn-primary" onClick={() => navigate('/login', { state: { from: { pathname: '/checkout' } } })}>
              Sign In
            </button>
          </div>
        )}

        {step === 1 && (
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-bold text-dark mb-4">Shipping Information</h2>
              <form onSubmit={handleShippingSubmit} className="space-y-4" noValidate>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="fullName" className="form-label">Full Name</label>
                    <input id="fullName" type="text" value={formData.fullName} onChange={set('fullName')} className="input" required autoComplete="name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="form-label">Email</label>
                    <input id="email" type="email" value={formData.email} onChange={set('email')} className="input" required autoComplete="email" />
                  </div>
                </div>
                <div>
                  <label htmlFor="address" className="form-label">Address</label>
                  <input id="address" type="text" value={formData.address} onChange={set('address')} className="input" required autoComplete="street-address" />
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="city" className="form-label">City</label>
                    <input id="city" type="text" value={formData.city} onChange={set('city')} className="input" required autoComplete="address-level2" />
                  </div>
                  <div>
                    <label htmlFor="postalCode" className="form-label">Postal Code</label>
                    <input id="postalCode" type="text" value={formData.postalCode} onChange={set('postalCode')} className="input" required autoComplete="postal-code" />
                  </div>
                  <div>
                    <label htmlFor="country" className="form-label">Country</label>
                    <input id="country" type="text" value={formData.country} onChange={set('country')} className="input" required autoComplete="country-name" />
                  </div>
                </div>
                <button className="btn btn-primary w-full" type="submit">Continue to Payment</button>
              </form>
            </div>
            <OrderSummary items={items} getCartSubtotal={getCartSubtotal} getCartShipping={getCartShipping} getCartTotal={getCartTotal} />
          </div>
        )}

        {step === 2 && (
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-bold text-dark mb-4">Payment Information</h2>

              <div className="p-3 mb-4 bg-yellow-50 border border-yellow-200 rounded-xl text-sm text-yellow-800 flex gap-2" role="note">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 mt-0.5" aria-hidden="true">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                  <line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/>
                </svg>
                <span><strong>Demo mode.</strong> No real payment is processed.</span>
              </div>

              {cardError && (
                <div role="alert" className="p-3 mb-4 bg-error/10 border border-error/30 rounded-xl text-sm text-error" aria-live="assertive">
                  {cardError}
                </div>
              )}

              <form onSubmit={handlePaymentSubmit} className="space-y-4" noValidate>
                <div>
                  <label htmlFor="cardNumber" className="form-label">Card Number</label>
                  <input
                    id="cardNumber" type="text" inputMode="numeric"
                    value={formData.cardNumber}
                    onChange={(e) => setFormData((p) => ({ ...p, cardNumber: formatCardNumber(e.target.value) }))}
                    className="input font-mono tracking-widest" placeholder="1234 5678 9012 3456"
                    maxLength={19} autoComplete="cc-number" required
                  />
                </div>
                <div>
                  <label htmlFor="cardName" className="form-label">Name on Card</label>
                  <input id="cardName" type="text" value={formData.cardName} onChange={set('cardName')} className="input" autoComplete="cc-name" required />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiryDate" className="form-label">Expiry Date</label>
                    <input
                      id="expiryDate" type="text" inputMode="numeric"
                      value={formData.expiryDate}
                      onChange={(e) => setFormData((p) => ({ ...p, expiryDate: formatExpiry(e.target.value) }))}
                      className="input" placeholder="MM/YY" maxLength={5} autoComplete="cc-exp" required
                    />
                  </div>
                  <div>
                    <label htmlFor="cvv" className="form-label">CVV</label>
                    <input
                      id="cvv" type="password" inputMode="numeric"
                      value={formData.cvv}
                      onChange={(e) => setFormData((p) => ({ ...p, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
                      className="input" placeholder="•••" maxLength={4} autoComplete="cc-csc" required
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <button type="button" className="btn btn-outline flex-1" onClick={() => setStep(1)}>Back</button>
                  <button type="submit" className="btn btn-primary flex-1" disabled={isProcessing}>
                    {isProcessing ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-spin" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" strokeDasharray="60" strokeDashoffset="30"/>
                      </svg>
                    ) : `Pay ${formatPrice(getCartTotal())}`}
                  </button>
                </div>
              </form>
            </div>
            <OrderSummary items={items} getCartSubtotal={getCartSubtotal} getCartShipping={getCartShipping} getCartTotal={getCartTotal} />
          </div>
        )}

        {step === 3 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-success flex items-center justify-center" role="status" aria-live="polite">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-dark mb-2">Order Confirmed!</h2>
            <p className="text-gray mb-8">Thank you for your purchase. Your order has been received.</p>
            <div className="flex gap-3 justify-center">
              <button className="btn btn-primary" onClick={() => navigate('/shop')}>Continue Shopping</button>
              <button className="btn btn-ghost" onClick={() => navigate('/profile')}>View Orders</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
