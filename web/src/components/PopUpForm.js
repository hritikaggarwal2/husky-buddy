import React, {useState} from 'react';
import ValueInputer from "./ValueInputer";
import '../styles/CreateGroup.css';
import { useUser } from "../providers/UserProvider";

/**
 * Function that creates a popup form for a user to input
 * information regarding preferences of a group to create
 * or search for.
 *
 * @param props must contain:
 *  onChange: function to call when popup form is submitted
 *  maxGroupSize: constant for maximum group size
 *  action: value to display on the submit button
 */
export default function PopUpForm(props) {
    const [maxGroupSize, setMaxGroupSize] = useState(0);
    const [groupName, setGroupName] = useState("");
    const [classPrefix, setClassPrefix] = useState("");
    const [classNum, setClassNum] = useState(0);
    const [classSection, setClassSection] = useState("");
    const [topics, setTopics] = useState(0);
    const [meetInPerson, setMeetInPerson] = useState(false);
    const user = useUser.user;

    function closeForm() {
        props.onChange("", "", "", "", "", "");
    }

    function recordData() {
        // ***** VALIDATE INPUT *****
        if (maxGroupSize <= 1) {
            alert("Enter a valid group size (must be greater than 1).");
            return;
        }
        if (groupName === "" || groupName === null) {
            alert("Enter a valid group name.");
            return;
        }

        if (classPrefix === "" || groupName === null) {
            alert("Enter a valid class prefix (Example: CSE, ENGL, MATH, etc).");
            return;
        }

        if (classNum <= 0 || classNum > 1000) {
            alert("Enter a valid class number.");
            return;
        }


        //@TODO // Parse topics string into an array of topics and pass that array to props.onChange()

        props.onChange(maxGroupSize, groupName, classPrefix, classNum, classSection, topics, meetInPerson, user);
    }

    function recordTopics(topicsIn) {
        let topicsWanted = [];
        if (topicsIn !== null) {
            topicsWanted = topicsIn.split(" ");
        }

        console.log(topicsWanted);
        setTopics(topicsWanted);
    }

    return (
        <div className="form">
            <div className="form_content">
                <span className="formCloseButton" onClick={closeForm}>&times;</span>
                <ValueInputer title={'Group Name'} type={'string'} onChange={input => setGroupName(input)}/>
                <ValueInputer title={'Class Prefix'} type={'string'} onChange={input => setClassPrefix(input)}/>
                <ValueInputer title={'Class Number'} type={'number'} onChange={input => setClassNum(input)}/>
                <ValueInputer title={'Class Section (Optional)'} type={'string'}
                              onChange={input => setClassSection(input)}/>
                <ValueInputer title={'Topics of Interest (Optional)'} type={'string'} onChange={recordTopics}/>
                <ValueInputer title={'Max Group Size'} min={0} max={props.maxGroupSize} type={'number'}
                              onChange={input => setMaxGroupSize(input)}/>

                <label>Meet In Person
                    <input className="checkbox" type="checkbox" checked={meetInPerson}
                           onClick={() => setMeetInPerson(prevVal => !prevVal)}/>
                </label>
                <button className="formButton" onClick={recordData}>{props.action}</button>
            </div>
        </div>
    );
}
