import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/firebase-messaging";
var firebaseConfig = {
  apiKey: "AIzaSyAVFg4sdhy0pIREmEdsJMf1By7hgn1049g",
  authDomain: "cricbuc-blog.firebaseapp.com",
  databaseURL: "https://cricbuc-blog.firebaseio.com",
  projectId: "cricbuc-blog",
  storageBucket: "cricbuc-blog.appspot.com",
  messagingSenderId: "67069351101",
  appId: "1:67069351101:web:0740c1b5ff793f54ffd3d4",
};

navigator.serviceWorker.register("/my-sw.js").then((registration) => {
  firebase.messaging().useServiceWorker(registration);
});

const provider = new firebase.auth.FacebookAuthProvider();

const firebaseApp = firebase.initializeApp(firebaseConfig);
export { provider, firebaseApp };

// const messaging = firebaseApp.messaging();
// messaging
//   .requestPermission()
//   .then((res) => {
//     console.log("Permission is given", res);
//     return messaging.getToken()
//   })
//   .then((token)=>{
//     console.log(token)
//   })
//   .catch((error) => {
//     console.log("Permission Denied", error);
//   });
