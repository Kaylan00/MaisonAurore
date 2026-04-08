import { useState } from 'react';
import { Link } from 'react-router-dom';
import { rooms } from '../data/hotel';
import AnimatedSection from '../components/AnimatedSection';
import SectionTitle from '../components/SectionTitle';
import s from './Rooms.module.scss';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1920&q=80';

const CATEGORIES = ['All', 'Room', 'Suite', 'Penthouse', 'Villa'];

export default function Rooms() {
  const [active, setActive] = useState('All');

  const filtered =
    active === 'All'
      ? rooms
      : rooms.filter((r) => r.category === active);

  return (
    <div className={s.page}>
      {/* ── Hero ── */}
      <section className={s.hero}>
        <img src={HERO_IMAGE} alt="Rooms & Suites" className={s.heroImage} />
        <div className={s.heroOverlay} />
        <div className={s.heroContent}>
          <span className={s.heroBreadcrumb}>
            <Link to="/">Home</Link>
            <span className={s.separator}>/</span>
            <span>Rooms</span>
          </span>
          <h1 className={s.heroTitle}>Rooms &amp; Suites</h1>
        </div>
      </section>

      {/* ── Filter Tabs ── */}
      <section className={s.filters}>
        <div className={s.filtersInner}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`${s.filterBtn} ${active === cat ? s.filterBtnActive : ''}`}
              onClick={() => setActive(cat)}
            >
              {cat === 'Room' ? 'Rooms' : cat === 'Suite' ? 'Suites' : cat === 'Villa' ? 'Villas' : cat === 'Penthouse' ? 'Penthouses' : cat}
            </button>
          ))}
        </div>
      </section>

      {/* ── Room Grid ── */}
      <section className={s.listing}>
        <div className={s.listingInner}>
          <AnimatedSection animation="fadeUp">
            <SectionTitle
              label="Accommodation"
              title="Find Your Sanctuary"
              subtitle="Each room is a world of its own, designed with meticulous attention to detail and an unwavering commitment to comfort."
            />
          </AnimatedSection>

          <div className={s.grid}>
            {filtered.map((room, i) => (
              <AnimatedSection
                key={room.id}
                animation="fadeUp"
                delay={i % 2 === 0 ? 0 : 0.15}
              >
                <Link to={`/rooms/${room.slug}`} className={s.card}>
                  <div className={s.cardImageWrap}>
                    <img
                      src={room.image}
                      alt={room.name}
                      className={s.cardImage}
                    />
                    <span className={s.cardBadge}>{room.category}</span>
                  </div>

                  <div className={s.cardBody}>
                    <h3 className={s.cardName}>{room.name}</h3>
                    <p className={s.cardDesc}>{room.shortDescription}</p>

                    <div className={s.cardMeta}>
                      <span className={s.cardMetaItem}>
                        {room.size} m&sup2;
                      </span>
                      <span className={s.cardMetaDot} />
                      <span className={s.cardMetaItem}>
                        {room.maxGuests || 2} Guests
                      </span>
                    </div>

                    <div className={s.cardFooter}>
                      <span className={s.cardPrice}>
                        <span className={s.cardPriceFrom}>From</span>{' '}
                        &euro;{room.price.toLocaleString()}
                        <span className={s.cardPriceUnit}> / night</span>
                      </span>
                      <span className={s.cardLink}>
                        Discover
                        <span className={s.cardArrow}>&rarr;</span>
                      </span>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className={s.empty}>No accommodations found in this category.</p>
          )}
        </div>
      </section>
    </div>
  );
}
