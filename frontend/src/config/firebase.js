import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyBgr3TUlozAn5e6OPLZqS_sb3GsRo_ay6I',
    authDomain: 'universityproject-e6ea4.firebaseapp.com',
    projectId: 'universityproject-e6ea4',
    storageBucket: 'universityproject-e6ea4.appspot.com',
    messagingSenderId: '416522946341',
    appId: '1:416522946341:web:fc7d3d9a62576bf04e7ccc',
    measurementId: 'G-H80PL721VL',
};

const fb = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export { fb, db };
