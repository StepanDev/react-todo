import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import LoginFrom from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthRouter = (props) => {
  const { onLogginned } = props;
  return (
    <Router>
      <div>
        <Route exact path="/" render={ () => <LoginFrom onLogginned={ onLogginned }/> }/>
        <Route path="/register" render={
          (props) => < RegisterForm onLogginned={ onLogginned } { ...props }/> }/>
      </div>
    </Router>
  );
};

export default AuthRouter;
