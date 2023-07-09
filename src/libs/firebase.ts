import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {
  apiKey,
  appId,
  authDomain,
  databaseURL,
  messagingSenderId,
  mesurementId,
  projectId,
  storageKey,
} from "../constants/env";

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  databaseURL: databaseURL,
  projectId: projectId,
  storageBucket: storageKey,
  messagingSenderId: messagingSenderId,
  appId: appId,
  measurementId: mesurementId,
};

//従業員のfirebase情報
const corporateFirebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_CORPORATE_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_CORPORATE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_CORPORATE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_CORPORATE_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_CORPORATE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_CORPORATE_FIREBASE_APP_ID
};

export const app = initializeApp(firebaseConfig, 'user');
export const corproateApp = initializeApp(corporateFirebaseConfig, 'employee');

export const db = getFirestore(app);
export const auth = getAuth(app);
export const realTimeDb = getDatabase(app);
export const storage = getStorage(app);

export const corporeteDb = getFirestore(corproateApp);
export const corporateAuth = getAuth(corproateApp);
export const corporateStorege = getStorage(corproateApp)