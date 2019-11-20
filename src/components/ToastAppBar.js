import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  bar: {
    flexGrow: 1,
    marginTop: 0,
    position: "fixed",
    width: "100%",
    zIndex:20,
    
  },
  toolbar:{
    display:"flex",
    justifyContent:"space-between"
  },
  spacer:{
    height:64
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color:"white",
    fontWeight:"bold",
    fontSize:24
  },
  titleLink:{
    textDecoration: "none",
    display:"flex",
    alignItems:"center"
  },
  icon:{
    weight:28,
    height:28,
    marginRight:5
  },
  iconEdit:{
    color:"white"
  }
}));

export default function ToastAppBar(props) {
    const classes = useStyles();
    return (
        <div>
        <AppBar position="static"　className={classes.bar}>
            <Toolbar className={classes.toolbar}>
            <Link to={props.beforeInit?"/":"/home"} className={classes.titleLink}>
              <img src="/img/toast-icon.png" alt="toast" className={classes.icon}/>
              <Typography variant="h6" className={classes.title}>
                  Toast
              </Typography>
            </Link>
            <Link to={props.beforeInit?"":"/edit"}>
              <EditIcon className={classes.iconEdit}/>
            </Link>
            </Toolbar>
        </AppBar>
        <div className={classes.spacer}></div>
        </div>
    );
}