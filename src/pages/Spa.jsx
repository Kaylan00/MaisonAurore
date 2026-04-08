import { useState } from 'react';
import { Link } from 'react-router-dom';
import { spa } from '../data/hotel';
import AnimatedSection from '../components/AnimatedSection';
import SectionTitle from '../components/SectionTitle';
import s from './Spa.module.scss';

export default function Spa() {
  const {
    hero,
    intro,
    introImage,
    facilities,
    treatmentCategories,
    treatments,
    quote,
  } = spa;

  const [activeCategory, setActiveCategory] = useState('All');

  const filteredTreatments =
    activeCategory === 'All'
      ? treatments
      : treatments.filter((t) => t.category === activeCategory);

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

      {/* Intro: Two Columns */}
      <AnimatedSection>
        <section className={s.introSection}>
          <div className={s.introInner}>
            <div className={s.introText}>
              <SectionTitle
                label="Our Sanctuary"
                title="A Journey Within"
                align="left"
              />
              <p className={s.introBody}>{intro}</p>
            </div>
            <div className={s.introImageWrap}>
              <div className={s.introImageBorder} />
              <img src={introImage} alt="Spa interior" className={s.introImage} />
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Facilities */}
      <AnimatedSection animation="fadeUp">
        <section className={s.facilities}>
          <div className={s.facilitiesInner}>
            <SectionTitle
              label="Facilities"
              title="World-Class Amenities"
              subtitle="Every detail designed for your restoration"
            />
            <div className={s.facilitiesGrid}>
              {facilities.map((facility) => (
                <div key={facility.name} className={s.facilityCard}>
                  <span className={s.facilityIcon}>{facility.icon}</span>
                  <h3 className={s.facilityName}>{facility.name}</h3>
                  <p className={s.facilityDesc}>{facility.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Treatments */}
      <AnimatedSection animation="fadeUp">
        <section className={s.treatments}>
          <div className={s.treatmentsInner}>
            <SectionTitle
              label="Treatments"
              title="Bespoke Rituals"
              subtitle="Tailored to your body and spirit"
            />
            <div className={s.filterTabs}>
              {treatmentCategories.map((cat) => (
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
            <div className={s.treatmentsGrid}>
              {filteredTreatments.map((treatment) => (
                <div key={treatment.id} className={s.treatmentCard}>
                  <div className={s.treatmentHeader}>
                    <h3 className={s.treatmentName}>{treatment.name}</h3>
                    <span className={s.treatmentPrice}>
                      &euro;{treatment.price}
                    </span>
                  </div>
                  <span className={s.treatmentDuration}>
                    {treatment.duration}
                  </span>
                  <p className={s.treatmentDesc}>{treatment.description}</p>
                  <div className={s.treatmentCategory}>
                    {treatment.category}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Full-width Quote Image Break */}
      <section className={s.quoteSection}>
        <img src={quote.image} alt="" className={s.quoteImage} />
        <div className={s.quoteOverlay} />
        <div className={s.quoteContent}>
          <blockquote className={s.quoteText}>
            &ldquo;{quote.text}&rdquo;
          </blockquote>
          <cite className={s.quoteAuthor}>&mdash; {quote.author}</cite>
        </div>
      </section>

      {/* Book a Treatment CTA */}
      <AnimatedSection animation="fadeUp">
        <section className={s.ctaSection}>
          <div className={s.ctaInner}>
            <SectionTitle
              label="Begin Your Journey"
              title="Book a Treatment"
              subtitle="Our wellness advisors are ready to design your perfect experience"
            />
            <button className={s.ctaBtn}>Reserve Your Session</button>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
}
