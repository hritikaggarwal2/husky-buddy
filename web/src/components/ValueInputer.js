import React, {useState} from 'react';
import '../styles/CreateGroup.css';

export default function ValueInputer(props) {
    const [displayValue, setDisplayValue] = useState("");
    
    function onInputChange(event) {
        let input = event.target.value;
        setDisplayValue(input);
        
        props.onChange(input);
    }

    return (
            <div >
                <label>
                    {props.title + " "}
                    <input className="valueInputer"
                           value={displayValue}
                           onChange={onInputChange}
                           type={props.type}
                           min={props.min}
                           max={props.max}
                    />
                </label>
            </div>
        );
}

/*
class ValueInputer extends Component {

    constructor() {
        super();
        this.state = {
            displayValue : ''
        }
    }

    onInputChange = (event) => {
        let input = event.target.value;
        this.setState( {
            displayValue : input
        });

        this.props.onChange(input);
    }

    render() {
        return (
            <div >
                <label>
                    {this.props.title + " "}
                    <input className="valueInputer"
                        value={this.state.displayValue}
                        onChange={this.onInputChange}
                        type={this.props.type}
                        min={this.props.min}
                        max={this.props.max}
                    />
                </label>
            </div>
        );
    }

}

export default ValueInputer;
*/