import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import AtricleCard from './AtricleCard';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    padding:0
  },
  item:{
    width:"100%",
    padding:0
  }
}));

export default function ArticleList() {
  const classes = useStyles();

  return (
    <List component="nav" className={classes.root} aria-label="mailbox folders">
      <ListItem className={classes.item}>
        <AtricleCard/>
      </ListItem>
      <ListItem className={classes.item}>
        <AtricleCard/>
      </ListItem>
      <ListItem className={classes.item}>
        <AtricleCard/>
      </ListItem>
      <ListItem className={classes.item}>
        <AtricleCard/>
      </ListItem>
      <ListItem className={classes.item}>
        <AtricleCard/>
      </ListItem>
      <ListItem className={classes.item}>
        <AtricleCard/>
      </ListItem>
      <ListItem className={classes.item}>
        <AtricleCard/>
      </ListItem>
    </List>
  );
}