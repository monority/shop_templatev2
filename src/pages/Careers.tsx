import { useState, useCallback } from 'react';
import PageMeta from '../components/ui/PageMeta';
import { DarkPage, DarkCard, DarkSection } from '../components/ui/DarkPage';
import { Reveal, RevealGroup, RevealItem } from '../components/ui/Reveal';
import { motion, AnimatePresence } from 'framer-motion';

const ROLES = [
  { title: 'Senior Frontend Engineer', team: 'Engineering', location: 'Paris / Remote', type: 'Full-time' },
  { title: 'Brand Partnerships Manager', team: 'Business', location: 'Paris', type: 'Full-time' },
  { title: 'Head of Community', team: 'Marketing', location: 'Remote', type: 'Full-time' },
  { title: 'Watch Authenticator & Specialist', team: 'Operations', location: 'Paris', type: 'Full-time' },
  { title: 'UX/UI Designer', team: 'Design', location: 'Paris / Remote', type: 'Full-time' },
  { title: 'Customer Experience Specialist', team: 'Support', location: 'Remote', type: 'Part-time' },
];

const Careers = () => {
  const [open, setOpen] = useState<number | null>(null);
  const toggle = useCallback((i: number) => setOpen((p) => p === i ? null : i), []);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <PageMeta title="Careers" description="Join the HORLOGÉS team. Help us build the future of luxury watch culture." canonical="/careers" />
      <DarkPage title="Join the Team" subtitle="Help us build the future of watch culture." label="Careers">

        <RevealGroup className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.04]" stagger={0.08}>
          {[
            { title: 'Move Fast', text: 'Small team, big impact. Your work ships quickly.' },
            { title: 'Creative Freedom', text: 'We value bold ideas from every corner of the team.' },
            { title: 'Remote Friendly', text: 'Many roles work fully or partially remote.' },
            { title: 'Watch Perks', text: 'Exclusive access to drops and staff discounts.' },
          ].map(({ title, text }) => (
            <RevealItem key={title}>
              <div className="bg-[#0a0a0a] p-8">
                <h3 className="text-white font-semibold mb-2">{title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{text}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal>
          <DarkSection title="Open Positions" id="positions">
            <div className="space-y-px bg-white/[0.04]">
              {ROLES.map((role, i) => (
                <div key={i} className="bg-[#0a0a0a]">
                  <button
                    onClick={() => toggle(i)}
                    aria-expanded={open === i}
                    className="w-full flex items-center justify-between p-6 text-left group"
                  >
                    <div>
                      <p className="text-white font-medium group-hover:text-white/80 transition-colors">{role.title}</p>
                      <p className="text-white/30 text-xs tracking-wide mt-1">{role.team} · {role.location} · {role.type}</p>
                    </div>
                    <motion.svg
                      width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                      className="text-white/30 flex-shrink-0"
                      animate={{ rotate: open === i ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path d="m6 9 6 6 6-6" />
                    </motion.svg>
                  </button>
                  <AnimatePresence>
                    {open === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 border-t border-white/[0.06] pt-4">
                          <p className="text-white/40 text-sm mb-4 leading-relaxed">
                            We're looking for a talented {role.title.toLowerCase()} to join our {role.team.toLowerCase()} team
                            and help shape the HORLOGÉS experience.
                          </p>
                          <a href="mailto:careers@horloge.com" className="text-white text-xs tracking-[0.2em] uppercase border-b border-white/20 pb-0.5 hover:border-white transition-colors">
                            Apply via Email
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </DarkSection>
        </Reveal>

        <Reveal>
          <div className="border border-white/[0.06] p-8 text-center">
            <p className="text-white/30 text-[11px] tracking-[0.25em] uppercase mb-3">Open Application</p>
            <h3 className="text-white mb-2" style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.5rem' }}>Don't see your role?</h3>
            <p className="text-white/40 text-sm mb-6">Send us your CV and we'll keep you in mind for future openings.</p>
            <a href="mailto:careers@horloge.com" className="inline-flex items-center gap-2 text-white text-xs tracking-[0.2em] uppercase border-b border-white/20 pb-0.5 hover:border-white transition-colors">
              Get In Touch
            </a>
          </div>
        </Reveal>
      </DarkPage>
    </div>
  );
};

export default Careers;
