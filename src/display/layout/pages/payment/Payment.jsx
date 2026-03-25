import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../../../cfg/state/Store';
import { useToast, ToastContainer } from '../../../components/ui/Toast';

const Payment = () => {
  const navigate = useNavigate();
  const state_products = useStore(state => state.user.products);
  const toast = useToast();
  
  // Form state
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    billingAddress: 'same',
    saveCard: false
  });

  // Payment state
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('card');

  // Calculate totals
  const calculateTotal = () => {
    return state_products?.reduce((total, product) => 
      total + (parseFloat(product.price) * product.quantity), 0) || 0;
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Format card number
  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\s/g, '');
    const chunks = cleaned.match(/.{1,4}/g) || [];
    return chunks.join(' ').substr(0, 19);
  };

  // Format expiry date
  const formatExpiryDate = (value) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (paymentMethod === 'card') {
      if (!formData.cardNumber.replace(/\s/g, '').trim()) {
        newErrors.cardNumber = 'Card number is required';
      } else if (formData.cardNumber.replace(/\s/g, '').length < 13) {
        newErrors.cardNumber = 'Invalid card number';
      }
      
      if (!formData.cardName.trim()) {
        newErrors.cardName = 'Cardholder name is required';
      }
      
      if (!formData.expiryDate.trim()) {
        newErrors.expiryDate = 'Expiry date is required';
      } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
        newErrors.expiryDate = 'Invalid expiry date (MM/YY)';
      }
      
      if (!formData.cvv.trim()) {
        newErrors.cvv = 'CVV is required';
      } else if (!/^\d{3,4}$/.test(formData.cvv)) {
        newErrors.cvv = 'Invalid CVV';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Show warning toast with specific error details
      const errorFields = Object.keys(errors);
      let message = 'Please complete all required fields to proceed with payment.';
      
      if (paymentMethod === 'card') {
        message = 'Card number, cardholder name, expiry date, and CVV are required to proceed with payment.';
        
        // Add specific error details
        if (errorFields.length > 0) {
          const errorList = errorFields.map(field => {
            const fieldNames = {
              cardNumber: 'Card number',
              cardName: 'Cardholder name',
              expiryDate: 'Expiry date',
              cvv: 'CVV'
            };
            return fieldNames[field] || field;
          }).join(', ');
          
          message += ` Missing: ${errorList}`;
        }
      } else {
        message = 'Please select a payment method to continue.';
      }
      
      toast.showWarning(message, {
        duration: 6000,
        action: {
          label: 'Focus First Error',
          onClick: () => {
            // Focus on first error field
            const firstErrorField = document.querySelector('.input_default.error');
            if (firstErrorField) {
              firstErrorField.focus();
              firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }
        }
      });
      
      return;
    }
    
    // Show loading toast
    const loadingToastId = toast.showLoading('Processing payment...', { duration: 0 });
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast.removeToast(loadingToastId);
      toast.showSuccess('Payment processed successfully!', { duration: 3000 });
      
      // Navigate to success page after a short delay
      setTimeout(() => {
        navigate('/checkout/success');
      }, 1500);
    }, 2000);
  };

  return (
    <section id="checkout_payment">
      <div className="lyt_container gap4">
        {/* Breadcrumb */}
        <div className="wrapper_center">
          <div className="breadcrumb">
            <Link className="inactive" to="/cart">Cart</Link>
            <span className="separator"> → </span>
            <Link className="inactive" to="/checkout/shipping">Location</Link>
            <span className="separator"> → </span>
            <Link className="active" to="/checkout/payment">Payment</Link>
          </div>
        </div>

        <div className="checkout-layout">
          {/* Main Content */}
          <div className="checkout-main">
            <div className="checkout-section">
              <h1>Payment Information</h1>
              <p>Complete your purchase securely with our payment system.</p>
            </div>

            <form onSubmit={handleSubmit} className="payment-form">
              {/* Payment Methods */}
              <div className="form-section">
                <h2>Payment Method</h2>
                <div className="payment-methods">
                  <label className="payment-method">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="payment-radio"
                    />
                    <div className="payment-method-content">
                      <span className="payment-name">Credit/Debit Card</span>
                      <div className="payment-icons">
                        <span className="card-icon visa">VISA</span>
                        <span className="card-icon mastercard">MC</span>
                        <span className="card-icon amex">AMEX</span>
                      </div>
                    </div>
                  </label>
                  
                  <label className="payment-method">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      checked={paymentMethod === 'paypal'}
                      onChange={() => setPaymentMethod('paypal')}
                      className="payment-radio"
                    />
                    <div className="payment-method-content">
                      <span className="payment-name">PayPal</span>
                      <span className="payment-description">Pay safely with PayPal</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Card Details */}
              {paymentMethod === 'card' && (
                <>
                  <div className="form-section">
                    <h2>Card Details</h2>
                    <div className="form-grid">
                      <div className="form-group full-width">
                        <label htmlFor="cardNumber">Card Number *</label>
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={(e) => handleInputChange({
                            ...e,
                            target: { ...e.target, value: formatCardNumber(e.target.value) }
                          })}
                          className={`input_default ${errors.cardNumber ? 'error' : ''}`}
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                        />
                        {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
                      </div>
                      
                      <div className="form-group full-width">
                        <label htmlFor="cardName">Cardholder Name *</label>
                        <input
                          type="text"
                          id="cardName"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          className={`input_default ${errors.cardName ? 'error' : ''}`}
                          placeholder="John Doe"
                        />
                        {errors.cardName && <span className="error-message">{errors.cardName}</span>}
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="expiryDate">Expiry Date *</label>
                        <input
                          type="text"
                          id="expiryDate"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={(e) => handleInputChange({
                            ...e,
                            target: { ...e.target, value: formatExpiryDate(e.target.value) }
                          })}
                          className={`input_default ${errors.expiryDate ? 'error' : ''}`}
                          placeholder="MM/YY"
                          maxLength={5}
                        />
                        {errors.expiryDate && <span className="error-message">{errors.expiryDate}</span>}
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="cvv">CVV *</label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          className={`input_default ${errors.cvv ? 'error' : ''}`}
                          placeholder="123"
                          maxLength={4}
                        />
                        {errors.cvv && <span className="error-message">{errors.cvv}</span>}
                        <small className="cvv-hint">3 or 4 digits on back of card</small>
                      </div>
                    </div>
                  </div>

                  {/* Billing Address */}
                  <div className="form-section">
                    <h2>Billing Address</h2>
                    <div className="billing-options">
                      <label className="billing-option">
                        <input
                          type="radio"
                          name="billingAddress"
                          value="same"
                          checked={formData.billingAddress === 'same'}
                          onChange={handleInputChange}
                          className="billing-radio"
                        />
                        <span>Same as shipping address</span>
                      </label>
                      
                      <label className="billing-option">
                        <input
                          type="radio"
                          name="billingAddress"
                          value="different"
                          checked={formData.billingAddress === 'different'}
                          onChange={handleInputChange}
                          className="billing-radio"
                        />
                        <span>Use a different billing address</span>
                      </label>
                    </div>
                    
                    {formData.billingAddress === 'different' && (
                      <div className="different-billing">
                        <p>Billing address form would go here...</p>
                      </div>
                    )}
                  </div>

                  {/* Save Card */}
                  <div className="form-section">
                    <label className="save-card-option">
                      <input
                        type="checkbox"
                        name="saveCard"
                        checked={formData.saveCard}
                        onChange={handleInputChange}
                        className="save-card-checkbox"
                      />
                      <span>Save card information for future purchases</span>
                    </label>
                  </div>
                </>
              )}

              {/* PayPal Option */}
              {paymentMethod === 'paypal' && (
                <div className="form-section">
                  <div className="paypal-section">
                    <p>You will be redirected to PayPal to complete your payment.</p>
                    <div className="paypal-preview">
                      <span className="paypal-logo">PayPal</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Notice */}
              <div className="security-notice">
                <div className="security-icon">🔒</div>
                <div className="security-text">
                  <h3>Secure Payment</h3>
                  <p>Your payment information is encrypted and secure. We never store your card details.</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn btn_secondary" 
                  onClick={() => navigate('/checkout/shipping')}
                >
                  Back to Shipping
                </button>
                <button 
                  type="submit" 
                  className="btn btn_base_highlight"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <span className="processing-spinner">
                      <span className="spinner"></span>
                      Processing...
                    </span>
                  ) : (
                    `Pay €${calculateTotal().toFixed(2)}`
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="checkout-sidebar">
            <div className="order-summary">
              <h2>Order Summary</h2>
              
              <div className="summary-items">
                {state_products?.map((product, index) => (
                  <div key={index} className="summary-item">
                    <div className="item-info">
                      <h4>{product.title}</h4>
                      <p>Qty: {product.quantity}</p>
                    </div>
                    <span className="item-price">
                      €{(parseFloat(product.price) * product.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="summary-totals">
                <div className="total-row">
                  <span>Subtotal</span>
                  <span>€{calculateTotal().toFixed(2)}</span>
                </div>
                <div className="total-row">
                  <span>Shipping</span>
                  <span>FREE</span>
                </div>
                <div className="total-row">
                  <span>Tax</span>
                  <span>€0.00</span>
                </div>
                <div className="total-row total-final">
                  <span>Total</span>
                  <span>€{calculateTotal().toFixed(2)}</span>
                </div>
              </div>
              
              <div className="accepted-cards">
                <p>We accept:</p>
                <div className="card-logos">
                  <span className="card-logo">VISA</span>
                  <span className="card-logo">MC</span>
                  <span className="card-logo">AMEX</span>
                  <span className="card-logo">PayPal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Toast Container */}
      <ToastContainer toasts={toast.toasts} position="top-right" />
    </section>
  );
};

export default Payment;
