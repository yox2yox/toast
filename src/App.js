import React from 'react';
import logo from './logo.svg';
import './App.css';
import ToastAppBar from './component/ToastAppBar';
import { ThemeProvider,createMuiTheme } from '@material-ui/core/styles';
import HomePage from './component/HomePage';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4AE0C0',
      contrastText: '#000',
    },
    secondary: {
      main: '#f44336',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <HomePage></HomePage>
      </div>
    </ThemeProvider>
  );
}

export default App;
