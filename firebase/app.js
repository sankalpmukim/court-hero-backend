// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { config } from "dotenv";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
} = config();
const firebaseConfig = {
  apiKey: "AIzaSyDtMb0MUCW_Jz0TPs5ZheI9nK07jWX0OSg",
  authDomain: "court-hero.firebaseapp.com",
  databaseURL: "https://court-hero-default-rtdb.firebaseio.com",
  projectId: "court-hero",
  storageBucket: "court-hero.appspot.com",
  messagingSenderId: "173902511567",
  appId: "1:173902511567:web:b7803113291f0b0b9466ba",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
