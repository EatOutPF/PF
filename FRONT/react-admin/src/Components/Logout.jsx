import { signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth} from "firebase/auth";
import { getStorage } from "firebase/storage";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../Redux/Actions";

const firebaseConfig = {
  apiKey: "AIzaSyBXy8ahKPSssP3A1I0M7WVi9zER6uBab2s",
  authDomain: "prueba-de-funciones-4b9e8.firebaseapp.com",
  projectId: "prueba-de-funciones-4b9e8",
  storageBucket: "prueba-de-funciones-4b9e8.appspot.com",
  messagingSenderId: "589197491000",
  appId: "1:589197491000:web:34d30b1db2bbb90f631fcd"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);


function Logout() {

    
  const [user, setUser] = useState(null);
  const [error, setError]= useState(null)
  const dispatch = useDispatch();
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error ", error);
      setError(error.message);
    }
    dispatch(logoutUser());
    window.location.href = "/";
  };

  
  return (
    <div>
      {user == null && (
        <button onClick={handleSignOut}>
          Logout
        </button>
      )}
    </div>
  );
}

export default Logout;