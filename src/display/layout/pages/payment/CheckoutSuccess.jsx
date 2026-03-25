import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../../../cfg/state/Store';
import { useToast, ToastContainer } from '../../../components/ui/Toast';

const CheckoutSuccess = () => {
  const navigate = useNavigate();
  const state_products = useStore(state => state.user.products);
  const toast = useToast();

  useEffect(() => {
    // Clear cart after successful order
    const clearCart = useStore.getState().removeAllProducts;
    clearCart();
    
    // Show success message
    toast.showSuccess('Order placed successfully! Thank you for your purchase.', {
      duration: 5000
    });
  }, [toast]);

  // Calculate order details
  const calculateTotal = () => {
    return state_products?.reduce((total, product) => 
      total + (parseFloat(product.price) * product.quantity), 0) || 0;
  };

  const generateOrderNumber = () => {
    return `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  };

  const orderNumber = generateOrderNumber();
  const orderTotal = calculateTotal();
  const orderDate = new Date().toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleContinueShopping = () => {
    navigate('/');
  };

  const handleTrackOrder = () => {
    // In a real app, this would navigate to order tracking
    toast.showInfo('Order tracking feature coming soon!', {
      duration: 3000
    });
  };

  return (
    <section id="checkout_success">
      <div className="lyt_container gap4">
        {/* Success Header */}
        <div className="success-header">
          <div className="success-icon">
            <div className="checkmark">
              <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="26" cy="26" r="25" stroke="currentColor" strokeWidth="2"/>
                <path d="M16 26L22 32L36 18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div className="success-content">
            <h1>Order Confirmed!</h1>
            <p>Thank you for your purchase. Your order has been successfully processed.</p>
          </div>
        </div>

        {/* Order Details */}
        <div className="order-details">
          <h2>Order Information</h2>
          
          <div className="order-info-grid">
            <div className="info-item">
              <label>Order Number</label>
              <span className="order-number">{orderNumber}</span>
            </div>
            
            <div className="info-item">
              <label>Order Date</label>
              <span>{orderDate}</span>
            </div>
            
            <div className="info-item">
              <label>Total Amount</label>
              <span className="order-total">€{orderTotal.toFixed(2)}</span>
            </div>
            
            <div className="info-item">
              <label>Payment Method</label>
              <span>Credit Card</span>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="order-summary">
          <h2>Order Summary</h2>
          
          <div className="summary-items">
            {state_products?.map((product, index) => (
              <div key={index} className="summary-item">
                <div className="item-info">
                  <h4>{product.title}</h4>
                  <p>Quantity: {product.quantity}</p>
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
              <span>€{orderTotal.toFixed(2)}</span>
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
              <span>€{orderTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="next-steps">
          <h2>What's Next?</h2>
          
          <div className="steps-grid">
            <div className="step-item">
              <div className="step-icon">📧</div>
              <div className="step-content">
                <h3>Confirmation Email</h3>
                <p>You'll receive an order confirmation email shortly with all the details.</p>
              </div>
            </div>
            
            <div className="step-item">
              <div className="step-icon">📦</div>
              <div className="step-content">
                <h3>Order Processing</h3>
                <p>We'll prepare your items for shipment within 1-2 business days.</p>
              </div>
            </div>
            
            <div className="step-item">
              <div className="step-icon">🚚</div>
              <div className="step-content">
                <h3>Shipping</h3>
                <p>You'll receive tracking information once your order ships.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="success-actions">
          <button 
            className="btn btn_secondary" 
            onClick={handleTrackOrder}
          >
            Track Order
          </button>
          <button 
            className="btn btn_base_highlight" 
            onClick={handleContinueShopping}
          >
            Continue Shopping
          </button>
        </div>
      </div>
      
      {/* Toast Container */}
      <ToastContainer toasts={toast.toasts} position="top-right" />
    </section>
  );
};

export default CheckoutSuccess;
