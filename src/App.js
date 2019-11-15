import React from 'react';
import './App.css';
import { ThemeProvider,createMuiTheme } from '@material-ui/core/styles';
import HomePage from './components/pages/HomePage';
import ToastPage from './components/pages/ToastPage'
import ViewToastsPage from './components/pages/ViewToastsPage'
import SignupPage from './components/pages/SignupPage';
import TitlePage from './components/pages/TitlePage';
import SearchResultPage from './components/pages/SearchResultPage';
import Loading from './components/Loading';
import UserInfoPage from './components/pages/UserInfoPage';
import { Router,BrowserRouter, Route, Link } from 'react-router-dom'
import ToastsContract from "./contracts/Toasts.json";
import getWeb3 from "./utils/getWeb3";
import getOgp from "./utils/getOgp";
import { withStyles } from '@material-ui/core/styles';
import { createBrowserHistory } from "history";
import { tsThisType } from '@babel/types';

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

const styles = {
  loadingOn:{

  },
  loadingOff:{
    display:"none"
  }
};

class App extends React.Component {

  state = {}

  constructor(props) {
    super(props);
    const history = createBrowserHistory();
    // ここで this.setState() を呼び出さないでください
    this.state = {
      web3:null,
      accounts:null,
      contract:null,
      userData:null,
      loading:true,
      startLoading:this.startLoading,
      closeLoading:this.closeLoading,
      updateUserData:this.updateUserData,
      getOgp:this.getOgpData,
      history:history
    }
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      console.log("success to get web3");
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      console.log("success to get accounts");

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      console.log("success to get networkId "+networkId);
      const deployedNetwork = ToastsContract.networks[networkId];
      const instance = new web3.eth.Contract(
        ToastsContract.abi,
        deployedNetwork && deployedNetwork.address,
      );
      console.log("contract instance is ");
      console.log(instance)

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
    console.log(this.state)
    const { history} = this.state;
    const locationPath = history.location.pathname;
    console.log("this page is "+locationPath);
    await this.updateUserData()
    const userData = this.state.userData
    if (userData[0] === ""){
      history.push("/")
    }
    else if (locationPath === "/signup" || locationPath === "/"){
      history.push("/home")
    }
    this.closeLoading();
  }

  startLoading = () => {
   this.setState({loading:true});
  }
  
  closeLoading = () => {
    this.setState({loading:false});
  }

  updateUserData = async () => {
    const { accounts, contract } = this.state;
    console.log(contract)
    const userData = await contract.methods.getUserData(accounts[0]).call();
    console.log("Success to get UserData");
    console.log(userData);
    this.setState({userData});
  }

  getOgpData = (url) => {
    try{
      const ogp = getOgp(url);
      return ogp
    }
    catch(err){
      return {Result:[]}
    }
  }

  render(){
    const classes = this.props.classes;
    return (
      <ThemeProvider theme={theme}>
        <div className={this.state.loading?classes.loadingOn:classes.loadingOff}>
          <Loading></Loading>
        </div>
        <Router history={this.state.history}>
        <div style={{height:"100%"}}>
          <Route exact path='/' component={TitlePage} />
          <Route exact path='/home' render={() => <HomePage {...this.state}/>} />
          <Route path='/edit' render={()=> <ToastPage {...this.state}/>}/>
          <Route path='/comments' component={ViewToastsPage} />
          <Route path='/signup' render={()=> <SignupPage {...this.state}/>} />
          <Route path='/result' component={SearchResultPage} />
          <Route path='/user' component={UserInfoPage} />
        </div>
      </Router>
    </ThemeProvider>
    );
  }
}

export default withStyles(styles)(App);