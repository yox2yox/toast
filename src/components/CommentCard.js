import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Button } from '@material-ui/core';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

const useStyles = makeStyles(theme => ({
    root:{
        maxiWdth:"600px"
    },
    avatar: {
        margin: 0,
      },
    row: {
        display:"flex",
        alignItems:"center"
    },
    name: {
        marginLeft: 10,
        fontWeight: "bold"
    },
    reputation: {
        marginTop: 2.5,
        fontWeight: "bold",
        fontSize: 20
    },
    repGood:{
        color: "red",
    },
    repBad:{
        color: "blue",
    },
    message:{
        margin: "5px 0"
    },
    button:{
        padding:"5px 10px"
    },
    btnIcon:{
        marginRight:5
    }
}));

export default function CommentCard(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
        <div className={classes.row}>
            <Avatar className={classes.avatar}></Avatar>
        <div className={classes.name}>{props.name}</div>
        </div>
        <div className={`${classes.reputation} ${props.good?classes.repGood:classes.repBad}`}>
            {props.good?"Good!":"Bad!"}
        </div>
        <div className={classes.message}>
            {props.body}
        </div>
        <div className={classes.row}>
            <Button className={classes.button} onClick={()=>{props.sendEther(props.id);console.log("clicked")}}>
                <CreditCardIcon color="primary" className={classes.btnIcon}/>Etherを送金
            </Button>
            <Button className={classes.button} onClick={()=>{props.sendBad(props.id);console.log("clicked")}}>
                <ThumbDownIcon className={classes.btnIcon}/>低評価
            </Button>
        </div>
    </div>
  );
}