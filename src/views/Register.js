import React, {useState} from 'react';
import '../App.css';
import {Button, Form,Card,Alert, Col} from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from "react-router-dom";

function Register() {
    let history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [congratulations, setCongratulations] = useState('');

    const [course, setCourse] = useState('');
    const [faculty, setFaculty] = useState('');
    const [speciality, setSpeciality] = useState('');
    const [address, setAddress] = useState('');
    const [birth_date, setBirth_date] = useState('');
    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [middle_name, setMiddle_name] = useState('');
    const [showError, setShowError] = useState(true);
    const [showCongratulations, setShowCongratulations] = useState(true);

    function doRegister(){
        setShowError(true);
        setShowCongratulations(true);
        if (username === '' || password === '') {
            setError('Fill in all the fields.');
        } else {
            axios.post(process.env.REACT_APP_PATH_TO_SERVER + "auth/signup",
                {
                    username,
                    password,
                    first_name,
                    last_name,
                    middle_name,
                    course,
                    faculty,
                    speciality,
                    address,
                    birth_date
                }, {withCredentials:true})
            .then(result => {
                if (result.status === 200 && result.data.success) {
                    setUsername(username);
                    setCongratulations('Congratulations')
                    setError("");
                    history.replace('/signin');
                }else  {
                    setError(result.data.msg);
                }
            }).catch(e => {
                setError('Some error');
                console.log(e)
            });
        }
    }

    return (
        <div className="App">
            {error.length !== 0 && showError &&
                <Alert
                    variant={'danger'}
                    onClose={() => setShowError(false)}
                    dismissible>{error}
                </Alert>
            }
            {congratulations.length !== 0 && showCongratulations &&
                <Alert
                    variant={'success'}
                    onClose={() => setShowCongratulations(false)}
                    dismissible>{congratulations}
                </Alert>
            }
           <Card className="w-50 text-center mx-auto mt-4 p-3">
               <Form>
               <Form.Row>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                        <Col>
                            <Form.Control type="text"
                                placeholder="Username"
                                value={username}
                                onChange={e=>{setUsername(e.target.value)}}/>
                        </Col>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Col>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                        onChange={e=>{setPassword(e.target.value)}}/>
                    </Col>
                </Form.Group>

                <Form.Group controlId="formFirst_name">
                    <Form.Label>First Name</Form.Label>
                    <Col>
                        <Form.Control
                            type="text"
                            placeholder="First Name"
                            value={first_name}
                        onChange={e=>{setFirst_name(e.target.value)}}/>
                    </Col>
                </Form.Group>

                <Form.Group controlId="formLast_name">
                    <Form.Label>Last Name</Form.Label>
                    <Col>
                        <Form.Control
                            type="text"
                            placeholder="Last Name"
                            value={last_name}
                        onChange={e=>{setLast_name(e.target.value)}}/>
                    </Col>
                </Form.Group>

                <Form.Group controlId="formMiddle_name">
                    <Form.Label>Middle Name</Form.Label>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="Middle Name"
                                value={middle_name}
                            onChange={e=>{setMiddle_name(e.target.value)}}/>
                        </Col>
                </Form.Group>

                <Form.Group controlId="formCourse">
                    <Form.Label>Course</Form.Label>
                    <Col>
                        <Form.Control
                            type="text"
                            placeholder="Course"
                            value={course}
                        onChange={e=>{setCourse(e.target.value)}}/>
                    </Col>
                </Form.Group>

                <Form.Group controlId="formFaculty">
                    <Form.Label>Faculty</Form.Label>
                    <Col>
                        <Form.Control
                            type="text"
                            placeholder="Faculty"
                            value={faculty}
                        onChange={e=>{setFaculty(e.target.value)}}/>
                    </Col>
                </Form.Group>

                <Form.Group controlId="formSpeciality">
                    <Form.Label>Speciality</Form.Label>
                    <Col>
                        <Form.Control
                            type="text"
                            placeholder="Speciality"
                            value={speciality}
                        onChange={e=>{setSpeciality(e.target.value)}}/>
                    </Col>
                </Form.Group>

                <Form.Group controlId="formAddress">
                    <Form.Label>Address</Form.Label>
                    <Col>
                        <Form.Control
                            type="text"
                            placeholder="Address"
                            value={address}
                        onChange={e=>{setAddress(e.target.value)}}/>
                    </Col>
                </Form.Group>

                <Form.Group controlId="formBirth_date">
                    <Form.Label>Birth Date (ex: 23/12/1997)</Form.Label>
                    <Col>
                        <Form.Control
                            type="text"
                            placeholder="Birth Date. ex: 23/12/1997"
                            value={birth_date}
                        onChange={e=>{setBirth_date(e.target.value)}}/>
                    </Col>
                </Form.Group>
                </Form.Row>
                <Button size="lg" variant="primary" onClick={doRegister}>
                    Sign up
                </Button>
            </Form>
            </Card>
        </div>
    );
}

export default Register;
