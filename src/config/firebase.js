import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
let ENV = import.meta.env
// const firebaseConfig = {
//   apiKey: ENV.VITE_FIREBASE_API_KEY,
//   authDomain: ENV.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: ENV.VITE_FIREBASE_PROJECTID,
//   storageBucket: ENV.VITE_FIREBASE_STORAGEBUCKET,
//   messagingSenderId: ENV.VITE_FIREBASE_MESSAGINGSENDERID,
//   appId: ENV.VITE_FIREBASE_APPID,
//   measurementId: ENV.VITE_FIREBASE_MEASUREMENTID
// };
const firebaseConfig = { 
  apiKey : "AIzaSyB_h-9qeZFZKXZN44yFi8eD9MsPA1EkQMI" , 
  authDomain : "chatapp-56e6e.firebaseapp.com" , 
  projectId : "chatapp-56e6e" , 
  storageBucket : "chatapp-56e6e.appspot.com" , 
  messagingSenderId : "483691938224" , 
  appId : "1:483691938224:web:f29805f4c214263c771675" , 
  measurementId : "G-J3JXZFYZCB" 
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
