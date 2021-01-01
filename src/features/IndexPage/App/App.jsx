import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import classes from './App.module.css'
import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import ReactLoading from 'react-loading';
import CreateTestModal from '../CreateTestModal/CreateTestModal.jsx';

const App = (props) => {
  const [modalIsShown, setModalIsShown] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);
  const [tests, setTests] = useState([
    { id: 1, name: "First test" },
    { id: 2, name: "2 + 2" },
    { id: 3, name: "3 + 3" },
    { id: 4, name: "4 + 4" },
    { id: 5, name: "5 + 5" },
  ]);
  const [loading, setLoading] = useState(true);
  let history = useHistory();

  useEffect(() => {
    axios.get(process.env.REACT_APP_PATH_TO_SERVER + "tests")
    .then(res => {
      if (res.data.error) {
        alert(res.data.error);
      } else {
        setTests(res.data.tests);
      }
    }).catch(err => {
      setTests([
        { id: 1, name: "Second test" },
        { id: 2, name: "2 + 2" },
        { id: 3, name: "3 + 3" },
        { id: 4, name: "4 + 4" },
        { id: 5, name: "5 + 5" },
      ])
      setLoading(false);
    alert(err.message);
    })
  }, [])

  return (
    <div>
      {(!loading) ?
      <div>
        <div className={classes.Wrapper}>
          <h1>IndexPage</h1>
          <CreateTestModal
            modalIsShownHandler={() => setModalIsShown(true)}
            modalIsShownCancelHandler={() => setModalIsShown(false)}
            modalIsShown={modalIsShown}
          />
            {tests.map(test => (
              <div
                className={classes.Card}
                key={test.id}
                onClick={() => history.push("user_test/" + test.id)}
              >
                {test.name}
                {isAdmin &&
                  <Button
                    className={classes.CreateTest}
                    onClick={event => {
                      event.stopPropagation();
                      history.push("edit_test/" + test.id)}
                    }
                  >
                    Edit Test
                  </Button>
                }
              </div>
            ))}
        </div>
        {isAdmin && <Button onClick={() => setModalIsShown(true)}>Create test</Button>}

      </div> :
      <div className={classes.Loading}>
        <ReactLoading type={"spinningBubbles"} color="#000000" />
      </div>}
    </div>
  )
}

export default App;
