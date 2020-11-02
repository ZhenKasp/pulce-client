import React, { Component, setState } from 'react';
import classes from './UserTest.module.css';
import axios from 'axios';

class UserTest extends Component {
  state = {
    loading: false,
    question: "1 + 1",
    answers: [
      {id: 1, text: '1'},
      {id: 2, text: '2'},
      {id: 3, text: '3'},
      {id: 4, text: '4'}
    ]
  }

  formSubmit = (event) => {
    event.preventDefault();
    this.setState({loading: true});
    const data = new FormData(event.target);
    let object = {};
    data.forEach((value, key) => {object[key] = value});

    try {
      axios.post("localhost:3001", data).then(res => {
        if (res.data.error) {
          alert(res.data.error)
        } else {
          this.setState(
            {
              loading: 'false',
              question: "2 + 2 * 2",
              answers: [
                {id: 1, text: '6'},
                {id: 2, text: '8'},
                {id: 3, text: '10'},
                {id: 4, text: '13'}
              ]
            }
          )
          alert(res.data.message)
        }
      })
    } catch (e) {
      this.setState(
        {
          loading: 'false',
          question: "2 + 2 * 2",
          answers: [
            {id: 1, text: '6'},
            {id: 2, text: '8'},
            {id: 3, text: '10'},
            {id: 4, text: '13'}
          ]
        }
      )
      console.log(e);
    }
  }

  render () {
    return (
      <div>
        <h1>UserTest</h1>
        <button onClick={() => this.props.setView("indexPage")}>
          Go to IndexPage
        </button>
        {console.log(this.state.loading)}
        {(!this.state.loading) ?
          <div className={classes.UserTest}>
            <p className={classes.Question}>this.state.question</p>

            <form onSubmit={(event) => this.formSubmit(event)}>
              {this.state.answers.map(answer =>
                { return (
                  <div key={answer.id}>
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
              <hr />
              <button type="submit">Submit</button>
            </form>
          </div> : <div>loading</div>}
      </div>
    )
  }
}

export default UserTest;
