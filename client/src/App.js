import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import axios from 'axios';

import AuthRouter from './components/Login';
import CustomAppBar from './components/AppBar/AppBar';
import CircularProgressWrapper from './components/Progress/CircularProgressWrapper';
import theme from './config/CreateMuiTheme';
import MainRouter from './config/routes';

class App extends Component {
  constructor() {
    super();
    this.logginned = this.logginned.bind(this);
    this.logouted = this.logouted.bind(this);
    this.state = {
      user: null,
    };
  }

  logginned(user) {
    this.setState({
      user,
    });
  }

  logouted() {
    this.setState({
      user: null,
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
          <CustomAppBar onLogout={ this.logouted } user={ user }/>
          { user
            ? <MainRouter user={ user }/>
            : <AuthRouter onLogginned={ this.logginned }/>
          }
          { this.state.pending && <CircularProgressWrapper/> }
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
