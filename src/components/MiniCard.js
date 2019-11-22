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
    height:19,
    overflowY:"hidden"
  },
  infoBox:{
    textAlign:"left",
    marginLeft:15,
    marginTop:5
  },
  tokenIcon:{
    height:15,
    width:15
  }
}));

export default function MiniCard(props) {

  const { onClick } = props;
  const classes = useStyles();

  return (
    <div className={classes.root} onClick={props.url?(e)=>{onClick(props.url)}:(e)=>{}}>
      <img src={props.image?props.image:"/img/toast-icon.png"} className={classes.image} alt="thumbnail"/>
      <div>
        <div className={classes.title}>
          {props.title?props.title:""}
        </div>
        <div className={classes.infoBox}>
          <img className={classes.tokenIcon} src="img/jelly.png" alt="Ether"/> {props.jelly?props.jelly:0} jelly
        </div>
      </div>
    </div>
  );
}