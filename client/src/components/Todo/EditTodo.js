import React, { Component } from 'react';

import {
  Button,
  FormControl,
  Paper,
  IconButton,
  InputLabel,
  Input,
  TextField,
  Checkbox,
} from 'material-ui';

import { withStyles } from 'material-ui/styles';
import AddIcon from 'material-ui-icons/Add';
import axios from 'axios';
import { cloneDeep } from 'lodash';
import DeleteIcon from 'material-ui-icons/Delete';
import CircularProgressWrapper from '../Progress/CircularProgressWrapper';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
  flexDiv: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formControl: {
    width: '75%',
  },
  button: {
    marginTop: 8,
    marginLeft: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

const todoItem = {
  content: '',
  completed: false,
};

const TodoItems = function (props) {
  const { classes, value, toggleItemCheck, handleItemChange, removeItem, index } = props;
  return (
    <div>
      <Checkbox
        checked={ value.completed }
        onChange={ toggleItemCheck }
        value={ index + '.completed' }
        color="primary"
      />
      <FormControl className={ classes.formControl }>
        <InputLabel htmlFor="login">Title</InputLabel>
        <Input
          id="adornment-todo-title"
          type='text'
          value={ value.content }
          onChange={ handleItemChange }
        />
      </FormControl>
      <IconButton
        className={ classes.button }
        aria-label="Delete"
        onClick={ removeItem }
      >
        <DeleteIcon/>
      </IconButton>
    </div>
  );
};

class EditTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      pending: true,
      title: '',
      todoItems: [todoItem],
    };
  }

  componentDidMount() {
    const { match } = this.props;
    axios.get('/api/todo', {
      todoId: match.params.id,
    })
      .then(res => {
        // const todo = res.data;

        const todo = res.data && res.data.length ? res.data[0] : null;
        let newState = {
          pending: false,
        };

        if (todo) {
          newState.id = todo.id;
          newState.title = todo.title;
          newState.todoItems = todo.todoItems;
        }

        this.setState(newState);
      })
      .catch(e => {
        console.warn(e);
      });
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  toggleItemCheck = index => event => {
    const { todoItems } = cloneDeep(this.state);
    todoItems[index].completed = event.target.checked;
    this.setState({ todoItems });
  };

  handleItemChange = index => e => {
    const { todoItems } = cloneDeep(this.state);
    todoItems[index].content = e.target.value;
    this.setState({ todoItems });
  };

  removeItem = index => () => {
    const { todoItems } = cloneDeep(this.state);
    todoItems.splice(index, 1);
    this.setState({ todoItems });
  };

  addTodoItem = () => {
    const { todoItems } = cloneDeep(this.state);
    todoItems.push(todoItem);
    this.setState({ todoItems });
  };

  saveTodo = () => {
    const { history } = this.props;
    const newTodo = cloneDeep(this.state);
    this.setState({ pending: true });
    console.log(newTodo);
    axios.put('/api/todo', newTodo)
      .then(() => {
        this.setState({ pending: false });
        history.push('/');
      })
      .catch(e => {
        console.error(e);
        this.setState({ pending: false });
      });
  };

  render() {
    const { classes } = this.props;
    const { title, todoItems } = this.state;
    return (
      <div>
        <div className={ classes.flexDiv }>
          <Paper className={ classes.root } elevation={ 4 }
                 style={ { minWidth: 350 } }>
            <FormControl className={ classes.formControl }>
              <InputLabel htmlFor="login">Title</InputLabel>
              <Input
                id="adornment-todo-title"
                type='text'
                value={ title }
                onChange={ this.handleChange('title') }
              />
            </FormControl>
            <FormControl className={ classes.formControl }>
              <TextField
                id="date"
                label="Deadline"
                type="date"
                className={ classes.textField }
                InputLabelProps={ {
                  shrink: true,
                } }
              />
            </FormControl>
            <div>
              <h3>
                Add ToDo items
              </h3>
              { todoItems.map((value, index) =>
                <TodoItems
                  key={ index }
                  value={ value }
                  index={ index }
                  classes={ classes }
                  handleItemChange={ this.handleItemChange(index) }
                  toggleItemCheck={ this.toggleItemCheck(index) }
                  removeItem={ this.removeItem(index) }/>,
              ) }
              <Button
                variant="fab"
                color="primary"
                aria-label="add"
                className={ classes.button }
                onClick={ this.addTodoItem }
              >
                <AddIcon/>
              </Button>
            </div>
            <div>
              <Button
                className={ classes.button }
                variant="raised"
                size="small"
                onClick={ this.saveTodo }
              >
                Save
              </Button>
              <Button className={ classes.button } variant="raised" size="small">
                Cancel
              </Button>
            </div>
          </Paper>
        </div>
        { this.state.pending && <CircularProgressWrapper/> }
      </div>
    );
  }
}

export default withStyles(styles)(EditTodo);
