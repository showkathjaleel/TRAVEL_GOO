import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAJl2gYuEr38t11XOOOydLWjH-4STDwcX8",
  authDomain: "travel-goo-8e299.firebaseapp.com",
  projectId: "travel-goo-8e299",
  storageBucket: "travel-goo-8e299.appspot.com",
  messagingSenderId: "476492052888",
  appId: "1:476492052888:web:afb13ae806d9da051a13ed",
  measurementId: "G-4G65MT74ZT",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
