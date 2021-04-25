import React, {Component} from 'react';
import PopUpForm from "./PopUpForm";

let MAX_GROUP_SIZE = 100;  // Hardcoded value for maximum number of students in a group

class CreateGroup extends Component {

    constructor() {
        super();
        this.state = {
            open : false,       // If popup is open or not
        }
    }

    setOpen = () => {
        this.setState({
            open: true
        });
    }

    recordData = (gN, gS, tAS, tAE) => {
        if (gN === null) {
            this.setState({
                open: false
            });
        } else {
            this.setState({
                open: false,
                groupName: gN,
                groupSize: gS,
                timeAvailS: tAS,
                timeAvailE: tAE
            });
        }
    }

    render() {
        let popUp = null
        if (this.state.open)
            popUp = <PopUpForm onChange={this.recordData} maxGroupSize={MAX_GROUP_SIZE}/>
        return (
            <div>
                <button className="createGroupButton" onClick={this.setOpen}>Create Group</button>
                {popUp}
            </div>
        );
    }

}

export default CreateGroup;
