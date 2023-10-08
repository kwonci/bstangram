import * as logger from "firebase-functions/logger";
import { db as adminDB } from "../firebase/admin";

export const createPost = (_:{}, res:any) => {
  logger.info("Get posts", { structuredData: true });
  adminDB.collection("posts").get().then((snapshot) => {
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
};

export const getPosts = (req:any, res:any) => {
  logger.info("Create post", { structuredData: true });
  adminDB.collection("posts").add({
    ...req.body,
    createdAt: new Date(),
    handle: "jee wangue"
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
};
