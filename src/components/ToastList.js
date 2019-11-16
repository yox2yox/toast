import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
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

export default function ToastList(props) {
  const {comments,sendEther} = props;
  const classes = useStyles();

  return (
    <List component="nav" className={classes.root} aria-label="mailbox folders">
      {
        comments.map((com,index)=>{
          return (
          <ListItem className={classes.item} key={index}>
            <CommentCard body={com[2]} name={com[6][0]} good={com[4]} id={com[5]} sendEther={sendEther}></CommentCard>
          </ListItem>
        )
        })
      }
    </List>
  );
}