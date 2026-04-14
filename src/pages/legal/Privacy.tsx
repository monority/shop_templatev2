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

const Privacy = () => (
  <>
    <PageMeta title="Privacy Policy" noIndex />
    <div className="min-h-screen bg-[#0a0a0a]">
      <DarkPage title="Privacy Policy" subtitle="Last updated: 7 April 2026" label="Legal" maxWidth="max-w-3xl">
        <S title="1. Who We Are">
          <p>HORLOGÉS SAS, registered in France (SIRET 000 000 000 00000), operates horloge.com. For privacy enquiries: <a href="mailto:privacy@horloge.com" className="text-white/60 hover:text-white transition-colors">privacy@horloge.com</a>.</p>
        </S>
        <S title="2. Data We Collect">
          <p>We collect the following when you create an account or place an order:</p>
          <ul className="space-y-1 pl-4">
            {['Name, email address, and password (hashed)', 'Shipping and billing address', 'Order history and product preferences', 'Device/browser information for security purposes'].map((i) => (
              <li key={i} className="flex items-start gap-2"><span className="text-white/20 mt-1.5 flex-shrink-0">·</span>{i}</li>
            ))}
          </ul>
        </S>
        <S title="3. How We Use Your Data">
          <p>Your data is used solely to process orders, send shipping updates, provide support, and improve our services (anonymised analytics only). We do <strong className="text-white/60">not</strong> sell your data.</p>
        </S>
        <S title="4. Data Retention">
          <p>Account data is retained as long as your account is active. Order records are kept for 10 years as required by French accounting law. You may request deletion at any time.</p>
        </S>
        <S title="5. Your Rights (GDPR)">
          <p>You have the right to access, rectify, erase, restrict, and port your personal data. Email <a href="mailto:privacy@horloge.com" className="text-white/60 hover:text-white transition-colors">privacy@horloge.com</a> to exercise your rights.</p>
        </S>
        <S title="6. Cookies">
          <p>We use strictly necessary cookies to keep you logged in and maintain your cart. No tracking or advertising cookies.</p>
        </S>
        <S title="7. Security">
          <p>Authentication is handled by Google Firebase. Passwords are never stored in plain text. Data is encrypted in transit (TLS) and at rest.</p>
        </S>
        <S title="8. Contact">
          <p>HORLOGÉS SAS — 12 Rue de la Paix, 75001 Paris, France<br />Email: <a href="mailto:privacy@horloge.com" className="text-white/60 hover:text-white transition-colors">privacy@horloge.com</a></p>
        </S>
      </DarkPage>
    </div>
  </>
);

export default Privacy;
