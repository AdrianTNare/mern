import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import React from 'react';
import Router from './Router';

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: '#4e42f5'
    }
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          overflow: 'scroll'
        }
      }
    }
  }
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router></Router>
    </ThemeProvider>
  );
};

export default App;
