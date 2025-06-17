import { initializeApp, getApps } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyA0mIg9DvWVO-PFzy_oZKNsnYrxMKAxyuQ",
  authDomain: "travel-app-c4335.firebaseapp.com",
  projectId: "travel-app-c4335",
  storageBucket: "travel-app-c4335.firebasestorage.app",
  messagingSenderId: "696566503470",
  appId: "1:696566503470:web:267f1fc37a2da14d5da7bf",
  measurementId: "G-P1930VNF7D"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

// Initialize Firebase services
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app
