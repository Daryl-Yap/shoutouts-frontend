import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDDmOJ86009ccGd3pWedjfrTWLTf9XV8oc",
  authDomain: "shoutouts-9b5e5.firebaseapp.com",
  projectId: "shoutouts-9b5e5",
  storageBucket: "shoutouts-9b5e5.appspot.com",
  messagingSenderId: "855113042544",
  appId: "1:855113042544:web:ece9057a1d1ef22ad802b5",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const authProvider = new GoogleAuthProvider();

export function signInWithGoogle(): void {
  signInWithPopup(auth, authProvider);
}
export function signOut(): void {
  auth.signOut();
}

export const storage = getStorage(app);
