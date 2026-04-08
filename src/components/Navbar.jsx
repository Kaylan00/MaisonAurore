import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import s from './Navbar.module.scss';

const NAV_LINKS = [
  { label: 'Rooms & Suites', to: '/rooms' },
  { label: 'Dining', to: '/dining' },
  { label: 'Spa', to: '/spa' },
  { label: 'Experiences', to: '/experiences' },
  { label: 'Gallery', to: '/gallery' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 60);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className={`${s.nav} ${scrolled ? s.scrolled : ''}`}>
        <div className={s.inner}>
          <Link to="/" className={s.logo} onClick={closeMenu}>
            <span className={s.logoText}>MAISON AURORE</span>
          </Link>

          <ul className={s.links}>
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className={s.link}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className={s.actions}>
            <Link to="/booking" className={s.cta}>
              Book Now
            </Link>

            <button
              className={`${s.hamburger} ${menuOpen ? s.open : ''}`}
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Fullscreen Overlay */}
      <div className={`${s.overlay} ${menuOpen ? s.overlayOpen : ''}`}>
        <div className={s.overlayContent}>
          <div className={s.overlayLogo}>
            <Logo color="#b5a08a" size="md" />
          </div>
          <ul className={s.overlayLinks}>
            {NAV_LINKS.map((link, i) => (
              <li key={link.to} style={{ transitionDelay: `${0.1 + i * 0.05}s` }}>
                <Link to={link.to} className={s.overlayLink} onClick={closeMenu}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/booking" className={s.overlayCta} onClick={closeMenu}>
            Book Now
          </Link>
        </div>
      </div>
    </>
  );
}
