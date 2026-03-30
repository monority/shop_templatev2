import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from '../SvgStack';

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const collections = [
    { label: 'Women', path: '/shop/women', icon: '👗' },
    { label: 'Men', path: '/shop/men', icon: '👔' },
    { label: 'Trending', path: '/shop/trending', icon: '🔥' },
    { label: 'New', path: '/shop/new', icon: '✨' },
    { label: 'Sale', path: '/shop/sale', className: 'nav-sale', icon: '🏷️' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleNavClick = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        className="nav-mobile-toggle"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X size="1.5rem" /> : <Menu size="1.5rem" />}
      </button>

      {/* Desktop Navigation */}
      <nav className={`nav-desktop ${isScrolled ? 'nav-scrolled' : ''}`}>
        <ul className="nav-list">
          {collections.map((item) => (
            <li key={item.path}>
              <button
                className={`nav-link ${location.pathname === item.path ? 'nav-active' : ''} ${item.className || ''}`}
                onClick={() => handleNavClick(item.path)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Navigation */}
      <nav className={`nav-mobile ${isMenuOpen ? 'nav-mobile-open' : ''}`}>
        <div className="nav-mobile-header">
          <h3 className="nav-mobile-title">Menu</h3>
          <button 
            className="nav-mobile-close"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size="1.5rem" />
          </button>
        </div>
        <ul className="nav-mobile-list">
          {collections.map((item, index) => (
            <li key={item.path} style={{ '--delay': `${index * 0.1}s` }}>
              <button
                className={`nav-mobile-link ${location.pathname === item.path ? 'nav-mobile-active' : ''} ${item.className || ''}`}
                onClick={() => handleNavClick(item.path)}
              >
                <span className="nav-mobile-icon">{item.icon}</span>
                <span className="nav-mobile-label">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Overlay */}
      {isMenuOpen && (
        <div 
          className="nav-overlay"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  )
}

export default Nav
