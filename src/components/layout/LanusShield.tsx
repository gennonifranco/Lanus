interface Props {
  className?: string;
}

export function LanusShield({ className }: Props) {
  return (
    <img
      src="/shield.png"
      alt="Escudo Club Atlético Lanús"
      className={className}
      draggable={false}
    />
  );
}
