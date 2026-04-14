import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const FOOTER_LINKS = {
  collections: [
    { label: "Men's Watches", path: '/shop/men' },
    { label: "Women's Watches", path: '/shop/women' },
    { label: 'New Arrivals', path: '/shop/new' },
    { label: 'Sale', path: '/shop/sale' },
    { label: 'All Timepieces', path: '/shop' },
  ],
  services: [
    { label: 'Watch Authentication', path: '/help/faq' },
    { label: 'Shipping & Delivery', path: '/help/shipping' },
    { label: 'Returns & Exchanges', path: '/help/returns' },
    { label: 'Track Your Order', path: '/help/track' },
    { label: 'Watch Care Guide', path: '/help/size-guide' },
  ],
  company: [
    { label: 'Our Story', path: '/about' },
    { label: 'Sustainability', path: '/sustainability' },
    { label: 'Press & Media', path: '/press' },
    { label: 'Careers', path: '/careers' },
  ],
};

const FooterLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <motion.li whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
    <Link
      to={to}
      className="text-white/35 hover:text-white transition-colors text-sm inline-block"
    >
      {children}
    </Link>
  </motion.li>
);

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/[0.06]">
      <div className="container">

        {/* Main grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 py-16 border-b border-white/[0.06]">

          {/* Brand — spans 2 cols on lg */}
          <div className="col-span-2 lg:col-span-2 flex flex-col justify-between gap-8">
            <div>
              <button
                onClick={() => navigate('/')}
                className="text-white text-2xl font-black tracking-[-0.02em] mb-4 block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30"
                style={{ fontFamily: "'DM Serif Display', serif" }}
                aria-label="HORLOGÉS home"
              >
                HORLOGÉS
              </button>
              <p className="text-white/30 text-xs leading-relaxed max-w-[220px]">
                Curated luxury timepieces for the modern collector. Authenticated, insured, delivered.
              </p>
            </div>

            {/* Trust badges */}
            <div className="flex flex-col gap-3">
              {[
                ['✦', 'Every piece authenticated'],
                ['✦', 'Free shipping over $200'],
                ['✦', '30-day returns'],
              ].map(([icon, text]) => (
                <div key={text} className="flex items-center gap-2">
                  <span className="text-white/20 text-[10px]">{icon}</span>
                  <span className="text-white/25 text-xs tracking-wide">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Collections */}
          <div>
            <p className="text-white/20 text-[10px] tracking-[0.25em] uppercase font-semibold mb-6">Collections</p>
            <ul className="space-y-3">
              {FOOTER_LINKS.collections.map((link) => (
                <FooterLink key={link.label} to={link.path}>{link.label}</FooterLink>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="text-white/20 text-[10px] tracking-[0.25em] uppercase font-semibold mb-6">Services</p>
            <ul className="space-y-3">
              {FOOTER_LINKS.services.map((link) => (
                <FooterLink key={link.label} to={link.path}>{link.label}</FooterLink>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-white/20 text-[10px] tracking-[0.25em] uppercase font-semibold mb-6">Company</p>
            <ul className="space-y-3">
              {FOOTER_LINKS.company.map((link) => (
                <FooterLink key={link.label} to={link.path}>{link.label}</FooterLink>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6">
          <p className="text-white/15 text-xs tracking-wide">
            &copy; 2026 HORLOGÉS. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs">
            <Link to="/legal/privacy" className="text-white/15 hover:text-white/40 transition-colors">
              Privacy Policy
            </Link>
            <span className="text-white/10" aria-hidden="true">·</span>
            <Link to="/legal/terms" className="text-white/15 hover:text-white/40 transition-colors">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
