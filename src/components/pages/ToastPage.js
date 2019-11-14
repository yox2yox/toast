import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ToastAppBar from '../ToastAppBar';
import SearchBox from '../SearchBox';
import ArticleCard from '../AtricleCard';
import { TextField, Typography, Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import AddBoxIcon from '@material-ui/icons/AddBox';
import TagBox from '../TagBox';


const styles = {
    content:{
        margin:"10px auto",
        width:"90%",
        maxWidth:"600px",
        textAlign:"left"
    },
    btnContent:{
        margin:"20px auto",
    },
    submitBtn:{
        width:200
    }
};

class ToastPage extends React.Component{

    state = {
        articleData: null
    }

    onSearchUrl = () =>{
        const data = this.props.getOgp();
        console.log("called onSearchUrl success to get data")
        console.log(data)
        this.setState({articleData:data.Result});
    };

    render(){
        const { classes} = this.props;
        const { articleData } = this.state;
        return(
            <div>
                <ToastAppBar pageTitle="投稿"></ToastAppBar>
                <div className={classes.content}>
                    <SearchBox placeholder="URL" onClick={this.onSearchUrl}></SearchBox>
                </div>
                <div className={classes.content}>
                    <ArticleCard
                        title={articleData!=null?articleData.title:""}
                        image={articleData!=null?articleData.image:""}
                    ></ArticleCard>
                </div>
                <div className={classes.content}>
                    <Typography variant="h6" component="h2">トーストを投稿</Typography>
                </div>
                <div className={classes.content}>
                    <TextField 
                        placeholder="コメントを入力"
                        variant="outlined"
                        rows="5"
                        rowsMax="10"
                        multiline
                        fullWidth
                    />
                </div>
                <div className={classes.content}>
                    <TagBox />
                </div>
                <div className={classes.content}>
                    <TextField 
                        placeholder="タグを入力"
                        variant="outlined"
                        InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                            <IconButton
                                edge="end"
                                aria-label="toggle password visibility"
                            >
                                <AddBoxIcon color="primary" fontSize="large"/>
                            </IconButton>
                            </InputAdornment>
                        ),}}
                        fullWidth
                    />
                </div>
                <div className={classes.btnContent}>
                    <Button variant="contained" color="primary" className={classes.submitBtn}>投稿</Button>
                </div>
            </div>
        );
    }

}

export default withStyles(styles)(ToastPage);