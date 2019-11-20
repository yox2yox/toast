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

export default function ArticleList(props) {
  const classes = useStyles();

  return (
    <List component="nav" className={classes.root} aria-label="mailbox folders">
      {
        props.searchResults.map((result,index)=>
          <ListItem className={classes.item} key={index}>
            <AtricleCard
              title={result[4].title}
              image={result[4].image}
              description={result[4].description}
              staked={result[2]}
              comments={result[1].length}
              articleId={result[3]}
              onClick={props.onClickArticle}
            />
          </ListItem>
        )
      }
    </List>
  );
}