import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ThemeProvider,createMuiTheme } from '@material-ui/core/styles';
import HomePage from './components/pages/HomePage';
import ToastPage from './components/pages/ToastPage'

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
        <div style={{display:"none"}}>
          <HomePage></HomePage>
        </div>
        <ToastPage></ToastPage>
      </div>
    </ThemeProvider>
  );
}

export default App;
