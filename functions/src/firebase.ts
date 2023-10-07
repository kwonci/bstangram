// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8B1s4132o_T8yL3MDa_MhLJRUc64M2qA",
  authDomain: "bstangram-d5be9.firebaseapp.com",
  projectId: "bstangram-d5be9",
  storageBucket: "bstangram-d5be9.appspot.com",
  messagingSenderId: "227413558974",
  appId: "1:227413558974:web:16ec7da1076f7e63bc80ef",
  measurementId: "G-1QBWE1VX0D"
};

// Initialize Firebase
export const initFirebase = () => {
  initializeApp(firebaseConfig);
  // const app = initializeApp(firebaseConfig);
  // const analytics = getAnalytics(app);
}
