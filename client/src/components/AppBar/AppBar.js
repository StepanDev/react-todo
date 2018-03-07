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
import MenuIcon from 'material-ui-icons/Menu';
import AccountCircle from 'material-ui-icons/AccountCircle';

const styles = theme => ({
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
      .then((res) => {
        onLogout();
      })
      .catch(e => {
        console.error(e);
      });
  };

  render() {
    const { classes, user } = this.props;
    const { anchorEl } = this.state;
    return (
      <AppBar position="static">
        <Toolbar>
          { user && <div>
            <IconButton
              className={ classes.menuButton }
              color="inherit"
              aria-label="Menu"
              onClick={ this.handleBar }
            >
              <MenuIcon/>
            </IconButton>
          </div> }
          <Typography variant="title" color="inherit" className={ classes.flex }>
            ToDo App
          </Typography>
          { user &&
          <div>
            <IconButton
              aria-owns={ anchorEl ? 'menu-appbar' : null }
              aria-haspopup="true"
              onClick={ this.handleMenu }
              color="inherit"
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
              <MenuItem onClick={ this.handleClose }>Profile</MenuItem>
              <MenuItem onClick={ this.handleClose }>My account</MenuItem>
              <MenuItem onClick={ this.logout }>Logout</MenuItem>
            </Menu>


          </div> }
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(CustomAppBar);
