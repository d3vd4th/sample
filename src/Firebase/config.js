import {initializeApp} from "firebase/app";
import{getFirestore} from "firebase/firestore"
import {getAuth} from 'firebase/auth'
import {getStorage} from "firebase/storage"
import 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyARVvt8Wuz3fHZeru9Xohx5iFVaaychQx0",
    authDomain: "thegravid-e1233.firebaseapp.com",
    projectId: "thegravid-e1233",
    storageBucket: "thegravid-e1233.appspot.com",
    messagingSenderId: "382317420154",
    appId: "1:382317420154:web:804fdf3b898bf6dc4065c3",
    measurementId: "G-7H62HVPVBX"
  };
const app = initializeApp(firebaseConfig);
 export const db = getFirestore(app)
 export const auth = getAuth(app)
 export const storage = getStorage(app)