import React from 'react';
import Modal from '../../UI/Modal/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const CreateTestModal = props => {

  const submitCreateTest = (event) => {
    event.preventDefault();

    const object = new FormData(event.target);
    event.persist();

    axios.post(process.env.REACT_APP_PATH_TO_SERVER + 'test', object).then(res =>
      {
        if (res.data.error) {
          alert(res.data.error)
        } else {

          props.modalIsShownCancelHandler();
          event.target.reset();
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
        <Form onSubmit={submitCreateTest}>
          <h3>Create Test</h3>
          <Form.Group>
            <Form.Label>Test name</Form.Label>
            <Form.Control
              maxLength="255"
              required type="text"
              placeholder="Test name"
              name="name"
            />
          </Form.Group>

          <Button type="submit">Confirm</Button>
        </Form>
      </Modal>
    </div>
  )
}

export default CreateTestModal;
