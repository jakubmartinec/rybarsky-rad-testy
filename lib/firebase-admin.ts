import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';

let app: App | null = null;
let adminDbInstance: Firestore | null = null;

function getApp(): App {
  if (app) return app;

  if (!getApps().length) {
    app = initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_ADMIN_PROJECT_ID || 'placeholder',
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL || 'placeholder@example.com',
        privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n') || '-----BEGIN PRIVATE KEY-----\nplaceholder\n-----END PRIVATE KEY-----\n',
      }),
    });
  } else {
    app = getApps()[0];
  }

  return app;
}

export const adminDb = new Proxy({} as Firestore, {
  get: (target, prop) => {
    if (!adminDbInstance) {
      adminDbInstance = getFirestore(getApp());
    }
    return (adminDbInstance as any)[prop];
  }
});

export default getApp;
