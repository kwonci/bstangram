import { getFirestore } from "firebase/firestore"
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA8B1s4132o_T8yL3MDa_MhLJRUc64M2qA",
  authDomain: "bstangram-d5be9.firebaseapp.com",
  projectId: "bstangram-d5be9",
  storageBucket: "bstangram-d5be9.appspot.com",
  messagingSenderId: "227413558974",
  appId: "1:227413558974:web:16ec7da1076f7e63bc80ef",
  measurementId: "G-1QBWE1VX0D"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app)
