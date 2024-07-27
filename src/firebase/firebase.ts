// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
//import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBHmotiP2nIreyr2vU-D-XkrWextxSxmTQ',
  authDomain: 'e-commerce-ca6db.firebaseapp.com',
  projectId: 'e-commerce-ca6db',
  storageBucket: 'e-commerce-ca6db.appspot.com',
  messagingSenderId: '968806042830',
  appId: '1:968806042830:web:5397dd2bf978dae134149f',
  measurementId: 'G-4FFJEBT4JS',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export const auth = getAuth();
export const db = getFirestore(app);

export default app;
