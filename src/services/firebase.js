// Firebase Configuration and Initialization
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: "AIzaSyB4f99wafXcHe6U8gOrd1NxGwHR960-k98",
  authDomain: "mubar-store-39298.firebaseapp.com",
  projectId: "mubar-store-39298",
  storageBucket: "mubar-store-39298.firebasestorage.app",
  messagingSenderId: "295418317449",
  appId: "1:295418317449:web:2f9670befe80efe4331458",
  measurementId: "G-F0FGLV6ESG"
};

// Initialize Firebase App singleton
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Cloud Firestore database
export const db = getFirestore(app);

export default app;
