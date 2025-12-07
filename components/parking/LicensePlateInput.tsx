'use client';

import { useState } from 'react';
import { normalizeLicensePlate } from '@/lib/utils';

interface LicensePlateInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function LicensePlateInput({
  value,
  onChange,
  className = ''
}: LicensePlateInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Uppercase a odstranění speciálních znaků (kromě číslic a písmen)
    const normalized = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    onChange(normalized);
  };

  return (
    <>
      {/* Overlay při focusu */}
      {isFocused && (
        <div
          className="fixed inset-0 bg-black/20 z-10 transition-opacity"
          onClick={() => setIsFocused(false)}
        />
      )}

      <div className={`relative z-20 w-full flex justify-center ${className}`}>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Zadej SPZ"
          maxLength={8}
          className="input-spz"
          autoComplete="off"
          autoCapitalize="characters"
        />
      </div>
    </>
  );
}
