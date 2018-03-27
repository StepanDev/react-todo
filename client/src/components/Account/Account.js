import React, { Component } from 'react';

import {
  Button,
  FormControl,
  Paper,
  IconButton,
  InputLabel,
  Input,
} from 'material-ui';
import { Edit } from 'material-ui-icons';
import { withStyles } from 'material-ui/styles';
import axios from 'axios';

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
  disabled: {
    color: 'rgba(0, 0, 0, 0.66)',
  },
  button: {
    marginTop: 16,
    marginLeft: 8,

  },
});

class Account extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editing: true,
      name: props.user.name,
      email: props.user.email,
    };
  };

  handleChange = name => e => {
    this.setState({ [name]: e.target.value });
  };

  handleEdit = () => {
    const { editing } = this.state;
    this.setState({ editing: !editing });
  };

  updateUser = () => {
    const user = {
      name: this.state.name,
      email: this.state.email,
    };

    axios.put('/api/user', user)
      .then(() => {
        this.setState({
          editing: false,
        });
      })
      .catch(e => {
        this.setState({
          error: true,
        });
      })

    // this.setState({ editing: !editing });
  };

  render() {
    const { classes } = this.props;
    const { editing, name, email } = this.state;
    return (
      <div className={ classes.flexDiv }>
        <Paper className={ classes.root } elevation={ 4 }
               style={ { maxWidth: 450, minWidth: 300 } }>
          <IconButton
            className={ classes.button }
            aria-label="Edit"
            onClick={ this.handleEdit }
            id='edit-profile-btn'
          >
            <Edit/>
          </IconButton>
          <div>
            <FormControl className={ classes.formControl }>
              <InputLabel htmlFor="login">Title</InputLabel>
              <Input
                id="adornment-todo-name"
                type='text'
                value={ name }
                onChange={ this.handleChange('name') }
                disabled={ editing }
                classes={ {
                  disabled: classes.disabled,
                } }
              />
            </FormControl>
            <FormControl className={ classes.formControl }>
              <InputLabel htmlFor="login">Title</InputLabel>
              <Input
                id="adornment-todo-email"
                type='text'
                value={ email }
                onChange={ this.handleChange('email') }
                disabled={ editing }
                classes={ {
                  disabled: classes.disabled,
                } }
              />
            </FormControl>
            <div>
              <Button
                variant="raised"
                color="primary"
                className={ classes.button }
                onClick={ this.updateUser }
              >
                Save
              </Button>
              <Button variant="raised" className={ classes.button }>
                Cancel
              </Button>
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Account);
