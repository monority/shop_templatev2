import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../../../cfg/state/Store';

const Shipping = () => {
  const navigate = useNavigate();
  const state_products = useStore(state => state.user.products);
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    shippingMethod: 'standard'
  });

  // Validation state
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFormAlert, setShowFormAlert] = useState(false);

  // Shipping options
  const shippingOptions = [
    {
      id: 'standard',
      name: 'Standard Shipping',
      price: 0,
      estimatedDays: '5-7 business days',
      description: 'Reliable delivery with tracking'
    },
    {
      id: 'express',
      name: 'Express Shipping',
      price: 15,
      estimatedDays: '2-3 business days',
      description: 'Fast delivery with priority handling'
    },
    {
      id: 'overnight',
      name: 'Overnight Shipping',
      price: 35,
      estimatedDays: '1 business day',
      description: 'Next day delivery for urgent orders'
    }
  ];

  // Calculate total
  const calculateTotal = () => {
    const productsTotal = state_products?.reduce((total, product) => 
      total + (parseFloat(product.price) * product.quantity), 0) || 0;
    const selectedShipping = shippingOptions.find(option => option.id === formData.shippingMethod);
    const shippingCost = selectedShipping?.price || 0;
    return productsTotal + shippingCost;
  };

  // Handle form changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Hide form alert when user starts typing
    if (showFormAlert) {
      setShowFormAlert(false);
    }
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required';
    if (!formData.country.trim()) newErrors.country = 'Country is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Show form alert if validation fails
      setShowFormAlert(true);
      
      // Auto-hide alert after 5 seconds
      setTimeout(() => {
        setShowFormAlert(false);
      }, 5000);
      
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/checkout/payment');
    }, 1500);
  };

  return (
    <section id="checkout_shipping">
      <div className="lyt_container gap4">
        {/* Breadcrumb */}
        <div className="wrapper_center">
          <div className="breadcrumb">
            <Link className="inactive" to="/cart">Cart</Link>
            <span className="separator"> → </span>
            <Link className="active" to="/checkout/shipping">Location</Link>
            <span className="separator"> → </span>
            <Link className="inactive" to="/checkout/payment">Payment</Link>
          </div>
        </div>

        <div className="checkout-layout">
          {/* Main Content */}
          <div className="checkout-main">
            <div className="checkout-section">
              <h1>Shipping Information</h1>
              <p>Enter your delivery details to complete your order.</p>
            </div>

            <form onSubmit={handleSubmit} className="shipping-form">
              {/* Form Alert */}
              {showFormAlert && (
                <div className="form-alert">
                  <div className="alert-icon">⚠️</div>
                  <div className="alert-content">
                    <h3>Please complete all required fields</h3>
                    <p>
                      All shipping information fields are required to proceed to payment. Please fill in your contact details and shipping address.
                    </p>
                    <div className="alert-fields">
                      {Object.keys(errors).length > 0 && (
                        <ul>
                          {Object.entries(errors).map(([field, error]) => (
                            <li key={field}>{error}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                  <button 
                    type="button" 
                    className="alert-close" 
                    onClick={() => setShowFormAlert(false)}
                    aria-label="Close alert"
                  >
                    ×
                  </button>
                </div>
              )}

              {/* Contact Information */}
              <div className="form-section">
                <h2>Contact Information</h2>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`input_default ${errors.firstName ? 'error' : ''}`}
                    />
                    {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`input_default ${errors.lastName ? 'error' : ''}`}
                    />
                    {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`input_default ${errors.email ? 'error' : ''}`}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="input_default"
                      placeholder="+33 6 12 34 56 78"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="form-section">
                <h2>Shipping Address</h2>
                <div className="form-grid">
                  <div className="form-group full-width">
                    <label htmlFor="address">Street Address *</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`input_default ${errors.address ? 'error' : ''}`}
                      placeholder="123 Main Street"
                    />
                    {errors.address && <span className="error-message">{errors.address}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="city">City *</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`input_default ${errors.city ? 'error' : ''}`}
                    />
                    {errors.city && <span className="error-message">{errors.city}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="postalCode">Postal Code *</label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className={`input_default ${errors.postalCode ? 'error' : ''}`}
                      placeholder="75001"
                    />
                    {errors.postalCode && <span className="error-message">{errors.postalCode}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="country">Country *</label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className={`input_default ${errors.country ? 'error' : ''}`}
                    >
                      <option value="">Select Country</option>
                      <option value="FR">France</option>
                      <option value="BE">Belgium</option>
                      <option value="DE">Germany</option>
                      <option value="IT">Italy</option>
                      <option value="ES">Spain</option>
                      <option value="NL">Netherlands</option>
                    </select>
                    {errors.country && <span className="error-message">{errors.country}</span>}
                  </div>
                </div>
              </div>

              {/* Shipping Methods */}
              <div className="form-section">
                <h2>Shipping Method</h2>
                <div className="shipping-options">
                  {shippingOptions.map(option => (
                    <label key={option.id} className="shipping-option">
                      <input
                        type="radio"
                        name="shippingMethod"
                        value={option.id}
                        checked={formData.shippingMethod === option.id}
                        onChange={handleInputChange}
                        className="shipping-radio"
                      />
                      <div className="shipping-option-content">
                        <div className="shipping-header">
                          <span className="shipping-name">{option.name}</span>
                          <span className="shipping-price">
                            {option.price === 0 ? 'FREE' : `€${option.price}`}
                          </span>
                        </div>
                        <p className="shipping-description">{option.description}</p>
                        <span className="shipping-days">{option.estimatedDays}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn btn_secondary" 
                  onClick={() => navigate('/cart')}
                >
                  Back to Cart
                </button>
                <button 
                  type="submit" 
                  className="btn btn_base_highlight"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : 'Continue to Payment'}
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
                  <span>€{(state_products?.reduce((total, product) => 
                    total + (parseFloat(product.price) * product.quantity), 0) || 0).toFixed(2)}</span>
                </div>
                <div className="total-row">
                  <span>Shipping</span>
                  <span>
                    {shippingOptions.find(option => option.id === formData.shippingMethod)?.price === 0 
                      ? 'FREE' 
                      : `€${shippingOptions.find(option => option.id === formData.shippingMethod)?.price || 0}`}
                  </span>
                </div>
                <div className="total-row total-final">
                  <span>Total</span>
                  <span>€{calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Shipping;
