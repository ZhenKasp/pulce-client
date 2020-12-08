import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import classes from './App.module.css'

const App = (props) => {
  const [tests, setTests] = useState([
    { id: 1, name: "1 + 1" },
    { id: 2, name: "2 + 2" },
    { id: 3, name: "3 + 3" },
    { id: 4, name: "4 + 4" },
    { id: 5, name: "5 + 5" },
  ]);

useEffect(()=>{
  try {
      axios.get(process.env.REACT_APP_PATH_TO_SERVER + "tests")
      .then(res => {
        if (res.data.error) {
          props.createFlashMessage(res.data.error, res.data.variant);
        } else {
          setTests(res.data.tests);
        }
      });
    } catch (err) {
      props.createFlashMessage(err.message, "danger");
    }
})

  return (
    <div className={classes.Wrapper}>
      <h1>IndexPage</h1>
        {tests.map(test => (
          <div className={classes.Card} key={test.id}>
            {test.name}
          </div>
        ))}
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    createFlashMessage: (text, variant) => dispatch({
      type: "CREATE_FLASH_MESSAGE",
      text: text,
      variant: variant
    })
  }
}

export default connect(null, mapDispatchToProps)(App);
