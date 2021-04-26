import React, {Component} from 'react';
import ValueInputer from "./ValueInputer";
import '../styles/CreateGroup.css';

let DAYS_OF_WEEK = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];

class PopUpForm extends Component {

    constructor() {
        super();
        this.state = {
            minGroupSize : 0,
            maxGroupSize : 0,
            groupName : '',
            meetInPerson : true,
            availableDays : new Set(),
            topics : []
        }
    }

    closeForm = () => {
        this.props.onChange();
    }

    recordData = () => {
        // ***** VALIDATE INPUT ***** ADD LATER

        this.props.onChange(this.state.minGroupSize,
            this.state.maxGroupSize,
            this.state.groupName,
            this.state.meetInPerson,
            this.state.availableDays,
            this.state.topics);
    }

    recordClassName = (name) => {
        this.setState({
            groupName : name
        });
    }

    recordTopics = (topicsIn) => {
        let topicsWanted = [];
        if (topicsIn !== null) {
            topicsWanted = topicsIn.split(" ");
        }

        this.setState ({
            topics : topicsWanted
        });
    }

    recordMinGroupSize = (size) => {
        this.setState({
            minGroupSize : size
        });
    }

    recordMaxGroupSize = (size) => {
        this.setState({
            maxGroupSize : size
        });
    }

    recordMeetInPerson = () => {
        let checked = this.state.meetInPerson;

        this.setState( {
            meetInPerson : !checked
        });
    }

    recordDayOfWeek = (day) => {
        let currDaysAvail = new Set(this.state.availableDays);

        currDaysAvail.has(day) ? currDaysAvail.delete(day) : currDaysAvail.add(day);

        this.setState({
            availableDays : currDaysAvail
        });
    }

    render() {
        let daysCheckboxes = [];
        /*
        if (this.state.meetInPerson) {
            for (let i = 0; i < DAYS_OF_WEEK.length; i++) {
                daysCheckboxes.push(
                    <label>{DAYS_OF_WEEK[i]}
                        <input className= "checkbox" type="checkbox"
                               checked={this.state.availableDays.has(DAYS_OF_WEEK[i])}
                               onClick={this.recordDayOfWeek(DAYS_OF_WEEK[i])}/>
                    </label>);
            }
        } */

        return (
            <div className="form">
                <div className="form_content">
                    <span className="close" onClick={this.closeForm}>&times;</span>
                    <ValueInputer title={'Class Name'} type={'string'} onChange={this.recordClassName} />
                    <ValueInputer title={'Topics of Interest'} type={'string'} onChange={this.recordTopics} />
                    <ValueInputer title={'Min Group Size'} min={0} max={this.props.maxGroupSize} type={'number'} onChange={this.recordMinGroupSize} />
                    <ValueInputer title={'Max Group Size'} min={0} max={this.props.maxGroupSize} type={'number'} onChange={this.recordMaxGroupSize} />
                    <label>Meet In Person
                        <input className= "checkbox" type="checkbox" checked={this.state.meetInPerson} onClick={this.recordMeetInPerson}/>
                    </label>
                    {daysCheckboxes}
                    <button className="formButton" onClick={this.recordData}>Create</button>
                </div>
            </div>
        );
    }
}

export default PopUpForm;
