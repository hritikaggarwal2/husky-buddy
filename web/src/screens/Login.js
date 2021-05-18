// Add Imports
import { useState } from "react";
import firebase from "firebase/app";
import { Link } from "react-router-dom";

/**
 * XXX Stretch Goal -
 * Somethings I found out -
 *    https://www.npmjs.com/package/saml2-js
 *    https://medium.com/@tfalvo/single-sign-on-sso-for-your-firebase-app-with-saml-f67c71e0b4d6
 */

// XXX tgarvin: potential XSS problems w/ using a strategy this simple
// but I don't think it's something to worry about a ton right now
export function getToken() {
  return sessionStorage.getItem("token");
}

export function setToken(userToken) {
  sessionStorage.setItem("token", JSON.stringify(userToken));
}

/* User auth module */
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lastError, setLastError] = useState("");

  function validateInput() {
    if (email.length <= 0 || password.length <= 0) {
      return false;
    }

    // courtesy email validation
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(uw|washington)\.edu/;
    return email.match(emailRegex) !== null;
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("submitted form: email: " + email + "; pw: " + password);

    console.log("attempting to talk to firebase");
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log("login succeeded!");
        setLastError("");
        // XXX : hritik update URL
      })
      .catch((error) => {
        console.log(
          "Authentication error: " + error.code + ": " + error.message
        );
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
    } else {
      return "Some internal error occured";
    }
  }

  return (
    <div className="login container c-fluid d-flex justify-center align-center col">
      <h1 className="title">Husky Buddy.</h1>
      <form onSubmit={handleSubmit}>
        <input
          required
          className="inputComponent"
          placeholder="Enter Email"
          type="text"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          required
          className="inputComponent"
          placeholder="Enter Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {lastError ? (
          <span className="errorText">Error: {formatError(lastError)}</span>
        ) : null}

        <button
          className="btnPrimaryFill"
          type="submit"
          disabled={!validateInput()}
        >
          Sign In
        </button>

        <Link className="btnEmptyHover" to="/signup">
          Create a new account
        </Link>
      </form>
    </div>
  );
}
