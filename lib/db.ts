import { collection, doc, getDoc, setDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from './firebase';
import { adminDb } from './firebase-admin';
import type { ParkingLot, Ticket } from '@/types';

// Client-side functions
export async function getParkingLot(id: string): Promise<ParkingLot | null> {
  try {
    const docRef = doc(db, 'parkingLots', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as ParkingLot;
    }
    return null;
  } catch (error) {
    console.error('Error getting parking lot:', error);
    return null;
  }
}

// Server-side functions (for API routes)
export async function getParkingLotAdmin(id: string): Promise<ParkingLot | null> {
  try {
    const docRef = adminDb.collection('parkingLots').doc(id);
    const docSnap = await docRef.get();

    if (docSnap.exists) {
      return { id: docSnap.id, ...docSnap.data() } as ParkingLot;
    }
    return null;
  } catch (error) {
    console.error('Error getting parking lot:', error);
    return null;
  }
}

export async function createTicket(data: {
  parkingLotId: string;
  clientId: string;
  licensePlate: string;
  price: number;
  currency: string;
  validFrom: Date;
  validUntil: Date;
}): Promise<Ticket> {
  const ticketRef = adminDb.collection('tickets').doc();

  const ticket: Omit<Ticket, 'id'> = {
    parkingLotId: data.parkingLotId,
    clientId: data.clientId,
    licensePlate: data.licensePlate,
    price: data.price,
    currency: data.currency,
    validFrom: Timestamp.fromDate(data.validFrom),
    validUntil: Timestamp.fromDate(data.validUntil),
    status: 'pending',
    receiptDownloaded: false,
    createdAt: Timestamp.now(),
  };

  await ticketRef.set(ticket);

  return { id: ticketRef.id, ...ticket };
}

export async function getTicket(id: string): Promise<Ticket | null> {
  try {
    const docRef = doc(db, 'tickets', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Ticket;
    }
    return null;
  } catch (error) {
    console.error('Error getting ticket:', error);
    return null;
  }
}

export async function getTicketAdmin(id: string): Promise<Ticket | null> {
  try {
    const docRef = adminDb.collection('tickets').doc(id);
    const docSnap = await docRef.get();

    if (docSnap.exists) {
      return { id: docSnap.id, ...docSnap.data() } as Ticket;
    }
    return null;
  } catch (error) {
    console.error('Error getting ticket:', error);
    return null;
  }
}

export async function updateTicket(id: string, data: Partial<Ticket>): Promise<void> {
  const ticketRef = adminDb.collection('tickets').doc(id);
  await ticketRef.update(data);
}
