import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import BookingBar from '../components/BookingBar';
import SectionTitle from '../components/SectionTitle';
import AnimatedSection from '../components/AnimatedSection';
import RoomCard from '../components/RoomCard';

import {
  heroSlides,
  rooms,
  dining,
  spa,
  experiences,
  testimonials,
  gallery,
} from '../data/hotel';

import s from './Home.module.scss';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const SLIDE_INTERVAL = 6000;

const featuredRooms = rooms.filter((r) => r.featured).slice(0, 3);

function StarRating({ count }) {
  return (
    <span className={s.stars} aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
          <path d="M10 1l2.39 5.75L18 7.5l-4.2 3.85L15 18 10 14.77 5 18l1.2-6.65L2 7.5l5.61-.75z" />
        </svg>
      ))}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function Home() {
  // --- Hero slideshow state ---
  const [activeSlide, setActiveSlide] = useState(0);
  const heroRef = useRef(null);
  const intervalRef = useRef(null);

  const advanceSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(advanceSlide, SLIDE_INTERVAL);
    return () => clearInterval(intervalRef.current);
  }, [advanceSlide]);

  // --- Hero text entrance ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(
        `.${s.heroLabel}`,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.3 }
      )
        .fromTo(
          `.${s.heroHeading}`,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1 },
          '-=0.5'
        )
        .fromTo(
          `.${s.heroSubtitle}`,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.6'
        )
        .fromTo(
          `.${s.heroCtas}`,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.5'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // --- Newsletter state ---
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  // -----------------------------------------------------------------------
  return (
    <div className={s.home}>
      {/* ============ 1. HERO ============ */}
      <section className={s.hero} ref={heroRef}>
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`${s.heroSlide} ${index === activeSlide ? s.heroSlideActive : ''}`}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className={s.heroImage}
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}

        <div className={s.heroOverlay} />

        <div className={s.heroContent}>
          <span className={s.heroLabel}>French Riviera</span>
          <h1 className={s.heroHeading}>Where Elegance Meets&nbsp;the&nbsp;Sea</h1>
          <p className={s.heroSubtitle}>
            A timeless retreat on the C&ocirc;te d&rsquo;Azur, where every moment is an
            invitation to savour the extraordinary.
          </p>

          <div className={s.heroCtas}>
            <Link to="/rooms" className={s.btnOutline}>
              Explore Rooms
            </Link>
            <Link to="/booking" className={s.btnGold}>
              Book Your Stay
            </Link>
          </div>
        </div>

        {/* Slide indicators */}
        <div className={s.heroIndicators}>
          {heroSlides.map((slide, i) => (
            <button
              key={slide.id}
              className={`${s.heroIndicator} ${i === activeSlide ? s.heroIndicatorActive : ''}`}
              onClick={() => {
                setActiveSlide(i);
                clearInterval(intervalRef.current);
                intervalRef.current = setInterval(advanceSlide, SLIDE_INTERVAL);
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <BookingBar />
      </section>

      {/* ============ 2. WELCOME / INTRO ============ */}
      <section className={s.welcome}>
        <div className={s.welcomeInner}>
          <AnimatedSection animation="slideRight" className={s.welcomeText}>
            <span className={s.label}>Welcome</span>
            <h2 className={s.welcomeHeading}>
              A Sanctuary of Refined&nbsp;Luxury
            </h2>
            <div className={s.goldLine} />
            <p className={s.welcomeBody}>
              Perched on a sun-drenched promontory above the Mediterranean, Maison
              Aurore is a celebration of the art de vivre. Conceived as a private
              residence for discerning travellers, every space has been curated with
              an unwavering devotion to craft, comfort and beauty.
            </p>
            <p className={s.welcomeBody}>
              From the fragrant gardens that cascade toward the sea to the hushed
              intimacy of our candlelit salons, each detail tells a story of
              heritage, elegance and quiet grandeur.
            </p>
          </AnimatedSection>

          <AnimatedSection animation="slideLeft" className={s.welcomeImageWrap}>
            <div className={s.welcomeFrame}>
              <img
                src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80"
                alt="Maison Aurore lobby interior"
                className={s.welcomeImage}
                loading="lazy"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ============ 3. ROOMS HIGHLIGHT ============ */}
      <section className={s.rooms}>
        <AnimatedSection>
          <SectionTitle
            label="Accommodations"
            title="Rooms & Suites"
            subtitle="Exquisite spaces designed for unparalleled comfort"
          />
        </AnimatedSection>

        <div className={s.roomsGrid}>
          {featuredRooms.map((room, i) => (
            <AnimatedSection key={room.id} animation="fadeUp" delay={i * 0.15}>
              <RoomCard
                image={room.image}
                category={room.category}
                name={room.name}
                description={room.shortDescription}
                price={room.price}
                slug={`/rooms/${room.slug}`}
              />
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className={s.roomsLink}>
          <Link to="/rooms" className={s.viewAll}>
            View All Rooms
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 10h12M12 5l5 5-5 5" />
            </svg>
          </Link>
        </AnimatedSection>
      </section>

      {/* ============ 4. PARALLAX QUOTE ============ */}
      <section className={s.parallax}>
        <div className={s.parallaxBg}>
          <img
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920&q=80"
            alt="Hotel terrace at golden hour"
            loading="lazy"
          />
        </div>
        <div className={s.parallaxOverlay} />
        <AnimatedSection animation="fadeIn" className={s.parallaxContent}>
          <blockquote className={s.parallaxQuote}>
            Luxury is in each detail
          </blockquote>
          <span className={s.parallaxAuthor}>&mdash; Hubert de Givenchy</span>
        </AnimatedSection>
      </section>

      {/* ============ 5. DINING PREVIEW ============ */}
      <section className={s.diningSection}>
        <AnimatedSection>
          <SectionTitle
            label="Gastronomy"
            title="Dining"
            subtitle="Culinary artistry inspired by the Riviera"
          />
        </AnimatedSection>

        {dining.restaurants.map((restaurant, i) => (
          <AnimatedSection
            key={restaurant.id}
            animation={i % 2 === 0 ? 'slideRight' : 'slideLeft'}
            className={`${s.diningRow} ${i % 2 !== 0 ? s.diningRowReversed : ''}`}
          >
            <div className={s.diningImageWrap}>
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className={s.diningImage}
                loading="lazy"
              />
            </div>
            <div className={s.diningText}>
              <span className={s.label}>{restaurant.cuisine}</span>
              <h3 className={s.diningName}>{restaurant.name}</h3>
              <div className={s.goldLine} />
              <p className={s.diningDescription}>{restaurant.description}</p>
              <Link to={`/dining#${restaurant.id}`} className={s.discoverLink}>
                Discover
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 10h12M12 5l5 5-5 5" />
                </svg>
              </Link>
            </div>
          </AnimatedSection>
        ))}
      </section>

      {/* ============ 6. SPA TEASER ============ */}
      <section className={s.spaSection}>
        <div className={s.spaInner}>
          <AnimatedSection animation="slideRight" className={s.spaImageWrap}>
            <div className={s.spaFrame}>
              <img
                src={spa.image}
                alt={spa.name}
                className={s.spaImage}
                loading="lazy"
              />
            </div>
          </AnimatedSection>

          <AnimatedSection animation="slideLeft" className={s.spaText}>
            <span className={s.spaLabel}>{spa.tagline}</span>
            <h2 className={s.spaName}>{spa.name}</h2>
            <div className={s.goldLineLight} />
            <p className={s.spaDescription}>{spa.intro}</p>
            <Link to="/spa" className={s.btnGoldOnDark}>
              Explore Treatments
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ============ 7. EXPERIENCES ============ */}
      <section className={s.experiencesSection}>
        <AnimatedSection>
          <SectionTitle
            label="Curated"
            title="Experiences"
            subtitle="Unforgettable moments, thoughtfully arranged"
          />
        </AnimatedSection>

        <div className={s.experiencesGrid}>
          {experiences.items.map((exp, i) => (
            <AnimatedSection key={exp.id} animation="fadeUp" delay={i * 0.12}>
              <div className={s.expCard}>
                <div className={s.expImageWrap}>
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className={s.expImage}
                    loading="lazy"
                  />
                  <div className={s.expOverlay}>
                    <h4 className={s.expName}>{exp.title}</h4>
                    <p className={s.expDesc}>{exp.description}</p>
                    <Link to="/experiences" className={s.expLink}>
                      Learn More
                    </Link>
                  </div>
                </div>
                <h4 className={s.expNameBelow}>{exp.title}</h4>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ============ 8. TESTIMONIALS ============ */}
      <section className={s.testimonials}>
        <AnimatedSection>
          <SectionTitle
            label="Guest Voices"
            title="What They Say"
          />
        </AnimatedSection>

        <AnimatedSection className={s.testimonialsSlider}>
          <div className={s.quoteIcon}>&ldquo;</div>
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop
            spaceBetween={40}
            slidesPerView={1}
            className={s.swiperContainer}
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.id}>
                <div className={s.testimonialCard}>
                  <p className={s.testimonialQuote}>{t.quote}</p>
                  <StarRating count={t.rating} />
                  <span className={s.testimonialName}>{t.name}</span>
                  <span className={s.testimonialLocation}>{t.location}</span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </AnimatedSection>
      </section>

      {/* ============ 9. GALLERY TEASER ============ */}
      <section className={s.gallerySection}>
        <AnimatedSection>
          <SectionTitle
            label="Gallery"
            title="Captured Moments"
          />
        </AnimatedSection>

        <AnimatedSection className={s.galleryGrid}>
          {gallery.map((item) => (
            <div key={item.id} className={s.galleryItem}>
              <img
                src={item.image}
                alt={item.category}
                className={s.galleryImage}
                loading="lazy"
              />
              <div className={s.galleryOverlay}>
                <span className={s.galleryCategory}>{item.category}</span>
              </div>
            </div>
          ))}
        </AnimatedSection>

        <AnimatedSection className={s.galleryCta}>
          <Link to="/gallery" className={s.viewAll}>
            View Full Gallery
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 10h12M12 5l5 5-5 5" />
            </svg>
          </Link>
        </AnimatedSection>
      </section>

      {/* ============ 10. NEWSLETTER CTA ============ */}
      <section className={s.newsletter}>
        <AnimatedSection animation="fadeIn" className={s.newsletterInner}>
          <h2 className={s.newsletterHeading}>Stay Connected</h2>
          <p className={s.newsletterSub}>
            Receive exclusive offers, seasonal inspirations and news from the
            Riviera.
          </p>

          {subscribed ? (
            <p className={s.newsletterSuccess}>
              Thank you. We look forward to welcoming you.
            </p>
          ) : (
            <form className={s.newsletterForm} onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Your email address"
                className={s.newsletterInput}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className={s.newsletterBtn}>
                Subscribe
              </button>
            </form>
          )}
        </AnimatedSection>
      </section>
    </div>
  );
}
