import React, { useState, useEffect } from 'react';
import classes from './App.module.css';
import axios from 'axios';
import { useParams } from "react-router-dom";
import ReactLoading from 'react-loading';

const App = props => {
  let { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [test, setTest] = useState(null);
  const [userAnswers, setUserAnswers] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8080/api/test/result/" + id,
      { headers: { authorization: props.user }}
    ).then(res => {
      if (res.data.error) {
        alert(res.data.error)
      } else {
        setTest(res.data.allQuizDto);
        setUserAnswers(res.data.userAnswers);
        setLoading(false);
      }
    }).catch(err => {
      console.log(err);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      {(!loading) ?
        <div className={classes.Results}>
          <div>
            <h1>{test.name}</h1>
            <hr />
            <div>
              {test.questions.map(question => (
                <div className={classes.Results} key={question.id}>
                  <h4>{question.text}</h4>
                  <hr />
                  {question.answers.map(answer => (
                    <p key={answer.id}
                      className={
                        answer.correct ?
                          classes.Correct :
                          userAnswers.find((el) => (el.id === answer.id)) ?
                            classes.Incorrect :
                            classes.Answer
                      }>{answer.text}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>:
        <div className={classes.Loading}>
          <ReactLoading type={"spinningBubbles"} color="#000000" />
        </div>
      }
    </div>
  )
}

export default App;
