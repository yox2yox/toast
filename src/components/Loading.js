import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    container:{
        position: "fixed",
        backgroundColor:'#4AE0C0',
        height:"100%",
        width:"100%",
        zIndex:999,
        display:"flex",
        alignItems: "center",
        justifyContent: "center"
    },
    icon:{
        height:100,
        width:100
    }
}));

export default function ArticleList() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
        <div className={classes.iconContainer}>
            <img src="/img/toast-icon.png" alt="toast" className={classes.icon}/>
        </div>
    </div>
  );
}