import React, {Component} from 'react';
import CreateGroup from "../components/CreateGroup";
import "../styles/CreateGroup.css";
import "../components/MyGroupPanel";
import MyGroupPanel from "../components/MyGroupPanel";

class Dashboard extends Component {

    render(){
        return (
            <div className="App">
                <CreateGroup />
                <MyGroupPanel groups={["Group1", "Group2"]}/>
            </div>
        );
    }

}

export default Dashboard;
