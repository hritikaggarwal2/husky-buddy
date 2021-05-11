// Add Imports
import { useState } from "react";
import CreateGroup from "../components/CreateGroupPopUp";
import "../styles/common.scss";
import "../components/MyGroupPanel";
import MyGroupPanel from "../components/MyGroupPanel";
import { useUser } from "../providers/UserProvider";

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const user = useUser().user;

  return (
    <>
      {/* POP UP VIEW */}
      {open ? <CreateGroup open={open} close={() => setOpen(false)} /> : null}

      {/* MAIN DASHBOARD VIEW */}
      <div className="dashboard container d-flex col justify-center align-center">
        <h1 className="title">HuskyBuddy.</h1>
        <h2>Welcome, {user.display_name}</h2>
        <MyGroupPanel groups={["Group1", "Group2"]} />
        <button className="btnPrimaryFill" onClick={() => setOpen(true)}>
          Create Group
        </button>
      </div>
    </>
  );
}
