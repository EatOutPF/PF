import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../../Redux/Actions";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import logo from "../../assets/logoNombre.png";
import style from "./Login.module.css";
import { useNavigate } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyBlqjw6JkovRLJp8hSh-sG6q1tY1G-RitE",
  authDomain: "eatout-d06bc.firebaseapp.com",
  projectId: "eatout-d06bc",
  storageBucket: "eatout-d06bc.appspot.com",
  messagingSenderId: "716033457346",
  appId: "1:716033457346:web:532059ce3be30b1c140f5b",
  measurementId: "G-15QEGRB69P",
  serviceAccount:
    "firebase-adminsdk-e60fh@eatout-d06bc.iam.gserviceaccount.com",
  credential:
    "716033457346-uiqt23knlrpkkcp12d8da9qmp4pptfja.apps.googleusercontent.com",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

function Login() {
  const dispatch = useDispatch();
  const navigate= useNavigate()
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [error, setError] = useState(null);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    setUser(user)
    
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
      dispatch(setToken(userCredential.user.accessToken));
      setUser(userCredential.user);
      navigate("/landing")
     //window.location.href = "/landing";
    
    } catch (error) {
      console.error("Sign in failed!", error);
      setError(error.message);
    }
  };

  const handleOnClick = () => {
    signInWithPopup(auth, new GoogleAuthProvider())
      .then((result) => {
        const user = result
        //window.location.href = "/home";
        setUser(user.user);
        dispatch(setToken(result.user.accessToken));
        console.log(user);
        navigate("/landing")
      })
      .catch((error) => {
        console.error("Sign in with Google failed!", error);
        setError(error.message);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={style.containerFormLogin}>
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
          <button type="button" onClick={handleOnClick}>
            Login with Google
          </button>
        </ul>
        {error && <p>{error}</p>}
      </form>
      <div className={style.containerImagenLogin}>
        <img src={logo} alt="logo"></img>
      </div>
    </>
  );
}

export default Login;