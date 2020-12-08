import React from 'react';
import classes from './App.module.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import signin from '../../../../utilities/signin';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";

const App = props => {
  let history = useHistory();

  return (
    <div className={classes.SignIn}>
      <h1>Please Sign In</h1>
      <Form
        onSubmit={(event) =>
          signin(
          event,
          props.createFlashMessage,
          props.setUser,
          history
        )}
      >
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            maxLength="255"
            autoFocus
            type="email"
            required
            name="email"
            placeholder="Enter email"
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            maxLength="255"
            type="password"
            required name="password"
            placeholder="Password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Sign In
        </Button>
      </Form>
    </div>
  )
}

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

export default connect(null, mapDispatchToProps)(App);
