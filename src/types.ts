export type SupportedLocale = 'en' | 'pt-BR' | 'es';

export type LocaleSwitcherVariant = 'light' | 'dark' | 'auto';

export type LocaleSwitcherProps<L extends string = SupportedLocale> = {
  locale: L;
  locales: readonly L[];
  getLabel: (locale: L) => string;
  onLocaleChange: (locale: L) => void;
  ariaLabel: string;
  localeCodes?: Partial<Record<L, string>>;
  variant?: LocaleSwitcherVariant;
  className?: string;
};
