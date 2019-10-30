import React from 'react';
import './App.css';
import { ThemeProvider,createMuiTheme } from '@material-ui/core/styles';
import HomePage from './components/pages/HomePage';
import ToastPage from './components/pages/ToastPage'
import ViewToastsPage from './components/pages/ViewToastsPage'
import SignupPage from './components/pages/SignupPage';
import SearchResultPage from './components/pages/SearchResultPage';
import UserInfoPage from './components/pages/UserInfoPage';

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
          <HomePage />
          <ToastPage />
          <ViewToastsPage />
          <SignupPage />
          <SearchResultPage />
        </div>
        <UserInfoPage />
      </div>
    </ThemeProvider>
  );
}

export default App;
