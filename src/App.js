import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import SignIn from './features/Authorisation/SignIn';
import SignUp from './features/Authorisation/SignUp';
import NotFound from './features/NotFound';
import UserTest from './features/UserTest';
import TestResults from './features/TestResults';
import EditTest from './features/EditTest';
import IndexPage from './features/IndexPage';

const App = () => {
  return (
    <Router>
      <Switch>
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
        <Route path="/signin">
          <SignIn />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
