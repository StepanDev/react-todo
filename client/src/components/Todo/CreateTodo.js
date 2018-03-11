import React, { Component } from 'react';

import {
  Button,
  FormControl,
  Paper,
  InputLabel,
  Input,
} from 'material-ui';
import { withStyles } from 'material-ui/styles';
import AddIcon from 'material-ui-icons/Add';
import axios from 'axios';
import _ from 'lodash';


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
});

const todoItem = {
  content: '',
  completed: false,
};

class CreateTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoItems: [todoItem],
    };
  }

  // componentDidMount() {
  //
  // }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleItemChange = index => event => {
    const { todoItems } = this.state;

    // this.setState({ [prop]: event.target.value });
  };

  addTodoItem = () => {
    const { todoItems } = _.cloneDeep(this.state);
    todoItems.push(todoItem);
    this.setState({ todoItems });
  };

  saveTodo = () => {
    const { newTodo } = this.state;
    axios.post('/api/todo')
      .then(res => {
        const createdTodo = res.data;

      })
      .catch(e => {

      })
  };

  render() {
    const { classes } = this.props;
    const { todoItems } = this.state;
    return (

      <div className={ classes.flexDiv }>
        <Paper className={ classes.root } elevation={ 4 }
               style={ { minWidth: 350 } }>
          <FormControl className={ classes.formControl }>
            <InputLabel htmlFor="login">Title</InputLabel>
            <Input
              id="adornment-todo-title"
              type='text'
              value={ this.state.title }
              onChange={ this.handleChange('title') }
            />
          </FormControl>

          <div>
            { todoItems.map((value) =>
              <FormControl className={ classes.formControl }>
                <InputLabel htmlFor="login">Title</InputLabel>
                <Input
                  id="adornment-todo-title"
                  type='text'
                  value={ value.content }
                  onChange={ this.handleItemChange('title') }
                />
              </FormControl>,
            ) }
          </div>
          <Button
            variant="fab"
            color="primary"
            aria-label="add"
            className={ classes.button }
            onClick={ this.addTodoItem }
          >
            <AddIcon/>
          </Button>
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
    );
  }
}

export default withStyles(styles)(CreateTodo);
