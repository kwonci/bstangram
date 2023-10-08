import { auth } from "../firebase/client"
import { db } from "../firebase/admin";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { SigninRequest, SignupRequest } from "./user.interface";

export const signin = (req: SigninRequest, res: any) => {
  const { email, password } = req.body;
  signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
    return userCredential.user.getIdToken();
  }).then((token) => {
    res.status(200).json({ token })
  }).catch((_) => {
    res.status(403).json({ message: "wrong credentials, please try again" });
  });
}

export const signup = (req: SignupRequest, res: any) => {
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
}
