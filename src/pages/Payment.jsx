import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart, useAuth } from '../store';
import { Button } from '../components/ui/Button';

const Payment = () => {
  const navigate = useNavigate();
  const { items, getCartSubtotal, getCartShipping, getCartTotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(isAuthenticated ? 1 : 0);
  const [formData, setFormData] = useState({
    // Shipping
    fullName: user?.name || '',
    email: user?.email || '',
    address: '',
    city: '',
    postalCode: '',
    country: 'France',
    // Payment
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
    setIsProcessing(true);
    
    // Simulate payment processing
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
              <form onSubmit={handlePaymentSubmit} className="space-y-4">
                <div>
                  <label htmlFor="cardNumber">Card Number</label>
                  <input
                    id="cardNumber"
                    type="text"
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                    className="input"
                    placeholder="1234 5678 9012 3456"
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
                    required
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiryDate">Expiry Date</label>
                    <input
                      id="expiryDate"
                      type="text"
                      value={formData.expiryDate}
                      onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                      className="input"
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="cvv">CVV</label>
                    <input
                      id="cvv"
                      type="text"
                      value={formData.cvv}
                      onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                      className="input"
                      placeholder="123"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-4">
            <button className="btn btn-outline flex-1" onClick={() => setStep(1)}>
              Back
            </button>
            <button
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
