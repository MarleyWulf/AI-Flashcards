// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBX3aaTLjq236hVo88d7aXsmUbjvegnwcM",
  authDomain: "aiflashcards-9361c.firebaseapp.com",
  projectId: "aiflashcards-9361c",
  storageBucket: "aiflashcards-9361c.appspot.com",
  messagingSenderId: "534937652199",
  appId: "1:534937652199:web:095124a762f638c8ec8b42",
  measurementId: "G-V7SZPQNM4E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db}