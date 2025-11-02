import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "ВАШ_API_KEY",
  authDomain: "ВАШ_ДОМЕН.firebaseapp.com",
  projectId: "ВАШ_PROJECT_ID",
  storageBucket: "ВАШ_BUCKET.appspot.com",
  messagingSenderId: "ВАШ_SENDER_ID",
  appId: "ВАШ_APP_ID",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
