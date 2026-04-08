import { useState } from 'react';
import { Link } from 'react-router-dom';
import { experiences } from '../data/hotel';
import AnimatedSection from '../components/AnimatedSection';
import SectionTitle from '../components/SectionTitle';
import s from './Experiences.module.scss';

export default function Experiences() {
  const { hero, intro, categories, items } = experiences;
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered =
    activeCategory === 'All'
      ? items
      : items.filter((item) => item.category === activeCategory);

  const featured = filtered.find((item) => item.featured);
  const rest = filtered.filter((item) => !item.featured);

  return (
    <div className={s.page}>
      {/* Hero */}
      <section className={s.hero}>
        <img src={hero.image} alt={hero.title} className={s.heroImage} />
        <div className={s.heroOverlay} />
        <div className={s.heroContent}>
          <nav className={s.breadcrumb}>
            {hero.breadcrumb.map((crumb, i) => (
              <span key={crumb}>
                {i === 0 ? (
                  <Link to="/">{crumb}</Link>
                ) : (
                  <span className={s.breadcrumbCurrent}>{crumb}</span>
                )}
                {i < hero.breadcrumb.length - 1 && (
                  <span className={s.breadcrumbSep}>/</span>
                )}
              </span>
            ))}
          </nav>
          <h1 className={s.heroTitle}>{hero.title}</h1>
        </div>
      </section>

      {/* Intro */}
      <AnimatedSection>
        <section className={s.intro}>
          <div className={s.introInner}>
            <p className={s.introText}>{intro}</p>
          </div>
        </section>
      </AnimatedSection>

      {/* Category Filter */}
      <section className={s.filterSection}>
        <div className={s.filterInner}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`${s.filterTab} ${
                activeCategory === cat ? s.active : ''
              }`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Card */}
      {featured && (
        <AnimatedSection animation="fadeUp">
          <section className={s.featuredSection}>
            <div className={s.featuredInner}>
              <div className={s.featuredCard}>
                <div className={s.featuredImageWrap}>
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className={s.featuredImage}
                  />
                  <div className={s.featuredGradient} />
                </div>
                <div className={s.featuredContent}>
                  <span className={s.cardCategory}>{featured.category}</span>
                  <h2 className={s.featuredTitle}>{featured.title}</h2>
                  <p className={s.featuredDesc}>{featured.description}</p>
                  <div className={s.cardMeta}>
                    <span className={s.cardDuration}>{featured.duration}</span>
                    <span className={s.cardPrice}>
                      &euro;{featured.price}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>
      )}

      {/* Experience Cards Grid */}
      <AnimatedSection animation="fadeUp" delay={0.15}>
        <section className={s.gridSection}>
          <div className={s.gridInner}>
            <div className={s.grid}>
              {rest.map((item) => (
                <div key={item.id} className={s.card}>
                  <div className={s.cardImageWrap}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className={s.cardImage}
                    />
                    <div className={s.cardGradient} />
                    <div className={s.cardOverlayContent}>
                      <span className={s.cardCategory}>{item.category}</span>
                      <h3 className={s.cardTitle}>{item.title}</h3>
                      <p className={s.cardDesc}>{item.description}</p>
                      <div className={s.cardMeta}>
                        <span className={s.cardDuration}>{item.duration}</span>
                        <span className={s.cardPrice}>
                          &euro;{item.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Craft Your Experience CTA */}
      <AnimatedSection animation="fadeUp">
        <section className={s.ctaSection}>
          <div className={s.ctaInner}>
            <SectionTitle
              label="Tailored for You"
              title="Craft Your Experience"
              subtitle="Let our concierge design a bespoke itinerary that brings your vision to life"
            />
            <button className={s.ctaBtn}>Contact Concierge</button>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
}
