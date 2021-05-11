import React, {Component} from 'react';
import CreateGroup from "../components/CreateGroup";
import "../styles/CreateGroup.css";
import "../components/MyGroupPanel";
import MyGroupPanel from "../components/MyGroupPanel";
import SearchGroups from "../components/SearchGroups";

export default function Dashboard() {
    return (
        <div className="Dashboard">
            <CreateGroup />
            <MyGroupPanel groups={["Group1", "Group2"]}/>
            <SearchGroups />
        </div>
    );
}
