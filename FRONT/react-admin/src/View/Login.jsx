import React, { useState, useEffect } from "react";
import "./Login.css";
import { setToken } from '../Redux/Actions'
import { useDispatch } from "react-redux";
import { setUser } from "../Redux/Actions";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey:"AIzaSyBlqjw6JkovRLJp8hSh-sG6q1tY1G-RitE",
  authDomain:"eatout-d06bc.firebaseapp.com",
  projectId:"eatout-d06bc",
  storageBucket:"eatout-d06bc.appspot.com",
  messagingSenderId:"716033457346",
  appId:"1:716033457346:web:532059ce3be30b1c140f5b",
  measurementId:"G-15QEGRB69P",
  serviceAccount:"firebase-adminsdk-e60fh@eatout-d06bc.iam.gserviceaccount.com",
  credential:"716033457346-uiqt23knlrpkkcp12d8da9qmp4pptfja.apps.googleusercontent.com"};

  
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

function Login() {
  const dispatch = useDispatch();
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [error, setError] = useState(null);
  const [user, setUser] = useState({
    email: "",
    password: "",
});

  

 

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
      dispatch(setToken(userCredential.accessToken));
      setUser(userCredential.user);
      window.location.href = "/landing";

    } catch (error) {
      console.error("Sign in failed!", error);
      setError(error.message);
    }
  };

  const handleOnClick = () => {
    signInWithPopup(auth, new GoogleAuthProvider())
      .then((result) => {
        const user = result;
        setUser(user);
        window.location.href = "/home";
        setUser(user.user);
      dispatch(setToken(user.accessToken));
        console.log(user);
      })
      .catch((error) => {
        console.error("Sign in with Google failed!", error);
        setError(error.message);
      });
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
    <ul>
      <button type="submit">Login</button>
      <button  type="button" onClick={handleOnClick}>
        Login with Google
      </button></ul>
      {error && <p>{error}</p>}
    </form>
  );
}

export default Login;