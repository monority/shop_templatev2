// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {

  apiKey: "AIzaSyD3VJOzWcdGzBaQoQ13BXLFcOv8wDja1WA",

  authDomain: "sneakara.firebaseapp.com",

  projectId: "sneakara",

  storageBucket: "sneakara.firebasestorage.app",

  messagingSenderId: "471605026672",

  appId: "1:471605026672:web:eafcb3e02dba4cc25939b5",

  measurementId: "G-N4RB26R9GL"

};




// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)