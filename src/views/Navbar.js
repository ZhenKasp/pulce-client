import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ButtonGroup, Nav, Navbar } from "react-bootstrap";
import { Redirect } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import { useHistory } from "react-router-dom";

function NavBar() {
    let history = useHistory();

    const { user, setUser } = useAuth();
    const [store, setStore] = useState(getStore());

    function getStore() {
        if ('user' in localStorage) {
            return JSON.parse(localStorage.getItem('user'))
        } else {
            return false
        }
    }

    useEffect(() => {
        setStore(getStore())
    }, [user])

    function logout() {
        localStorage.removeItem("user");
        setStore(false);
        history.replace('/signin')
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand style={{ cursor: "pointer" }} onClick={() => history.push('/')}>Pulse</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">

                {store ? getStore().roles.includes("USER") || getStore().roles.includes("ADMIN") ?
                    <Nav.Link onClick={() => history.push('/')}>Main</Nav.Link> :
                        null : null
                }

                {store ? getStore().roles.includes("USER") || getStore().roles.includes("ADMIN") ?
                    <Nav.Link onClick={() => history.push('/results')}>Results</Nav.Link> :
                        null : null
                }
                  { store ?
                    JSON.parse(localStorage.getItem("user")).roles.includes("ADMIN") ? <Nav.Link onClick={() => history.push('/profile')}>Profile</Nav.Link> : null
                    :
                    null
                }

                { store ?
                    JSON.parse(localStorage.getItem("user")).roles.includes("ADMIN") ? <Nav.Link onClick={() => history.push('/admin')}>Admin</Nav.Link> : null
                    :
                    null
                }
            </Nav>
        </Navbar.Collapse>
        <ButtonGroup aria-label="Basic example">
            {store ? null :<Button onClick={() => history.push('/signin')} className="mr-2" variant="info">Login</Button>}
            {store ? null : <Button onClick={() => history.push('/signup')} variant="light">Register</Button>}
            {store ? <Button onClick={logout} variant="light">Logout</Button> : null}
        </ButtonGroup>
        </Navbar>
    )
}

export default NavBar;
