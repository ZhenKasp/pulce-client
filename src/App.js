import React, {useEffect, useState} from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Register from "./views/Register";
import Results from "./features/Results";
import Login from "./views/Login";
import Admin from "./views/Admin";
import NotFound from './features/NotFound';
import UserTest from './features/UserTest';
import TestResults from './features/TestResults';
import EditTest from './features/EditTest';
import IndexPage from './features/IndexPage';
import Students from './features/Students';
import Trees from './features/svg/Trees/Trees';
import NavBar from "./views/Navbar"
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from "./context/AuthContext";
import authHeader from "./service/auth-header";
import { useHistory } from "react-router-dom";
import axios from 'axios';

const App = () => {
  const [user, setUser] = useState('');
  let history = useHistory();

  useEffect(() => {
    history.listen((location, action) => {
      console.log(JSON.parse(localStorage.getItem('user')) && !location.pathname.includes('user_test'))
      if (JSON.parse(localStorage.getItem('user')) && !location.pathname.includes('user_test')) {
        axios.get(process.env.REACT_APP_PATH_TO_SERVER + "test",
          {headers: authHeader()}
        ).then(res => {
          if (res.data.quizId) {
            history.replace('/user_test/' + res.data.quizId);
          }
        })
      }
    });

    if (JSON.parse(localStorage.getItem('user'))) {
      axios.get(process.env.REACT_APP_PATH_TO_SERVER + "test",
        {headers: authHeader()}
      ).then(res => {
        if (res.data.quizId) {
          history.replace('/user_test/' + res.data.quizId);
        }
      })
    }
  }, [])

  return (
    <div>
      <div className="Main">
        <AuthContext.Provider value={ {user, setUser} }>
          <NavBar/>
          <Route path="/" exact>
            <IndexPage />
          </Route>
          <Route path="/user_test/:id">
            <UserTest />
          </Route>
          <Route path="/test_results/:id">
            <TestResults />
          </Route>
          <Route path="/edit_test/:id">
            <EditTest />
          </Route>
          <Route path="/students/:id">
            <Students />
          </Route>
          <Route exact path="/results" component={Results}/>
          <Route exact path="/admin" component={Admin}/>
          <Route exact path="/signin" component={Login}/>
          <Route exact path="/signup" component={Register}/>
        </AuthContext.Provider>
      </div>
      <Trees />
    </div>
  );
}

export default App;
