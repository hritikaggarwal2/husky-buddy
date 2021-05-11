import firebase from "firebase/app";

import { useUser } from "../providers/UserProvider";

export default function Logout() {
  const firebaseUser = useUser().firebaseUser;

  function enabled() {
    return firebaseUser !== null;
  }

  function handleSubmit() {
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
    <div className="logout-button">
      <form className="logout-wrapper" onSubmit={handleSubmit}>
        <button type="submit" id="logout-button" disabled={!enabled()}>
          Logout
        </button>
      </form>
    </div>
  );
}
