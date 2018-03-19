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

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
  flexDiv: {
    display: 'flex',
    justifyContent: 'center',
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
    this.handleChange = this.handleChange.bind(this);
    this.signUp = this.signUp.bind(this);
    this.state = {
      showPassword: false,
      login: '',
      name: '',
      password: '',
    };
  }

  componentDidMount() {
    const { history, user } = this.props;
    if (user) {
      history.push('/');
    }
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  isValidEmail = () => {
    const isValid = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i.test(this.state.login);
    this.setState({ emailError: !isValid });
  };

  isValidPassword = () => {
    const isValid = /.{6,}/.test(this.state.password);
    this.setState({ pwdError: !isValid });
  };

  signUp = () => {
    const { onLogginned, history } = this.props;
    const user = {
      email: this.state.login,
      name: this.state.name,
      password: this.state.password,
    };
    axios.post('/api/user/sign-up', user)
      .then(res => {
        const user = res.data;
        onLogginned(user);
        history.push('/');
      })
      .catch(e => {
        console.error(e);
      });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={ classes.flexDiv }>
        <Paper className={ classes.root } elevation={ 4 } style={ { minWidth: 320 } }>
          <FormControl className={ classes.formControl }>
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
          <FormControl className={ classes.formControl }>
            <InputLabel htmlFor="login">Name</InputLabel>
            <Input
              id="adornment-name"
              type='text'
              value={ this.state.name }
              onChange={ this.handleChange('name') }
            />
          </FormControl>
          <FormControl className={ classes.formControl }>
            <InputLabel htmlFor="login">Password</InputLabel>
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
          </FormControl>
          <br/>
          <Button
            variant="raised"
            id="signup-btn"
            className={ classes.button }
            onClick={ this.signUp }
            disabled={ this.state.pwdError || this.state.emailError }
          >
            Sign up
          </Button>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(LoginForm);
