import PageMeta from '../../components/ui/PageMeta';
import { DarkPage, DarkSection } from '../../components/ui/DarkPage';
import { Reveal, RevealGroup, RevealItem } from '../../components/ui/Reveal';

const Returns = () => (
  <div className="min-h-screen bg-[#0a0a0a]">
    <PageMeta title="Returns & Exchanges" description="30-day hassle-free returns on all timepieces. Free return shipping, refunds in 3–5 business days." canonical="/help/returns" />
    <DarkPage title="Returns & Exchanges" subtitle="Not the right piece? No problem. 30-day returns, no questions asked." label="Returns">

      <RevealGroup className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.04]" stagger={0.08}>
        {[
          { title: '30 Days',     text: 'You have 30 days from delivery to initiate a return.' },
          { title: 'Free Returns', text: 'Returns within France are completely free.' },
          { title: 'Fast Refunds', text: 'Refunds processed within 3–5 business days.' },
        ].map(({ title, text }) => (
          <RevealItem key={title}>
            <div className="bg-[#0a0a0a] p-8 text-center">
              <p className="text-white font-bold text-xl mb-2" style={{ fontFamily: "'DM Serif Display', serif" }}>{title}</p>
              <p className="text-white/40 text-sm leading-relaxed">{text}</p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal>
        <DarkSection title="Return Eligibility" id="eligibility">
          <ul className="space-y-3">
            {[
              'Unworn and in original condition',
              'In the original box with all tags and packaging',
              'Returned within 30 days of the delivery date',
              'Not marked as Final Sale',
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-white/50 text-sm">
                <span className="w-1 h-1 rounded-full bg-white/30 flex-shrink-0" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </DarkSection>
      </Reveal>

      <Reveal>
        <DarkSection title="How to Return" id="how">
          <div className="space-y-px bg-white/[0.04]">
            {[
              { step: '01', title: 'Email us',      text: 'Send your order number and reason to support@horloge.com' },
              { step: '02', title: 'Receive label', text: "We'll send a prepaid return label within 24 hours." },
              { step: '03', title: 'Ship it back',  text: 'Drop off the parcel at your nearest carrier location.' },
              { step: '04', title: 'Get refunded',  text: 'Refund issued to original payment method in 3–5 days.' },
            ].map(({ step, title, text }) => (
              <div key={step} className="bg-[#0a0a0a] p-6 flex items-start gap-6">
                <span className="text-white/15 font-black text-2xl flex-shrink-0" style={{ fontFamily: "'DM Serif Display', serif" }}>{step}</span>
                <div>
                  <p className="text-white text-sm font-medium mb-1">{title}</p>
                  <p className="text-white/35 text-sm">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </DarkSection>
      </Reveal>

      <Reveal className="text-center pt-4">
        <a href="mailto:support@horloge.com" className="inline-flex items-center gap-2 text-white text-xs tracking-[0.2em] uppercase border-b border-white/20 pb-0.5 hover:border-white transition-colors">
          Start a Return
        </a>
      </Reveal>
    </DarkPage>
  </div>
);

export default Returns;
