import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MiniCard from './MiniCard';

const useStyles = makeStyles(theme => ({
    listTitle:{
        fontSize:"18px",
        textAlign:"left"
    },
    cardBox:{
        marginTop:5,
        overflowX:"scroll",
        display:"flex",
        flexDirection: "column",
        flexWrap:"wrap",
        height:110,
        alignContent: "flex-start"
    },
    cardWrap:{
        margin: 5,
    }
}));

export default function HorizontalList(){

    const classes = useStyles();

    return (
        <div>
            <div className={classes.listTitle}>
               ピックしたトースト 
            </div>
            <div className={classes.cardBox}>
                <div className={classes.cardWrap}>
                    <MiniCard></MiniCard>
                </div>
                <div className={classes.cardWrap}>
                    <MiniCard></MiniCard>
                </div>
                <div className={classes.cardWrap}>
                    <MiniCard></MiniCard>
                </div>
                <div className={classes.cardWrap}>
                    <MiniCard></MiniCard>
                </div>
                <div className={classes.cardWrap}>
                    <MiniCard></MiniCard>
                </div>
            </div>
        </div>
    );
}