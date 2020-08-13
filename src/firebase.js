import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBUt9RuqW75q8mvkzoyY0JxdsaKo3OPTRM",
  authDomain: "nvc-movies.firebaseapp.com",
  databaseURL: "https://nvc-movies.firebaseio.com",
  projectId: "nvc-movies",
  storageBucket: "nvc-movies.appspot.com",
  messagingSenderId: "9733728438",
  appId: "1:9733728438:web:0725db0ac6255472969e17"
});

const db = firebaseApp.firestore();
// const auth = firebase.auth();
export default db;
