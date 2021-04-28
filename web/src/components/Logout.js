import React from "react";
import firebase from "firebase/app";

import { useUser } from "../providers/UserProvider";

export default function Logout() {
  const user = useUser.user;

  function enabled() {
    return user !== null;
  }

  function handleSubmit(_event) {
    if (!enabled()) {
      return;
    }

    console.log("signing user out");
    firebase
      .auth()
      .signOut()
      .then((_) => {
        console.log("signout succeeded!");
      })
      .catch((error) => {
        // XXX tgarvin: maybe surface this to the user somehow? not sure what errors this can throw
        // TODO: resolve this in a better way
        console.log("Signout failure: " + error.code + ": " + error.message);
      });
  }

  return (
    <div classname="logout-button">
      <form className="logout-wrapper" onSubmit={handleSubmit}>
        <button type="submit" disabled={!enabled()}>
          Logout
        </button>
      </form>
    </div>
  );
}
