import React, { useState, useEffect } from "react";
import "./Login.css";
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
  apiKey: "AIzaSyBlqjw6JkovRLJp8hSh-sG6q1tY1G-RitE",
  authDomain: "eatout-d06bc.firebaseapp.com",
  projectId: "eatout-d06bc",
  storageBucket: "eatout-d06bc.appspot.com",
  messagingSenderId: "716033457346",
  appId: "1:716033457346:web:532059ce3be30b1c140f5b",
 
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

function Login() {
  const dispatch = useDispatch();
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [error, setError] = useState(null);
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUser(user));
      }
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

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

      dispatch(setUser(userCredential.user));
      window.location.href = "/home";
    } catch (error) {
      console.error("Sign in failed!", error);
      setError(error.message);
    }
  };

  const handleOnClick = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        dispatch(setUser(user));
        window.location.href = "/home";
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