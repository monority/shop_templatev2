import { Link } from 'react-router-dom';
import PageMeta from '../../components/ui/PageMeta';
import { DarkPage } from '../../components/ui/DarkPage';
import { Reveal } from '../../components/ui/Reveal';

const S = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Reveal>
    <section className="border-b border-white/[0.06] pb-10">
      <h2 className="text-white font-semibold mb-3 text-sm tracking-wide">{title}</h2>
      <div className="text-white/40 text-sm leading-relaxed space-y-3">{children}</div>
    </section>
  </Reveal>
);

const Terms = () => (
  <>
    <PageMeta title="Terms & Conditions" noIndex />
    <div className="min-h-screen bg-[#0a0a0a]">
      <DarkPage title="Terms & Conditions" subtitle="Last updated: 7 April 2026" label="Legal" maxWidth="max-w-3xl">
        <S title="1. Company Information">
          <p>HORLOGÉS SAS — 12 Rue de la Paix, 75001 Paris, France. SIRET: 000 000 000 00000. VAT: FR00000000000.</p>
        </S>
        <S title="2. Products & Pricing">
          <p>All prices are in Euros (€) inclusive of French VAT (20%). HORLOGÉS reserves the right to modify prices at any time. All timepieces are guaranteed authentic.</p>
        </S>
        <S title="3. Orders & Payment">
          <p>An order is confirmed only after payment is successfully processed. We accept major credit/debit cards. By placing an order you confirm you are at least 18 years of age.</p>
        </S>
        <S title="4. Shipping">
          <p>Delivery times and costs are detailed on our <Link to="/help/shipping" className="text-white/60 hover:text-white transition-colors">Shipping Info</Link> page. Risk of loss passes to the buyer upon delivery.</p>
        </S>
        <S title="5. Right of Withdrawal">
          <p>Under French consumer law, you have <strong className="text-white/60">14 days</strong> from receipt to withdraw from a purchase without reason. Items must be returned unused in original packaging. See our <Link to="/help/returns" className="text-white/60 hover:text-white transition-colors">Returns Policy</Link>.</p>
        </S>
        <S title="6. Legal Guarantees">
          <p>All products benefit from the legal guarantee of conformity (Article L217-4 of the Consumer Code) and the guarantee against hidden defects (Article 1641 of the Civil Code).</p>
        </S>
        <S title="7. Limitation of Liability">
          <p>HORLOGÉS's liability is limited to the value of the order placed. We are not liable for indirect damages, loss of profits, or consequential losses.</p>
        </S>
        <S title="8. Dispute Resolution">
          <p>Contact us first at <a href="mailto:support@horloge.com" className="text-white/60 hover:text-white transition-colors">support@horloge.com</a>. If unresolved, you may refer the matter to the competent French courts or the EU Online Dispute Resolution platform.</p>
        </S>
        <S title="9. Governing Law">
          <p>These terms are governed by French law. Any dispute shall be subject to the exclusive jurisdiction of the courts of Paris.</p>
        </S>
      </DarkPage>
    </div>
  </>
);

export default Terms;
