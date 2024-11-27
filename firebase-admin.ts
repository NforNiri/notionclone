import { initializeApp, getApps, App, getApp, cert } from "firebase-admin/app";


import { getFirestore } from "firebase-admin/firestore";

// const serviceKey = require("@/service_key.json");

let app: App;

if (getApps().length === 0) {
  app = initializeApp({
    credential: cert({
      privateKey:process.env.FIREBASE_PRIVATE_KEY,
      clientEmail:process.env.FIREBASE_CLIENT_EMAIL,
      projectId: process.env.FIREBASE_PROJECT_ID,
      
    }),
  });
} else {
  app = getApp();
}

const adminDb = getFirestore(app);
export { app as adminApp, adminDb };
