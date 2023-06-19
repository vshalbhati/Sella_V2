// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHxBUcWC06_wWxKLmj5_wrCwZ9U9CrfwQ",
  authDomain: "sella-386306.firebaseapp.com",
  projectId: "sella-386306",
  storageBucket: "sella-386306.appspot.com",
  messagingSenderId: "679645096836",
  appId: "1:679645096836:web:21e2f64345ba96b6960bd1",
  measurementId: "G-4V2GHCT9J8"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}