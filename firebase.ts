// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAt0eu_6oKvPBd_WMNc1_1bNGLUpnmyM8E",
  authDomain: "notion-clone-89096.firebaseapp.com",
  projectId: "notion-clone-89096",
  storageBucket: "notion-clone-89096.firebasestorage.app",
  messagingSenderId: "527569529739",
  appId: "1:527569529739:web:685592eff2a162ce8b9d8e",
  measurementId: "G-SV477CYWPY",
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);

export {db};