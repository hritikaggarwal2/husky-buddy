import React, { useState } from "react";
import { useForm } from "react-hook-form";
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
 *
 * Credits to: Youtube: Maksim Ivanov
 * */
export default function AddFile(props) {
    const { register, handleSubmit } = useForm();

    const uploadFile = async (data) => {
        const storageRef = props.firebase.storage().ref();
        const fileRef = storageRef.child(`/${props.user.uwid}/${data.file[0].name}`);
        await fileRef.put(data.file[0]);
        const url = await fileRef.getDownloadURL().catch((error) => {alert("Failed to send file, retry again!") });
        props.onChange(url, data.file[0].name);
    }

    return (
        <form onSubmit={handleSubmit(uploadFile)}>
            <input
            type="file"
            required name="file"
            {...register('file', {required: true})}
             />
            <button>Attach File</button>
        </form>
    );
}