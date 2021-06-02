// Add Imports
import { useState } from "react";
import firebase from "firebase/app";
import InlineEdit from "../components/InlineEdit";
import { useUser } from "../providers/UserProvider";
import PageContainer from "../components/PageContainer";

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

  const [search, setSearch] = useState();

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
    setMadeChanges(false);

    console.log("handle submit");
    console.log("updating w/");
    console.log({ about: "test about" });
    console.log("User ID:");
    console.log(user.uwid);
    if (!validateInput() || !madeChanges) {
      // visible error here
      return;
    }

    //const refUsers = firebase.firestore().collection("Users");
    const refUser = firebase.firestore().collection("Users").doc(user.uwid);

    await refUser
      .update({
        display_name: displayName,
        about: about,
        status: status,
        date_of_birth: dob,
        major: major,
        personal_phone: phoneNum,
      })
      .then(function () {});

    console.log("done");
  }

  return (
    <PageContainer
      index={2}
      search={{ input: search, set: setSearch, text: "Search Settings" }}
    >
      <div className="profile container d-flex justify-center align-center col">
        <h3>Edit your user profile!</h3>

        <div className="d-flex flex-row justify-between">
          <div>Display Name</div>
          <InlineEdit
            text={
              displayName === "" ? "Write your display name here!" : displayName
            }
            onSetText={onSetDisplayName}
          />
        </div>

        <div className="d-flex flex-row justify-between">
          <div>About</div>
          <InlineEdit
            text={about === "" ? "Write something about yourself here!" : about}
            onSetText={onSetAbout}
          />
        </div>

        <div className="d-flex flex-row justify-between">
          <div>Status</div>
          <InlineEdit
            text={status === "" ? "Write your status here!" : status}
            onSetText={onSetStatus}
          />
        </div>

        <div className="d-flex flex-row justify-between">
          <div>Date of Birth</div>
          <InlineEdit
            text={dob === "" ? "Write your date of birth here!" : dob}
            onSetText={onSetDob}
          />
        </div>

        <div className="d-flex flex-row justify-between">
          <div>Phone Number</div>
          <InlineEdit
            text={phoneNum === "" ? "Write your phone number here!" : phoneNum}
            onSetText={onSetPhoneNum}
          />
        </div>

        <div className="d-flex flex-row justify-between">
          <div>Major</div>
          <InlineEdit
            text={major === "" ? "Write your major here!" : major}
            onSetText={onSetMajor}
          />
        </div>

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
    </PageContainer>
  );
}
