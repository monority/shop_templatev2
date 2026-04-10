import PageMeta from '../components/ui/PageMeta';
import { DarkPage, DarkSection } from '../components/ui/DarkPage';
import { Reveal, RevealGroup, RevealItem } from '../components/ui/Reveal';

const COVERAGE = [
  { outlet: 'Hodinkee',            quote: 'HORLOGÉ is redefining the European watch retail experience.', date: 'March 2025' },
  { outlet: 'WatchPro',            quote: 'A curated approach that every serious collector will appreciate.', date: 'January 2025' },
  { outlet: 'GQ France',           quote: 'The go-to destination for premium timepieces in Paris.', date: 'November 2024' },
  { outlet: 'Business of Fashion', quote: 'HORLOGÉ shows how community-first retail wins in luxury.', date: 'September 2024' },
];

const Press = () => (
  <div className="min-h-screen bg-[#0a0a0a]">
    <PageMeta title="Press & Media" description="What the world is saying about HORLOGÉ." />
    <DarkPage title="Press & Media" subtitle="What the world is saying about HORLOGÉ." label="Media">

      <Reveal>
        <DarkSection title="In the News" id="coverage">
          <RevealGroup className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.04]" stagger={0.08}>
            {COVERAGE.map(({ outlet, quote, date }) => (
              <RevealItem key={outlet}>
                <div className="bg-[#0a0a0a] p-8">
                  <p className="text-white/25 text-[10px] tracking-[0.25em] uppercase mb-4">{outlet}</p>
                  <blockquote className="text-white text-base leading-relaxed mb-4" style={{ fontFamily: "'DM Serif Display', serif" }}>
                    "{quote}"
                  </blockquote>
                  <p className="text-white/25 text-xs">{date}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </DarkSection>
      </Reveal>

      <Reveal>
        <DarkSection title="Press Kit" id="kit">
          <p className="text-white/40 text-sm leading-relaxed mb-6">
            Our press kit includes high-resolution logos, brand guidelines, product photography, and founder bios.
          </p>
          <a
            href="mailto:press@horloge.com?subject=Press Kit Request"
            className="inline-flex items-center gap-2 text-white text-xs tracking-[0.2em] uppercase border-b border-white/20 pb-0.5 hover:border-white transition-colors"
          >
            Request Press Kit
          </a>
        </DarkSection>
      </Reveal>

      <Reveal>
        <div className="border border-white/[0.06] p-8">
          <p className="text-white/25 text-[10px] tracking-[0.25em] uppercase mb-3">Contact</p>
          <h3 className="text-white mb-2" style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.5rem' }}>Media Enquiries</h3>
          <p className="text-white/40 text-sm mb-4">For interviews, partnerships, or editorial features, reach out to our communications team.</p>
          <a href="mailto:press@horloge.com" className="text-white/60 text-sm hover:text-white transition-colors">press@horloge.com</a>
        </div>
      </Reveal>
    </DarkPage>
  </div>
);

export default Press;
