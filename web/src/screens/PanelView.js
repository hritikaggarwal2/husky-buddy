import React, {useState, useEffect} from 'react';
import CreateGroup from "../components/CreateGroup";
import "../styles/common.scss";
import "../components/MyGroupPanel";
import MyGroupPanel from "../components/MyGroupPanel";
import Chat from "../components/Chat";

/**
 *
 * @param props must contain
 *      -groupID: the groupId stored in Firebase to which
 *                  the chat belongs.
 */
export default function PanelView(props) {

    return (
        <div className="PanelView">
            <CreateGroup />
            <MyGroupPanel />
            <div>
                <Chat groupID={props.groupID}/>
            </div>
        </div>
    );
}

//<Chat {props.groupID} />