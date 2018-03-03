
import { createMuiTheme } from 'material-ui/styles'

import teal from 'material-ui/colors/teal'
import red from 'material-ui/colors/red'

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      light: teal[300],
      main: '#2196f3',
      dark: teal[700]
    },
    error: red
  },
  drawerWidth: 250,
  overrides: {
    MuiButton: {
      raisedPrimary: {
        color: 'white',
      },
    },
  },
});

export default theme