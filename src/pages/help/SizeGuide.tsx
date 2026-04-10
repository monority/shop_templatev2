import PageMeta from '../../components/ui/PageMeta';
import { DarkPage, DarkSection } from '../../components/ui/DarkPage';
import { Reveal } from '../../components/ui/Reveal';

// Watch case size guide — more relevant than shoe sizes
const CASE_SIZES = [
  { size: '28–32mm', fit: 'Small / Petite',  desc: 'Ideal for smaller wrists. Classic dress watch proportions.' },
  { size: '34–36mm', fit: 'Classic',          desc: 'Traditional dress watch size. Timeless and versatile.' },
  { size: '38–40mm', fit: 'Mid-size',         desc: 'The most popular range. Suits most wrist sizes.' },
  { size: '42–44mm', fit: 'Large',            desc: 'Bold presence. Sport and diver watches typically fall here.' },
  { size: '46mm+',   fit: 'Oversized',        desc: 'Statement pieces. Best for larger wrists (18cm+).' },
];

const LUG_WIDTHS = [
  { lug: '16mm', common: 'Dress watches, small cases' },
  { lug: '18mm', common: 'Mid-size dress and sport watches' },
  { lug: '20mm', common: 'Most popular — widest strap selection' },
  { lug: '22mm', common: 'Large sport and diver watches' },
  { lug: '24mm', common: 'Oversized and pilot watches' },
];

const SizeGuide = () => (
  <div className="min-h-screen bg-[#0a0a0a]">
    <PageMeta title="Watch Size Guide" description="Find the perfect case size and strap width for your wrist." />
    <DarkPage title="Watch Size Guide" subtitle="Find the perfect case size and lug width for your wrist." label="Guide">

      <Reveal>
        <DarkSection title="How to Measure Your Wrist" id="measure">
          <div className="space-y-px bg-white/[0.04]">
            {[
              { step: '01', title: 'Use a tape measure',  text: 'Wrap a flexible tape measure around your wrist just above the wrist bone.' },
              { step: '02', title: 'Note the circumference', text: 'Record the measurement in centimetres. Most wrists fall between 15–20cm.' },
              { step: '03', title: 'Choose your case size', text: 'Use the table below to find the ideal case diameter for your wrist.' },
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

      <Reveal>
        <DarkSection title="Case Size Guide" id="case-sizes">
          <div className="space-y-px bg-white/[0.04]">
            <div className="bg-[#111] grid grid-cols-3 px-6 py-3">
              {['Case Diameter', 'Fit', 'Description'].map((h) => (
                <span key={h} className="text-white/25 text-[10px] tracking-[0.2em] uppercase">{h}</span>
              ))}
            </div>
            {CASE_SIZES.map(({ size, fit, desc }) => (
              <div key={size} className="bg-[#0a0a0a] grid grid-cols-3 px-6 py-4 items-center">
                <span className="text-white text-sm font-medium">{size}</span>
                <span className="text-white/50 text-sm">{fit}</span>
                <span className="text-white/30 text-xs leading-relaxed">{desc}</span>
              </div>
            ))}
          </div>
        </DarkSection>
      </Reveal>

      <Reveal>
        <DarkSection title="Lug Width Guide" id="lug-widths">
          <p className="text-white/40 text-sm mb-6 leading-relaxed">
            The lug width determines which straps are compatible with your watch. Always match your replacement strap to the original lug width.
          </p>
          <div className="space-y-px bg-white/[0.04]">
            {LUG_WIDTHS.map(({ lug, common }) => (
              <div key={lug} className="bg-[#0a0a0a] flex items-center justify-between px-6 py-4">
                <span className="text-white text-sm font-medium">{lug}</span>
                <span className="text-white/35 text-sm">{common}</span>
              </div>
            ))}
          </div>
        </DarkSection>
      </Reveal>

      <Reveal>
        <div className="border border-white/[0.06] p-6">
          <p className="text-white/60 text-sm">
            Still unsure? Email us at{' '}
            <a href="mailto:support@horloge.com" className="text-white hover:text-white/70 transition-colors">support@horloge.com</a>
            {' '}and our horologists will help you find the right fit.
          </p>
        </div>
      </Reveal>
    </DarkPage>
  </div>
);

export default SizeGuide;
