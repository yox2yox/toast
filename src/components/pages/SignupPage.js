import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ToastAppBar from '../ToastAppBar';
import SearchBox from '../SearchBox';
import ArticleCard from '../AtricleCard';
import { TextField, Typography, Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import AddBoxIcon from '@material-ui/icons/AddBox';
import TagBox from '../TagBox';


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
                    <Button variant="contained" color="primary" className={this.props.classes.submitBtn}>登録</Button>
                </div>
            </div>
        );
    }

}

export default withStyles(styles)(SignupPage);