import React, { useState , useEffect} from 'react'
import './Login.css'
import { useDispatch } from 'react-redux';
import { setUser } from '../Redux/Actions';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, fetchSignInMethodsForEmail,} from "firebase/auth";
import { getStorage } from "firebase/storage";

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


function Login() {
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [user , setUser] = useState(null); //set global state
  const [error, setError]= useState(null)
  

//falta mantener en el estado global en useEffect
//falta disparar la action de setUser 
//falta identificar si es user.admin o es user.superAdmin
//falta proteger la rutas 

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const providers = await fetchSignInMethodsForEmail(auth, emailLogin);

      if (providers.length === 0) {
        setError("Email address not registered. Please sign up.");
        return;
      }
      const userCredential = await signInWithEmailAndPassword(
        auth,
        emailLogin,
        passwordLogin
      );

      setUser(userCredential.user);
      window.location.href = "/home";


    } catch (error) {
      console.error("Sign in failed!", error);
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={emailLogin}
        onChange={(event) => setEmailLogin(event.target.value)}
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={passwordLogin}
        onChange={(event) => setPasswordLogin(event.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;