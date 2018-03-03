import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';

import LoginFrom from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthRouter = (props) => {
  debugger;
  const { onLogginned } = props;
  return (
    <Router>
      <div>
        <Route exact path="/" render={ () => <LoginFrom onLogginned={ onLogginned }/> }/>
        <Route path="/register" component={ RegisterForm }/>
      </div>
    </Router>
  )
};

export default AuthRouter