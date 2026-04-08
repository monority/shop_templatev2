import { useNavigate } from 'react-router-dom';
import { useCart } from '../store';
import PageMeta from '../components/ui/PageMeta';
import { formatPrice } from '../utils/format';

const Cart = () => {
  const navigate = useNavigate();
  const {
    items,
    updateCartQuantity,
    removeFromCart,
    getCartSubtotal,
    getCartShipping,
    getCartTotal,
  } = useCart();

  const subtotal = getCartSubtotal();
  const shipping = getCartShipping();
  const total    = getCartTotal();

  return (
    <div className="bg-light min-h-screen">
      <PageMeta title="Your Cart" />

      {/* Header */}
      <div className="bg-brand-dark py-16 pt-24 text-white">
        <div className="container">
          <h1 className="text-4xl font-extrabold">Shopping Cart</h1>
          <p className="text-white/90 mt-2">
            {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>
      </div>

      <div className="container py-12">
        {items.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-28 h-28 mx-auto mb-6 bg-gray-100 rounded-2xl flex items-center justify-center text-5xl" aria-hidden="true">
              🛒
            </div>
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-gray mb-6">Looks like you haven't added any items yet.</p>
            <button className="btn btn-primary" onClick={() => navigate('/shop')}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={`${item.id}-${item.size}-${item.color}`} className="card flex gap-4 p-4">
                  <div className="w-28 h-28 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-lg"
                      loading="lazy"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-xs font-semibold text-brand uppercase tracking-wide">{item.brand}</span>
                        <h3 className="text-lg font-semibold text-dark mt-1">{item.name}</h3>
                        <p className="text-sm text-gray">Size: {item.size} | Color: {item.color}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id, item.size, item.color)}
                        className="w-8 h-8 rounded-full bg-gray-100 text-gray hover:bg-error hover:text-white transition-colors flex items-center justify-center"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                        </svg>
                      </button>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden" role="group" aria-label="Quantity">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.size, item.color, Math.max(1, item.quantity - 1))}
                          className="w-9 h-9 bg-white text-dark hover:bg-gray-100 transition-colors"
                          aria-label="Decrease quantity"
                        >−</button>
                        <span className="w-10 text-center font-semibold" aria-live="polite">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.size, item.color, item.quantity + 1)}
                          className="w-9 h-9 bg-white text-dark hover:bg-gray-100 transition-colors"
                          aria-label="Increase quantity"
                        >+</button>
                      </div>
                      <span className="text-xl font-bold text-dark">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              <button onClick={() => navigate('/shop')} className="btn btn-outline mt-4">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>
                </svg>
                Continue Shopping
              </button>
            </div>

            {/* Order Summary */}
            <div className="sticky top-24">
              <div className="card p-6" role="region" aria-label="Order summary">
                <h2 className="text-xl font-bold text-dark mb-4">Order Summary</h2>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray">Subtotal</span>
                    <span className="font-semibold">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray">Shipping</span>
                    <span className="font-semibold">{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                  </div>
                  {shipping === 0 && (
                    <p className="text-xs text-success" aria-live="polite">🎉 You got free shipping!</p>
                  )}
                </div>

                <div className="flex justify-between pt-4 border-t-2 border-gray-100 mb-4">
                  <span className="font-bold">Total</span>
                  <span className="text-xl font-extrabold text-brand">{formatPrice(total)}</span>
                </div>

                <button onClick={() => navigate('/checkout')} className="btn btn-primary w-full">
                  Proceed to Checkout
                </button>

                <div className="flex justify-center gap-2 mt-4 text-sm text-gray">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-success" aria-hidden="true">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                  <span>Secure checkout</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
