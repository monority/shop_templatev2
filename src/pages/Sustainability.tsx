import { Link } from 'react-router-dom';
import PageMeta from '../components/ui/PageMeta';
import { DarkPage, DarkSection } from '../components/ui/DarkPage';
import { Reveal, RevealGroup, RevealItem } from '../components/ui/Reveal';
import { motion } from 'framer-motion';

const Sustainability = () => (
  <div className="min-h-screen bg-[#0a0a0a]">
    <PageMeta title="Sustainability" description="Our commitment to responsible luxury." />
    <DarkPage title="Sustainability" subtitle="Luxury without compromise. Our commitment to a better industry." label="Responsibility">

      <Reveal>
        <DarkSection title="Our Commitment" id="commitment">
          <p className="text-white/50 text-sm leading-relaxed">
            At HORLOGÉ, we believe the watch industry has a responsibility to do better. From the way we
            package products to the partners we choose, every decision is guided by our goal to reduce our
            environmental footprint while maintaining the highest standards of quality.
          </p>
        </DarkSection>
      </Reveal>

      <RevealGroup className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.04]" stagger={0.1}>
        {[
          { title: 'Eco Packaging',      text: '100% recycled, recyclable, or compostable packaging. No plastic — ever.' },
          { title: 'Ethical Sourcing',   text: 'We actively source from brands committed to sustainable materials and fair labor.' },
          { title: 'Circular Commerce',  text: 'We encourage pre-owned culture — a second-hand watch is the most sustainable one.' },
        ].map(({ title, text }) => (
          <RevealItem key={title}>
            <div className="bg-[#0a0a0a] p-8">
              <h3 className="text-white font-semibold mb-3">{title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{text}</p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal>
        <DarkSection title="Progress" id="progress">
          <div className="space-y-6">
            {[
              ['Packaging',            'Transitioned to 100% recycled boxes and tissue paper', 100],
              ['Carbon Offsetting',    'Offset all standard shipping emissions',               100],
              ['Sustainable Brands',   'Growing our eco-certified brand portfolio',             60],
              ['Plastic-Free Ops',     'Eliminating all single-use plastic',                    80],
            ].map(([label, desc, pct]) => (
              <div key={label as string} className="border-b border-white/[0.06] pb-6">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-white text-sm font-medium">{label}</span>
                  <span className="text-white/40 text-xs">{pct}%</span>
                </div>
                <p className="text-white/30 text-xs mb-3">{desc}</p>
                <div className="w-full bg-white/5 h-px">
                  <motion.div
                    className="bg-white/40 h-px"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
                  />
                </div>
              </div>
            ))}
          </div>
        </DarkSection>
      </Reveal>

      <Reveal className="text-center pt-4">
        <Link to="/shop" className="inline-flex items-center gap-2 text-white text-xs tracking-[0.2em] uppercase border-b border-white/20 pb-0.5 hover:border-white transition-colors">
          Shop Responsibly
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </Link>
      </Reveal>
    </DarkPage>
  </div>
);

export default Sustainability;
