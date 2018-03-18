import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import axios from 'axios';

import {
  AppBar,
  IconButton,
  Menu,
  Toolbar,
  Typography,
  MenuItem,

} from 'material-ui';
import Link from '../Link';
import AccountCircle from 'material-ui-icons/AccountCircle';

const styles = () => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  linkWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

class CustomAppBar extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleBar = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  logout = () => {
    const { onLogout } = this.props;
    axios.post('/api/user/logout')
      .then(() => {
        onLogout();
        this.handleClose();
      })
      .catch(e => {
        console.error(e);
      });
  };

  navigateTo = link => () => {
    const { history, } = this.props;
    this.handleClose();
    history.push(link);
  };

  render() {
    const { classes, user, } = this.props;
    const { anchorEl } = this.state;
    return (
      <AppBar position="static">
        <Toolbar className={ classes.linkWrapper }>
          { /*{ user && <div>*/ }
          { /*<IconButton*/ }
          { /*id='profile-icon'*/ }
          { /*className={ classes.menuButton }*/ }
          { /*color="inherit"*/ }
          { /*aria-label="Menu"*/ }
          { /*onClick={ this.handleBar }*/ }
          { /*>*/ }
          { /*<MenuIcon/>*/ }
          { /*</IconButton>*/ }
          { /*</div> }*/ }
          <div>
            <Link to='/'>
              <Typography variant="title" color="inherit" className={ classes.flex }>
                ToDo App
              </Typography>
            </Link>
          </div>
          { user &&
          <div>
            <IconButton
              aria-owns={ anchorEl ? 'menu-appbar' : null }
              aria-haspopup="true"
              onClick={ this.handleMenu }
              color="inherit"
              id='profile-icon-2'
            >
              <AccountCircle/>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={ anchorEl }
              anchorOrigin={ {
                vertical: 'top',
                horizontal: 'right',
              } }
              transformOrigin={ {
                vertical: 'top',
                horizontal: 'right',
              } }
              open={ !!anchorEl }
              onClose={ this.handleClose }
            >
              <MenuItem onClick={ this.navigateTo('/profile') }> Profile </MenuItem>
              <MenuItem onClick={ this.navigateTo('/') }>Todo List</MenuItem>
              <MenuItem onClick={ this.logout }>Logout</MenuItem>
            </Menu>
          </div> }
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(CustomAppBar);
