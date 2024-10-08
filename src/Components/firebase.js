// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATT4CjTxQN8ft0DQwngdo5kcFkdeqOluM",
  authDomain: "products-6a9b3.firebaseapp.com",
  projectId: "products-6a9b3",
  storageBucket: "products-6a9b3.appspot.com",
  messagingSenderId: "633806390645",
  appId: "1:633806390645:web:ed4001e6148f4ee5793f3c",
  measurementId: "G-2304147PQV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);

export default app;
