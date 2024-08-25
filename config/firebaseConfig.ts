import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "taskify-89148.firebaseapp.com",
  projectId: "taskify-89148",
  storageBucket: "taskify-89148.appspot.com",
  messagingSenderId: "103695002510",
  appId: "1:103695002510:web:d4dd2124ef2ea2fd9592df",
  measurementId: "G-YCR6QQPYK3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);
