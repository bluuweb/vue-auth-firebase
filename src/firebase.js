import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyBpKf5IQLFduuxMBGPej4hIzVhFCskS7m0",
    authDomain: "auth-vue-2020.firebaseapp.com",
    databaseURL: "https://auth-vue-2020.firebaseio.com",
    projectId: "auth-vue-2020",
    storageBucket: "auth-vue-2020.appspot.com",
    messagingSenderId: "274963137937",
    appId: "1:274963137937:web:3e5d41f9de5748470b0630"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()
const auth = firebase.auth()

export {db, auth}