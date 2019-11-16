import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router";
import ToastAppBar from '../ToastAppBar';
import ArticleCard from '../AtricleCard';
import ToastList from '../ToastList';
import getOgp from '../../utils/getOgp';
import { decodeFromHex } from '../../utils/bytesEncoder';

const styles = {
    root:{
        backgroundColor:"#ebebeb"
    },
    content:{
        margin:"10px auto",
        width:"100%",
        maxWidth:"600px",
        textAlign:"left"
    },
    comment:{
        margin:"10px auto",
        width:"100%",
        maxWidth:"600px",
        textAlign:"left"
    }
}

class ViewToastsPage extends React.Component{

    state = {
        isInit:false,
        urlData:null,
        url:"",
        comments:[],
        staked:0
    }

    componentDidUpdate(){
        const {contract,accounts} = this.props;
        const {isInit} = this.state;
        if (contract&&isInit==false){
            const params = this.props.match.params;
            console.log("get params");
            console.log(params);
            if (params["id"] && !isNaN(params["id"])){
                this.updateArticleData(parseInt(params["id"],10))
                this.setState({isInit:true});
            } else{

            }
        }
    }

    updateArticleData = async (id)=>{
        const {contract,accounts} = this.props;
        try{
            const article = await contract.methods.getArticleInfoFromId(id).call();
            console.log(article)
            const url = decodeFromHex(article[0]);
            const urlData = getOgp(url);
            console.log(urlData);
            this.setState({urlData:urlData.Result});
            if (Object.keys(article).length>=3){
                const comments = [];
                for (let cid of article[1]){
                    try{
                        const comment = await contract.methods.getComment(cid).call();
                        comment[1] = decodeFromHex(comment[1]);
                        const userData = await contract.methods.getUserData(comment[0]).call();
                        userData[0] = decodeFromHex(userData[0]);
                        userData[1] = decodeFromHex(userData[1]);
                        comment[5] = userData;
                        comments.push(comment);
                        console.log(comments);
                    }catch(err){
                        console.error(err)
                    }
                }
                this.setState({url:url,comments:comments,staked:article[2]});
            }

        }catch(err){
            console.error("faield to get article data");
            console.error(err)
        }
    }

    render(){
        const { urlData,staked,comments } = this.state;
        const classes = this.props.classes
        return (
            <div className={classes.root}>
                <ToastAppBar pageTitle="記事"></ToastAppBar>
                <div className={classes.content}>
                    <ArticleCard
                        title={urlData?urlData.title:""}
                        description={urlData?urlData.description:""}
                        image={urlData?urlData.image:""}
                        staked={staked}
                    ></ArticleCard>
                </div>
                <div className={classes.comment}>
                    <ToastList comments={comments}></ToastList>
                </div>
            </div>   
        );
    }
}

export default withRouter(withStyles(styles)(ViewToastsPage));