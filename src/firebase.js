import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyBT_yipa6uY2sZuZ-3SapFUUdntfSEy4pI",
  authDomain: "asses-3d2b3.firebaseapp.com",
  databaseURL: "https://asses-3d2b3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "asses-3d2b3",
  storageBucket: "asses-3d2b3.appspot.com",
  messagingSenderId: "795087512112",
  appId: "1:795087512112:web:21d260bb926a1216b9c3f5",
  measurementId: "G-DDDF6S41E1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)