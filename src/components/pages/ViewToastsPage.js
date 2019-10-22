import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ToastAppBar from '../ToastAppBar';
import ArticleCard from '../AtricleCard';

const styles = {
    content:{
        margin:"10px auto",
        width:"90%",
        maxWidth:"600px",
        textAlign:"left"
    },
}

class ViewToastsPage extends React.Component{
    render(){
        const classes = this.props.classes
        return (
            <div>
                <ToastAppBar pageTitle="記事"></ToastAppBar>
                <div className={classes.content}>
                    <ArticleCard></ArticleCard>
                </div>
            </div>   
        );
    }
}

export default withStyles(styles)(ViewToastsPage);