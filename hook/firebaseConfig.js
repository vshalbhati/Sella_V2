import { firebase } from '@react-native-firebase/app';
import { initializeApp } from 'firebase/app';


// Add your Firebase configuration here
const firebaseConfig = {
  apiKey: 'AIzaSyCRoCXlnl4nBhh70OJpPDGpXcad7tRe2Bk',
  authDomain: 'sella-386306.firebaseapp.com',
  projectId: 'sella-386306',
  storageBucket: 'sella-386306.appspot.com',
  messagingSenderId: '679645096836',
  appId: '1:679645096836:android:0a15d5bb6b77b89b960bd1',
};

// if (!firebase.apps.length) {
//     firebase.default.initializeApp(firebaseConfig);
// }

export default firebase;
