import React, { useState, useEffect } from 'react';
import classes from './App.module.css';
import axios from 'axios';
import { useHistory, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import ReactLoading from 'react-loading';

const App = props => {
  let history = useHistory();
  let { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [userAnswer, setUserAnswer] = useState(null);
  const [pulse, setPulse] = useState(null);

  const getpulse = () => {
    setPulse(getRandomInt(100));
    try {
      axios.get(process.env.REACT_APP_PATH_TO_SERVER + "pulse").then(res => {
        if (res.data.error) {
          alert(res.data.error)
        } else {
          setPulse(res.data.pulse);
        }
      })
    } catch (err) {
      console.log(err.message);

    }
  }

  const getRandomInt = (max) => (
    Math.floor(Math.random() * Math.floor(max))
  )

  useEffect(() => {
    axios.get(process.env.REACT_APP_PATH_TO_SERVER + "test/" + id,
      { headers: { authorization: props.user }}
    ).then(res => {
      if (res.data.error) {
        alert(res.data.error)
      } else {
        setQuestion(res.data.question);
        setAnswers(res.data.answers);
        setLoading(false);
      }
    }).catch(err => {
      console.log(err);
      alert(err.message)

      setQuestion(1);
      setAnswers([
        {id: 1, answer: '1'},
        {id: 2, answer: '2'},
        {id: 3, answer: '3'},
        {id: 4, answer: '4'}
      ]);
      setLoading(false);
    });
    getpulse();
    const interval = setInterval(() => {
      getpulse();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const submit = () => {
    setLoading(true);
    axios.post(process.env.REACT_APP_PATH_TO_SERVER, userAnswer).then(res => {
      if (res.data.error) {
        alert(res.data.error)
      } else {
        setLoading(false);
        setQuestion(res.data.question);
        setAnswers(res.data.answers)
      }
    }).catch((e) => {
      history.push("/test_results/" + id)
      setLoading(false);
      setQuestion(question * 2);
      setAnswers([
        {id: 1, answer: '6'},
        {id: 2, answer: '8'},
        {id: 3, answer: '10'},
        {id: 4, answer: '13'}
      ]);
      setUserAnswer(null);
      console.log(e);
    })
  }

  return (
    <div className={classes.UserTest}>
      <h1>UserTest</h1>
      <hr />
      {(!loading) ?
        <div>
          <p className={classes.Question}>{question}</p>
          {answers.map(answer =>
            { return (
              <div key={answer.id} className={classes.Answer}>
                <input
                  name="answer"
                  type="radio"
                  value={answer.answer}
                  id={`radioButton${answer.id}`}
                  onClick={() => setUserAnswer(answer.id)} />
                <label htmlFor={`radioButton${answer.id}`}>
                  {" " + answer.answer}
                </label><br />
              </div>
            )}
          )}
          <Button onClick={submit} disabled={!userAnswer}>Submit</Button>
          <p>{pulse}</p>
        </div> :
        <div className={classes.Loading}>
          <ReactLoading type={"spinningBubbles"} color="#000000" />
        </div>
      }
    </div>
  )
}

export default App;
