import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart, useAuth } from '../store';

// Luhn algorithm — validates credit card numbers
const luhn = (num) => {
  const digits = num.replace(/\D/g, '');
  if (digits.length < 13) return false;
  let sum = 0;
  let alt = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let n = parseInt(digits[i], 10);
    if (alt) { n *= 2; if (n > 9) n -= 9; }
    sum += n;
    alt = !alt;
  }
  return sum % 10 === 0;
};

const formatCardNumber = (value) =>
  value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trimEnd();

const formatExpiry = (value) => {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
};

const Payment = () => {
  const navigate = useNavigate();
  const { items, getCartSubtotal, getCartShipping, getCartTotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(isAuthenticated ? 1 : 0);
  const [cardError, setCardError] = useState('');
  const [formData, setFormData] = useState({
    // Shipping
    fullName: user?.name || '',
    email: user?.email || '',
    address: '',
    city: '',
    postalCode: '',
    country: 'France',
    // Payment — never persisted, cleared after submit
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setCardError('');

    if (!luhn(formData.cardNumber)) {
      setCardError('Invalid card number.');
      return;
    }

    setIsProcessing(true);
    // Simulate payment — clear sensitive fields immediately
    setFormData((prev) => ({ ...prev, cardNumber: '', cvv: '', expiryDate: '', cardName: '' }));
    await new Promise((resolve) => setTimeout(resolve, 2000));
    clearCart();
    setIsProcessing(false);
    setStep(3); // Success
  };

  if (items.length === 0 && step !== 3) {
    return (
      <div className="bg-light min-h-screen pt-24 pb-12">
        <div className="container text-center py-16">
          <h1 className="text-3xl font-bold text-dark mb-4">Your cart is empty</h1>
          <p className="text-gray mb-6">Add some items to your cart before checkout</p>
          <button className="btn btn-primary" onClick={() => navigate('/shop')}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-light min-h-screen pt-24 pb-12">
      <div className="container">
        <h1 className="text-3xl font-bold text-dark mb-8">Checkout</h1>

        {/* Progress */}
        <div className="flex items-center gap-4 mb-8">
          <div className={`flex items-center gap-2 ${step >= 0 ? 'text-brand' : 'text-gray'}`}>
            <span className="w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center text-sm font-medium">
              1
            </span>
            <span className="text-sm font-medium hidden sm:block">Cart</span>
          </div>
          <div className="flex-1 h-px bg-gray-200" />
          <div className={`flex items-center gap-2 ${step >= 1 ? 'text-brand' : 'text-gray'}`}>
            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= 1 ? 'bg-brand text-white' : 'bg-gray-200'}`}>
              2
            </span>
            <span className="text-sm font-medium hidden sm:block">Shipping</span>
          </div>
          <div className="flex-1 h-px bg-gray-200" />
          <div className={`flex items-center gap-2 ${step >= 2 ? 'text-brand' : 'text-gray'}`}>
            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= 2 ? 'bg-brand text-white' : 'bg-gray-200'}`}>
              3
            </span>
            <span className="text-sm font-medium hidden sm:block">Payment</span>
          </div>
        </div>

        {step === 0 && (
          <div className="max-w-md mx-auto text-center">
            <p className="text-gray mb-4">Please sign in to continue with checkout</p>
            <button className="btn btn-primary" onClick={() => navigate('/login')}>
              Sign In
            </button>
          </div>
        )}

        {step === 1 && (
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-bold text-dark mb-4">Shipping Information</h2>
              <form onSubmit={handleShippingSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="fullName">Full Name</label>
                    <input
                      id="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="input"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="input"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="address">Address</label>
                  <input
                    id="address"
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="input"
                    required
                  />
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="city">City</label>
                    <input
                      id="city"
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="input"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="postalCode">Postal Code</label>
                    <input
                      id="postalCode"
                      type="text"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="input"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="country">Country</label>
                    <input
                      id="country"
                      type="text"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="input"
                      required
                    />
                  </div>
                </div>

                <button className="btn btn-primary w-full" type="submit">
                  Continue to Payment
                </button>
              </form>
            </div>

            <div className="card p-6 sticky top-24">
              <h3 className="font-semibold text-lg mb-4 text-dark">Order Summary</h3>
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={`${item.id}-${item.size}-${item.color}`} className="flex justify-between text-sm">
                    <div>
                      <p className="font-medium text-dark">{item.name}</p>
                      <p className="text-gray">{item.brand} • Size {item.size}</p>
                      <p className="text-gray">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium text-dark">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray">Subtotal</span>
                <span className="font-semibold">${getCartSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray">Shipping</span>
                <span className="font-semibold">{getCartShipping() === 0 ? 'Free' : `$${getCartShipping().toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between pt-4">
                <span className="font-bold text-dark">Total</span>
                <span className="font-bold text-brand text-xl">${getCartTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-bold text-dark mb-4">Payment Information</h2>

              {/* Demo disclaimer */}
              <div className="p-3 mb-4 bg-yellow-50 border border-yellow-200 rounded-xl text-sm text-yellow-800 flex gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 mt-0.5">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" x2="12" y1="9" y2="13" /><line x1="12" x2="12.01" y1="17" y2="17" />
                </svg>
                <span><strong>Demo mode.</strong> No real payment is processed. Do not enter real card details.</span>
              </div>

              {cardError && (
                <div role="alert" className="p-3 mb-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                  {cardError}
                </div>
              )}

              <form onSubmit={handlePaymentSubmit} className="space-y-4">
                <div>
                  <label htmlFor="cardNumber">Card Number</label>
                  <input
                    id="cardNumber"
                    type="text"
                    inputMode="numeric"
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: formatCardNumber(e.target.value) })}
                    className="input font-mono tracking-widest"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    autoComplete="cc-number"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="cardName">Name on Card</label>
                  <input
                    id="cardName"
                    type="text"
                    value={formData.cardName}
                    onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                    className="input"
                    autoComplete="cc-name"
                    required
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiryDate">Expiry Date</label>
                    <input
                      id="expiryDate"
                      type="text"
                      inputMode="numeric"
                      value={formData.expiryDate}
                      onChange={(e) => setFormData({ ...formData, expiryDate: formatExpiry(e.target.value) })}
                      className="input"
                      placeholder="MM/YY"
                      maxLength={5}
                      autoComplete="cc-exp"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="cvv">CVV</label>
                    <input
                      id="cvv"
                      type="password"
                      inputMode="numeric"
                      value={formData.cvv}
                      onChange={(e) => setFormData({ ...formData, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                      className="input"
                      placeholder="•••"
                      maxLength={4}
                      autoComplete="cc-csc"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <button type="button" className="btn btn-outline flex-1" onClick={() => setStep(1)}>
                    Back
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary flex-1"
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Processing...' : `Pay $${getCartTotal().toFixed(2)}`}
                  </button>
                </div>
              </form>
            </div>

            <div className="card p-6">
              <h3 className="font-semibold text-lg mb-4 text-dark">Order Summary</h3>
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={`${item.id}-${item.size}-${item.color}`} className="flex justify-between text-sm">
                    <div>
                      <p className="font-medium text-dark">{item.name}</p>
                      <p className="text-gray">{item.brand} • Size {item.size}</p>
                      <p className="text-gray">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium text-dark">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray">Subtotal</span>
                <span className="font-semibold">${getCartSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray">Shipping</span>
                <span className="font-semibold">{getCartShipping() === 0 ? 'Free' : `$${getCartShipping().toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between pt-4">
                <span className="font-bold text-dark">Total</span>
                <span className="font-bold text-brand text-xl">${getCartTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-brand flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-dark mb-2">Order Confirmed!</h2>
            <p className="text-gray mb-6">Thank you for your purchase. Your order has been received.</p>
            <button className="btn btn-primary" onClick={() => navigate('/shop')}>
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
