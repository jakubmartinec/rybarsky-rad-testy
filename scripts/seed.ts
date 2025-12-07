/**
 * Seed script pro vytvoření testovacích dat v Firebase
 * Spusť: npx tsx scripts/seed.ts
 */

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';

// Initialize Firebase Admin
const app = initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }),
});

const db = getFirestore(app);

async function seed() {
  console.log('🌱 Starting seed...');

  try {
    // 1. Vytvoř testovacího klienta
    const clientRef = db.collection('clients').doc();
    const clientData = {
      companyName: 'Obec Rejštejn',
      ico: '12345678',
      email: 'info@rejstejn.cz',
      phone: '+420 123 456 789',
      address: {
        street: 'Náměstí 1',
        city: 'Rejštejn',
        zip: '123 45',
        country: 'Česká republika',
      },
      licenseType: 'per_transaction',
      feePerTransaction: 1,
      createdAt: Timestamp.now(),
      status: 'active',
    };

    await clientRef.set(clientData);
    console.log('✅ Client created:', clientRef.id);

    // 2. Vytvoř testovací parkoviště
    const parkingLotRef = db.collection('parkingLots').doc();
    const parkingLotData = {
      clientId: clientRef.id,
      name: 'Rejštejn - za hasičárnou',
      address: 'Za hasičárnou, Rejštejn',
      currency: 'CZK',
      pricePerDay: 50,
      parkingDurationHours: 24,
      qrCodeUrl: `${process.env.NEXT_PUBLIC_APP_URL}/p/${parkingLotRef.id}`,
      isActive: true,
      createdAt: Timestamp.now(),
    };

    await parkingLotRef.set(parkingLotData);
    console.log('✅ Parking lot created:', parkingLotRef.id);

    console.log('\n🎉 Seed completed successfully!\n');
    console.log('📍 Test parking lot URL:');
    console.log(`   ${process.env.NEXT_PUBLIC_APP_URL}/p/${parkingLotRef.id}`);
    console.log('\n💡 Save this URL to test the app!');
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }

  process.exit(0);
}

seed();
