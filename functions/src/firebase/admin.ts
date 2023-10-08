import { getFirestore } from "firebase-admin/firestore"
import { getAuth } from "firebase-admin/auth"
import { initializeApp } from "firebase-admin/app"

export { getAuth } from "firebase-admin/auth"

const app = initializeApp();
export const db = getFirestore(app);
export const auth = getAuth(app);
