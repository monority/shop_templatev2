import { useNavigate } from 'react-router-dom';
import { useCart } from '../store';
import PageMeta from '../components/ui/PageMeta';
import { formatPrice } from '../utils/format';
import useImageFallback from '../hooks/useImageFallback';

const Cart = () => {
  const navigate = useNavigate();
  const { items, updateCartQuantity, removeFromCart, getCartSubtotal, getCartShipping, getCartTotal } = useCart();
  const handleImgError = useImageFallback();
  const subtotal = getCartSubtotal();
  const shipping  = getCartShipping();
  const total     = getCartTotal();

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      <PageMeta title="Your Cart" />

      {/* Header */}
      <div className="border-b border-white/[0.06] py-16">
        <div className="container">
          <p className="text-white/30 text-[11px] tracking-[0.25em] uppercase mb-3">
            {items.length} {items.length === 1 ? 'item' : 'items'}
          </p>
          <h1 className="text-white" style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 0.95 }}>
            Shopping Cart
          </h1>
        </div>
      </div>

      <div className="container py-12">
        {items.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-white/20 text-sm tracking-widest uppercase mb-8">Your cart is empty</p>
            <button
              className="text-white text-xs tracking-[0.2em] uppercase border-b border-white/20 pb-0.5 hover:border-white transition-colors"
              onClick={() => navigate('/shop')}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12">

            {/* Items */}
            <div className="lg:col-span-2 space-y-0 divide-y divide-white/[0.06]">
              {items.map((item) => (
                <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-5 py-6">
                  <div className="w-24 h-24 flex-shrink-0 bg-[#111] overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" loading="lazy" onError={handleImgError} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <p className="text-white/30 text-[10px] tracking-[0.2em] uppercase mb-1">{item.brand}</p>
                        <h3 className="text-white text-sm font-medium leading-tight">{item.name}</h3>
                        <p className="text-white/25 text-xs mt-1">Size {item.size} · {item.color}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id, item.size!, item.color!)}
                        className="text-white/20 hover:text-white transition-colors flex-shrink-0"
                        aria-label={`Remove ${item.name}`}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                        </svg>
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-white/10" role="group" aria-label="Quantity">
                        <button onClick={() => updateCartQuantity(item.id, item.size!, item.color!, Math.max(1, item.quantity - 1))} className="w-8 h-8 text-white/30 hover:text-white transition-colors text-sm">−</button>
                        <span className="w-8 text-center text-white text-sm">{item.quantity}</span>
                        <button onClick={() => updateCartQuantity(item.id, item.size!, item.color!, item.quantity + 1)} className="w-8 h-8 text-white/30 hover:text-white transition-colors text-sm">+</button>
                      </div>
                      <span className="text-white font-medium">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  </div>
                </div>
              ))}

              <div className="pt-6">
                <button
                  onClick={() => navigate('/shop')}
                  className="flex items-center gap-2 text-white/30 text-xs tracking-[0.2em] uppercase hover:text-white transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
                  Continue Shopping
                </button>
              </div>
            </div>

            {/* Summary */}
            <div className="lg:sticky lg:top-24 self-start">
              <div className="border border-white/[0.06] p-6" role="region" aria-label="Order summary">
                <p className="text-white/30 text-[11px] tracking-[0.25em] uppercase mb-6">Order Summary</p>

                <div className="space-y-3 mb-6 pb-6 border-b border-white/[0.06]">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">Subtotal</span>
                    <span className="text-white">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">Shipping</span>
                    <span className="text-white">{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                  </div>
                  {shipping === 0 && (
                    <p className="text-white/30 text-xs" aria-live="polite">Free shipping applied</p>
                  )}
                </div>

                <div className="flex justify-between mb-8">
                  <span className="text-white font-semibold">Total</span>
                  <span className="text-white text-xl font-bold">{formatPrice(total)}</span>
                </div>

                <button onClick={() => navigate('/checkout')} className="w-full py-4 bg-white text-[#0a0a0a] text-xs font-bold tracking-[0.2em] uppercase hover:bg-white/90 transition-colors">
                  Checkout
                </button>

                <div className="flex items-center justify-center gap-2 mt-4 text-white/20 text-xs">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  Secure checkout
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
