import React, { Component } from 'react';
import axios from 'axios';
import AddIcon from 'material-ui-icons/Add';
import { Button } from 'material-ui';
import green from 'material-ui/colors/green';
import { withStyles } from 'material-ui/styles';

import Link from '../Link';
import CircularProgressWrapper from '../Progress/CircularProgressWrapper';

import Todo from './Todo';

const styles = theme => ({
  wrapper: {
    marginTop: 16,
  },
  icon: {
    margin: theme.spacing.unit * 2,
  },
  iconHover: {
    margin: theme.spacing.unit * 2,
    '&:hover': {
      color: green[200],
    },
  },
});

class TodoList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      pending: true,
    };
  }

  componentDidMount() {
    this.getTodos();
  }

  getTodos = () => {
    this.setState({
      pending: true,
    });
    axios.get('/api/todo')
      .then(res => {
        const todos = res.data;
        this.setState({
          todos: todos,
          pending: false,
        });
      })
      .catch(e => {
        console.error(e);
        this.setState({
          error: true, pending: false,
        });
      });
  };

  render() {
    const { todos } = this.state;
    const { classes } = this.props;
    return (
      <div className={ classes.wrapper }>
        <div>
          { this.state.pending && <CircularProgressWrapper/> }
        </div>
        { todos.map((value) =>
          <Todo todo={ value } key={ 'todo' + value.id } getTodos={ this.getTodos }/>,
        ) }
        <Link to='/todo/create'>
          <Button
            id='add-todo-item-link'
            variant="fab"
            color="primary"
            aria-label="add"
            className={ classes.button }
          >
            <AddIcon/>
          </Button>
        </Link>
      </div>);
  }
}

export default withStyles(styles)(TodoList);
