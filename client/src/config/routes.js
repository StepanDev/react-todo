import React from 'react';
import { Route } from 'react-router-dom';

import TodoList from '../components/Todo/TodoList';
import TodoCreate from '../components/Todo/CreateTodo';
import Profile from '../components/Account/Account';

const MainRouter = (props) => {
  const { user } = props;
  return (
    <div>
      <Route exact path="/" render={ (props) => <TodoList user={ user } { ...props }/> }/>
      <Route path="/todo/create" render={ (props) => <TodoCreate user={ user } { ...props }/> }/>
      <Route path="/todo/:id/edit" render={ (props) => <TodoCreate user={ user } { ...props }/> }/>
      <Route path="/profile" render={ (props) => <Profile user={ user } { ...props }/> }/>
    </div>
  );
};

export default MainRouter;
