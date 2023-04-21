
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage} from "firebase/storage"; 


export const firebaseConfig = {
    apiKey:"AIzaSyBlqjw6JkovRLJp8hSh-sG6q1tY1G-RitE",
    authDomain:"eatout-d06bc.firebaseapp.com",
    projectId:"eatout-d06bc",
    storageBucket:"eatout-d06bc.appspot.com",
    messagingSenderId:"716033457346",
    appId:"1:716033457346:web:532059ce3be30b1c140f5b",
    measurementId:"G-15QEGRB69P",
    serviceAccount:"firebase-adminsdk-e60fh@eatout-d06bc.iam.gserviceaccount.com",
    credential:"716033457346-uiqt23knlrpkkcp12d8da9qmp4pptfja.apps.googleusercontent.com"};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage();