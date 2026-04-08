import { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { gallery } from '../data/hotel';
import AnimatedSection from '../components/AnimatedSection';
import SectionTitle from '../components/SectionTitle';
import s from './Gallery.module.scss';

const CATEGORIES = ['All', 'Hotel', 'Rooms', 'Dining', 'Spa', 'Pool'];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [animating, setAnimating] = useState(false);

  // Filtered images
  const filtered = useMemo(
    () =>
      activeFilter === 'All'
        ? gallery
        : gallery.filter((img) => img.category === activeFilter),
    [activeFilter]
  );

  // Handle filter change with animation
  const handleFilter = (cat) => {
    if (cat === activeFilter) return;
    setAnimating(true);
    setTimeout(() => {
      setActiveFilter(cat);
      setAnimating(false);
    }, 300);
  };

  // Lightbox navigation
  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === 0 ? filtered.length - 1 : prev - 1
    );
  }, [filtered.length]);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === filtered.length - 1 ? 0 : prev + 1
    );
  }, [filtered.length]);

  // Keyboard events for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKey = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };

    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, goPrev, goNext]);

  return (
    <div className={s.gallery}>
      {/* Hero */}
      <section className={s.hero}>
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80"
          alt="Maison Aurore gallery"
          className={s.heroImage}
        />
        <div className={s.heroOverlay} />
        <div className={s.heroContent}>
          <h1 className={s.heroTitle}>Gallery</h1>
          <nav className={s.breadcrumb}>
            <Link to="/">Home</Link>
            <span className={s.breadcrumbSep}>/</span>
            <span>Gallery</span>
          </nav>
        </div>
      </section>

      {/* Filter Bar */}
      <AnimatedSection animation="fadeUp">
        <section className={s.filterSection}>
          <div className={s.filterBar}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`${s.filterBtn} ${activeFilter === cat ? s.active : ''}`}
                onClick={() => handleFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>
      </AnimatedSection>

      {/* Masonry Grid */}
      <section className={s.gridSection}>
        <div className={s.container}>
          <div className={`${s.masonry} ${animating ? s.fadeOut : s.fadeIn}`}>
            {filtered.map((item, index) => (
              <div
                key={item.id}
                className={s.masonryItem}
                onClick={() => openLightbox(index)}
              >
                <img
                  src={item.image}
                  alt={item.alt || item.category}
                  className={s.masonryImage}
                />
                <div className={s.masonryOverlay}>
                  <span className={s.masonryCategory}>{item.category}</span>
                  <span className={s.masonryZoom}>&#x2922;</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <AnimatedSection animation="fadeUp">
        <section className={s.ctaSection}>
          <SectionTitle
            label="Experience More"
            title="Begin Your Journey"
            subtitle="Discover the art of refined hospitality at Maison Aurore"
          />
          <Link to="/booking" className={s.ctaBtn}>
            Reserve Your Stay
          </Link>
        </section>
      </AnimatedSection>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className={s.lightbox} onClick={closeLightbox}>
          <div className={s.lightboxInner} onClick={(e) => e.stopPropagation()}>
            <button
              className={s.lightboxClose}
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              &times;
            </button>

            <button
              className={`${s.lightboxArrow} ${s.lightboxPrev}`}
              onClick={goPrev}
              aria-label="Previous image"
            >
              &#8249;
            </button>

            <img
              src={filtered[lightboxIndex]?.image?.replace('w=600', 'w=1200')}
              alt={filtered[lightboxIndex]?.alt || ''}
              className={s.lightboxImage}
            />

            <button
              className={`${s.lightboxArrow} ${s.lightboxNext}`}
              onClick={goNext}
              aria-label="Next image"
            >
              &#8250;
            </button>

            <div className={s.lightboxCounter}>
              {lightboxIndex + 1} / {filtered.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
