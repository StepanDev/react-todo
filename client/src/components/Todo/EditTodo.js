import React, { Component } from 'react';

import {
  Button,
  FormControl,
  Paper,
  IconButton,
  InputLabel,
  Input,
  TextField,
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

const todoItems = {
  content: '',
  completed: false,
};

class EditTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pending: true,
      todo: {
        title: '',
        todoItems: [todoItems],
      },
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
        if (todo) {
          this.setState({ todo, pending: false });
        }
      })
      .catch(e => {
        console.warn(e);
      });
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleItemChange = index => e => {
    const { todo } = cloneDeep(this.state);
    todo.todoItems[index].content = e.target.value;
    this.setState({ todo });
  };

  removeItem = index => () => {
    const { todo } = cloneDeep(this.state);
    todo.todoItems.splice(index, 1);
    this.setState({ todoItems });
  };

  addTodoItem = () => {
    const { todo } = cloneDeep(this.state);
    todo.todoItems.push(todoItems);
    this.setState({ todo });
  };

  saveTodo = () => {
    const { history } = this.props;
    const newTodo = cloneDeep(this.state);
    this.setState({ pending: true });
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
    const { todo } = this.state;
    console.log(this.state);
    console.log(todo);
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
                value={ todo.title }
                onChange={ this.handleChange('title') }
              />
            </FormControl>
            <FormControl className={ classes.formControl }>
              <TextField
                id="date"
                label="Deadline"
                type="date"
                defaultValue={ new Date() }
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
              { todo.todoItems.map((value, index) =>
                <div key={ index }>
                  <FormControl className={ classes.formControl }>
                    <InputLabel htmlFor="login">Title</InputLabel>
                    <Input
                      id="adornment-todo-title"
                      type='text'
                      value={ value.content }
                      onChange={ this.handleItemChange(index) }
                    />
                  </FormControl>
                  <IconButton
                    className={ classes.button }
                    aria-label="Delete"
                    onClick={ this.removeItem(index) }
                  >
                    <DeleteIcon/>
                  </IconButton>
                </div>,
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
