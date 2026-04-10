import { Link } from 'react-router-dom';
import PageMeta from '../components/ui/PageMeta';
import { DarkPage, DarkCard, DarkSection } from '../components/ui/DarkPage';
import { Reveal, RevealGroup, RevealItem } from '../components/ui/Reveal';

const About = () => (
  <div className="min-h-screen bg-[#0a0a0a]">
    <PageMeta title="About Us" description="HORLOGÉ — curated luxury timepieces since 2019." />
    <DarkPage title="About HORLOGÉ" subtitle="Born from a passion for horology. Built for the modern collector." label="Our Story">
      <Reveal>
        <DarkSection title="Our Mission" id="mission">
          <p className="text-white/50 text-sm leading-relaxed">
            HORLOGÉ was founded with a single vision: make premium timepiece culture accessible to every collector.
            We believe a great watch is never just an accessory — it's a statement of craft, heritage, and identity.
            Every piece we carry is curated for quality, movement, and cultural relevance.
          </p>
        </DarkSection>
      </Reveal>

      <RevealGroup className="grid grid-cols-3 gap-px bg-white/[0.04]" stagger={0.08}>
        {[['2019', 'Founded'], ['50K+', 'Collectors'], ['200+', 'References']].map(([val, label]) => (
          <RevealItem key={label}>
            <div className="bg-[#0a0a0a] p-8 text-center">
              <p className="text-white text-3xl font-bold mb-1" style={{ fontFamily: "'DM Serif Display', serif" }}>{val}</p>
              <p className="text-white/30 text-xs tracking-[0.2em] uppercase">{label}</p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal>
        <DarkSection title="Our Story" id="story">
          <div className="space-y-4 text-white/50 text-sm leading-relaxed">
            <p>
              What started as a small curated selection in Paris has grown into a destination for watch enthusiasts
              across Europe. Our team of passionate horologists handpicks every reference — from classic dress watches
              to bold sport chronographs.
            </p>
            <p>
              We partner directly with authorised dealers and trusted suppliers to guarantee authenticity on every
              single piece. No grey market, no compromises.
            </p>
          </div>
        </DarkSection>
      </Reveal>

      <RevealGroup className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.04]" stagger={0.1}>
        {[
          { title: 'Authenticity', text: 'Every timepiece is 100% verified by our expert horologists.' },
          { title: 'Community',    text: 'We celebrate watch culture in all its forms, from vintage to modern.' },
          { title: 'Responsibility', text: 'Committed to sustainable packaging and ethical sourcing.' },
        ].map(({ title, text }) => (
          <RevealItem key={title}>
            <div className="bg-[#0a0a0a] p-8">
              <p className="text-white/20 text-[10px] tracking-[0.25em] uppercase mb-3">✦</p>
              <h3 className="text-white font-semibold mb-2">{title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{text}</p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal className="text-center pt-4">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-white text-xs tracking-[0.2em] uppercase border-b border-white/20 pb-0.5 hover:border-white transition-colors"
        >
          Explore Our Collection
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </Link>
      </Reveal>
    </DarkPage>
  </div>
);

export default About;
