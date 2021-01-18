import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classes from './App.module.css'
import { useHistory } from "react-router-dom";
import authHeader from "../../../service/auth-header";
import Button from 'react-bootstrap/Button';
import ReactLoading from 'react-loading';
import CreateTestModal from '../CreateTestModal/CreateTestModal.jsx';

const App = (props) => {
  const [modalIsShown, setModalIsShown] = useState(false);
  const [tests, setTests] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(null);
  let history = useHistory();

  useEffect(() => {
    setIsAdmin(JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user")).roles.includes("ADMIN") : false)
    axios.get(process.env.REACT_APP_PATH_TO_SERVER + "quiz",
      {headers: authHeader()}
    ).then(res => {
      if (res.status !== 200) {
        alert(res.data.error);
      } else {
        setTests(res.data);
        setLoading(false);
      }
    }).catch(err => {
      history.replace('/signin');

    });
  }, [])

  const deleteTest = (event, id) => {
    event.stopPropagation();
    setLoading(true);
    axios.delete(process.env.REACT_APP_PATH_TO_SERVER + "quiz/" + id,
      {headers: authHeader()}
    ).then(res => {
      if (res.status === 200) {
        setTests(() => {
          const newTests = [];
          for (let i of tests) {
            newTests.push(i);
          }

          newTests.splice(newTests.findIndex((i) => {
            return i.id === id;
          }), 1)
          return newTests
        });
      }
      setLoading(false);
    }).catch(err => {
      setTests(() => {
        const newTests = [];
        for (let i of tests) {
          newTests.push(i);
        }

        newTests.splice(newTests.findIndex((i) => {
          return i.id === id;
        }), 1)
        return newTests
      });
      setLoading(false);
      console.log(err.message);
    })
  }

  return (
    <div>
      {(!loading) ?
      <div>
        <div className={classes.Wrapper}>
          <h1>Tests</h1>
          <CreateTestModal
            modalIsShownHandler={() => setModalIsShown(true)}
            modalIsShownCancelHandler={() => setModalIsShown(false)}
            modalIsShown={modalIsShown}
          />
            {tests.length > 0 ?
              (tests.map(test => (
                <div
                  className={classes.Card}
                  key={test.id}
                  onClick={() => history.push("user_test/" + test.id)}
                >
                  {test.name}
                  {isAdmin ?
                    <div className={classes.CardButtons}>
                      <Button
                        className={classes.CardButton}
                        onClick={event => {
                          event.stopPropagation();
                          history.push("students/" + test.id)}
                        }
                      >
                        Results by test
                      </Button>
                      <Button
                        className={classes.CardButton}
                        onClick={event => {
                          event.stopPropagation();
                          history.push("edit_test/" + test.id)}
                        }
                      >
                        Edit Test
                      </Button>
                      <Button
                        className={classes.CardButton}
                        variant="danger"
                        onClick={ event => {
                          event.stopPropagation();
                          deleteTest(event, test.id)}
                        }
                      >
                        Delete Test
                      </Button>
                    </div> : null
                  }
                </div>
              ))) : <p>No tests</p>
            }
            <Button className={classes.Button} onClick={() => setModalIsShown(true)}>Create test</Button>
        </div>
      </div> :
      <div className={classes.Loading}>
        <ReactLoading type={"spinningBubbles"} color="#000000" />
      </div>}
    </div>
  )
}

export default App;
