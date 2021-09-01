import firebase from ‘firebase’;

import ‘firebase / analytics’;
import { initializeApp } from 'firebase/app';



// For Firebase JS SDK v7.20.0 and later, measurementId is optional

export const firebaseConfig = {

    apiKey: "AIzaSyDoCjpyuXUWC0bMm9zd2vq2-sQP9HYTu1Y",

    authDomain: "code-rainbow.firebaseapp.com",

    projectId: "code-rainbow",

    storageBucket: "code-rainbow.appspot.com",

    messagingSenderId: "922336884002",

    appId: "1:922336884002:web:9ee5401d4f3910e973617b",

    measurementId: "G-KF7CY7ZC6M"

};



if (window !== 'undefined' && !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);

    if ('measurementId' in firebase) firebase.analytics();
}

export default firebase;