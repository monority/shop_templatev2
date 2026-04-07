import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Section = ({ title, children }) => (
    <section className="mb-10">
        <h2 className="text-2xl font-bold text-dark mb-3">{title}</h2>
        <div className="text-gray-600 leading-relaxed space-y-3">{children}</div>
    </section>
);

const Terms = () => (
    <>
        <Helmet>
            <title>Terms & Conditions · Sneakara</title>
            <meta name="description" content="Sneakara's terms and conditions of sale." />
        </Helmet>
        <div className="min-h-screen bg-light">
            <div className="bg-dark text-white py-20 px-8 text-center">
                <h1 className="text-5xl font-extrabold mb-2">Terms & Conditions</h1>
                <p className="text-gray-400">Last updated: 7 April 2026</p>
            </div>

            <div className="container max-w-3xl mx-auto px-6 py-16">
                <Section title="1. Company Information">
                    <p>Sneakara SAS — 12 Rue de la Mode, 75001 Paris, France. SIRET: 000 000 000 00000. VAT: FR00000000000.</p>
                </Section>

                <Section title="2. Products & Pricing">
                    <p>All prices are displayed in Euros (€) inclusive of French VAT (20%). Sneakara reserves the right to modify prices at any time. Products are sold subject to availability. All items are guaranteed authentic.</p>
                </Section>

                <Section title="3. Orders & Payment">
                    <p>An order is confirmed only after payment is successfully processed. We accept major credit/debit cards. By placing an order you confirm you are at least 18 years of age.</p>
                </Section>

                <Section title="4. Shipping">
                    <p>Delivery times and costs are detailed on our <Link to="/help/shipping" className="text-brand hover:underline">Shipping Info</Link> page. Risk of loss passes to the buyer upon delivery.</p>
                </Section>

                <Section title="5. Right of Withdrawal">
                    <p>Under French consumer law (Code de la consommation), you have <strong>14 days</strong> from receipt of goods to withdraw from a purchase without giving a reason. Items must be returned unused, in original packaging. See our <Link to="/help/returns" className="text-brand hover:underline">Returns Policy</Link> for the procedure.</p>
                </Section>

                <Section title="6. Legal Guarantees">
                    <p>All products benefit from the legal guarantee of conformity (Article L217-4 of the Consumer Code) and the guarantee against hidden defects (Article 1641 of the Civil Code).</p>
                </Section>

                <Section title="7. Limitation of Liability">
                    <p>Sneakara's liability is limited to the value of the order placed. We are not liable for indirect damages, loss of profits, or consequential losses.</p>
                </Section>

                <Section title="8. Dispute Resolution">
                    <p>In the event of a dispute, you may contact us first at <a href="mailto:support@sneakara.com" className="text-brand hover:underline">support@sneakara.com</a>. If unresolved, you may refer the matter to the competent French courts or use the EU Online Dispute Resolution platform.</p>
                </Section>

                <Section title="9. Governing Law">
                    <p>These terms are governed by French law. Any dispute shall be subject to the exclusive jurisdiction of the courts of Paris.</p>
                </Section>
            </div>
        </div>
    </>
);

export default Terms;
