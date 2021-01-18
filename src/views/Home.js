import React from 'react';
import '../App.css';
import { Alert } from "react-bootstrap";
import axios from 'axios';

function Home() {
    // let result=function () {
    // axios.get("http://localhost:8080/api/test/all").then(result => {console.log(result)

    // })};
    return (
        <div>
            <Alert variant="success">
                <Alert.Heading>Hey, nice to see you</Alert.Heading>
                <p>
                    {"result()"}
                    Aww yeah, you successfully read this important alert message. This example
                    text is going to run a bit longer so that you can see how spacing within an
                    alert works with this kind of content.
                </p>
                <hr />
                <p className="mb-0">
                    Whenever you need to, be sure to use margin utilities to keep things nice
                    and tidy.
                </p>
            </Alert>
        </div>
    );
}

export default Home;
