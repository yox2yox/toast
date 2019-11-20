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
import { decodeFromHex, encodeToBytes } from './utils/bytesEncoder';
import _ from 'lodash';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4AE0C0',
      contrastText: '#000',
    },
    secondary: {
      main: '#f44336',
    },
    white:{
      main: "#ffffff"
    }
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
      onClickArticle:this.onClickArticle,
      getOgpData:this.getOgpData,
      history:history,
      reputation:{},
      searchResults:[],
      initCallbacks:[],
      setInitCallback:this.setInitCallback,
      searchOnBase:this.searchOnBase
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
      console.log(web3.eth)
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
    const { history } = this.state;
    const locationPath = history.location.pathname;
    console.log("this page is "+locationPath);
    await this.updateUserData()
    const userData = this.state.userData
    if (userData[0] === null || userData[0] === ""){
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
    const { accounts, contract,web3,initCallbacks } = this.state;
    console.log(contract)
    const userData = await contract.methods.getUserData(accounts[0]).call();
    console.log("Success to get UserData");
    userData[0] = decodeFromHex(userData[0]);
    userData[1] = decodeFromHex(userData[1]);
    const balance = await web3.eth.getBalance(accounts[0]);
    const remote = userData[2];
    const base = 100
    userData[2] = Math.round(parseFloat(web3.utils.fromWei(balance,'ether')) * base) / base;
    console.log(remote)
    if (remote>0){
      userData[2] = "* "+userData[2];
    }
    console.log(userData);
    this.setState({userData});
    try{
      const article = await contract.methods.getComment(1).call();
      console.log(article)
      await this.getReputation();
      for (let call of initCallbacks){
        call(this.state);
      }
    } catch(err){
      console.error("failed to get comment")
    }
  }

  getOgpData = (url) => {
    try{
      const ogp = getOgp(url);
      console.log("success to get ogp")
      console.log(ogp)
      return ogp
    }
    catch(err){
      return {Result:{title:"",image:"",description:""}}
    }
  }

  getReputation = async ()=>{
    const {contract,accounts,web3} = this.state;
    const stakes = await contract.methods.getStakes(accounts[0]).call();
    let reputation = {}
    console.log(stakes)
    let sum = 0;
    for (let i=0;i<Object.keys(stakes[0]).length;i++){
      sum += parseFloat(web3.utils.fromWei(stakes[1][i],'ether'))
    }
    for (let i=0;i<Object.keys(stakes[0]).length;i++){
      reputation[stakes[0][i]] = parseFloat(web3.utils.fromWei(stakes[1][i],'ether'))/sum
    }
    let exception = []
    console.log(reputation)
    for (let i=0;i<5;i++){
      reputation = await this.updateReputation(reputation,stakes[0],exception);
      exception = _.union(exception,stakes[0]);
    }
    console.log(reputation)
    this.setState({reputation:reputation});
  }

  updateReputation = async (reputation,addresses,exception)=>{
    const { contract,web3 } = this.state;
    const reputationSum = {};
    for (let i=0;i<Object.keys(addresses).length;i++){
      if (exception.indexOf(addresses[i])<0){
        const stakes = await contract.methods.getStakes(addresses[i]).call();
        let stakeLength = Object.keys(stakes[0]).length;
        if (stakeLength>10){
          stakeLength=10
        }
        let sum = 0;
        for (let i=0;i<stakeLength;i++){
          sum += parseFloat(web3.utils.fromWei(stakes[1][i],'ether'))
        }
        for (let i=0;i<stakeLength;i++){
          if (reputation[stakes[0][i]]){
            if (!reputationSum[stakes[0][i]]){
              reputationSum[stakes[0][i]] = 0
            }
            reputationSum[stakes[0][i]] += reputation[stakes[0][i]] * (parseFloat(web3.utils.fromWei(stakes[1][i],'ether'))/sum);
          }
        }
      }
    }
    for (let key in reputation){
      if (!reputationSum[key]){
        reputationSum[key] = reputation[key];
      }
    }
    return reputationSum
  }

  searchOnBase = async (tags)=>{
    const { history } = this.state;
    const articles = await this.search(tags);
    this.setState({searchResults:articles});
    history.push("/result");
  }

  search = async (tags)=>{
    const { contract,reputation,web3 } = this.state
    let articleResult = {};
    const articlesData = [];
    console.log(tags)
    for (let tag of tags){
      try{
        const resultTemp = {};
        const tagbyte = encodeToBytes(tag);
        console.log(tagbyte)
        const tagid = await contract.methods.getTagId(tagbyte).call();
        const tagrtn = await contract.methods.getTag(tagid).call();
        console.log(tagrtn);
        const comments = await contract.methods.getCommentsFromTag(tagbyte).call();
        console.log("success to get comments of tag '"+tag+"'")
        console.log(comments);
        for (let key in comments){
          try{
            console.log(parseInt(comments[key]))
            const commentData = await contract.methods.getComment(parseInt(comments[key])).call();
            console.log(commentData)
            const article_id = commentData[6];
            const author = commentData[0];
            console.log(reputation);
            if (reputation[author]){
              if (!articleResult[article_id]){
                articleResult[article_id] = 0
              }
              if (!resultTemp[article_id]){
                resultTemp[article_id] = articleResult[article_id]
              }
              resultTemp[article_id] += reputation[author];
            }
          } catch(err){
            console.error("failed to get comment data");
            console.error(err);
          }
        }
        articleResult = resultTemp;
      } catch(err){
        console.error("failed to get searchinfo");
        console.error(err);
      }
    }
    var keys=[];
    for(var key in articleResult)keys.push(key);
    console.log(articleResult);
    keys.sort((a,b)=>{
      return articleResult[b]-articleResult[a]
    })
    console.log(keys)
    for (let key of keys){
      try{
        const article = await contract.methods.getArticleInfoFromId(key).call();
        article[0] = decodeFromHex(article[0])
        article[2] = web3.utils.fromWei(article[2],'ether')
        article[3] = key;
        const ogp = this.getOgpData(article[0]);
        article[4] = ogp["Result"];
        console.log(article[4])
        articlesData.push(article);
      }catch(err){
        console.error("failed to get article data")
        console.error(err)
      }
    }
    console.log(articlesData)
    return articlesData
  }

  setInitCallback = (callback)=>{
    const { contract,accounts,web3,initCallbacks } = this.state;
    if (contract&&accounts&&web3){
      callback(this.state);
    } else {
      initCallbacks.push(callback);
      this.setState({initCallbacks:initCallbacks});
    }
  }

  onClickArticle = (articleId)=>{
    const { history } = this.state;
    history.push("/comments/"+articleId);
    this.setState({initCommentPage:true},()=>console.log(this.state))
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
          <Route path='/comments/:id' render={()=> <ViewToastsPage {...this.state}/>} />
          <Route path='/signup' render={()=> <SignupPage {...this.state}/>} />
          <Route path='/result' render={()=><SearchResultPage {...this.state}/>} />
          <Route path='/user' component={UserInfoPage} />
        </div>
      </Router>
    </ThemeProvider>
    );
  }
}

export default withStyles(styles)(App);