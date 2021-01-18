import React, { useState, useEffect } from 'react';
import classes from './App.module.css';
import axios from 'axios';
import { useHistory, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import authHeader from "../../../service/auth-header";
import ReactLoading from 'react-loading';

const App = props => {
  let history = useHistory();
  let { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState({id: null, progress: null, answers: []});
  const [pulse, setPulse] = useState("pulse");
  const [testStatus, setTestStatus] = useState(null);

  const getPulse = () => {
    axios.get(process.env.REACT_APP_PATH_TO_SERVER + "pulse",
      {headers: authHeader()}
    ).then(res => {
      if (res.data.error) {
        alert(res.data.error)
      } else {
        setPulse(res.data);
      }
    }).catch(err => console.log(err));
  }

  const changeUserAnswer = (id, progress, text, questionId) => {
    const newAnswer = !userAnswer?.answers.some(el => el.id === id);

    setUserAnswer(userAnswer => {
      const answers = newAnswer ? [...userAnswer.answers, {id, text}] : userAnswer.answers.filter(a => a.id !== id)
      return {...userAnswer, id: questionId, progress: progress, answers}
    })
  }
  console.log(userAnswer);

  useEffect(() => {
    axios.get(process.env.REACT_APP_PATH_TO_SERVER + "test/" + id,
      {headers: authHeader()}
    ).then(res => {
      if (res.data.error) {
        alert(res.data.error)
      } else {
        setQuestion(res.data);
        setLoading(false);
      }
    }).catch(err => {
      console.log(err);
      alert(err.message);
      setQuestion({
        id: 1,
        text: "Lorem",
        answers: [
          {id: 1, text: 'First'},
          {id: 2, text: 'Second'},
          {id: 3, text: 'Third'},
          {id: 4, text: 'Fourth'}
        ]
      });
      setLoading(false);
    });
    const interval = setInterval(() => {
      getPulse();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const submit = () => {
    setLoading(true);
    setUserAnswer({id: null, progress: null, answers: []});
    axios.post(process.env.REACT_APP_PATH_TO_SERVER + "test", userAnswer)
      .then(res => {
        if (res.data.error) {
          alert(res.data.error)
        } else {
          setLoading(false);
          setQuestion(res.data);
          setTestStatus(res.data.textStatus);
        }
      }).catch((e) => {
        setLoading(false);
        history.push('/test_results/' + id)
        console.log(e);
      })
  }

  return (
    <div>
      {(!loading) ?
      <div className={classes.UserTest}>
        <h1>{question.text}</h1>
        <hr />
          <div>
            {question.answers.map(answer =>
              { return (
                <div key={answer.id} className={classes.Answer}>
                  <input
                    name="answer"
                    type="checkbox"
                    value={answer.text}
                    id={`radioButton${answer.id}`}
                    onClick={() => changeUserAnswer(answer.id, answer.progress, answer.text, question.id)} />
                  <label htmlFor={`radioButton${answer.id}`}>
                    {" " + answer.text}
                  </label><br />
                </div>
              )}
            )}
            <Button onClick={submit} disabled={!userAnswer?.answers.length > 0}>Submit</Button>
            <p>{pulse}</p>
          </div>
      </div> :
      <div className={classes.Loading}>
        <ReactLoading type={"spinningBubbles"} color="#000000" />
      </div>}
    </div>
  )
}

export default App;
