import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classes from './App.module.css'
import { useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import ReactLoading from 'react-loading';
import InlineEdit from 'react-edit-inline2';
import Dropdown from 'react-bootstrap/Dropdown';
import authHeader from "../../../service/auth-header";
import { useHistory } from "react-router-dom";

const App = (props) => {
  let { id } = useParams();
  const [test, setTest] = useState([null]);
  const [loading, setLoading] = useState(true);
  let history = useHistory();

  useEffect(() => {
    axios.get("http://localhost:8080/api/quiz/" + id,
    {headers: authHeader()}
    ).then(res => {
      if (res.data.error) {
        alert(res.data.error)
      } else {
        setTest(res.data);
        setLoading(false);
      }
    }).catch(err => {
      console.log(err);
      setLoading(true);
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

  const changeDifficult = (qIndex, difficult) => {
    setTest(test => {
      const questions = [...test.questions];
      questions[qIndex].complexity = difficult;

      return {
        ...test, questions
      };
    })
  }

  const updateTest = () => {
    setLoading(true);
    axios.put("http://localhost:8080/api/quiz",
      test, {headers: authHeader()}
    ).then(res => {
      if (res.status === 200) {
        history.push("/");
        setLoading(false);
      }
    }).catch(err => {
      console.log(err.message);
      setLoading(false);
    });
  }


  return (
    <div>
      {(!loading) ?
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
              <span
                className={classes.CrossQuestion}
                onClick={() => deleteQuestion(qIndex)}
              />
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
                  <span
                    className={classes.CrossAnswer}
                    onClick={(event) => deleteAnswer(event, qIndex, aIndex)}
                   />
                </div>
              ))}
              <br />
              <div className={classes.ButtonWrapper}>
                <Button
                  onClick={() => {addAnswer(qIndex)}}
                  variant="outline-primary"
                >
                  Add answer
                </Button>
                  <Dropdown className={classes.CustomDropdown}>
                  <Dropdown.Toggle as="a">
                    Complexity: {question.complexity}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item as="button" onClick={() => changeDifficult(qIndex, 1)}>1</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={() => changeDifficult(qIndex, 2)}>2</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={() => changeDifficult(qIndex, 3)}>3 </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          ))}
          <div className={classes.Wrapper}>
            <Button
              variant="outline-primary"
              onClick={addQuestion}
            >
              Add Question
            </Button>
          </div>
          <Button onClick={updateTest}>Confirm</Button>
        </div> :
        <div className={classes.Loading}>
          <ReactLoading type={"spinningBubbles"} color="#000000" />
        </div>
      }
    </div>
  )
}

export default App;
