import {
  createMuiTheme, CssBaseline, ThemeProvider as MuiThemeProvider
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#006DB3",
    }
  },
});

const ThemeProvider = ({ children }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ThemeProvider;
