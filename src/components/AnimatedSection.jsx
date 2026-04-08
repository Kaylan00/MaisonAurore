import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import s from './AnimatedSection.module.scss';

gsap.registerPlugin(ScrollTrigger);

const animations = {
  fadeUp: {
    from: { opacity: 0, y: 60 },
    to: { opacity: 1, y: 0 },
  },
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  slideLeft: {
    from: { opacity: 0, x: 80 },
    to: { opacity: 1, x: 0 },
  },
  slideRight: {
    from: { opacity: 0, x: -80 },
    to: { opacity: 1, x: 0 },
  },
  reveal: {
    from: { opacity: 0, y: 40, scale: 0.96 },
    to: { opacity: 1, y: 0, scale: 1 },
  },
};

export default function AnimatedSection({
  children,
  animation = 'fadeUp',
  delay = 0,
  className = '',
}) {
  const ref = useRef(null);
  const anim = animations[animation] || animations.fadeUp;

  useGSAP(
    () => {
      gsap.fromTo(ref.current, anim.from, {
        ...anim.to,
        duration: 1,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={`${s.section} ${className}`}>
      {children}
    </div>
  );
}
