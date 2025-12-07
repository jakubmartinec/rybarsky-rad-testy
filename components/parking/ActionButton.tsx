'use client';

import Link from 'next/link';
import { ButtonHTMLAttributes } from 'react';

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  href?: string;
  loading?: boolean;
  children: React.ReactNode;
}

export default function ActionButton({
  variant = 'primary',
  href,
  loading = false,
  children,
  disabled,
  className = '',
  ...props
}: ActionButtonProps) {
  const buttonClass = variant === 'primary' ? 'btn-primary' : 'btn-secondary';
  const combinedClass = `${buttonClass} ${className}`;

  if (href) {
    return (
      <Link
        href={href}
        className={`${combinedClass} flex items-center justify-center no-underline`}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={combinedClass}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Zpracovávám...
        </span>
      ) : (
        children
      )}
    </button>
  );
}
