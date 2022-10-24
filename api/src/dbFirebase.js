// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADSZiijIuotaRGJjHNwgU-fp6WPidYGi0",
  authDomain: "dukindroid-firebase-test.firebaseapp.com",
  databaseURL: "https://dukindroid-firebase-test.firebaseio.com",
  projectId: "dukindroid-firebase-test",
  storageBucket: "dukindroid-firebase-test.appspot.com",
  messagingSenderId: "954028560501",
  appId: "1:954028560501:web:f61a3bffc8e87606d2e83c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app