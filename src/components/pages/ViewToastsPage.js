import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router";
import ToastAppBar from '../ToastAppBar';
import ArticleCard from '../AtricleCard';
import ToastList from '../ToastList';
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
        targetCommentId:0,
        sendingEther:false,
        sendingBad:false
    }

    componentDidMount(){
        const {setInitCallback} = this.props;
        setInitCallback((props)=>{
            const {contract,accounts} = props;
            const {isInit} = this.state;
            if (contract&&isInit===false){
                const params = this.props.match.params;
                console.log("get params");
                console.log(params);
                if (params["id"] && !isNaN(params["id"])){
                    this.updateArticleData(parseInt(params["id"],10))
                    this.setState({isInit:true});
                }
            }
        })
    }

    updateArticleData = async (id)=>{
        const {contract,web3,getOgpData} = this.props;
        try{
            const article = await contract.methods.getArticleInfoFromId(id).call();
            console.log(article)
            const url = decodeFromHex(article[0]);
            const urlData = getOgpData(url);
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
                        comment[7] = userData;
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
        const { sendingEther,targetCommentId,etherSendInput } = this.state;
        const { contract,accounts,web3,updateUserData } = this.props;
        if (sendingEther===false){
            this.setState({sendingEther:true});
            console.log(etherSendInput);
            console.log(targetCommentId)
            try{
                await contract.methods.sendEther(targetCommentId).send({from:accounts[0],value:web3.utils.toWei(etherSendInput,'ether'),gas:2000000});
                alert("送信完了しました")
                this.closeModal();
                updateUserData();
            } catch(err){
                console.error(err);
                alert("送信に失敗しました")
            } finally{
                this.setState({sendingEther:false});
            }
        }
    }

    onClickSendBad = async (commentId)=>{
        const { updateUserData } = this.props;
        await this.setState({targetCommentId:commentId})
        await this.sendBad()
        this.setState({targetCommentId:0})
        updateUserData();
    }

    sendBad = async ()=>{
        const { targetCommentId } = this.state;
        const { contract,accounts } = this.props;
        console.log(targetCommentId)
        try{
            const comment = await contract.methods.getComment(targetCommentId).call();
            const amount = await contract.methods.getStakeAmount(accounts[0],comment[0]).call();
            if (amount>0){
                await contract.methods.resetStake(comment[0]).send({from:accounts[0],gas:2000000});
            }
            alert("低評価しました")
            this.closeModal();
        } catch(err){
            console.error(err);
            alert("低評価に失敗しました")
        }
    }

    render(){
        const { url,urlData,staked,comments,modal,etherSendInput } = this.state;
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
                        comments={comments.length}
                        href={url}
                    ></ArticleCard>
                </div>
                <div className={classes.comment}>
                    <ToastList comments={comments} sendEther={this.openModal} sendBad={this.onClickSendBad}></ToastList>
                </div>
            </div>   
        );
    }
}

export default withRouter(withStyles(styles)(ViewToastsPage));