import type { SupportedLocale } from './types.js';

type FlagIconProps = {
  locale: SupportedLocale | string;
  width?: number;
  height?: number;
  className?: string;
};

function UsFlag({ width, height, className }: Omit<FlagIconProps, 'locale'>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 13"
      className={className}
      aria-hidden
    >
      <rect width="18" height="13" fill="#B22234" />
      <rect y="1" width="18" height="1" fill="#fff" />
      <rect y="3" width="18" height="1" fill="#fff" />
      <rect y="5" width="18" height="1" fill="#fff" />
      <rect y="7" width="18" height="1" fill="#fff" />
      <rect y="9" width="18" height="1" fill="#fff" />
      <rect y="11" width="18" height="1" fill="#fff" />
      <rect width="7.2" height="7" fill="#3C3B6E" />
      <circle cx="1.2" cy="1" r="0.35" fill="#fff" />
      <circle cx="2.4" cy="1" r="0.35" fill="#fff" />
      <circle cx="3.6" cy="1" r="0.35" fill="#fff" />
      <circle cx="4.8" cy="1" r="0.35" fill="#fff" />
      <circle cx="6" cy="1" r="0.35" fill="#fff" />
      <circle cx="1.8" cy="2" r="0.35" fill="#fff" />
      <circle cx="3" cy="2" r="0.35" fill="#fff" />
      <circle cx="4.2" cy="2" r="0.35" fill="#fff" />
      <circle cx="5.4" cy="2" r="0.35" fill="#fff" />
      <circle cx="1.2" cy="3" r="0.35" fill="#fff" />
      <circle cx="2.4" cy="3" r="0.35" fill="#fff" />
      <circle cx="3.6" cy="3" r="0.35" fill="#fff" />
      <circle cx="4.8" cy="3" r="0.35" fill="#fff" />
      <circle cx="6" cy="3" r="0.35" fill="#fff" />
      <circle cx="1.8" cy="4" r="0.35" fill="#fff" />
      <circle cx="3" cy="4" r="0.35" fill="#fff" />
      <circle cx="4.2" cy="4" r="0.35" fill="#fff" />
      <circle cx="5.4" cy="4" r="0.35" fill="#fff" />
      <circle cx="1.2" cy="5" r="0.35" fill="#fff" />
      <circle cx="2.4" cy="5" r="0.35" fill="#fff" />
      <circle cx="3.6" cy="5" r="0.35" fill="#fff" />
      <circle cx="4.8" cy="5" r="0.35" fill="#fff" />
      <circle cx="6" cy="5" r="0.35" fill="#fff" />
    </svg>
  );
}

function BrazilFlag({ width, height, className }: Omit<FlagIconProps, 'locale'>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 13"
      className={className}
      aria-hidden
    >
      <rect width="18" height="13" fill="#009B3A" />
      <path d="M9 1.5 L16.5 6.5 L9 11.5 L1.5 6.5 Z" fill="#FEDF00" />
      <circle cx="9" cy="6.5" r="2.8" fill="#002776" />
      <path
        d="M6.2 6.5 C7.2 5.2 10.8 5.2 11.8 6.5"
        fill="none"
        stroke="#fff"
        strokeWidth="0.5"
      />
    </svg>
  );
}

function SpainFlag({ width, height, className }: Omit<FlagIconProps, 'locale'>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 13"
      className={className}
      aria-hidden
    >
      <rect width="18" height="13" fill="#AA151B" />
      <rect y="3.25" width="18" height="6.5" fill="#F1BF00" />
    </svg>
  );
}

export default function FlagIcon({
  locale,
  width = 18,
  height = 13,
  className,
}: FlagIconProps) {
  const props = { width, height, className };

  switch (locale) {
    case 'en':
      return <UsFlag {...props} />;
    case 'pt-BR':
      return <BrazilFlag {...props} />;
    case 'es':
      return <SpainFlag {...props} />;
    default:
      return <UsFlag {...props} />;
  }
}
