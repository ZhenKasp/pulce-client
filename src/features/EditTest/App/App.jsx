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
        name: "testname",
        questions: [
          {
            id: 3,
            text: "questionname",
            complexity: 3,
            answers: []
          },
          {
            id: 2,
            text: "qweqw",
            complexity: 2,
            answers: [
              { id: 8, text: "zxc", correct: false },
              { id: 5, text: "qweq", correct: false },
              { id: 7, text: "asdas", correct: false },
              { id: 6, text: "qweasd", correct: true }
            ]
          },
          {
            id: 1,
            text: "qweq",
            complexity: 1,
            answers: [
              { id: 4, text: "zxc", correct: false },
              { id: 1, text: "qweq", correct: true },
              { id: 3, text: "asdas", correct: false },
              { id: 2, text: "qwe", correct: false }
            ]
          }
        ]
      });
      setLoading(false);
    });
  }, []);

  const changeTestName = (data) => {
    setTest({ ...test, name: data.name })
  }

  const changeQuestionName = (data, index) => {
    setTest(test => {
      const questions = [...test.questions];
      questions[index].text = data.text;

      return {
        ...test, questions
      };
    })
  }

  const changeCorrectAnswer = (qIndex, aIndex) => {
    setTest(test => {
      const questions = [...test.questions];
      questions[qIndex].answers[aIndex].correct = !questions[qIndex].answers[aIndex].correct;
      return {
        ...test, questions
      };
    })
  }

  const changeAnswer = (data, qIndex, aIndex) => {
    setTest(test => {
      const questions = [...test.questions];
      questions[qIndex].answers[aIndex].text = data.text;
      return {
        ...test, questions
      };
    })
  }

  const addQuestion = () => {
    setTest(test => {
      const questions = [
        ...test.questions,
        {
          text: "",
          complexity: 1,
          answers: []
        }
      ]
      return {
        ...test, questions
      };
    })
  }

  const addAnswer = qIndex => {
    setTest(test => {
      const questions = [...test.questions];
      questions[qIndex].answers.push({
        text: "",
        correct: false
      });

      return {
        ...test, questions
      };
    })
  }

  const deleteQuestion = qIndex => {
    setTest(test => {
      test.questions.splice(qIndex, 1);

      return {
        ...test
      };
    });
  }

  const deleteAnswer = (event, qIndex, aIndex) => {
    event.stopPropagation()
    setTest(test => {
      test.questions[qIndex].answers.splice(aIndex, 1);

      return {
        ...test
      };
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
                text={test.name}
                paramName="name"
                change={(data) => changeTestName(data)}
              />
            </h1>
            {test.questions.map((question, qIndex) => (
              <div key={"question_" + qIndex} className={classes.Wrapper}>
                <button onClick={() => deleteQuestion(qIndex)}>
                  Delete question
                </button>
                <h3>
                  {qIndex + 1 + ". "}<InlineEdit
                    className={classes.InlineEdit}
                    text={question.text}
                    paramName="text"
                    change={(data) => changeQuestionName(data, qIndex)}
                  />
                </h3>
                <hr />
                {question.answers.map((answer, aIndex) => (
                  <div
                    key={"answer_" + aIndex}
                    className={answer.correct ? classes.Correct : classes.Card}
                    onClick={() => changeCorrectAnswer(qIndex, aIndex)}>
                      <InlineEdit
                        className={classes.InlineEdit}
                        text={answer.text}
                        paramName="text"
                        stopPropagation
                        change={data => {
                          changeAnswer(data, qIndex, aIndex)}
                        }
                      />
                    <button
                      onClick={(event) => deleteAnswer(event, qIndex, aIndex)}
                    >
                      Delete answer
                    </button>
                  </div>
                ))}
                <hr />
                <Button onClick={() => {addAnswer(qIndex)}}>Add answer</Button>
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
