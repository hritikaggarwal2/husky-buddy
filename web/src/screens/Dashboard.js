import React, {Component} from 'react';
import CreateGroup from "../components/CreateGroup";
import "../styles/CreateGroup.css";
import "../components/MyGroupPanel";
import MyGroupPanel from "../components/MyGroupPanel";

export default function Dashboard() {
    return (
        <div className="Dashboard">
            <header className="Dashboard-header">
                <p>
                    Edit <code>Dashboard.js</code> and save to reload.
                </p>
                <a
                    className="Dashboard-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
            <CreateGroup />
            <MyGroupPanel groups={["Group1", "Group2"]}/>
        </div>
    );
}
