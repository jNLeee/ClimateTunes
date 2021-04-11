import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import Dashboard from "./Containers/Dashboard";
import Login from "./Containers/Login";
import './App.css';


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path={"/"} component={Login} />
          <Route path={"/Dashboard"} component={Dashboard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;