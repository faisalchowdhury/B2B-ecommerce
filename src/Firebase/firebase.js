// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-Sh3d-forcH4B3z-75Rcyj_tD_PeSwyM",
  authDomain: "b2b-wholesale-4c968.firebaseapp.com",
  projectId: "b2b-wholesale-4c968",
  storageBucket: "b2b-wholesale-4c968.firebasestorage.app",
  messagingSenderId: "623822327562",
  appId: "1:623822327562:web:ad1d51338504f9df6a34f3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
