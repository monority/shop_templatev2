import { useState } from 'react';
import PageMeta from '../../components/ui/PageMeta';

const TrackOrder = () => {
  const [orderId,   setOrderId]   = useState('');
  const [email,     setEmail]     = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (orderId.trim() && email.trim()) setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setOrderId('');
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-light">
      <PageMeta
        title="Track Your Order"
        description="Enter your order number and email to check your delivery status."
      />
      <div className="bg-dark text-white py-24 px-8 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight mb-4">Track Your Order</h1>
        <p className="text-gray-300 text-xl max-w-2xl mx-auto">
          Enter your details below to check your delivery status.
        </p>
      </div>

      <div className="container max-w-2xl mx-auto px-6 py-20">
        {submitted ? (
          <div className="card p-10 text-center">
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-brand mx-auto mb-4" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <h2 className="text-2xl font-bold text-dark mb-2">Checking order #{orderId}</h2>
            <p className="text-gray-500 mb-6">
              A tracking update has been sent to <strong>{email}</strong>. Please check your inbox.
            </p>
            <button onClick={handleReset} className="btn btn-primary">
              Track Another Order
            </button>
          </div>
        ) : (
          <div className="card p-10">
            <h2 className="text-2xl font-bold text-dark mb-2">Order Lookup</h2>
            <p className="text-gray-500 mb-8">
              You can find your order number in your confirmation email.
            </p>
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div>
                <label htmlFor="orderId" className="block text-sm font-semibold text-dark mb-2">
                  Order Number
                </label>
                <input
                  id="orderId"
                  type="text"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="e.g. SNK-2026-00123"
                  required
                  autoComplete="off"
                  className="input"
                />
              </div>
              <div>
                <label htmlFor="trackEmail" className="block text-sm font-semibold text-dark mb-2">
                  Email Address
                </label>
                <input
                  id="trackEmail"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                  className="input"
                />
              </div>
              <button type="submit" className="btn btn-primary w-full">
                Track Order
              </button>
            </form>
          </div>
        )}

        <div className="mt-8 card p-6">
          <h3 className="font-bold text-dark mb-2">Need help?</h3>
          <p className="text-gray-500 text-sm">
            Can't find your order? Email us at{' '}
            <a href="mailto:support@sneakara.com" className="text-brand hover:underline">
              support@sneakara.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
