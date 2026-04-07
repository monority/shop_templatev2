import React from 'react';
import { Link } from 'react-router-dom';

const Returns = () => (
    <div className="min-h-screen bg-light">
        <div className="bg-dark text-white py-24 px-8 text-center">
            <h1 className="text-5xl font-extrabold tracking-tight mb-4">Returns & Exchanges</h1>
            <p className="text-gray-300 text-xl max-w-2xl mx-auto">
                Not the right fit? No problem.
            </p>
        </div>

        <div className="container max-w-4xl mx-auto px-6 py-20 space-y-12">
            {/* Overview */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { icon: '📅', title: '30 Days', text: 'You have 30 days from delivery to initiate a return.' },
                    { icon: '📦', title: 'Free Returns', text: 'Returns within France are completely free.' },
                    { icon: '⚡', title: 'Fast Refunds', text: 'Refunds processed within 3–5 business days.' },
                ].map(({ icon, title, text }) => (
                    <div key={title} className="card p-6 text-center">
                        <div className="text-4xl mb-3">{icon}</div>
                        <h3 className="font-bold text-dark text-lg mb-2">{title}</h3>
                        <p className="text-gray-500 text-sm">{text}</p>
                    </div>
                ))}
            </section>

            {/* Eligibility */}
            <section>
                <h2 className="text-3xl font-bold text-dark mb-4">Return Eligibility</h2>
                <p className="text-gray-600 mb-4">To be eligible for a return, items must be:</p>
                <ul className="space-y-2">
                    {[
                        'Unworn and in original condition',
                        'In the original box with all tags and packaging',
                        'Returned within 30 days of the delivery date',
                        'Not marked as Final Sale',
                    ].map((item) => (
                        <li key={item} className="flex items-center gap-3 text-gray-700">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-brand flex-shrink-0">
                                <path d="M20 6 9 17l-5-5" />
                            </svg>
                            {item}
                        </li>
                    ))}
                </ul>
            </section>

            {/* How to return */}
            <section>
                <h2 className="text-3xl font-bold text-dark mb-6">How to Return</h2>
                <div className="space-y-4">
                    {[
                        { step: '1', title: 'Email us', text: 'Send your order number and reason to support@sneakara.com' },
                        { step: '2', title: 'Receive label', text: "We'll send a prepaid return label within 24 hours." },
                        { step: '3', title: 'Ship it back', text: 'Drop off the parcel at your nearest carrier location.' },
                        { step: '4', title: 'Get refunded', text: 'Refund issued to original payment method in 3–5 days.' },
                    ].map(({ step, title, text }) => (
                        <div key={step} className="card p-5 flex items-start gap-4">
                            <div className="w-8 h-8 bg-brand text-white rounded-full flex items-center justify-center font-extrabold text-sm flex-shrink-0">{step}</div>
                            <div>
                                <p className="font-bold text-dark">{title}</p>
                                <p className="text-gray-500 text-sm">{text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Exchanges */}
            <section>
                <h2 className="text-3xl font-bold text-dark mb-4">Exchanges</h2>
                <p className="text-gray-600 leading-relaxed">
                    We don't offer direct exchanges. To get a different size or colour, simply return the original
                    item and place a new order. This is the fastest way to get the right pair.
                </p>
            </section>

            <div className="text-center">
                <a href="mailto:support@sneakara.com" className="btn btn-primary">Start a Return</a>
            </div>
        </div>
    </div>
);

export default Returns;
