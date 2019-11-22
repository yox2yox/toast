import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    userNameWrap:{
        textAlign:"left",
        marginBottom:"10px",
        fontSize:"18px"
    },
    userName:{
        fontWeight: "bold",
        paddingLeft:"5px"
    },
    tokenIcon:{
        height:"22px",
        width:"22px",
        marginRight:"7px"
    },
    tokenBox:{
        display:"inline-block",
        fontSize:"22px",
        width:"50%"
    },
    tokenRight:{
        display:"inline-block",
        fontSize:"22px",
        width:"50%"
    },
    etherButton:{
        marginTop:"10px",
    },
    btnLink:{
        textDecoration:"none"
    }
}));

export default function TokenInfoBox(props){
    const classes = useStyles();
    const {userData,onClickUpdate} = props;
    console.log("called TokenInfoBox Component.And got these props")
    console.log(props)

    return(
        <div>
            <div className={classes.userNameWrap}>
            <span className={classes.userName}>{userData!=null?userData[0]:""}</span> さん
            </div>
            <div className={classes.tokenBox}>
                <img className={classes.tokenIcon} src="img/ether.png" alt="Ether"/>
                {userData!=null?userData[2]:""} ether
            </div>
            <div className={classes.tokenRight}>
                <img className={classes.tokenIcon} src="img/jelly.png" alt="Ether"/>
                {userData!=null?userData[3]:""} jelly
            </div>
            <div className={classes.tokenBox}>
                <Button variant="contained" color="primary" className={classes.etherButton} onClick={onClickUpdate}>
                    更新
                </Button>
            </div>
            <div className={classes.tokenBox}>
                <Link to="/request" className={classes.btnLink}>
                    <Button variant="contained" color="secondary" className={classes.etherButton}>
                        リクエスト
                    </Button>
                </Link>
            </div>
        </div>
    );
}