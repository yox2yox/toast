import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles({
  card: {
    width:"100%",
    textAlign:"left"
  },
  cardContent:{
    padding:16
  },
  media: {
      width:108,
      height:67.5,
      marginRight:10,
      marginBottom:10
  },
  content: {
      display:"flex",
      alignItems: "flex-start",
      textAlign:"left"
  },
  title: {
    overflow: "hidden",
    /*maxHeight:77.5,*/
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
    justifyContent: "space-around",
    marginTop:10
  },
  infoContent:{
    display:"flex",
    alignItems: "center",
    textAlign:"left",
  },
  link:{
    textDecoration:"none"
  }
});

export default function AtricleCard(props) {
  const classes = useStyles();

  return (
    <a href={props.href} target="_blank" rel="noopener noreferrer" className={classes.link}>
    <Card className={classes.card} onClick={props.onClick?()=>props.onClick(props.articleId):()=>{}}>
      <CardActionArea>
        <CardContent className={classes.cardContent}>
            <div className={classes.content}>
                <CardMedia
                className={classes.media}
                component="img"
                alt="Contemplative Reptile"
                image={props.image?props.image:"/img/toast-icon.png"}
                title="Contemplative Reptile"
                />
                <Typography gutterBottom component="h2" className={classes.title}>
                    {props.title}
                </Typography>
            </div>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.description}
          </Typography>
          <div className={classes.articleInfoBox}>
            <div className={classes.infoContent}>
                <img src="/img/ether.png" alt="ether" className={classes.etherIcon}/>
                <Typography variant="subtitle1" component="h2">
                    {props.staked} ehter
                </Typography>
            </div>
            <div className={classes.infoContent}>
                <Icon color="secondary" className={classes.fonticon}>comment</Icon>
                <Typography variant="subtitle1" component="h2">
                  {props.comments} comment
                </Typography>
            </div>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
    </a>
  );
}