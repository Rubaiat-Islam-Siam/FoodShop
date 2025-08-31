// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import {getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAT56oeq4WkkuJWZIhM-R2vmSueMmpgmYw",
  authDomain: "log-in-71a1a.firebaseapp.com",
  projectId: "log-in-71a1a",
  storageBucket: "log-in-71a1a.firebasestorage.app",
  messagingSenderId: "159562626121",
  appId: "1:159562626121:web:e3dc7e531b0bcf8e6b3b98"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export default app;