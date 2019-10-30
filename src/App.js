import React from 'react';
import './App.css';
import { ThemeProvider,createMuiTheme } from '@material-ui/core/styles';
import HomePage from './components/pages/HomePage';
import ToastPage from './components/pages/ToastPage'
import ViewToastsPage from './components/pages/ViewToastsPage'
import SignupPage from './components/pages/SignupPage';
import SearchResultPage from './components/pages/SearchResultPage';
import UserInfoPage from './components/pages/UserInfoPage';
import { BrowserRouter, Route, Link } from 'react-router-dom'

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
      <BrowserRouter>
      <div class="App">
        <Route exact path='/' component={HomePage} />
        <Route path='/edit' component={ToastPage} />
        <Route path='/comments' component={ViewToastsPage} />
        <Route path='/signup' component={SignupPage} />
        <Route path='/result' component={SearchResultPage} />
        <Route path='/user' component={UserInfoPage} />
      </div>
    </BrowserRouter>
  </ThemeProvider>
  );
}

export default App;
