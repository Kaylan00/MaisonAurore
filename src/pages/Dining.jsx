import { Link } from 'react-router-dom';
import { dining } from '../data/hotel';
import AnimatedSection from '../components/AnimatedSection';
import SectionTitle from '../components/SectionTitle';
import s from './Dining.module.scss';

export default function Dining() {
  const { hero, intro, restaurants, privateDining } = dining;

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

      {/* Restaurants */}
      <section className={s.restaurants}>
        {restaurants.map((restaurant, i) => (
          <AnimatedSection
            key={restaurant.id}
            animation={i % 2 === 0 ? 'slideRight' : 'slideLeft'}
            delay={0.1}
          >
            <div
              className={`${s.restaurantRow} ${
                i % 2 !== 0 ? s.reversed : ''
              }`}
            >
              <div className={s.restaurantImageWrap}>
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className={s.restaurantImage}
                />
              </div>
              <div className={s.restaurantContent}>
                <span className={s.cuisineLabel}>{restaurant.cuisine}</span>
                <h2 className={s.restaurantName}>{restaurant.name}</h2>
                <p className={s.restaurantDesc}>{restaurant.description}</p>
                <div className={s.restaurantMeta}>
                  <div className={s.metaItem}>
                    <span className={s.metaLabel}>Hours</span>
                    <span className={s.metaValue}>{restaurant.hours}</span>
                  </div>
                  <div className={s.metaItem}>
                    <span className={s.metaLabel}>Dress Code</span>
                    <span className={s.metaValue}>{restaurant.dressCode}</span>
                  </div>
                </div>
                <button className={s.reserveBtn}>Reserve a Table</button>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </section>

      {/* Private Dining CTA */}
      <AnimatedSection animation="fadeUp">
        <section className={s.privateDining}>
          <div className={s.privateDiningInner}>
            <div className={s.privateDiningImageWrap}>
              <img
                src={privateDining.image}
                alt={privateDining.title}
                className={s.privateDiningImage}
              />
            </div>
            <div className={s.privateDiningContent}>
              <SectionTitle
                label="Exclusive Events"
                title={privateDining.title}
                align="left"
              />
              <p className={s.privateDiningText}>
                {privateDining.description}
              </p>
              <button className={s.privateDiningBtn}>Inquire Now</button>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
}
