import { memo } from 'react';

const sizes = {
  sm: { width: 48, height: 56 },
  md: { width: 64, height: 76 },
  lg: { width: 96, height: 112 },
};

function Logo({ color = 'currentColor', size = 'md' }) {
  const { width, height } = sizes[size] || sizes.md;

  return (
    <svg
      viewBox="0 0 64 76"
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Maison Aurore"
    >
      {/* MA Monogram */}
      <g stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        {/* M */}
        <line x1="12" y1="40" x2="12" y2="8" />
        <line x1="12" y1="8" x2="24" y2="26" />
        <line x1="24" y1="26" x2="36" y2="8" />
        <line x1="36" y1="8" x2="36" y2="40" />
        {/* A - intertwined */}
        <line x1="28" y1="40" x2="44" y2="8" />
        <line x1="44" y1="8" x2="52" y2="28" />
        <line x1="52" y1="28" x2="60" y2="8" />
        <line x1="33" y1="28" x2="55" y2="28" />
      </g>

      {/* Decorative line */}
      <line
        x1="8"
        y1="48"
        x2="56"
        y2="48"
        stroke={color}
        strokeWidth="0.5"
        opacity="0.4"
      />

      {/* Text: MAISON AURORE */}
      <text
        x="32"
        y="60"
        textAnchor="middle"
        fill={color}
        fontFamily="'Playfair Display', Georgia, serif"
        fontSize="5.5"
        letterSpacing="0.25em"
        fontWeight="400"
      >
        MAISON
      </text>
      <text
        x="32"
        y="68"
        textAnchor="middle"
        fill={color}
        fontFamily="'Playfair Display', Georgia, serif"
        fontSize="5.5"
        letterSpacing="0.25em"
        fontWeight="400"
      >
        AURORE
      </text>
    </svg>
  );
}

export default memo(Logo);
