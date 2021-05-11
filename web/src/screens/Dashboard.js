// Add Imports
import React from 'react';
import CreateGroup from "../components/CreateGroup";
import "../styles/common.scss";
import "../components/MyGroupPanel";
import MyGroupPanel from "../components/MyGroupPanel";

export default function Dashboard() {
  return (
    <div className="Dashboard">
      <header className="Dashboard-header">
          <CreateGroup />
          <MyGroupPanel groups={["Group1", "Group2"]}/>
      </header>
    </div>
  );
}
