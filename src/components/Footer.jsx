import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import s from './Footer.module.scss';

const QUICK_LINKS = [
  { label: 'Rooms & Suites', to: '/rooms' },
  { label: 'Dining', to: '/dining' },
  { label: 'Spa & Wellness', to: '/spa' },
  { label: 'Experiences', to: '/experiences' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Book Now', to: '/booking' },
];

const SOCIAL_LINKS = [
  { label: 'Instagram', href: '#' },
  { label: 'Facebook', href: '#' },
  { label: 'Pinterest', href: '#' },
  { label: 'TripAdvisor', href: '#' },
];

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setEmail('');
    }
  };

  return (
    <footer className={s.footer}>
      {/* CTA - Quer um site como esse? */}
      <div className={s.ctaBanner}>
        <div className={s.ctaInner}>
          <p className={s.ctaLabel}>Gostou do que viu?</p>
          <h3 className={s.ctaHeading}>Quer um site como esse para o seu negócio?</h3>
          <p className={s.ctaText}>
            Sites profissionais, modernos e sob medida. Vamos conversar!
          </p>
          <a
            href="https://wa.me/5500000000000?text=Ol%C3%A1!%20Vi%20o%20site%20e%20gostaria%20de%20saber%20mais%20sobre%20cria%C3%A7%C3%A3o%20de%20sites."
            className={s.ctaBtn}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Falar no WhatsApp
          </a>
        </div>
      </div>

      <div className={s.inner}>
        <div className={s.grid}>
          {/* Column 1: About */}
          <div className={s.col}>
            <div className={s.aboutLogo}>
              <Logo color="#b5a08a" size="md" />
            </div>
            <p className={s.aboutText}>
              A sanctuary of refined elegance nestled in the heart of the French
              countryside. Where timeless luxury meets modern comfort.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className={s.col}>
            <h4 className={s.colTitle}>Explore</h4>
            <ul className={s.linkList}>
              {QUICK_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className={s.footerLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className={s.col}>
            <h4 className={s.colTitle}>Contact</h4>
            <address className={s.contact}>
              <p>12 Rue de la Lumiere</p>
              <p>75008 Paris, France</p>
              <p className={s.contactSpacer} />
              <p>
                <a href="tel:+33142680000">+33 1 42 68 00 00</a>
              </p>
              <p>
                <a href="mailto:reservations@maisonaurore.com">
                  reservations@maisonaurore.com
                </a>
              </p>
            </address>
          </div>

          {/* Column 4: Newsletter */}
          <div className={s.col}>
            <h4 className={s.colTitle}>Newsletter</h4>
            <p className={s.newsletterText}>
              Receive exclusive offers and seasonal inspirations.
            </p>
            <form className={s.form} onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={s.input}
                required
                aria-label="Email address"
              />
              <button type="submit" className={s.submit}>
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={s.bottom}>
        <div className={s.bottomInner}>
          <p className={s.copyright}>
            &copy; {new Date().getFullYear()} Maison Aurore. All rights reserved.
          </p>
          <ul className={s.social}>
            {SOCIAL_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={s.socialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
