// Add Imports
import { useState } from "react";
import CreateGroup from "../components/CreateGroupPopUp";
import SearchGroup from "../components/SearchGroupPopUp";
import SearchResults from "../components/SearchResultsPopUp";
import "../styles/common.scss";
import "../components/MyGroupPanel";
import MyGroupPanel from "../components/MyGroupPanel";
import { useUser } from "../providers/UserProvider";

export default function Dashboard() {
  const [openCreate, setOpenCreate] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [openResults, setOpenResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const user = useUser().user;

  function displayGroups(groups) {
    //setOpenResults(true);
    //setSearchResults(groups);

    console.log("The GROupS ARE");
        groups.forEach((doc) => {
            console.log("ID's ARE:");
            console.log(doc.id);
        });
      return;
  }

  return (
    <>
      {/* POP UP VIEW */}
      {openCreate ? <CreateGroup open={openCreate} close={() => setOpenCreate(false)} /> : null}
      {openSearch ? <SearchGroup open={openSearch} close={() => setOpenSearch(false)} displayGroups={displayGroups}/> : null}
      {/*openResults ? <SearchResults open={openSearch} close={() => setOpenResults(false)} groupsToDisplay={searchResults}/> : null*/}

      {/* MAIN DASHBOARD VIEW */}
      <div className="dashboard container d-flex col justify-center align-center">
        <h1 className="title">HuskyBuddy.</h1>
        <h2>Welcome, {user.display_name}</h2>
        <MyGroupPanel groups={["Group1", "Group2"]} />
        <button className="btnPrimaryFill" onClick={() => setOpenCreate(true)}>
          Create Group
        </button>
        <p>Blank line</p> 
        <button className="btnPrimaryFill" onClick={() => setOpenSearch(true)}>
          Search Groups
        </button>
      </div>
    </>
  );
}
