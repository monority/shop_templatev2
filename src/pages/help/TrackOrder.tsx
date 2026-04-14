import { useState } from 'react';
import PageMeta from '../../components/ui/PageMeta';
import { DarkPage } from '../../components/ui/DarkPage';
import { Reveal } from '../../components/ui/Reveal';
import { motion } from 'framer-motion';

const TrackOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId.trim() && email.trim()) setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <PageMeta title="Track Your Order" description="Enter your order number and email to check your HORLOGÉS delivery status in real time." canonical="/help/track" />
      <DarkPage title="Track Order" subtitle="Enter your order number and email to check your delivery status." label="Tracking" maxWidth="max-w-xl">

        <Reveal>
          {submitted ? (
            <div className="border border-white/[0.06] p-10 text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="w-12 h-12 border border-white/20 flex items-center justify-center mx-auto mb-6"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/60">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </motion.div>
              <p className="text-white/30 text-[11px] tracking-[0.25em] uppercase mb-3">Tracking</p>
              <h2 className="text-white mb-2" style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.5rem' }}>
                Checking #{orderId}
              </h2>
              <p className="text-white/40 text-sm mb-8">
                A tracking update has been sent to <span className="text-white/60">{email}</span>. Please check your inbox.
              </p>
              <button
                onClick={() => { setSubmitted(false); setOrderId(''); setEmail(''); }}
                className="text-white text-xs tracking-[0.2em] uppercase border-b border-white/20 pb-0.5 hover:border-white transition-colors"
              >
                Track Another Order
              </button>
            </div>
          ) : (
            <div className="border border-white/[0.06] p-8">
              <p className="text-white/30 text-[11px] tracking-[0.25em] uppercase mb-6">Order Lookup</p>
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div>
                  <label htmlFor="orderId" className="block text-white/30 text-[11px] tracking-[0.2em] uppercase mb-2">Order Number</label>
                  <input
                    id="orderId" type="text" value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    placeholder="e.g. HRL-2026-00123"
                    required autoComplete="off"
                    className="input w-full"
                  />
                </div>
                <div>
                  <label htmlFor="trackEmail" className="block text-white/30 text-[11px] tracking-[0.2em] uppercase mb-2">Email Address</label>
                  <input
                    id="trackEmail" type="email" value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required autoComplete="email"
                    className="input w-full"
                  />
                </div>
                <button type="submit" className="w-full py-4 bg-white text-[#0a0a0a] text-xs font-bold tracking-[0.2em] uppercase hover:bg-white/90 transition-colors">
                  Track Order
                </button>
              </form>
            </div>
          )}
        </Reveal>

        <Reveal>
          <div className="border border-white/[0.06] p-6">
            <p className="text-white/40 text-sm">
              Can't find your order? Email{' '}
              <a href="mailto:support@horloge.com" className="text-white/70 hover:text-white transition-colors">support@horloge.com</a>
            </p>
          </div>
        </Reveal>
      </DarkPage>
    </div>
  );
};

export default TrackOrder;
