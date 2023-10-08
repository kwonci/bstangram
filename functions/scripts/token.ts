import { initializeApp } from "firebase/app"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyA8B1s4132o_T8yL3MDa_MhLJRUc64M2qA",
  authDomain: "bstangram-d5be9.firebaseapp.com",
  projectId: "bstangram-d5be9",
  storageBucket: "bstangram-d5be9.appspot.com",
  messagingSenderId: "227413558974",
  appId: "1:227413558974:web:16ec7da1076f7e63bc80ef",
  measurementId: "G-1QBWE1VX0D"
};

const getToken = async () => {
  initializeApp(firebaseConfig);
  const auth = getAuth();
  const userCredential = await signInWithEmailAndPassword(auth, "jee.wangue@airsmed.com", "password1234");
  const token = await userCredential.user.getIdToken()
  return token;
}

getToken().then((token) => {
  console.log(token);
}).catch(err => {
  console.log({error: err});
});

