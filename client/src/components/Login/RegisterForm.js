import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';

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
});

class LoginForm extends Component {
  render() {
    const { classes } = this.props;
    return (<p>Register in TODO app</p>
    );
  }
}

export default withStyles(styles)(LoginForm);
