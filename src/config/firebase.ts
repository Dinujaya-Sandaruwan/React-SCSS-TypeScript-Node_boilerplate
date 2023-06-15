// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyAuhkl4zpkPLeItXcl_YAlwYHgWoPLr0aw',
    authDomain: 'crud-a074a.firebaseapp.com',
    projectId: 'crud-a074a',
    storageBucket: 'crud-a074a.appspot.com',
    messagingSenderId: '158066056606',
    appId: '1:158066056606:web:93658ca2e12f141df60a8f',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();
