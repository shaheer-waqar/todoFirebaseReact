// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyA7M8YyXCAoo0QvtEz1LRV8CNq669WAgOs",
  authDomain: "todoreact-14429.firebaseapp.com",
  projectId: "todoreact-14429",
  storageBucket: "todoreact-14429.appspot.com",
  messagingSenderId: "227044460936",
  appId: "1:227044460936:web:b6113b5afba3082926923d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db}