import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
const firebaseConfig = {
  apiKey: "AIzaSyC2wVnxB91_McK0nP4Ug_tidWFBVnevH8k",
  authDomain: "pnvmanagement-1f6e6.firebaseapp.com",
  projectId: "pnvmanagement-1f6e6",
  storageBucket: "pnvmanagement-1f6e6.appspot.com",
  messagingSenderId: "979660127691",
  appId: "1:979660127691:web:dbc9d1e64af7a97ad64a4e",
  measurementId: "G-QYSX0KVJF2",
  databaseURL: "https://pnvmanagement-1f6e6-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

export {database};