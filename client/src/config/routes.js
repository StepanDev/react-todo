import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import TodoList from '../components/Todo/TodoList';

const MainRouter = (props) => {
  const { user } = props;
  return (
    <Router>
      <div>
        <Route exact path="/" render={ () => <TodoList user={ user }/> }/>
        {/*<Route path="/register" render={ () => < RegisterForm onLogginned={ onLogginned }/> }/>*/}
      </div>
    </Router>
  );
};

export default MainRouter;
