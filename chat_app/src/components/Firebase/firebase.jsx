// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
     apiKey: "AIzaSyBDmeB9WHn6vOJvfrH0AFzAdaK2yg_FONQ",
     authDomain: "mechat-34021.firebaseapp.com",
     projectId: "mechat-34021",
     storageBucket: "mechat-34021.appspot.com",
     messagingSenderId: "1073302316626",
     appId: "1:1073302316626:web:d62aee25268fdf31cb618b"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider()

export { db, auth, storage, provider }