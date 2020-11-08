import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyB3Q23b1UNJyxLS6-peJf-6rnICzBa8Dl8",
  authDomain: "recent-reads-64572.firebaseapp.com",
  databaseURL: "https://recent-reads-64572.firebaseio.com",
  projectId: "recent-reads-64572",
  storageBucket: "recent-reads-64572.appspot.com",
  messagingSenderId: "425786313130",
  appId: "1:425786313130:web:76ee8921d5b8598fc4c3d3",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const booksCollection = db.collection("books");

export default db;
export { booksCollection };
