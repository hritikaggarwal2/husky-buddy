// Node Modules
import { useState } from "react";
import { Link } from "react-router-dom";

// Firebase
import firebase from "firebase/app";
import { UserClass, UserClassConverter } from "../data/UserClass";

/* User creation module */
export default function SignUp() {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [lastError, setLastError] = useState("");

  function validateInput() {
    if (
      password !== confirmPassword ||
      email.length <= 0 ||
      password.length <= 0 ||
      displayName.length <= 0
    ) {
      return false;
    }

    // courtesy email validation
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(uw|washington)\.edu/;
    return email.match(emailRegex) !== null;
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(
      "submitted registration form: email: " + email + "; pw: " + password
    );

    console.log("attempting to talk to firebase");
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        let user = userCredential.user;
        console.log("succeeded!");
        console.log("new firebase user: " + user);
        setLastError("");
        createHuskyUser(user, displayName);
      })
      .catch((error) => {
        console.log(
          "Authentication error: " + error.code + ": " + error.message
        );
        setLastError(error);
      });
  }

  function createHuskyUser(firebaseUser, displayName) {
    console.log("Creating husky user with UID " + firebaseUser.uid);

    const newUserObj = new UserClass(
      displayName,
      firebaseUser.email === null ? "" : firebaseUser.email,
      "", // DOB
      [], // groups
      "", // phone
      new Date(), // creation date
      "Hello World!", // status
      "", // image
      "", // major
      "", // about
      "" // uwid
    );

    firebase
      .firestore()
      .collection("Users")
      .doc(firebaseUser.uid)
      .withConverter(UserClassConverter)
      .set(newUserObj)
      .then((result) => {
        console.log("created user successfully");
        // XXX : hritik update URL
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
    <div className="signup signupTest container c-fluid d-flex justify-center align-center col">
      <h1 className="title">Husky Buddy.</h1>
      <form onSubmit={handleSubmit}>
        <input
          required
          className="inputComponent emailTest"
          placeholder="Enter UW Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          required
          className="inputComponent nameTest"
          placeholder="Enter Display Name"
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <input
          required
          className="inputComponent passTest"
          placeholder="Enter Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          required
          className="inputComponent passConfirmTest"
          placeholder="Re-enter Password"
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {lastError ? (
          <span className="errorText">Error: {formatError(lastError)}</span>
        ) : null}

        <button
          className="btnPrimaryFill"
          type="submit"
          disabled={!validateInput()}
        >
          Sign Up
        </button>
        <Link className="btnEmptyHover loginTest" to="/login">
          Already have an account? Log in
        </Link>
      </form>
    </div>
  );
}
