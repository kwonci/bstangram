/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import { initializeApp } from "firebase-admin/app";
import { firestore } from "firebase-admin"
import * as express from "express"

initializeApp();
const app = express()


// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
//

app.get("/posts", (_, res) => {
  logger.info("Get posts", { structuredData: true });
  firestore().collection("posts").get().then((snapshot) => {
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

app.post("/posts", (req, res) => {
  logger.info("Create post", { structuredData: true });
  firestore().collection("posts").add({
    ...req.body,
    createdAt: new Date(),
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

export const api = onRequest(app);
