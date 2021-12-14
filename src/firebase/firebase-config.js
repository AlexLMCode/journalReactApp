// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyATnNc4abXL-mayWLlBqsHjrYmZ36hsRaU',
  authDomain: 'react-app-journal-fe021.firebaseapp.com',
  projectId: 'react-app-journal-fe021',
  storageBucket: 'react-app-journal-fe021.appspot.com',
  messagingSenderId: '1010667776456',
  appId: '1:1010667776456:web:d9118f30d09b6c0dd9f8fd',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const googleAuthProvider = new GoogleAuthProvider();

export { db, googleAuthProvider, app };
