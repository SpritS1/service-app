import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBG8aKjWM-p_DcXrJ1-nGTwnbJvk5TCapg",
  authDomain: "service-app-1428b.firebaseapp.com",
  projectId: "service-app-1428b",
  storageBucket: "service-app-1428b.appspot.com",
  messagingSenderId: "899268214541",
  appId: "1:899268214541:web:2a5079708f1c4c6060ba44",
};

// firebase app init
initializeApp(firebaseConfig);

// services
const database = getFirestore();

export { database };
