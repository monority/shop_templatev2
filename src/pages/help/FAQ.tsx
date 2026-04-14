import { useState, useCallback } from 'react';
import PageMeta from '../../components/ui/PageMeta';
import { DarkPage, DarkSection } from '../../components/ui/DarkPage';
import { Reveal } from '../../components/ui/Reveal';
import { motion, AnimatePresence } from 'framer-motion';

const FAQS = [
  {
    category: 'Orders',
    items: [
      { q: 'How do I place an order?', a: "Browse our collection, add items to your cart, and proceed to checkout. You'll need an account to complete your purchase." },
      { q: 'Can I modify or cancel my order?', a: 'Orders can be modified or cancelled within 1 hour of placement. Contact support immediately if you need to make a change.' },
      { q: 'Is my order confirmed immediately?', a: "Yes — you'll receive a confirmation email with your order details within a few minutes." },
    ],
  },
  {
    category: 'Shipping',
    items: [
      { q: 'How long does shipping take?', a: 'Standard shipping takes 3–5 business days. Express options (1–2 days) are available at checkout.' },
      { q: 'Do you ship internationally?', a: 'Yes, we ship to over 40 countries. International delivery typically takes 5–10 business days.' },
      { q: 'How do I track my order?', a: "You'll receive a tracking link by email once your order ships. You can also use our Track Order page." },
    ],
  },
  {
    category: 'Returns & Refunds',
    items: [
      { q: 'What is your return policy?', a: 'We accept returns within 30 days of delivery for unworn items in original condition and packaging.' },
      { q: 'How long do refunds take?', a: 'Once we receive your return, refunds are processed within 3–5 business days to your original payment method.' },
      { q: 'Are return shipping costs free?', a: 'Yes, returns from France are free. International return shipping may incur a small fee.' },
    ],
  },
  {
    category: 'Authentication',
    items: [
      { q: 'Are all watches authentic?', a: 'Absolutely. Every timepiece sold on HORLOGÉS is 100% verified authentic by our expert horologists. We source directly from authorised dealers.' },
      { q: 'Do you sell pre-owned watches?', a: 'Yes. All pre-owned pieces go through our rigorous authentication process before listing.' },
      { q: 'Are sold-out references restocked?', a: 'Some popular references are restocked periodically. Sign up for restock alerts on the product page.' },
    ],
  },
];

const FAQ = () => {
  const [open, setOpen] = useState<string | null>(null);
  const toggle = useCallback((key: string) => setOpen((p) => p === key ? null : key), []);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <PageMeta title="FAQ" description="Answers to common questions about orders, shipping, returns, and watch authentication at HORLOGÉS." canonical="/help/faq" />
      <DarkPage title="FAQ" subtitle="Answers to our most common questions about orders, shipping, and authentication." label="Help">
        {FAQS.map((section) => (
          <Reveal key={section.category}>
            <DarkSection title={section.category} id={`faq-${section.category}`}>
              <div className="space-y-px bg-white/[0.04]">
                {section.items.map((item, i) => {
                  const key = `${section.category}-${i}`;
                  return (
                    <div key={key} className="bg-[#0a0a0a]">
                      <button
                        onClick={() => toggle(key)}
                        className="w-full flex items-center justify-between p-5 text-left group"
                        aria-expanded={open === key}
                      >
                        <span className="text-white/70 text-sm group-hover:text-white transition-colors">{item.q}</span>
                        <motion.svg
                          width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                          className="text-white/25 flex-shrink-0 ml-4"
                          animate={{ rotate: open === key ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <path d="m6 9 6 6 6-6" />
                        </motion.svg>
                      </button>
                      <AnimatePresence>
                        {open === key && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <p className="px-5 pb-5 text-white/35 text-sm leading-relaxed border-t border-white/[0.06] pt-4">{item.a}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </DarkSection>
          </Reveal>
        ))}

        <Reveal>
          <div className="border border-white/[0.06] p-8 text-center">
            <p className="text-white/25 text-[10px] tracking-[0.25em] uppercase mb-3">Support</p>
            <h3 className="text-white mb-2" style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.5rem' }}>Still have a question?</h3>
            <p className="text-white/40 text-sm mb-6">Our support team is here to help.</p>
            <a href="mailto:support@horloge.com" className="inline-flex items-center gap-2 text-white text-xs tracking-[0.2em] uppercase border-b border-white/20 pb-0.5 hover:border-white transition-colors">
              Contact Support
            </a>
          </div>
        </Reveal>
      </DarkPage>
    </div>
  );
};

export default FAQ;
