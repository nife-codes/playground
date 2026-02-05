import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDzu0Bi0SnatfY2H_YfyuiKgidkwXGE0xk",
  authDomain: "playground-2048.firebaseapp.com",
  projectId: "playground-2048",
  storageBucket: "playground-2048.firebasestorage.app",
  messagingSenderId: "758882509198",
  appId: "1:758882509198:web:d6610feab1a0511ff684df",
  measurementId: "G-FGNYWD289M"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)