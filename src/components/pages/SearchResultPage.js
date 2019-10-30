import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ToastAppBar from '../ToastAppBar';
import ArticleList from '../ArticleList';
import SearchBox from '../SearchBox';

const styles = {
    root:{
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

class SearchResultPage extends React.Component{
    render(){
        const classes = this.props.classes
        return (
            <div className={classes.root}>
                <ToastAppBar pageTitle="検索結果"></ToastAppBar>
                <div className={this.props.classes.content}>
                    <SearchBox placeholder="検索"></SearchBox>
                </div>
                <div className={classes.comment}>
                    <ArticleList />
                </div>
            </div>   
        );
    }
}

export default withStyles(styles)(SearchResultPage);