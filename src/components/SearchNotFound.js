import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign:"center",
    marginTop:50
  }
}));

export default function SearchNotFound(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        情報は見つかりませんでした。
    </div>
  );
}