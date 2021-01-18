import React, {useState} from 'react';
import '../App.css';
import authHeader from "../service/auth-header";
import axios from 'axios';

function Profile() {
    // let result = () => {
    //     axios.get(process.env.REACT_APP_PATH_TO_SERVER + "test/user",
    //         {headers: authHeader()}) .then(result => {console.log(result)

    //     })};
    return (
        <div className="App">

            <h1>Profile</h1>
            <h3>{"result"}</h3>
        </div>
    );
}

export default Profile;
