/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import * as functions from "firebase-functions"
import * as express from "express"
import { authenticateMiddleware, validateMiddleware } from "./middleware";
import { signin, signup } from "./controller/user.controller";
import { SigninRequestSchema, SignupRequestSchema } from "./controller/user.interface";
import { createPost, getPosts } from "./controller/post.controller";

const app = express();


// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
//

app.get("/posts", authenticateMiddleware, getPosts);

app.post("/posts", authenticateMiddleware, createPost);

// signup route
app.post("/signup", validateMiddleware(SignupRequestSchema), signup);

app.post("/signin", validateMiddleware(SigninRequestSchema), signin);


export const api = functions.region("asia-northeast3").https.onRequest(app);

