import { initializeApp } from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCHxBUcWC06_wWxKLmj5_wrCwZ9U9CrfwQ",
  databaseURL: 'https://sella-386306.firebaseio.com',
  authDomain: "sella-386306.firebaseapp.com",
  projectId: "sella-386306",
  storageBucket: "sella-386306.appspot.com",
  messagingSenderId: "679645096836",
  appId: "1:679645096836:web:21e2f64345ba96b6960bd1",
  measurementId: "G-4V2GHCT9J8"
};

const firebase = initializeApp(firebaseConfig);

export default firebase;