import React from 'react';
import PageMeta from '../../components/ui/PageMeta';

const Section = ({ title, children }) => (
  <section className="mb-10">
    <h2 className="text-2xl font-bold text-dark mb-3">{title}</h2>
    <div className="text-gray-600 leading-relaxed space-y-3">{children}</div>
  </section>
);

const Privacy = () => (
  <>
    <PageMeta
      title="Privacy Policy"
      description="Read Sneakara's privacy policy and how we handle your personal data."
      noIndex
    />
    <div className="min-h-screen bg-light">
      <div className="bg-dark text-white py-20 px-8 text-center">
        <h1 className="text-5xl font-extrabold mb-2">Privacy Policy</h1>
        <p className="text-gray-400">Last updated: 7 April 2026</p>
      </div>

      <div className="container max-w-3xl mx-auto px-6 py-16">
        <Section title="1. Who We Are">
          <p>Sneakara SAS, registered in France (SIRET 000 000 000 00000), operates sneakara.com. For any privacy-related enquiry, contact <a href="mailto:privacy@sneakara.com" className="text-brand hover:underline">privacy@sneakara.com</a>.</p>
        </Section>

        <Section title="2. Data We Collect">
          <p>We collect the following data when you create an account or place an order:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Name, email address, and password (hashed)</li>
            <li>Shipping and billing address</li>
            <li>Order history and product preferences</li>
            <li>Device/browser information for security purposes</li>
          </ul>
        </Section>

        <Section title="3. How We Use Your Data">
          <p>Your data is used solely to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Process and deliver your orders</li>
            <li>Send order confirmations and shipping updates</li>
            <li>Provide customer support</li>
            <li>Improve our services (anonymised analytics only)</li>
          </ul>
          <p>We do <strong>not</strong> sell your data to third parties.</p>
        </Section>

        <Section title="4. Data Retention">
          <p>Account data is retained as long as your account is active. Order records are kept for 10 years as required by French accounting law. You may request deletion at any time.</p>
        </Section>

        <Section title="5. Your Rights (GDPR)">
          <p>Under the GDPR, you have the right to access, rectify, erase, restrict, and port your personal data. To exercise your rights, email <a href="mailto:privacy@sneakara.com" className="text-brand hover:underline">privacy@sneakara.com</a>.</p>
        </Section>

        <Section title="6. Cookies">
          <p>We use strictly necessary cookies to keep you logged in and maintain your cart. We do not use tracking or advertising cookies.</p>
        </Section>

        <Section title="7. Security">
          <p>Authentication is handled by Google Firebase. Passwords are never stored in plain text. Data is encrypted in transit (TLS) and at rest.</p>
        </Section>

        <Section title="8. Contact">
          <p>Sneakara SAS — 12 Rue de la Mode, 75001 Paris, France</p>
          <p>Email: <a href="mailto:privacy@sneakara.com" className="text-brand hover:underline">privacy@sneakara.com</a></p>
        </Section>
      </div>
    </div>
  </>
);

export default Privacy;
