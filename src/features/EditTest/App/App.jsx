import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classes from './App.module.css'
import {useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import ReactLoading from 'react-loading';
import InlineEdit from 'react-edit-inline2';

const App = (props) => {
  let { id } = useParams();
  const [test, setTest] = useState([null]);
  const [loading, setLoading] = useState(true);

console.log(test);
  useEffect(() => {
    axios.get(process.env.REACT_APP_PATH_TO_SERVER + "test" + id)
    .then(res => {
      if (res.data.error) {
        alert(res.data.error)
      } else {
        setTest(res.data.test);
        setLoading(false);
      }
    }).catch(err => {
      console.log(err);
      setTest({
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
      });
      setLoading(false);
    });
  }, []);

  const changeQuestionName = (data, id) => {
    setTest(test => {
      const questions = test.questions.map((item) => {
        if (item.id === id) {
          return {...item, question_name: data.question_name};
        } else {
          return item;
        }
      });

      return {
        ...test, questions
      };
    })
  }

  return (
    <div>
      {(!loading) ?
        <div>
          <div className={classes.Wrapper}>
            <h1>Edit "{test.test_name}"</h1>
            {test.questions.map((question, qIndex) => (
              <div key={"question_" + question.id} className={classes.Wrapper}>
                <h4>
                  <InlineEdit
                    className={classes.InlineEdit}
                    text={question.question_name}
                    paramName="question_name"
                    change={(data) => changeQuestionName(data, question.id)}
                  />
                </h4>
                {question.answers.map((answer, aIndex) => (
                  <p key={"answer_" + answer.id}>{answer.answer}</p>
                ))}
              </div>
            ))}
          </div>
          <Button>Create test</Button>
        </div> :
        <div className={classes.Loading}>
          <ReactLoading type={"spinningBubbles"} color="#000000" />
        </div>
      }
    </div>
  )
}

export default App;
