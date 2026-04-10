import { Link } from 'react-router-dom';
import PageMeta from '../../components/ui/PageMeta';
import { DarkPage, DarkSection } from '../../components/ui/DarkPage';
import { Reveal } from '../../components/ui/Reveal';

const METHODS = [
  { name: 'Standard',      time: '3–5 business days',                    price: '€5.99',       free: 'Free on orders over €200' },
  { name: 'Express',       time: '1–2 business days',                    price: '€12.99',      free: null },
  { name: 'Next Day',      time: 'Next business day (order before 2pm)', price: '€19.99',      free: null },
  { name: 'International', time: '5–10 business days',                   price: 'From €14.99', free: null },
];

const Shipping = () => (
  <div className="min-h-screen bg-[#0a0a0a]">
    <PageMeta title="Shipping Info" description="Fast, insured delivery for every timepiece. Free shipping over $200, express options available." canonical="/help/shipping" />
    <DarkPage title="Shipping Info" subtitle="Every order is fully insured and tracked from our vault to your door." label="Delivery">

      <Reveal>
        <DarkSection title="Delivery Options" id="options">
          <div className="space-y-px bg-white/[0.04]">
            {METHODS.map(({ name, time, price, free }) => (
              <div key={name} className="bg-[#0a0a0a] p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <p className="text-white font-medium">{name}</p>
                  <p className="text-white/35 text-xs mt-0.5">{time}</p>
                  {free && <p className="text-white/50 text-xs mt-1">{free}</p>}
                </div>
                <p className="text-white/60 text-sm font-medium flex-shrink-0">{price}</p>
              </div>
            ))}
          </div>
        </DarkSection>
      </Reveal>

      <Reveal>
        <DarkSection title="Processing Time" id="processing">
          <p className="text-white/40 text-sm leading-relaxed">
            All orders placed before <span className="text-white/70">2:00 PM (CET)</span> on a business day are processed
            and dispatched the same day. Orders placed after 2 PM, on weekends, or public holidays will be
            processed the next business day.
          </p>
        </DarkSection>
      </Reveal>

      <Reveal>
        <DarkSection title="Tracking" id="tracking">
          <p className="text-white/40 text-sm leading-relaxed">
            Once your order ships, you'll receive an email with a tracking number. You can also track at any time from the{' '}
            <Link to="/help/track" className="text-white/70 hover:text-white transition-colors border-b border-white/20">Track Order</Link> page.
          </p>
        </DarkSection>
      </Reveal>

      <Reveal>
        <DarkSection title="International Shipping" id="international">
          <p className="text-white/40 text-sm leading-relaxed">
            We ship to over 40 countries. International orders may be subject to customs duties and taxes
            which are the responsibility of the recipient. All international shipments are fully insured.
          </p>
        </DarkSection>
      </Reveal>

      <Reveal>
        <div className="border border-white/[0.06] p-6">
          <p className="text-white/60 text-sm">
            Questions? Email us at{' '}
            <a href="mailto:support@horloge.com" className="text-white hover:text-white/70 transition-colors">support@horloge.com</a>
          </p>
        </div>
      </Reveal>
    </DarkPage>
  </div>
);

export default Shipping;
