import React, { useState, useEffect } from "react";
import "../styles/common.scss";

/**
 * Component that provides an option to attach
 * a file and send it inside of chat
 * 
 * @param props -Must include:
 *                      - firebase: object to call to add a file and a new
 *                                  link to the file within chat
 *                      - user: user that is currently logged in
 *                      - onChange(): function to call to process
 *                                  the link to the file *
 *                      - sentLink: whether or not the attached link
 *                                  has been utilized (i.e. sent in chat or not)  
 * */
export default function AddFile(props) {
    // For status bars
    const [file, setFile] = useState(null);
    const [fileSelected, setFileSelected] = useState(false);
    const [fileUploaded, setFileUploaded] = useState(false);

    useEffect(()=> {
        if (props.sentLink) {
            setFileSelected(false);
            setFileUploaded(false);
        }
    }, [props.sentLink]);

    // Upload file to firebase storage, and 
    // call props.onChange() with the url and the filename
    const uploadFile = async (e) => {
        if (e.target.files.length > 0) {
            setFileSelected(true);
            setFile(e.target.files[0]);

            const storageRef = props.firebase.storage().ref();
            const fileRef = storageRef.child(`/${props.user.uwid}/${e.target.files[0].name}`);
            await fileRef.put(e.target.files[0]);
            const url = await fileRef.getDownloadURL().catch((error) => {alert("Failed to send file, retry again!") });
            props.onChange(url, e.target.files[0].name);
            setFileUploaded(true);
        }
    }

    // Displays a spinner and checkmark, depending
    // on whether the file has been selected and 
    // uploaded or not.
    return (
        <div className="AddFileWidget">
            {!fileSelected ? 
                <input
                    key = {props.sent}
                    type="file"
                    required name="file"
                    onChange={(event) => uploadFile(event)}
                /> : null}
            {fileSelected && !fileUploaded ? <div class="loader"></div> : null}
            {fileUploaded ? <span className='checkmark'>&#10003;</span>: null}
            {fileSelected ? <span className='fileName'>{file.name}</span>: null}
        </div>
    );
}