import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classes from './App.module.css';
import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import ReactLoading from 'react-loading';
import CreateTestModal from '../CreateTestModal/CreateTestModal.jsx';
import authHeader from "../../../service/auth-header";

const App = (props) => {
  const [modalIsShown, setModalIsShown] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);
  const [tests, setTests] = useState(null);
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

  const deleteTest = (event, id) => {
    event.stopPropagation();
    setLoading(true);
    axios.delete("http://localhost:8080/api/quiz/" + id,
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
                  <>
                    <Button
                      className={classes.CreateTest}
                      onClick={event => {
                        event.stopPropagation();
                        history.push("edit_test/" + test.id)}
                      }
                    >
                      Edit Test
                    </Button>
                    <span
                      className={classes.CrossTest}
                      onClick={event => deleteTest(event, test.id)}
                    />
                  </>
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
