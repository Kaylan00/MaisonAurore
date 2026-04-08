import s from './SectionTitle.module.scss';

export default function SectionTitle({
  label,
  title,
  subtitle,
  align = 'center',
  light = false,
}) {
  const rootCls = `${s.sectionTitle} ${s[align]} ${light ? s.light : ''}`;

  return (
    <div className={rootCls}>
      {label && <span className={s.label}>{label}</span>}
      {title && <h2 className={s.title}>{title}</h2>}
      <div className={s.line} />
      {subtitle && <p className={s.subtitle}>{subtitle}</p>}
    </div>
  );
}
