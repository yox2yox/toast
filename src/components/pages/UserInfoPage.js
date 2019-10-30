import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ToastAppBar from '../ToastAppBar';
import { Typography, Button } from '@material-ui/core';
import UserInfoCard from '../UserInfoCard';
import ToastList from '../ToastList';

const styles = {
    content:{
        margin:"10px auto",
        width:"90%",
        maxWidth:"600px",
        textAlign:"center"
    },
    reputation:{
        fontWeight:"bold",
        marginBottom:10,
        marginTop:20
    },
    btnContent:{
        margin:"10px auto",
    },
    submitBtn:{
        width:200
    }
};

class UserInfoPage extends React.Component{
    render(){
        const classes = this.props.classes
        return(
            <div>
                <ToastAppBar pageTitle="ユーザー"></ToastAppBar>
                <div className={classes.content}>
                    <UserInfoCard
                     discription="ほげほげこんにちは．私は大学で心理学を学びました．信頼できる情報を提供しますのでよろしくお願いします．"
                    />
                </div>
                <div className={classes.content}>
                    <Typography variant="h5" component="h2" className={classes.reputation}>
                        評価額:0.003 eth
                    </Typography>
                </div>
                <div className={classes.btnContent}>
                    <Button variant="contained" color="primary" className={classes.submitBtn}>リセット</Button>
                </div>
                <div className={classes.btnContent}>
                    <ToastList />
                </div>
            </div>
        );
    }

}

export default withStyles(styles)(UserInfoPage);