import React, {Component} from 'react';
import "../styles/MyGroupPanel.css";

class MyGroupPanel extends Component {

    constructor() {
        super();
    }

    render() {
        let groupLinks = this.props.groups;
        // props.groups should contain links to the chats of every group.
        let displayLinks = [];
        for (let i = 0; i < groupLinks.length; i++) {
            let groupName = null; // = groupLinks[i].strip()....
            displayLinks.push(<li><a href={groupLinks[i]}>groupName</a></li>)
        }

        return (
            <div className= "myGroupPanel">MY GROUPS
                {displayLinks}
            </div>
        );
    }

}

export default MyGroupPanel;
