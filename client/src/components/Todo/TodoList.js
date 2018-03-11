import React, { Component } from 'react';
import axios from 'axios';
import AddIcon from 'material-ui-icons/Add';
import { Button } from 'material-ui';
import green from 'material-ui/colors/green';

import { withStyles } from 'material-ui/styles';
import Link from '../Link';

import Todo from './Todo';

const styles = theme => ({
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
    this.state = { todos: [] };
  }

  componentDidMount() {
    axios.get('/api/todo')
      .then(res => {
        const todos = res.data;
        this.setState({ todos: todos });
      })
      .catch(e => {
        console.error(e);
        this.setState({ error: true });
      });
  }

  render() {
    const { todos } = this.state;
    const { classes } = this.props;
    return (
      <div>
        { todos.map((value) =>
          <Todo todo={ value } key={ value.id }/>,
        ) }
        <Button
          variant="fab"
          color="primary"
          aria-label="add"
          className={ classes.button }
        >
          <Link to='/todo/create'>
            <AddIcon/>
          </Link>
        </Button>
      </div>);
  }
}

export default withStyles(styles)(TodoList);
