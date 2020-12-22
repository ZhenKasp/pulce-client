import React, { useState, useEffect } from 'react';
import classes from './UserTest.module.css';
import axios from 'axios';
import { useHistory, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const App = props => {
  let history = useHistory();
    let { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState("1 + 1");
  const [answers, setAnswers] = useState([
    {id: 1, text: '1'},
    {id: 2, text: '2'},
    {id: 3, text: '3'},
    {id: 4, text: '4'}
  ]);
  const [userAnswer, setUserAnswer] = useState(null);

  // useEffect(() => {
  //   axios.get(process.env.REACT_APP_PATH_TO_SERVER + "test/" + id,
  //     { headers: { authorization: props.user }}
  //   ).then(res => {
  //     if (!res.data.errors) {
  //       setQuestion(res.data.post );
  //     } else {
  //       history.replace('/notFound');
  //     }
  //   }).catch(err => {
  //     console.log(err);
  //     // props.createFlashMessage(err.message, "danger");
  //     history.replace('/');
  //   });
  // }, []);

  const submit = () => {
    setLoading(true);
    console.log(userAnswer);
    axios.post(process.env.REACT_APP_PATH_TO_SERVER, userAnswer).then(res => {
      if (res.data.error) {
        alert(res.data.error)
      } else {
        setLoading(false);
        setQuestion("2 + 2 * 2");
        setAnswers([
          {id: 1, text: '6'},
          {id: 2, text: '8'},
          {id: 3, text: '10'},
          {id: 4, text: '13'}
        ])
      }
    }).catch((e) => {
      setLoading(false);
      setQuestion("2 + 2 * 2");
      setAnswers([
        {id: 1, text: '6'},
        {id: 2, text: '8'},
        {id: 3, text: '10'},
        {id: 4, text: '13'}
      ]);








      setUserAnswer(null);
      console.log(e);
    })
  }

  return (
    <div className={classes.UserTest}>
      <h1>UserTest</h1>
      <hr />
      {console.log(loading)}
      {(!loading) ?
        <div>
          <p className={classes.Question}>{question}</p>
          {answers.map(answer =>
            { return (
              <div key={answer.id} className={classes.Answer}>
                <input
                  name="answer"
                  type="radio"
                  value={answer.text}
                  id={`radioButton${answer.id}`}
                  onClick={() => setUserAnswer(answer.id)} />
                <label htmlFor={`radioButton${answer.id}`}>
                  {" " + answer.text}
                </label><br />
              </div>
            )}
          )}
          <Button onClick={submit}>Submit</Button>
        </div> : <div>loading</div>}
    </div>
  )
}

export default App;
