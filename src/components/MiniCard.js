import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display:"flex"
  },
  image:{
    width: 72,
    height:45,
  },
  title:{
    fontSize:15,
    marginLeft:10,
    marginRight:10,
    width:200,
    height:45,
    overflowY:"hidden"
  }
}));

export default function MiniCard() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img src="img/test_thumb.jpg" className={classes.image} alt="thumbnail"/>
      <div className={classes.title}>
        タイトルですああああああああああああああああああああああああああああああああああああ
      </div>
    </div>
  );
}