import React, { useState } from 'react';
import classes from './UserTest.module.css';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const App = props => {
  let history = useHistory();
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState("1 + 1");
  const [answers, setAnswers] = useState([
    {id: 1, text: '1'},
    {id: 2, text: '2'},
    {id: 3, text: '3'},
    {id: 4, text: '4'}
  ]);

  const formSubmit = event => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.target);
    let object = {};
    data.forEach((value, key) => {object[key] = value});

    try {
      axios.post(process.env.REACT_APP_PATH_TO_SERVER, data).then(res => {
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
      })
    } catch (e) {
      setLoading(false);
      setQuestion("2 + 2 * 2");
      setAnswers([
        {id: 1, text: '6'},
        {id: 2, text: '8'},
        {id: 3, text: '10'},
        {id: 4, text: '13'}
      ])
      console.log(e);
    }
  }

  return (
    <div className={classes.UserTest}>
      <h1>UserTest</h1>
      <hr />
      {console.log(loading)}
      {(!loading) ?
        <div>
          <p className={classes.Question}>{question}</p>
          <form onSubmit={(event) => formSubmit(event)}>
            {answers.map(answer =>
              { return (
                <div key={answer.id} className={classes.Answer}>
                  <input
                    name="answer"
                    type="radio"
                    value={answer.text}
                    id={`radioButton${answer.id}`} />
                  <label htmlFor={`radioButton${answer.id}`}>
                    {" " + answer.text}
                  </label><br />
                </div>
              )}
            )}
            <Button type="submit">Submit</Button>
          </form>
        </div> : <div>loading</div>}
    </div>
  )
}

export default App;
