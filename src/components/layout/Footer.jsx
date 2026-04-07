import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const footerLinks = {
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

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <div className="footer-brand">
              SNEAK<span>ARA</span>
            </div>
            <p className="footer-desc">
              Premium sneakers for the modern urban lifestyle. Quality, style, and comfort in every step.
            </p>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="footer-heading">Shop</h3>
            <ul className="footer-links">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <button 
                    onClick={() => navigate(link.path)} 
                    className="footer-link"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h3 className="footer-heading">Help</h3>
            <ul className="footer-links">
              {footerLinks.help.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="footer-heading">Company</h3>
            <ul className="footer-links">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 Sneakara. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
