import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ToastAppBar from '../ToastAppBar';
import ArticleList from '../ArticleList';
import KeyWordSearchBox from '../KeyWordSearchBox';

const styles = {
    root:{
    },
    content:{
        margin:"10px auto",
        width:"90%",
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
        const {classes,searchResults,onClickArticle,searchOnBase} = this.props
        return (
            <div className={classes.root}>
                <ToastAppBar pageTitle="検索結果"></ToastAppBar>
                <div className={this.props.classes.content}>
                    <KeyWordSearchBox placeholder="検索" searchOnBase={searchOnBase}></KeyWordSearchBox>
                </div>
                <div className={classes.comment}>
                    <ArticleList searchResults={searchResults} onClickArticle={onClickArticle}/>
                </div>
            </div>   
        );
    }
}

export default withStyles(styles)(SearchResultPage);