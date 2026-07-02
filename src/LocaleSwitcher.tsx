'use client';

import { useEffect, useRef, useState } from 'react';
import FlagIcon from './FlagIcon.js';
import type { LocaleSwitcherProps } from './types.js';

export const defaultLocaleCodes = {
  en: 'EN',
  'pt-BR': 'PT-BR',
  es: 'ES',
} as const;

export default function LocaleSwitcher<L extends string>({
  locale,
  locales,
  getLabel,
  onLocaleChange,
  ariaLabel,
  localeCodes = defaultLocaleCodes as Partial<Record<L, string>>,
  variant = 'light',
  className,
}: LocaleSwitcherProps<L>) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  function selectLocale(nextLocale: L) {
    if (nextLocale !== locale) {
      onLocaleChange(nextLocale);
    }
    setOpen(false);
  }

  const rootClassName = [
    'language-switcher',
    `language-switcher--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const code = localeCodes[locale as keyof typeof localeCodes] ?? locale;

  return (
    <div className={rootClassName} ref={rootRef}>
      <button
        type="button"
        className="language-switcher-trigger"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        <FlagIcon locale={locale} className="language-switcher-flag" />
        <span className="language-switcher-code">{code}</span>
        <svg
          className="language-switcher-chevron"
          width="10"
          height="6"
          viewBox="0 0 10 6"
          aria-hidden
        >
          <path
            d="M1 1 L5 5 L9 1"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div
        className={`language-switcher-panel ${open ? 'open' : ''}`}
        role="listbox"
        aria-label={ariaLabel}
      >
        {locales.map((option) => (
          <button
            key={option}
            type="button"
            role="option"
            aria-selected={option === locale}
            className={`language-switcher-item ${option === locale ? 'selected' : ''}`}
            onClick={() => selectLocale(option)}
          >
            <FlagIcon locale={option} className="language-switcher-flag" />
            <span>{getLabel(option)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
