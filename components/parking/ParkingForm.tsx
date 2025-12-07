'use client';

import { useState, useMemo } from 'react';
import { formatValidUntil, isValidLicensePlate } from '@/lib/utils';
import type { ParkingLot } from '@/types';
import LicensePlateInput from './LicensePlateInput';
import PaymentMethods from './PaymentMethods';
import ValidityInfo from './ValidityInfo';
import ActionButton from './ActionButton';

interface ParkingFormProps {
  parkingLot: ParkingLot;
}

export default function ParkingForm({ parkingLot }: ParkingFormProps) {
  const [licensePlate, setLicensePlate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Vypočítej validitu lístku
  const validUntil = useMemo(() => {
    const date = new Date();
    date.setHours(date.getHours() + parkingLot.parkingDurationHours);
    return date;
  }, [parkingLot.parkingDurationHours]);

  const handleSubmit = async () => {
    setError('');

    // Validace SPZ
    if (!isValidLicensePlate(licensePlate)) {
      setError('Zadejte platnou SPZ');
      return;
    }

    setIsLoading(true);

    try {
      // Zavolej API pro vytvoření Stripe checkout session
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          parkingLotId: parkingLot.id,
          licensePlate,
          validUntil: validUntil.toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Nepodařilo se vytvořit platbu');
      }

      const data = await response.json();

      // Redirect na Stripe checkout
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('Chybí URL pro platbu');
      }
    } catch (err) {
      console.error('Error creating checkout:', err);
      setError('Nastala chyba při vytváření platby. Zkuste to prosím znovu.');
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center flex-1">
      <LicensePlateInput
        value={licensePlate}
        onChange={setLicensePlate}
        className="mt-12"
      />

      {error && (
        <p className="text-red-600 text-sm mt-2">{error}</p>
      )}

      <PaymentMethods />

      <ValidityInfo validUntil={formatValidUntil(validUntil)} />

      <div className="flex-1" />

      <ActionButton
        onClick={handleSubmit}
        disabled={!licensePlate || isLoading}
        loading={isLoading}
        className="mb-10"
      >
        Zaplatit
      </ActionButton>
    </div>
  );
}
