import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ToastAppBar from '../ToastAppBar';
import { TextField, Typography, Button } from '@material-ui/core';

const styles = {
    content:{
        margin:"10px auto",
        width:"90%",
        maxWidth:"600px",
        textAlign:"left"
    },
    btnContent:{
        margin:"20px auto",
        display:"flex",
        justifyContent:"center"
    },
    submitBtn:{
        width:200
    }
};

class SignupPage extends React.Component{

    state = {
        name:"",
        discription:"",
        waitingContract:false
    }

    tryToSignup = async () => {
        const {name,discription,waitingContract} = this.state;
        if (waitingContract === false){
            if (name !== ""){
                this.setState({waitingContract:true});
                this.props.startLoading();
                await this.props.contract.methods
                        .signUp(name,discription)
                        .send({from:this.props.accounts[0]});
                this.props.updateUserData();
                this.props.history.push("/home");
                this.props.closeLoading();
            } else {
                alert("ユーザー名を入力してください")
            }
        }
    }

    onChangedName = (e) =>{
        this.setState({name:e.target.value});
    }

    onChangedDisc = (e) => {
        this.setState({discription:e.target.value});
    }

    render(){
        return(
            <div>
                <ToastAppBar pageTitle="サインアップ"></ToastAppBar>
                <div className={this.props.classes.content}>
                    <Typography variant="h6" component="h2">新規アカウント情報を登録</Typography>
                </div>
                <div className={this.props.classes.content}>
                    <TextField 
                     label="アカウント名"
                     variant="outlined"
                     value={this.state.name}
                     onChange={this.onChangedName}
                     fullWidth/>
                </div>
                <div className={this.props.classes.content}>
                    <TextField 
                     label="自己紹介"
                     variant="outlined"
                     rows="5"
                     rowsMax="10"
                     value={this.state.discription}
                     onChange={this.onChangedDisc}
                     multiline
                     fullWidth/>
                </div>
                <div className={this.props.classes.btnContent}>
                    <Button variant="contained" color="primary" className={this.props.classes.submitBtn} onClick={this.tryToSignup}>登録</Button>
                </div>
            </div>
        );
    }

}

export default withStyles(styles)(SignupPage);