import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ToastAppBar from '../ToastAppBar';
import ArticleCard from '../AtricleCard';
import ToastList from '../ToastList';

const styles = {
    root:{
        backgroundColor:"#ebebeb"
    },
    content:{
        margin:"10px auto",
        width:"100%",
        maxWidth:"600px",
        textAlign:"left"
    },
    comment:{
        margin:"10px auto",
        width:"100%",
        maxWidth:"600px",
        textAlign:"left"
    }
}

class ViewToastsPage extends React.Component{
    render(){
        const classes = this.props.classes
        return (
            <div className={classes.root}>
                <ToastAppBar pageTitle="記事"></ToastAppBar>
                <div className={classes.content}>
                    <ArticleCard></ArticleCard>
                </div>
                <div className={classes.comment}>
                    <ToastList></ToastList>
                </div>
            </div>   
        );
    }
}

export default withStyles(styles)(ViewToastsPage);