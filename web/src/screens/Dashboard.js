import React, {Component} from 'react';
import CreateGroup from "../components/CreateGroup";
import "../styles/CreateGroup.css"

class Dashboard extends Component {

    render(){
        return (
            <div className="App">
                <CreateGroup />
            </div>
        );
    }

}

export default Dashboard;
