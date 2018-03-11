import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import { Done } from 'material-ui-icons';


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
});

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = { todo: props.todo };
  };

  render() {
    const { todo } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <div className={ classes.flexDiv }>
          <Paper elevation={ 4 } style={ { minWidth: 350 } }>
            <h1>{ todo.title }</h1>
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
