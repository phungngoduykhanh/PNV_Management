// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyATEdSj7O69_lALcdAv0JkQLZNXuHt_AgU",
    authDomain: "uploadingimage-a22e6.firebaseapp.com",
    projectId: "uploadingimage-a22e6",
    storageBucket: "uploadingimage-a22e6.appspot.com",
    messagingSenderId: "506319048547",
    appId: "1:506319048547:web:b60f3f3d91056b925d0d56"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);