import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import classes from './App.module.css';
import { useHistory } from "react-router-dom";
import logout from '../../../utilities/logout';
import { connect } from 'react-redux';

const App = props => {
  let history = useHistory();
  return (
    <Navbar bg="dark" variant="dark" expand="sm">
      <Navbar.Brand className={classes.Brand} onClick={() => history.push("/")}>Pulse</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link onClick={() => history.push("/user_test")}>UserTest</Nav.Link>
        </Nav>
        <Nav>
          <NavDropdown className={classes.Dropdown} title="Dropdown">
            <NavDropdown.Item onClick={() => history.push("/signin")}>
              Sign In
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => history.push("/signup")}>
              Sign Up
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={() => logout(props.user, props.createFlashMessage, history)}>
              Log Out
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
};

const mapStateToProps = state => ({ user: state.user });

const mapDispatchToProps = dispatch => {
  return {
    setUser: value => dispatch({ type: "SET_USER", value }),
    createFlashMessage: (text, variant) => dispatch({
      type: "CREATE_FLASH_MESSAGE",
      text: text,
      variant: variant
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
