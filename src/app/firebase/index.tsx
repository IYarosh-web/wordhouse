import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBh_pRYlYp9YyVJmtP-AxzmWuMFQVghkP8",
  authDomain: "wordhoard.firebaseapp.com",
  databaseURL: "https://wordhoard-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "wordhoard",
  storageBucket: "wordhoard.firebasestorage.app",
  messagingSenderId: "321677490978",
  appId: "1:321677490978:web:d24b0bb94187030a71037b"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
