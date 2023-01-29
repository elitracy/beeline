// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNciR61mDYWuENsSlG5yvDBdmbS-HEHO4",
  authDomain: "beeline-48d6e.firebaseapp.com",
  projectId: "beeline-48d6e",
  storageBucket: "beeline-48d6e.appspot.com",
  messagingSenderId: "950552686709",
  appId: "1:950552686709:web:2cd8733013eb0da523083c",
  measurementId: "G-4S2X3KJ9MK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);