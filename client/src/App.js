import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import axios from 'axios';

import Login from './components/Login/LoginForm';
import AuthRouter from './components/Login';
import CustomAppBar from './components/AppBar/AppBar';
import CircularProgressWrapper from './components/Progress/CircularProgressWrapper';
import theme from './config/CreateMuiTheme';

class App extends Component {
  constructor() {
    super();
    this.logginned = this.logginned.bind(this);
    this.state = {
      logged: 'not',
      user: null,
    };
  }

  logginned(user) {
    this.setState({
      user,
      logged: '',
    });
  }

  componentDidMount() {
    this.setState({ pending: true });
    axios.get('/api/user')
      .then(res => {
        const user = res.data;
        if (user) {
          this.setState({
            user,
            logged: '',
            pending: false,
          });
        }
      })
      .catch((e) => {
        this.setState({
          pending: false,
        });
        console.warn(e);
      });
  }

  render() {
    const { user } = this.state;
    return (
      <div className="App">
        <MuiThemeProvider theme={ theme }>
          { user
            ? <CustomAppBar/>
            : <AuthRouter onLogginned={ this.logginned }/>
          }
          { this.state.pending && <CircularProgressWrapper/> }
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
