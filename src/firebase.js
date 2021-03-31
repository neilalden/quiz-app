import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
firebase.initializeApp({
	apiKey: "AIzaSyCzPRaeUh1v64xs4L1eBY0TnjTB0a8te2Y",
	authDomain: "quiz-app-45900.firebaseapp.com",
	projectId: "quiz-app-45900",
	storageBucket: "quiz-app-45900.appspot.com",
	messagingSenderId: "246657292192",
	appId: "1:246657292192:web:e38ba46a8059623b65b6c5",
	measurementId: "G-4LS71RRRQV",
});
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export default firebase;
