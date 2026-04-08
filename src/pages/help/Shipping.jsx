import React from 'react';
import { Link } from 'react-router-dom';
import PageMeta from '../../components/ui/PageMeta';

const METHODS = [
  { name: 'Standard Shipping',  time: '3–5 business days',                    price: '€5.99',  free: 'Free on orders over €100' },
  { name: 'Express Shipping',   time: '1–2 business days',                    price: '€12.99', free: null },
  { name: 'Next Day Delivery',  time: 'Next business day (order before 2pm)', price: '€19.99', free: null },
  { name: 'International',      time: '5–10 business days',                   price: 'From €14.99', free: null },
];

const Shipping = () => (
  <div className="min-h-screen bg-light">
    <PageMeta
      title="Shipping Info"
      description="Fast, tracked delivery straight to your door. View all delivery options and processing times."
    />
    <div className="bg-dark text-white py-24 px-8 text-center">
      <h1 className="text-5xl font-extrabold tracking-tight mb-4">Shipping Info</h1>
      <p className="text-gray-300 text-xl max-w-2xl mx-auto">
        Fast, tracked delivery straight to your door.
      </p>
    </div>

    <div className="container max-w-4xl mx-auto px-6 py-20 space-y-12">
      <section aria-labelledby="delivery-options">
        <h2 id="delivery-options" className="text-3xl font-bold text-dark mb-6">Delivery Options</h2>
        <div className="space-y-3">
          {METHODS.map(({ name, time, price, free }) => (
            <div key={name} className="card p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div>
                <p className="font-bold text-dark">{name}</p>
                <p className="text-gray-500 text-sm">{time}</p>
                {free && <p className="text-brand text-sm font-semibold mt-1">{free}</p>}
              </div>
              <div className="font-bold text-dark text-lg flex-shrink-0">{price}</div>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="processing-time">
        <h2 id="processing-time" className="text-3xl font-bold text-dark mb-4">Processing Time</h2>
        <p className="text-gray-600 leading-relaxed">
          All orders placed before <strong>2:00 PM (CET)</strong> on a business day are typically processed
          and dispatched the same day. Orders placed after 2 PM, on weekends, or public holidays will be
          processed the next business day.
        </p>
      </section>

      <section aria-labelledby="tracking">
        <h2 id="tracking" className="text-3xl font-bold text-dark mb-4">Tracking Your Order</h2>
        <p className="text-gray-600 leading-relaxed">
          Once your order ships, you'll receive an email with a tracking number. You can also track your
          order at any time from the <Link to="/help/track" className="text-brand hover:underline">Track Order</Link> page.
        </p>
      </section>

      <section aria-labelledby="international">
        <h2 id="international" className="text-3xl font-bold text-dark mb-4">International Shipping</h2>
        <p className="text-gray-600 leading-relaxed">
          We ship to over 40 countries. International orders may be subject to customs duties and taxes
          which are the responsibility of the recipient. Delivery times may vary depending on customs
          processing in your country.
        </p>
      </section>

      <div className="card p-6 bg-brand/5 border border-brand/20">
        <h3 className="font-bold text-dark mb-1">Questions about your delivery?</h3>
        <p className="text-gray-600 text-sm">
          Email us at <a href="mailto:support@sneakara.com" className="text-brand hover:underline">support@sneakara.com</a>
        </p>
      </div>
    </div>
  </div>
);

export default Shipping;
