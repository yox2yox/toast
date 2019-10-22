import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles({
  card: {
      maxwidth:400,
      textAlign:"left"
  },
  media: {
      width:108,
      height:67.5,
      marginRight:10,
      marginBottom:10
  },
  content: {
      display:"flex",
      alignItems: "center",
      textAlign:"left"
  },
  title: {
    overflow: "hidden",
    maxHeight:77.5,
    fontWeight:"bold",
    fontSize:16
  },
  etherIcon:{
    width:20,
    height:20,
    marginRight:5,
  },
  fonticon: {
    fontSize:20,
    marginRight:10
  },
  articleInfoBox:{
    display:"flex",
    alignItems: "center",
    textAlign:"left",
    marginTop:10,
    justifyContent: "space-around"
  },
  infoContent:{
    display:"flex",
    alignItems: "center",
    textAlign:"left",
  }
});

export default function AtricleCard() {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardContent>
            <div className={classes.content}>
                <CardMedia
                className={classes.media}
                component="img"
                alt="Contemplative Reptile"
                image="img/test_thumb.jpg"
                title="Contemplative Reptile"
                />
                <Typography gutterBottom component="h2" className={classes.title}>
                    ものすごいあれが発見される。非常に興味深い。
                </Typography>
            </div>
          <Typography variant="body2" color="textSecondary" component="p">
              本文
          </Typography>
          <div className={classes.articleInfoBox}>
            <div className={classes.infoContent}>
                <img src="img/ether.png" alt="ether" className={classes.etherIcon}/>
                <Typography variant="subtitle1" component="h2">
                    23,000 ehter
                </Typography>
            </div>
            <div className={classes.infoContent}>
                <Icon color="secondary" className={classes.fonticon}>comment</Icon>
                <Typography variant="subtitle1" component="h2">
                    2,300 comment
                </Typography>
            </div>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}