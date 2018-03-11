import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import TodoList from '../components/Todo/TodoList';
import TodoCreate from '../components/Todo/CreateTodo';

const MainRouter = (props) => {
  const { user } = props;
  return (
    <Router>
      <div>
        <Route exact path="/" render={ () => <TodoList user={ user }/> }/>
        <Route path="/todo/create" render={ () => <TodoCreate user={ user }/> }/>
      </div>
    </Router>
  );
};

export default MainRouter;
