import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBpxvR1YF97dLDN5YDNrvJIjUys4TOSJXw",
  authDomain: "chatapp-5b7df.firebaseapp.com",
  databaseURL: "https://chatapp-5b7df-default-rtdb.firebaseio.com",
  projectId: "chatapp-5b7df",
  storageBucket: "chatapp-5b7df.appspot.com",
  messagingSenderId: "77810000566",
  appId: "1:77810000566:web:d68432922e9b7bbe8c7c17",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);
