// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBX3aaTLjq236hVo88d7aXsmUbjvegnwcM",
  authDomain: "aiflashcards-9361c.firebaseapp.com",
  projectId: "aiflashcards-9361c",
  storageBucket: "aiflashcards-9361c.appspot.com",
  messagingSenderId: "534937652199",
  appId: "1:534937652199:web:095124a762f638c8ec8b42",
  measurementId: "G-V7SZPQNM4E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const firestore = getFirestore(app);
const auth = getAuth(app);
export { firestore, auth };
