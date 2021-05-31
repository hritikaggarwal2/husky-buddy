// Add Imports
import { useState } from "react";
import firebase from "firebase/app";
import { Link } from "react-router-dom";
import InlineEdit from "../components/InlineEdit";
import { useUser } from "../providers/UserProvider";
import { UserClass } from "../data/UserClass";

/* edit user profile */
export default function UserProfile() {
  const user = useUser().user;
  const [status, setStatus] = useState(user.status);
  const [displayName, setDisplayName] = useState(user.display_name);
  const [about, setAbout] = useState(user.about);
  const [dob, setDob] = useState(user.date_of_birth);
  const [major, setMajor] = useState(user.major);
  const [phoneNum, setPhoneNum] = useState(user.personal_phone);
  const [madeChanges, setMadeChanges] = useState(false);
  const [lastError, setLastError] = useState("");

  function validateInput() {
    return true; // todo: validate and surface error msg
  }

  function onSetAbout(data) {
    let oldValue = user.about;
    if (oldValue !== data) {
      setAbout(data);
      setMadeChanges(true);
    }
  }

  function onSetDisplayName(data) {
    let oldValue = user.display_name;
    if (oldValue !== data) {
      setDisplayName(data);
      setMadeChanges(true);
    }
  }

  function onSetStatus(data) {
    let oldValue = user.status;
    if (oldValue !== data) {
      setStatus(data);
      setMadeChanges(true);
    }
  }

  function onSetDob(data) {
    let oldValue = user.dob;
    if (oldValue !== data) {
      setDob(data);
      setMadeChanges(true);
    }
  }

  function onSetMajor(data) {
    let oldValue = user.major;
    if (oldValue !== data) {
      setMajor(data);
      setMadeChanges(true);
    }
  }

  function onSetPhoneNum(data) {
    let oldValue = user.personal_phone;
    if (oldValue !== data) {
      setPhoneNum(data);
      setMadeChanges(true);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    console.log("handle submit");
    console.log("updating w/");
    console.log({ about: "test about" });
    console.log("User ID:");
    console.log(user.uwid);
    if (!validateInput()) {
      // visible error here
    }

    //const refUsers = firebase.firestore().collection("Users");
    const refUser = firebase.firestore().collection("Users").doc(user.uwid);

    const res = await refUser
      .update({
        display_name: displayName,
        about: about,
        status: status,
        date_of_birth: dob,
        major: major,
        personal_phone: phoneNum,
      })
      .then(function () {
        console.log("updated");
      });

    console.log("done");
    //console.log(res);

    //const doc = await refUser.get();
    //if (!doc.exists) {
    //  console.log("No such document!");
    //} else {
    //  console.log("Document data:", doc.data());
    //}
  }

  return (
    <div className="profile container c-fluid d-flex justify-center align-center col">
      <h1 className="title">Husky Buddy.</h1>

      <h2 className="userProfileTitle"> Welcome, {user.display_name} </h2>
      <h3> Edit your user profile! </h3>

      <h3 className="fieldDesc">About</h3>
      <InlineEdit
        text={about === "" ? "Write something about yourself here!" : about}
        onSetText={onSetAbout}
      />
      <h3 className="fieldDesc">Status</h3>
      <InlineEdit
        text={status === "" ? "Write your status here!" : status}
        onSetText={onSetStatus}
      />
      <div>
        <form onSubmit={handleSubmit}>
          <button
            className="btnPrimaryFill"
            type="submit"
            disabled={!(madeChanges && validateInput())}
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
