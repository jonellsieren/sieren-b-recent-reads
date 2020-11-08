import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBBaLX5UDI8nEMgQ1QZnqVU_XY9DNm2Prw",
  authDomain: "sieren-code-sprint-b.firebaseapp.com",
  databaseURL: "https://sieren-code-sprint-b.firebaseio.com",
  projectId: "sieren-code-sprint-b",
  storageBucket: "sieren-code-sprint-b.appspot.com",
  messagingSenderId: "793092123538",
  appId: "1:793092123538:web:f4e39ce95ff859a915ef4b",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const moviesCollection = db.collection("movies");

export default db;
export { moviesCollection };
