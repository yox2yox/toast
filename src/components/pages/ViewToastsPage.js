import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router";
import ToastAppBar from '../ToastAppBar';
import ArticleCard from '../AtricleCard';
import ToastList from '../ToastList';
import getOgp from '../../utils/getOgp';
import { decodeFromHex } from '../../utils/bytesEncoder';
import Modal from '@material-ui/core/Modal';
import { Button, FilledInput, InputAdornment, OutlinedInput } from '@material-ui/core';

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
    },
    paper: {
        position: 'absolute',
        width: "90%",
        maxWidth:400,
        backgroundColor: "white",
        border: '1px solid #000',
        padding: 15,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        boxShadow: "10px 10px 10px rgba(0,0,0,0.4)"
    },
    modalTitle:{
        fontSize:20,
        marginBottom:10,
    },
    modalInput:{
        width:"100%"
    },
    modalControlls:{
        marginTop:10,
        display:"flex",
        justifyContent:"center"
    },
    modalBtn:{
        marginRight:10
    }
}

class ViewToastsPage extends React.Component{

    state = {
        isInit:false,
        urlData:null,
        url:"",
        comments:[],
        staked:0,
        modal:false,
        etherSendInput:0,
        targetCommentId:0
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
        const {contract,web3} = this.props;
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
                        comment[2] = decodeFromHex(comment[2]);
                        comment[3] = web3.utils.fromWei(comment[3],'ether')
                        const userData = await contract.methods.getUserData(comment[0]).call();
                        userData[0] = decodeFromHex(userData[0]);
                        userData[1] = decodeFromHex(userData[1]);
                        comment[6] = userData;
                        comments.push(comment);
                        console.log(comments);
                    }catch(err){
                        console.error(err)
                    }
                }
                article[2] = web3.utils.fromWei(article[2],'ether');
                this.setState({url:url,comments:comments,staked:article[2]});
            }

        }catch(err){
            console.error("faield to get article data");
            console.error(err)
        }
    }

    onChangeEther = (e)=>{
        this.setState({etherSendInput:e.target.value});
    }

    openModal = (commentId)=>{
        this.setState({targetCommentId:commentId,modal:true});
    }
    closeModal = ()=>{
        this.setState({modal:false});
    }

    sendEther = async ()=>{
        const { targetCommentId,etherSendInput } = this.state;
        const { contract,accounts,web3 } = this.props;
        console.log(etherSendInput);
        console.log(targetCommentId)
        try{
            await contract.methods.sendEther(targetCommentId).send({from:accounts[0],value:web3.utils.toWei(etherSendInput,'ether')});
            alert("送信完了しました")
            this.closeModal();
        } catch(err){
            console.error(err);
            alert("送信に失敗しました")
        }
    }

    render(){
        const { urlData,staked,comments,modal,etherSendInput } = this.state;
        const classes = this.props.classes
        return (
            <div className={classes.root}>
                <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={modal}
                >
                <div className={classes.paper}>
                    <div className={classes.modalTitle}>Etherを送金</div>
                    <OutlinedInput
                        id="filled-adornment-weight"
                        endAdornment={<InputAdornment position="end">Ether</InputAdornment>}
                        aria-describedby="filled-weight-helper-text"
                        inputProps={{
                        'aria-label': 'ether',
                        }}
                        value={etherSendInput}
                        onChange={this.onChangeEther}
                        className={classes.modalInput}
                        type="number"
                    />
                    <div className={classes.modalControlls}>
                        <Button variant="contained" color="primary" type="button" className={classes.modalBtn} onClick={this.sendEther}>送信</Button>
                        <Button variant="contained" color="secondary" type="button" onClick={this.closeModal}>閉じる</Button>
                    </div>
                </div>
                </Modal>
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
                    <ToastList comments={comments} sendEther={this.openModal}></ToastList>
                </div>
            </div>   
        );
    }
}

export default withRouter(withStyles(styles)(ViewToastsPage));