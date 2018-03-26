import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';

import {
  Button,
  FormControl,
  FormHelperText,
  Paper,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
} from 'material-ui';

import { Visibility, VisibilityOff } from 'material-ui-icons';
import axios from 'axios';
import Link from '../Link';

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
  },
  formControl: {
    width: '75%',
  },
  button: {
    marginTop: 8,
  },
});

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      login: '',
      password: '',
      emailError: false,
      pwdError: false,
      apiError: false,
    };
    this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  isValidEmail = () => {
    const isValid = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i.test(this.state.login);
    this.setState({ emailError: !isValid });
  };

  isValidPassword = () => {
    const isValid = /.{6,}/.test(this.state.password);
    this.setState({ pwdError: !isValid });
  };

  signIn() {
    const { onLogginned } = this.props;
    axios.post('/api/user/login', {
      login: this.state.login,
      password: this.state.password,
    })
      .then((res) => {
        const user = res.data;
        onLogginned(user);
      })
      .catch(e => {
        console.warn(e);
        this.setState({ apiError: true });
      });

  };

  render() {
    const { classes } = this.props;
    return (
      <div className={ classes.flexDiv }>
        <Paper className={ classes.root } elevation={ 4 } style={ { maxWidth: 350 } }>
          <FormControl className={ classes.formControl } error={ this.state.emailError }>
            <InputLabel htmlFor="login">Login</InputLabel>
            <Input
              id="adornment-login"
              type='text'
              value={ this.state.login }
              onChange={ this.handleChange('login') }
              onBlur={ this.isValidEmail }
            />
            { this.state.emailError &&
            <FormHelperText id="name-error-text">Invalid login</FormHelperText> }
          </FormControl>
          <FormControl className={ classes.formControl } error={ this.state.pwdError }>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              id="adornment-password"
              type={ this.state.showPassword ? 'text' : 'password' }
              value={ this.state.password }
              onChange={ this.handleChange('password') }
              onBlur={ this.isValidPassword }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={ this.handleClickShowPassword }
                    onMouseDown={ this.handleMouseDownPassword }
                  >
                    { this.state.showPassword ? <VisibilityOff/> : <Visibility/> }
                  </IconButton>
                </InputAdornment>
              }
            />
            { this.state.pwdError &&
            <FormHelperText id="name-error-text">Invalid password</FormHelperText> }
            { this.state.apiError &&
            <FormHelperText id="name-error-text">Wrong password or login</FormHelperText> }
          </FormControl>
          <div>
            <Button
              id="login-button"
              variant="raised"
              className={ classes.button }
              onClick={ this.signIn }
              disabled={ this.state.pwdError || this.state.emailError }
            >
              Login
            </Button>
            <div>
              <Button
                variant="raised"
                className={ classes.button }
              >
                <Link to='/register' id="register-link">Register</Link>
              </Button>
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(LoginForm);
