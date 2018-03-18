import React, { Component } from 'react';
import { withStyles, IconButton } from 'material-ui';
import { Delete, Edit, Done } from 'material-ui-icons';
import axios from 'axios';

import Link from '../Link';

import {
  Paper,
} from 'material-ui';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
  flexDiv: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  formControl: {
    width: '75%',
  },
  itemsWrapper: {
    display: 'flex',
  },
  editBtn: {
    right: 0,
    position: 'absolute',
    top: '0',
  },
  deleteBtn: {
    bottom: 0,
    position: 'absolute',
    right: '0',
  },
  paperBlock: {
    position: 'relative',
  },
});

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = { todo: props.todo };
  };

  deleteTodo = () => {
    const { getTodos } = this.props;
    const { todo } = this.state;
    axios.delete('/api/todo',
      {
        params: {
          todoId: todo.id,
        },
      })
      .then((r) => {
        console.log(r);
        getTodos();
      })
      .catch(e => {
        console.error(e);
      });
  };

  render() {
    const { todo } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <div className={ classes.flexDiv }>
          <Paper className={ classes.paperBlock } elevation={ 4 } style={ { minWidth: 350 } }>
            <h1>{ todo.title }</h1>
            <div className={ classes.editBtn }>
              <Link to={ `todo/${todo.id}` }>
                <IconButton className={ classes.button } aria-label="Edit"
                            onClick={ this.handleEdit }>
                  <Edit/>
                </IconButton>
              </Link>
            </div>
            <div className={ classes.deleteBtn }>
              <IconButton className={ classes.button } aria-label="Delete"
                          onClick={ this.deleteTodo }>
                <Delete/>
              </IconButton>
            </div>
            <div className={ classes }>
              <ul>
                { todo.todoItems.map((value) =>
                  <li key={ value.id }>
                    { value.content }
                    <span>
                    { value.completed ? <Done/> : <span>Undone</span> }
                    </span>
                  </li>,
                ) }
              </ul>
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Todo);
