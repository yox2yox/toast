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
    },
    submitBtn:{
        width:200
    }
};

class SignupPage extends React.Component{

    tryToSignup = () => {
        console.log(this.props)
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
                     fullWidth/>
                </div>
                <div className={this.props.classes.content}>
                    <TextField 
                     label="自己紹介"
                     variant="outlined"
                     rows="5"
                     rowsMax="10"
                     multiline
                     fullWidth/>
                </div>
                <div className={this.props.classes.btnContent}>
                    <Button variant="contained" color="primary" className={this.props.classes.submitBtn} onClick={this.tryToSignup()}>登録</Button>
                </div>
            </div>
        );
    }

}

export default withStyles(styles)(SignupPage);