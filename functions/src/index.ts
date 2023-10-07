/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import * as functions from "firebase-functions"
import * as logger from "firebase-functions/logger";
import { initializeApp } from "firebase-admin/app";
import { firestore } from "firebase-admin"
import * as express from "express"
import { initFirebase } from "./firebase"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { authenticateMiddleware, validateMiddleware } from "./middleware";
import { LoginRequestSchema, signupRequestSchema } from "./interface";

initializeApp();
initFirebase();

const app = express();
// app.use(express.json()); included in firebase

const db = firestore();
const auth = getAuth();


// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
//

app.get("/posts", authenticateMiddleware, (_, res) => {
  logger.info("Get posts", { structuredData: true });
  db.collection("posts").get().then((snapshot) => {
    const posts = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data()
      }
    });
    res.json(posts);
  }).catch((err) => {
    res.status(500).send("internal server error: " + err);
  });
})

app.post("/posts", authenticateMiddleware, (req, res) => {
  logger.info("Create post", { structuredData: true });
  db.collection("posts").add({
    ...req.body,
    createdAt: new Date(),
    "handle": "jee wangue"
  }).then((ref) => {
    return ref.get();
  }).then((snapshot) => {
    res.status(201).json({
      id: snapshot.id,
      ...snapshot.data()
    });
  }).catch((err) => {
    res.status(500).send("internal server error: " + err);
  });
})

// signup route
app.post("/signup", validateMiddleware(signupRequestSchema), (req, res) => {
  // TODO: validate request
  const newUser = {
    ...req.body
  };

  db.doc(`/users/${newUser.handle}`).get().then((snapshot) => {
    if (snapshot.exists) {
      res.status(400).json({ handle: "this handle is already taken" });
      return;
    }
    createUserWithEmailAndPassword(auth, newUser.email, newUser.password).then(async (userCredential) => {
      try {
        await db.doc(`/users/${newUser.handle}`).set({
          handle: newUser.handle,
          email: newUser.email,
          createdAt: new Date().toISOString(),
          userId: userCredential.user.uid
        });
        return await userCredential.user.getIdToken();
      } catch (err) {
        throw err;
      }
    }).then((token) => {
      res.status(201).json({ token });
    }).catch((err) => {
      res.status(500).json({ error: err });
    });
  });
});

app.post("/signin", validateMiddleware(LoginRequestSchema), (req, res) => {
  const { email, password } = req.body;
  signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
    return userCredential.user.getIdToken();
  }).then((token) => {
    res.status(200).json({ token })
  }).catch((_) => {
    res.status(403).json({ message: "wrong credentials, please try again" });
  });
});


export const api = functions.region("asia-northeast3").https.onRequest(app);

