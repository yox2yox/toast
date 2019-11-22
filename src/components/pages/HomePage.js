import React from 'react';
import ToastAppBar from '../ToastAppBar';
import KeyWordSearchBox from '../KeyWordSearchBox';
import { withStyles } from '@material-ui/core/styles';
import TokenInfoBox from '../TokenInfoBox';
import HorizontalList from '../HorizontalList';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom'
import { decodeFromHex } from '../../utils/bytesEncoder';
import getOgp from '../../utils/getOgp';

const styles = {
    container:{
        textAlign:"center"
    },
    searchBox:{
        display:"inline-block",
        margin:"10px auto",
        width:"90%",
        maxWidth:"400px",
    },
    holList:{
        padding:"0 10px",
        margin:"15px 0"
    },
    fab: {
        position: 'absolute',
        bottom: 25,
        right: 25,
      },
}

class HomePage extends React.Component{

    state = {
        searchWord:"",
        requests:null
    }

    componentDidMount = () => {
        console.log("called HomePage. And got these props");
        console.log(this.props)
        const { setInitCallback } = this.props;
        setInitCallback(this.getReqeustsInfo);
    }

    withdraw = async ()=>{
        const { contract,accounts,startLoading,closeLoading,updateUserData,userData } = this.props
        if (userData[4]){
            startLoading();
            try{
                await contract.methods.withdraw().send({from:accounts[0],gas:2000000});
                updateUserData();
            } catch(err){
                alert("残高の更新に失敗しました");
                console.error(err);
            }
            closeLoading();
        }
    }

    getReqeustsInfo = async ()=>{
        const { contract,getOgpData,web3 } = this.props
        try{
            let requestsJelly = await contract.methods.getRequestsJelly().call();
            let requests = []
            let i = 4;

            for (let jelly of requestsJelly){
                const urlbytes = await contract.methods.getRequestUrl(i).call();
                const url = decodeFromHex(urlbytes);
                const ogpData = getOgpData(url)["Result"]
                const jellyEther = web3.utils.fromWei(jelly,'ether')
                requests.push({jelly:jellyEther,url:url,title:ogpData["title"],image:ogpData["image"]});
                i++;
                if(i>5){
                    break;
                }
            }
            requests.sort((a,b)=>{
                return parseFloat(b.jelly) - parseFloat(a.jelly)
            })
            console.log(requests);
            this.setState({requests:requests})
        } catch(err){
            console.error(err);
        }
    }

    render(){
        const { requests } = this.state 
        const { classes,openEditUrl } = this.props
        return(
        <div className={classes.container}>
            <ToastAppBar pageTitle="ホーム"></ToastAppBar>
            <div>
                <div className={classes.searchBox}>
                    <KeyWordSearchBox placeholder="検索" searchOnBase={this.props.searchOnBase}></KeyWordSearchBox>
                </div>
            </div>
            <div>
                <div className={classes.searchBox}>
                    <TokenInfoBox userData={this.props.userData} onClickUpdate={this.withdraw}></TokenInfoBox>
                </div>
            </div>        
            <div className={classes.holList}>
                <HorizontalList articles={requests} onClick={openEditUrl}></HorizontalList>
            </div>
        </div>
        );
    }
}

export default withStyles(styles)(HomePage);