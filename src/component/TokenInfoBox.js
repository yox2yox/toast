import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

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
        marginTop:"10px"
    }
}));

export default function TokenInfoBox(){
    const classes = useStyles();

    return(
        <div>
            <div className={classes.userNameWrap}>
                <span className={classes.userName}>グッドマン</span> さん
            </div>
            <div className={classes.tokenBox}>
                <img className={classes.tokenIcon} src="img/ether.png" alt="Ether"/>
                0.02 ether
            </div>
            <div className={classes.tokenRight}>
                <img className={classes.tokenIcon} src="img/jelly.png" alt="Ether"/>
                400 jelly
            </div>
            <div className={classes.tokenBox}>
                <Button variant="contained" color="primary" className={classes.etherButton}>
                    引き出す
                </Button>
            </div>
            <div className={classes.tokenBox}>
            </div>
        </div>
    );
}