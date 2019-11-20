import React from 'react';
import ToastAppBar from '../ToastAppBar';
import KeyWordSearchBox from '../KeyWordSearchBox';
import { withStyles } from '@material-ui/core/styles';
import TokenInfoBox from '../TokenInfoBox';
import HorizontalList from '../HorizontalList';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom'

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
    }

    componentDidMount = () => {
        console.log("called HomePage. And got these props");
        console.log(this.props)
    }

    withdraw = async ()=>{
        const { contract,accounts,startLoading,closeLoading,updateUserData } = this.props
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

    render(){
        const { classes } = this.props
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
                <HorizontalList></HorizontalList>
            </div>
        </div>
        );
    }
}

export default withStyles(styles)(HomePage);