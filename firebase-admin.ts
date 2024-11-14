// Import necessary Firebase Admin functions
import { getApps, getApp, App, initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Import the service key JSON file
import serviceKey from "@/service_key.json";

// Type the serviceKey as ServiceAccount
const serviceAccountKey = serviceKey as ServiceAccount;

let app: App;

if (getApps().length === 0) {
  app = initializeApp({
    credential: cert(serviceAccountKey)
  });
} else {
  app = getApp();
}

const adminDb = getFirestore(app);

export { app as adminApp, adminDb };
