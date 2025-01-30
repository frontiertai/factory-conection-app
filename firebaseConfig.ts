// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDPF37vX5Dm53kuA_RYTaMWGR5qZ_yRx1M",
  authDomain: "factory-conection.firebaseapp.com",
  projectId: "factory-conection",
  storageBucket: "factory-conection.firebasestorage.app",
  messagingSenderId: "24781443866",
  appId: "1:24781443866:web:37145404af0ed24c1992a3",
  measurementId: "G-HSX9JF4BCP"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const firestore=getFirestore(app);

export { db,firestore };
