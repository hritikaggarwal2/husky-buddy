// Add Imports
import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";

/* User creation module */
export default function NewUser() {

  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [lastError, setLastError] = useState("");
  
  function validateInput() {
    if (email !== confirmEmail || password !== confirmPassword) {
      return 0;
    } else if (email.length <= 0 || password.length <= 0) {
      return 0;
    } else {
      // courtesy email validation
      // eslint-disable-next-line
      const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
      var matches = email.match(emailRegex);

      // check if the attempted registration uses a UW email
      var isUwEmail = email.includes("@uw.edu") || email.includes("washington.edu");

      if (matches === null) {
        lastError = ("LOCAL/malformedEmail", "Please submit a valid email");
      } else if (!isUwEmail) {
        lastError = ("LOCAL/notUWEmail", "Please use a valid UW email");
      }

      return (matches !== null) && isUwEmail;
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("submitted registration form: email: " + email + "; pw: " + password);

    console.log("attempting to talk to firebase");
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var user = userCredential.user;
        console.log("succeeded!");
        console.log("new user: " + user);
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
    } else {
        return error.message;
    }
  }

  return (
    <div className="login">
      <header className="login-header">
        Create New User
      </header>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          <p>E-Mail</p>
          <input type="text" onChange={e => setEmail(e.target.value)}/>
        </label>
        <label>
          <p>Confirm E-Mail</p>
          <input type="text" onChange={e => setConfirmEmail(e.target.value)}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)}/>
        </label>
        <label>
          <p>Confirm Password</p>
          <input type="password" onChange={e => setConfirmPassword(e.target.value)}/>
        </label>
        <div>
          <button type="submit" disabled={!validateInput()}>
            Submit
          </button>
        </div>
        <div>
            {lastError !== "" ? 'Error: ' + formatError(lastError) : ''}
        </div>
        <div>
            <a href="/Login"> Login </a>
        </div>
      </form>
    </div>
  );
}
