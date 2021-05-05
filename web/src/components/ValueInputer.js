import React, {useState} from 'react';
import '../styles/CreateGroup.css';

/**
 * Function that displays an input field based
 * on parameters passed in to props.
 */
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
