import { Link, useNavigate } from 'react-router-dom';

const FOOTER_LINKS = {
  shop: [
    { label: 'All Products', path: '/shop' },
    { label: 'Women', path: '/shop/women' },
    { label: 'Men', path: '/shop/men' },
    { label: 'New Arrivals', path: '/shop/new' },
    { label: 'Sale', path: '/shop/sale' },
  ],
  help: [
    { label: 'Size Guide', path: '/help/size-guide' },
    { label: 'Shipping Info', path: '/help/shipping' },
    { label: 'Returns', path: '/help/returns' },
    { label: 'Track Order', path: '/help/track' },
    { label: 'FAQ', path: '/help/faq' },
  ],
  company: [
    { label: 'About Us', path: '/about' },
    { label: 'Careers', path: '/careers' },
    { label: 'Press', path: '/press' },
    { label: 'Sustainability', path: '/sustainability' },
  ],
};

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
          {/* Brand */}
          <div>
            <div className="text-2xl font-extrabold tracking-tight mb-4">
              SNEAK<span className="text-brand">ARA</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium sneakers for the modern urban lifestyle. Quality, style, and comfort in every step.
            </p>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.shop.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Help</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.help.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">&copy; 2026 Sneakara. All rights reserved.</p>
            <div className="flex gap-4 text-sm">
              <Link to="/legal/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <span className="text-gray-600">·</span>
              <Link to="/legal/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms &amp; Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
