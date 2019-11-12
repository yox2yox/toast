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
import ToastsContract from "./contracts/Toasts.json";
import getWeb3 from "./utils/getWeb3";

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

class App extends React.Component {

  state = {
    web3:null,
    accounts:null,
    contract:null
  }
  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      console.log(networkId);
      const deployedNetwork = ToastsContract.networks[networkId];
      const instance = new web3.eth.Contract(
        ToastsContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.initData);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  initData = async () => {
    const { accounts, contract } = this.state;
    let userData = await contract.methods.getUserData(accounts[0]).call();
    console.log("Success to get UserData");
    console.log(userData);
    if (userData[0] === ""){
      await contract.methods.signUp("hoge","fuga").send({from:accounts[0]});
      userData = await contract.methods.getUserData(accounts[0]).call();
      console.log("Success to get UserData");
      console.log(userData);
    }
  }

  render(){
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
}

export default App;
