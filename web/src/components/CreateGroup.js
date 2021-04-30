import React, {useState, useEffect} from 'react';
import PopUpForm from "./PopUpForm";
import firebase from "firebase/app";
import "firebase/firestore";

const MAX_GROUP_SIZE = 100;  // Hardcoded value for maximum number of students in a group

export default function CreateGroup() {
    const [open, setOpen] = useState(false);

    const ref = firebase.firestore().collection("Groups");

    function recordData(maxGroupSize, groupName, classPrefix, 
                        classNum, classSection, topics, meetInPerson) {
        if (groupName === "") {
            setOpen(false)
        } else {
            // SEND DATA TO FIREBASE SERVER
            ref.add({
                class_num: classNum,
                class_prefix: classPrefix,
                class_section: classSection,
                group_name: groupName,
                max_members: maxGroupSize,
                meet: meetInPerson,
                topic: topics
            }).then(() => {/*Provide some feedback to user to show that group was cerated*/
            });
            setOpen(false);
        }
    }

    return (
        <div>
            <button className="createGroupButton" onClick={() => setOpen(true)}>Create Group</button>
            {open ? <PopUpForm onChange={recordData} maxGroupSize={MAX_GROUP_SIZE}/> : null}
        </div>
    );
}


/*class CreateGroup extends Component {
    //const ref = firebase.firestore().collection("groups");

    constructor() {
        super();
        this.state = {
            open: false,       // If popup is open or not
        }
    }
    
    setOpen = () => {
        this.setState({
            open: true
        });
    }

    recordData = (gN, maxGS, tAS, tAE) => {
        if (gN === null) {
            this.setState({
                open: false
            });
        } else {
            // SEND DATA TO FIREBASE SERVER

            this.setState({
                open: false,
                groupName: gN,
                maxGroupSize: maxGS,
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

export default CreateGroup; */
