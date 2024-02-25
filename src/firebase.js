// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"; // Import getStorage
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjgVv5Zjp_nTlOxWkvgJejv0jPbGKFTU8",
  authDomain: "ecotrack-decb2.firebaseapp.com",
  projectId: "ecotrack-decb2",
  storageBucket: "ecotrack-decb2.appspot.com",
  messagingSenderId: "1027872457363",
  appId: "1:1027872457363:web:b859463add65ceaae88366",
  measurementId: "G-D10J8JGQ2T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const storage = getStorage(app); // Initialize storage

export { app, storage }; // Export the initialized services
