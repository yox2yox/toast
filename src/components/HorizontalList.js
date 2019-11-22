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

export default function HorizontalList(props){

    const { articles,onClick } = props
    const classes = useStyles();

    return (
        <div>
            <div className={classes.listTitle}>
               リクエスト一覧
            </div>
            <div className={classes.cardBox}>
                {
                    articles?
                    articles.map((data,index)=>
                        <div className={classes.cardWrap} key={index}>
                            <MiniCard {...data} onClick={onClick}></MiniCard>
                        </div>
                    ):
                    ""
                }
            </div>
        </div>
    );
}