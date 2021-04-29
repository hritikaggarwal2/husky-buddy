// Add Imports
import React, { useState } from "react";
import firebase from "firebase/app";

/**
 * Firebase user auth is super simple and can be easily implemented.
 * Google search "firebase auth" and you can find some easy ways to implement it.
 * A tricky thing here is to check if the user is a UW student or not. For this we can
 * always check if the email ends with '@uw.edu'. If you have some extra time, it would
 * be awesome to look how SAML 2 works and how we can incorporate that into our project.
 * Definitely a super stretch thing here, but you might find this interesting :)
 * Somethings I found out -
 *    https://www.npmjs.com/package/saml2-js
 *    https://medium.com/@tfalvo/single-sign-on-sso-for-your-firebase-app-with-saml-f67c71e0b4d6
 */


/* User auth module */
export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lastError, setLastError] = useState("");
  
  function validateInput() {
    if (email.length <= 0 || password.length <= 0) {
      return 0;
    } else {

      // courtesy email validation
      // eslint-disable-next-line
      const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
      var matches = email.match(emailRegex);
      //console.log(matches);
      //console.log(matches !== null);
      return matches !== null;
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("submitted form: email: " + email + "; pw: " + password);

    console.log("attempting to talk to firebase");
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log("login succeeded!");
        setLastError("");
    }).catch((error) => {
      console.log("Authentication error: " + error.code + ": " + error.message);
      setLastError(error);
    });
  }

  function formatError(error) {
    if (error.code === "auth/invalid-email") {
      return "Invalid Email";
    } else if (error.code === "auth/user-disabled") {
      return "User disabled";
    } else if (error.code === "auth/user-not-found") {
      return "User not found";
    } else if (error.code === "auth/wrong-password") {
      return "Incorrect password";
    }
  }

  return (
    <div className="login">
      <header className="login-header">
        Login
      </header>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          <p>E-Mail</p>
          <input type="text" onChange={e => setEmail(e.target.value)}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)}/>
        </label>
        <div>
          <button type="submit" disabled={!validateInput()}>
            Submit
          </button>
        </div>
        {lastError !== "" ? "</div>Error: " + formatError(lastError) + "</div>": ''}
        <a href="/newuser"> Create a new account </a>
      </form>
    </div>
  );
}
