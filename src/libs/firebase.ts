import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {
  apiKey,
  appId,
  authDomain,
  corporateApiKey,
  corporateAppId,
  corporateAuthDomain,
  corporateMessagingSenderId,
  corporateProjectId,
  corporateStorageKey,
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
  apiKey: corporateApiKey,
  authDomain: corporateAuthDomain,
  projectId: corporateProjectId,
  storageBucket: corporateStorageKey,
  messagingSenderId: corporateMessagingSenderId,
  appId: corporateAppId,
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