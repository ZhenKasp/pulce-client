import React, { useState, useEffect } from 'react';
import classes from './App.module.css';
import axios from 'axios';
import { useParams } from "react-router-dom";
import ReactLoading from 'react-loading';

const App = props => {
  let { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [test, setTest] = useState(null);

  useEffect(() => {
    axios.get(process.env.REACT_APP_PATH_TO_SERVER + "test_results/" + id,
      { headers: { authorization: props.user }}
    ).then(res => {
      if (res.data.error) {
        alert(res.data.error)
      } else {
        setTest([res.data.test])
        setLoading(false);
      }
    }).catch(err => {
      console.log(err);
      alert(err.message);
      setTest([{
        id: 1,
        test_name: "First test",
        questions: [
          {
            id: 1,
            question_name: "1 + 1",
            answers: [
              {id: 1, answer: '1'},
              {id: 2, answer: '2'},
              {id: 3, answer: '3'},
              {id: 4, answer: '4'}
            ],
            user_answer_id: 2,
            correct_answer_id: 2,
          },
          {
            id: 2,
            question_name: "2 + 2 * 2",
            answers: [
              {id: 5, answer: '8'},
              {id: 6, answer: '6'},
              {id: 7, answer: '7'},
              {id: 8, answer: '10'}
            ],
            user_answer_id: 5,
            correct_answer_id: 6,
          }
        ]
      }]);
      setLoading(false);
    });
  }, []);

  return (
    <div className={classes.Results}>
      {(!loading) ?
        <div>
          <h1>{test[0].test_name}</h1>
          <hr />
          <div>
            {test[0].questions.map(question => (
              <div className={classes.Results}>
                <h4>{question.question_name}</h4>
                <hr />
                {question.answers.map(answer => (
                  <p className={
                      question.correct_answer_id === answer.id ?
                        classes.Correct :
                        question.user_answer_id === answer.id ?
                          classes.Incorrect :
                          classes.Answer
                    }>{answer.answer}</p>
                ))}
              </div>
            ))}
          </div>
        </div> :
        <div className={classes.Loading}>
          <ReactLoading type={"spinningBubbles"} color="#000000" />
        </div>
      }
    </div>
  )
}

export default App;
