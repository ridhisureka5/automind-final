import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA1TEdJy3Ts-XaAAOkKUETJxfsyTCixFfk",
  authDomain: "automind-c3faa.firebaseapp.com",
  projectId: "automind-c3faa",
  storageBucket: "automind-c3faa.firebasestorage.app",
  messagingSenderId: "510713558141",
  appId: "1:510713558141:android:f5fb84f2f70a42ff5b2d14",
};

// Prevent multiple initialization
const app =
  getApps().length === 0
    ? initializeApp(firebaseConfig)
    : getApps()[0];

export const db = getFirestore(app);
// firebase.jsx

