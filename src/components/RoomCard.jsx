import { Link } from 'react-router-dom';
import s from './RoomCard.module.scss';

export default function RoomCard({
  image,
  category = 'Room',
  name,
  description,
  price,
  slug,
}) {
  return (
    <article className={s.card}>
      <div className={s.imageWrap}>
        <img
          src={image}
          alt={name}
          className={s.image}
          loading="lazy"
        />
        <span className={s.category}>{category}</span>
      </div>

      <div className={s.body}>
        <h3 className={s.name}>{name}</h3>
        {description && <p className={s.description}>{description}</p>}
        <div className={s.footer}>
          <div className={s.price}>
            <span className={s.priceAmount}>&euro;{price}</span>
            <span className={s.priceLabel}> / night</span>
          </div>
          <Link
            to={slug || `/rooms/${name?.toLowerCase().replace(/\s+/g, '-')}`}
            className={s.discover}
          >
            Discover
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
