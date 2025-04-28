// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword
} from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDHaQodYotsBaJcyMeHKerrImvTRZflSjk",
    authDomain: "mov-upload-web.firebaseapp.com",
    databaseURL: "https://mov-upload-web-default-rtdb.firebaseio.com",
    projectId: "mov-upload-web",
    storageBucket: "mov-upload-web.appspot.com",
    messagingSenderId: "537421557022",
    appId: "1:537421557022:web:cbde009cfad2986784ad0f",
    measurementId: "G-7XL9C196CH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
//const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
//const provider = new GoogleAuthProvider();


// Email/password authentication functions
export const registerWithEmail = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential; // <<<<< VERY IMPORTANT
    } catch (error) {
      throw error; // <<<<< Instead of alert here, throw the error to handle it properly outside
    }
  };
  
  export const loginWithEmail = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
    } catch (error) {
      alert(error.message);
    }
  };
  
  export const logout = async () => {
    await signOut(auth);
    alert("Logged out successfully!");
  };