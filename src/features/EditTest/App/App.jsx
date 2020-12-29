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
          }
        ]
      });
      setLoading(false);
    });
  }, []);

  const changeTestName = (data) => {
    setTest({ ...test, test_name: data.test_name })
  }

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

  const changeCorrectAnswer = (questionId, answerId) => {
    setTest(test => {
      const questions = test.questions.map((item) => {
        if (item.id === questionId) {
          return {...item, correct_answer_id: answerId};
        } else {
          return item;
        }
      });
      return {
        ...test, questions
      };
    })
  }

  const changeAnswer = (data, id) => {
    setTest(test => {
      const questions = test.questions.map(item => {
        const answers = item.answers.map(answer => {
          if (answer.id === id) {
            return {...answer, answer: data.answer};
          } else {
            return answer;
          }
        })
        return {...item, answers}
      });
      return {
        ...test, questions
      };
    })
  }

  const addQuestion = () => {
    axios.post(process.env.REACT_APP_PATH_TO_SERVER + "createEmptyQuestion")
    .then(res => {
      if (res.data.error) {
        alert(res.data.error)
      } else {
        setTest(test => {
          const questions = [
            test.questions,
            {
              id: res.data.id,
              question_name: "",
              answers: [{}, {}, {}, {}]
            }
          ]
          return {
            ...test, questions
          };
        })
      }
    }).catch(err => {
      setTest(test => {
        const questions = [
          ...test.questions,
          {
            id: 0,
            question_name: " ",
            answers: [{}, {}, {}, {}],
            correct_answer_id: 0
          }
        ]
        return {
          ...test, questions
        };
      })
      console.log(err);
    });
  }

  return (
    <div>
      {(!loading) ?
        <div>
          <div className={classes.Wrap}>
            <h1>
              <InlineEdit
                className={classes.InlineEdit}
                text={test.test_name}
                paramName="test_name"
                change={(data) => changeTestName(data)}
              />
            </h1>
            {test.questions.map((question, qIndex) => (
              <div key={"question_" + question.id} className={classes.Wrapper}>
                <h3>
                  <InlineEdit
                    className={classes.InlineEdit}
                    text={question.question_name}
                    paramName="question_name"
                    change={(data) => changeQuestionName(data, question.id)}
                  />
                </h3>
                <hr />
                {question.answers.map((answer, aIndex) => (
                  <div
                    key={"answer_" + answer.id}
                    className={answer.id === question.correct_answer_id ? classes.Correct : classes.Card}
                    onClick={() => changeCorrectAnswer(question.id, answer.id)}>
                      <InlineEdit
                        className={classes.InlineEdit}
                        text={answer.answer}
                        paramName="answer"
                        stopPropagation
                        change={data => {
                          changeAnswer(data, answer.id)}
                        }
                      />
                  </div>
                ))}
              </div>
            ))}
            <div className={classes.Wrapper}>
              <Button onClick={addQuestion}>Add Question</Button>
            </div>
          </div>
          <Button onClick={() => alert("cofirm")}>Confirm</Button>
        </div> :
        <div className={classes.Loading}>
          <ReactLoading type={"spinningBubbles"} color="#000000" />
        </div>
      }
    </div>
  )
}

export default App;
