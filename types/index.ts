import { Timestamp } from 'firebase/firestore';

// B2B zákazníci - provozovatelé parkovišť
export interface Client {
  id: string;
  companyName: string;
  ico: string;
  dic?: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    zip: string;
    country: string;
  };
  licenseType: 'per_transaction' | 'yearly';
  licenseValidUntil?: Timestamp;
  feePerTransaction: number; // výchozí 1 Kč
  stripeAccountId?: string;
  createdAt: Timestamp;
  status: 'active' | 'suspended' | 'pending';
}

// Parkoviště
export interface ParkingLot {
  id: string;
  clientId: string;
  name: string; // "Rejštejn - za hasičárnou"
  logoUrl?: string;
  address: string;
  gpsCoordinates?: { lat: number; lng: number };
  currency: 'CZK' | 'EUR';
  pricePerDay: number; // 50
  parkingDurationHours: number; // 24
  qrCodeUrl: string;
  isActive: boolean;
  createdAt: Timestamp;
}

// Parkovací lístky
export interface Ticket {
  id: string;
  parkingLotId: string;
  clientId: string;
  licensePlate: string; // SPZ
  price: number;
  currency: string;
  validFrom: Timestamp;
  validUntil: Timestamp;
  status: 'pending' | 'paid' | 'expired' | 'cancelled';
  stripePaymentIntentId?: string;
  stripeSessionId?: string;
  customerEmail?: string;
  receiptDownloaded: boolean;
  createdAt: Timestamp;
  paidAt?: Timestamp;
}

// Formulářové typy
export interface ParkingFormData {
  licensePlate: string;
}

export interface CheckoutRequest {
  parkingLotId: string;
  licensePlate: string;
  validUntil: Date;
}

export interface CheckoutResponse {
  url: string;
  sessionId: string;
}
