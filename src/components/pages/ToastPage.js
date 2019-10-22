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

    render(){
        return(
            <div>
                <ToastAppBar pageTitle="投稿"></ToastAppBar>
                <div className={this.props.classes.content}>
                    <SearchBox placeholder="URL"></SearchBox>
                </div>
                <div className={this.props.classes.content}>
                    <ArticleCard></ArticleCard>
                </div>
                <div className={this.props.classes.content}>
                    <Typography variant="h6" component="h2">トーストを投稿</Typography>
                </div>
                <div className={this.props.classes.content}>
                    <TextField 
                        placeholder="コメントを入力"
                        variant="outlined"
                        rows="5"
                        rowsMax="10"
                        multiline
                        fullWidth
                    />
                </div>
                <div className={this.props.classes.content}>
                    <TagBox />
                </div>
                <div className={this.props.classes.content}>
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
                <div className={this.props.classes.btnContent}>
                    <Button variant="contained" color="primary" className={this.props.classes.submitBtn}>投稿</Button>
                </div>
            </div>
        );
    }

}

export default withStyles(styles)(ToastPage);