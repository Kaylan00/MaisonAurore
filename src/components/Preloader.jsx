import { useEffect, useState } from 'react';
import Logo from './Logo';
import s from './Preloader.module.scss';

export default function Preloader({ loaded: externalLoaded }) {
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);

  const isLoaded = externalLoaded ?? done;

  useEffect(() => {
    const timer = setTimeout(() => setDone(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      const hideTimer = setTimeout(() => setHidden(true), 700);
      return () => clearTimeout(hideTimer);
    }
  }, [isLoaded]);

  if (hidden) return null;

  return (
    <div className={`${s.preloader} ${isLoaded ? s.loaded : ''}`}>
      <div className={s.logo}>
        <Logo color="#b5a08a" size="lg" />
      </div>
      <div className={s.bar}>
        <div className={s.barFill} />
      </div>
    </div>
  );
}
