// firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDlfowgzEqd1vZgQGA4-Za4dWDQCzkXiec",
  authDomain: "monicodetest.firebaseapp.com",
  projectId: "monicodetest",
  storageBucket: "monicodetest.appspot.com",
  messagingSenderId: "847573885521",
  appId: "1:847573885521:web:0a2830dbfd3814e852ce70",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);
const firestore = getFirestore(app);

export {
  app,
  auth,
  firestore,
  createUserWithEmailAndPassword,
  updateProfile,
  storage,
};
