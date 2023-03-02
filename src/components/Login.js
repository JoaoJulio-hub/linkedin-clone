import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import "./Login.css";

function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const dispatch = useDispatch();

  const loginToApp = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userAuth) => {
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: userAuth.user.displayName,
            photoUrl: userAuth.user.photoURL,
          })
        );
      })
      .catch((error) => alert(error.message));
  };

  const register = (e) => {
    e.preventDefault();
    if (!name) {
      return alert("Please enter a full name");
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userAuth) => {
        updateProfile(userAuth.user, {
          displayName: name,
          photoURL: profilePic,
        }).then(() => {
          dispatch(
            login({
              email: userAuth.user.email,
              uid: userAuth.user.uid,
              displayName: name,
              photoUrl: profilePic,
            })
          );
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <img
        src="https://logos-download.com/wp-content/uploads/2016/03/LinkedIn_Logo_2019-700x175.png"
        alt="linkedin logo"
      />

      <form>
        <input
          value={name}
          placeholder="Full name (required if registering)"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          value={profilePic}
          placeholder="Profile picture URL (optional)"
          type="text"
          onChange={(e) => setProfilePic(e.target.value)}
        />

        <input
          value={email}
          placeholder="Email"
          type="text"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          value={password}
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={loginToApp} type="submit">
          Sign In
        </button>
      </form>

      <p>
        Not a member?{" "}
        <span className="login-register" onClick={register}>
          Register Now
        </span>
      </p>
    </div>
  );
}

export default Login;
