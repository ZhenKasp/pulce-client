import React, { useState, useEffect } from 'react';
import authHeader from "../../../service/auth-header";
import axios from 'axios';
import classes from './App.module.css';
import ReactLoading from 'react-loading';
import { useHistory, useParams } from "react-router-dom";

const Results = () => {
  let history = useHistory();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8080/api/results",
      {headers: authHeader()}
    ).then(res => {
      if (res.status !== 200) {
        alert(res.data.error);
      } else {
        setResults(res.data);
        setLoading(false);

      }
    }).catch(err => {
      history.replace('/signin');
    });
  }, [])

  return (
    <div>
      {(!loading) ?
        <div className={classes.Wrapper}>
          <h1>Results</h1>
          {results.length > 0 ?
            (results.map(test => (
              <div
                key={test.id}
                className={classes.Card}
                onClick={() => history.push('/test_results/' + test.id)}
              >
                <h2>{test.quiz.name}</h2>
                <p>Grade: {test.grade}</p>
                <p>Finished at: {test.endData}</p>
              </div>
            ))) : <p>No results</p>}
        </div> :
      <div className={classes.Loading}>
        <ReactLoading type={"spinningBubbles"} color="#000000" />
      </div>}
    </div>
  );
}

export default Results;
