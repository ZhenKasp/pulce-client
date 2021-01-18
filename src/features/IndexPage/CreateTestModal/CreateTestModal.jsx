import React, { useState } from 'react';
import Modal from '../../UI/Modal/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import authHeader from "../../../service/auth-header";
import { useHistory } from "react-router-dom";

const CreateTestModal = props => {
  const [name, setName] = useState('');
  let history = useHistory();

  const submitCreateTest = () => {
    axios.post(process.env.REACT_APP_PATH_TO_SERVER + "quiz",
      name,
      {
        headers: {
          ...authHeader(),
          'Content-Type': 'text/plain'
        }
      }
    ).then(res => {
      if (res.data.error) {
        console.log(res.data.error);
        setName(null);
      } else {
        props.modalIsShownCancelHandler();
        history.push("edit_test/" + res.data);
      }
    }
    ).catch((err) => {
      alert(err);
      props.modalIsShownCancelHandler();
    });
  }

  return (
    <div>
      <Modal
        show={props.modalIsShown}
        modalClosed={props.modalIsShownCancelHandler}
      >
        <h3>Create Test</h3>
        <Form.Group>
          <Form.Label>Test name</Form.Label>
          <Form.Control
            maxLength="255"
            required type="text"
            placeholder="Test name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </Form.Group>
        <Button onClick={submitCreateTest}>Confirm</Button>
      </Modal>
    </div>
  )
}

export default CreateTestModal;
