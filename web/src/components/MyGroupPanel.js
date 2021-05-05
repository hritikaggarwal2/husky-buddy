import React, {useState} from 'react';
import "../styles/MyGroupPanel.css";

export default function MyGroupPanel(props) {
    const [groups, setGroups] = useState(props.groups);
    let displayLinks = [];
    for (let i = 0; i < groups.length; i++) {
        let groupName = null; // = groupLinks[i].strip()....
        displayLinks.push(<li><a href={groups[i]}>groupName</a></li>)
    }

    return (
        <div className= "myGroupPanel">MY GROUPS
            {displayLinks}
        </div>
    );
}