import React from 'react';
import Alert from 'react-bootstrap/Alert';
import { connect } from 'react-redux';

const App = props => {
  if (props.flashMessage?.text) {
    return (
      <Alert
        onClose={props.destroyFlashMessage}
        dismissible
        variant={props.flashMessage.variant || "danger"}
      >
        {props.flashMessage.text}
      </Alert>
    )
  }
  return null;
}

const mapStateToProps = state => {
  return { flashMessage: state.flashMessage }
}

const mapDispatchToProps = dispatch => {
  return {
    destroyFlashMessage: () => dispatch({ type: "DESTROY_FLASH_MESSAGE" })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
