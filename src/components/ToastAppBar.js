import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
  bar: {
    flexGrow: 1,
    marginTop: 0,
    position: "fixed",
    width: "100%",
    zIndex:20
  },
  spacer:{
    height:64
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ToastAppBar(props) {
    const classes = useStyles();
    return (
        <div>
        <AppBar position="static"　className={classes.bar}>
            <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
                {props.pageTitle}
            </Typography>
            <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
        <div className={classes.spacer}></div>
        </div>
    );
}