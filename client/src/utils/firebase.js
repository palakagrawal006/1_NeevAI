
// import { initializeApp } from "firebase/app";
// import {getAuth} from "firebase/auth";
// import { GoogleAuthProvider } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
//   authDomain: "authneev.firebaseapp.com",
//   projectId: "authneev",
//   storageBucket: "authneev.firebasestorage.app",
//   messagingSenderId: "150125451308",
//   appId: "1:150125451308:web:ec899f4b176afcf86c1989"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// const auth = getAuth(app)

// const provider = new GoogleAuthProvider()

// export {auth, provider} 





import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET, // ends with .appspot.com
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_FIREBASE_APPID,
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();
provider.addScope("profile");
provider.addScope("email");

export { auth, provider };
