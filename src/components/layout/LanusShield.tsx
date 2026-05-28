interface Props {
  className?: string;
}

// Escudo estilizado del Club Atlético Lanús: forma de escudo granate
// con franja blanca diagonal y monograma "CAL". Inspirado en el escudo oficial
// sin reproducirlo literalmente.
export function LanusShield({ className }: Props) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-label="Escudo Lanús" role="img">
      <defs>
        <clipPath id="shieldClip">
          <path d="M8 8 H56 V34 C56 48 44 58 32 60 C20 58 8 48 8 34 Z" />
        </clipPath>
      </defs>
      <path d="M8 8 H56 V34 C56 48 44 58 32 60 C20 58 8 48 8 34 Z" fill="#6B1219" />
      <g clipPath="url(#shieldClip)">
        <polygon points="-4,46 22,8 38,8 12,46" fill="#ffffff" />
      </g>
      <path
        d="M8 8 H56 V34 C56 48 44 58 32 60 C20 58 8 48 8 34 Z"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
      />
      <text
        x="32"
        y="42"
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fontWeight="800"
        fontSize="18"
        fill="#6B1219"
      >
        CAL
      </text>
    </svg>
  );
}
