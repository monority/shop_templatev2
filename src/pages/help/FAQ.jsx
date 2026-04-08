import React, { useState, useCallback } from 'react';
import PageMeta from '../../components/ui/PageMeta';

const FAQS = [
  {
    category: 'Orders',
    items: [
      { q: 'How do I place an order?', a: "Browse our shop, add items to your cart, and proceed to checkout. You'll need an account to complete your purchase." },
      { q: 'Can I modify or cancel my order?', a: 'Orders can be modified or cancelled within 1 hour of placement. After that, the order is sent to our warehouse. Contact support immediately if you need to make a change.' },
      { q: 'Is my order confirmed immediately?', a: "Yes! You'll receive a confirmation email with your order details within a few minutes of placing your order." },
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
    category: 'Products & Authenticity',
    items: [
      { q: 'Are all products authentic?', a: 'Absolutely. Every item sold on Sneakara is 100% verified authentic. We source directly from brands and authorised distributors.' },
      { q: 'How do I find my size?', a: 'Check our Size Guide for a full conversion chart and measuring instructions.' },
      { q: 'Are sold-out items restocked?', a: 'Some popular styles are restocked periodically. Sign up for restock alerts on the product page.' },
    ],
  },
];

const FAQ = () => {
  const [open, setOpen] = useState(null);

  const toggle = useCallback((key) => {
    setOpen((prev) => prev === key ? null : key);
  }, []);

  return (
    <div className="min-h-screen bg-light">
      <PageMeta
        title="FAQ"
        description="Answers to our most common questions about orders, shipping, returns, and products."
      />
      <div className="bg-dark text-white py-24 px-8 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight mb-4">FAQ</h1>
        <p className="text-gray-300 text-xl max-w-2xl mx-auto">
          Answers to our most common questions.
        </p>
      </div>

      <div className="container max-w-3xl mx-auto px-6 py-20 space-y-12">
        {FAQS.map((section) => (
          <section key={section.category} aria-labelledby={`faq-${section.category}`}>
            <h2 id={`faq-${section.category}`} className="text-2xl font-bold text-dark mb-4">
              {section.category}
            </h2>
            <div className="space-y-2">
              {section.items.map((item, i) => {
                const key = `${section.category}-${i}`;
                const isOpen = open === key;
                return (
                  <div key={key} className="card overflow-hidden">
                    <button
                      onClick={() => toggle(key)}
                      className="w-full flex items-center justify-between p-5 text-left"
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${key}`}
                    >
                      <span className="font-semibold text-dark">{item.q}</span>
                      <svg
                        width="20" height="20" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2"
                        className={`flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        aria-hidden="true"
                      >
                        <path d="m6 9 6 6 6-6"/>
                      </svg>
                    </button>
                    {isOpen && (
                      <div
                        id={`faq-answer-${key}`}
                        className="px-5 pb-5 text-gray-600 border-t border-gray-100 pt-4"
                        role="region"
                      >
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ))}

        <div className="card p-8 text-center">
          <h3 className="text-xl font-bold text-dark mb-2">Still have a question?</h3>
          <p className="text-gray-500 mb-4">Our support team is here to help.</p>
          <a href="mailto:support@sneakara.com" className="btn btn-primary">
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
