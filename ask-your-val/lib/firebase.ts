import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBFFTvaAfjq1oe_5msDazcmej1yKmRvaDI",
  authDomain: "valentine-5a348.firebaseapp.com",
  projectId: "valentine-5a348",
  storageBucket: "valentine-5a348.firebasestorage.app",
  messagingSenderId: "830927096187",
  appId: "1:830927096187:web:ad97e052251f4a63dd55de",
  measurementId: "G-TYK6NC92VK"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);