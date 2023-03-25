import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
let ENV = import.meta.env

const firebaseConfig = {
  apiKey: ENV.VITE_FIREBASE_API_KEY,
  authDomain: ENV.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: ENV.VITE_FIREBASE_PROJECTID,
  storageBucket: ENV.VITE_FIREBASE_STORAGEBUCKET,
  messagingSenderId: ENV.VITE_FIREBASE_MESSAGINGSENDERID,
  appId: ENV.VITE_FIREBASE_APPID,
  measurementId: ENV.VITE_FIREBASE_MEASUREMENTID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
