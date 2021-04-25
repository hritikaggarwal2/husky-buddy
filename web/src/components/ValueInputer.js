import React, {Component} from 'react';
import '../styles/CreateGroup.css';

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
