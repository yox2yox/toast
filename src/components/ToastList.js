import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import CommentCard from './CommentCard';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  item:{
    width:"100%"
  }
}));

export default function ToastList() {
  const classes = useStyles();

  return (
    <List component="nav" className={classes.root} aria-label="mailbox folders">
      <ListItem className={classes.item}>
        <CommentCard good="true"></CommentCard>
      </ListItem>
      <Divider />
      <ListItem>
        <CommentCard></CommentCard>
      </ListItem>
      <Divider />
      <ListItem>
        <CommentCard></CommentCard>
      </ListItem>
      <Divider />
      <ListItem>
        <CommentCard good="true"></CommentCard>
      </ListItem>
      <Divider />
      <ListItem>
        <CommentCard></CommentCard>
      </ListItem>
      <Divider />
    </List>
  );
}