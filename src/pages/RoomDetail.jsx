import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { rooms } from '../data/hotel';
import AnimatedSection from '../components/AnimatedSection';
import SectionTitle from '../components/SectionTitle';
import s from './RoomDetail.module.scss';

/* Simple unicode icons mapped to common amenity keywords */
const AMENITY_ICONS = {
  'wi-fi': '\u2022',
  terrace: '\u25CB',
  bathroom: '\u25C7',
  shower: '\u25C7',
  tub: '\u25C7',
  minibar: '\u2605',
  nespresso: '\u2605',
  espresso: '\u2605',
  turndown: '\u2666',
  view: '\u2600',
  panoram: '\u2600',
  pool: '\u223C',
  salon: '\u2726',
  dining: '\u2726',
  butler: '\u2726',
  cellar: '\u2605',
  pillow: '\u2666',
  staff: '\u2726',
  garden: '\u2741',
  kitchen: '\u2726',
  daybed: '\u25CB',
  bedroom: '\u2666',
  patio: '\u25CB',
};

function getAmenityIcon(name) {
  const lower = name.toLowerCase();
  for (const [key, icon] of Object.entries(AMENITY_ICONS)) {
    if (lower.includes(key)) return icon;
  }
  return '\u2022';
}

export default function RoomDetail() {
  const { slug } = useParams();
  const room = rooms.find((r) => r.slug === slug);
  const [mainImage, setMainImage] = useState(0);

  const similar = useMemo(() => {
    if (!room) return [];
    const sameCategory = rooms.filter(
      (r) => r.category === room.category && r.id !== room.id
    );
    const others = rooms.filter(
      (r) => r.category !== room.category && r.id !== room.id
    );
    return [...sameCategory, ...others].slice(0, 3);
  }, [room]);

  if (!room) {
    return (
      <div className={s.notFound}>
        <div className={s.notFoundInner}>
          <h1 className={s.notFoundTitle}>Room Not Found</h1>
          <p className={s.notFoundText}>
            The accommodation you are looking for does not exist or has been
            removed.
          </p>
          <Link to="/rooms" className={s.notFoundBtn}>
            View All Rooms
          </Link>
        </div>
      </div>
    );
  }

  const galleryImages =
    room.gallery && room.gallery.length > 0 ? room.gallery : [room.image];

  return (
    <div className={s.page}>
      {/* ── Hero ── */}
      <section className={s.hero}>
        <img src={room.image} alt={room.name} className={s.heroImage} />
        <div className={s.heroOverlay} />
        <div className={s.heroContent}>
          <span className={s.heroLabel}>{room.category}</span>
          <h1 className={s.heroTitle}>{room.name}</h1>
          <span className={s.heroBreadcrumb}>
            <Link to="/">Home</Link>
            <span className={s.sep}>/</span>
            <Link to="/rooms">Rooms</Link>
            <span className={s.sep}>/</span>
            <span>{room.name}</span>
          </span>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section className={s.gallery}>
        <div className={s.galleryInner}>
          <AnimatedSection animation="fadeUp">
            <div className={s.galleryGrid}>
              <div className={s.galleryMain}>
                <img
                  src={galleryImages[mainImage]}
                  alt={`${room.name} — view ${mainImage + 1}`}
                  className={s.galleryMainImg}
                />
              </div>
              {galleryImages.length > 1 && (
                <div className={s.galleryThumbs}>
                  {galleryImages.map((img, i) => (
                    <button
                      key={i}
                      className={`${s.thumb} ${i === mainImage ? s.thumbActive : ''}`}
                      onClick={() => setMainImage(i)}
                      aria-label={`View image ${i + 1}`}
                    >
                      <img
                        src={img}
                        alt={`${room.name} thumbnail ${i + 1}`}
                        className={s.thumbImg}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Room Info ── */}
      <section className={s.info}>
        <div className={s.infoInner}>
          <AnimatedSection animation="fadeUp">
            <div className={s.infoGrid}>
              {/* Left Column */}
              <div className={s.infoLeft}>
                <span className={s.infoLabel}>About This {room.category}</span>
                <h2 className={s.infoTitle}>{room.name}</h2>
                <div className={s.infoLine} />
                <p className={s.infoDesc}>
                  {room.description || room.shortDescription}
                </p>

                <div className={s.infoDetails}>
                  <div className={s.infoDetail}>
                    <span className={s.infoDetailLabel}>Bed Type</span>
                    <span className={s.infoDetailValue}>
                      {room.bedType || 'King Bed'}
                    </span>
                  </div>
                  <div className={s.infoDetail}>
                    <span className={s.infoDetailLabel}>Room Size</span>
                    <span className={s.infoDetailValue}>
                      {room.size} m&sup2;
                    </span>
                  </div>
                  <div className={s.infoDetail}>
                    <span className={s.infoDetailLabel}>Max Guests</span>
                    <span className={s.infoDetailValue}>
                      {room.maxGuests || 2}{' '}
                      {(room.maxGuests || 2) === 1 ? 'Guest' : 'Guests'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className={s.infoRight}>
                <div className={s.priceCard}>
                  <span className={s.priceLabel}>From</span>
                  <span className={s.priceValue}>
                    &euro;{room.price.toLocaleString()}
                  </span>
                  <span className={s.priceUnit}>per night</span>
                </div>

                {room.amenities && room.amenities.length > 0 && (
                  <div className={s.amenities}>
                    <h3 className={s.amenitiesTitle}>Amenities</h3>
                    <ul className={s.amenitiesList}>
                      {room.amenities.map((a) => (
                        <li key={a} className={s.amenityItem}>
                          <span className={s.amenityIcon}>
                            {getAmenityIcon(a)}
                          </span>
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <Link to="/booking" className={s.bookBtn}>
                  Book This Room
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Similar Rooms ── */}
      {similar.length > 0 && (
        <section className={s.similar}>
          <div className={s.similarInner}>
            <AnimatedSection animation="fadeUp">
              <SectionTitle
                label="More Accommodations"
                title="You May Also Like"
                subtitle="Explore other exceptional spaces at Maison Aurore."
              />
            </AnimatedSection>

            <div className={s.similarGrid}>
              {similar.map((r, i) => (
                <AnimatedSection key={r.id} animation="fadeUp" delay={i * 0.1}>
                  <Link to={`/rooms/${r.slug}`} className={s.similarCard}>
                    <div className={s.similarImageWrap}>
                      <img
                        src={r.image}
                        alt={r.name}
                        className={s.similarImage}
                      />
                      <span className={s.similarBadge}>{r.category}</span>
                    </div>
                    <div className={s.similarBody}>
                      <h4 className={s.similarName}>{r.name}</h4>
                      <span className={s.similarPrice}>
                        From &euro;{r.price.toLocaleString()} / night
                      </span>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
