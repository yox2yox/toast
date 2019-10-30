import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Avatar } from '@material-ui/core';

const useStyles = makeStyles({
  card: {
    width:"100%",
    textAlign:"left"
  },
  cardContent:{
    padding:16
  },
  name: {
      fontWeight:"bold",
      marginLeft:5,
      fontSize:18
  },
  content: {
      display:"flex",
      alignItems: "center",
      textAlign:"left"
  },
  discription:{
      margin:"10px 0"
  }

});

export default function UserInfoCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardContent className={classes.cardContent}>
            <div className={classes.content}>
                <Avatar className={classes.avatar}></Avatar>
                <div className={classes.name}>なまえさん</div>
            </div>
          <Typography variant="body2" component="p" className={classes.discription}>
            {props.discription}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}