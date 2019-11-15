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
        articleData: null,
        commentCount:0,
        staked:0,
        url:"",
        comment:"",
        taginput:"",
        addedTags:[],
        tagIds:[]
    }

    onSearchUrl = async () =>{
        const {url} = this.state;
        const {contract,getOgp} = this.props
        const data = getOgp(url);
        console.log("called onSearchUrl success to get data")
        console.log(data)
        this.setState({articleData:data.Result});
        try{
            const articleInfo = await contract.methods.getArtcileInfo(url).call();
            if( articleInfo.length >= 2){
                const count = articleInfo[0].length;
                const staked = articleInfo[1];
                this.setState({commentCount:count,staked:staked});
            }
        }
        catch(err){

        }

    };

    onChangeComment = (e)=>{
        this.setState({comment:e.target.value})
    }

    onChangeTagInput = (e)=>{
        this.setState({taginput:e.target.value})
    }

    onChangeUrl = (e)=>{
        this.setState({url:e.target.value})
    }

    onClickSendTag = async ()=>{
        const {taginput,tagIds} = this.state;
        const {contract,accounts} = this.props;
        try{
            const tagId = await contract.methods.getTagId(taginput).call();
            if( tagId<=0){
                console.log("tag does not exist. create new tag");
                await contract.methods.addTag(taginput).send({from:accounts[0]});
            } else {
                console.log("tag is found");
                console.log(tagId);
            }
            tagIds.push(taginput)
            this.addTag(taginput)
            this.setState({taginput:"",tagIds:tagIds})
        }
        catch(err){
            alert("タグの追加に失敗しました");
        }
    }

    addTag = (tag) =>{
        const {addedTags} = this.state;
        addedTags.push(tag);
        this.setState({addedTags});
    }

    deleteTag = (tag) => {
        const {addedTags} = this.state;
        const newTags = addedTags.filter(s => s !== tag);
        this.setState({addedTags:newTags});
    }

    resetUrl = () =>{
        this.setState({url:""})
    }

    render(){
        const { classes} = this.props;
        const { 
            articleData,
            commentCount,
            staked,
            comment,
            taginput,
            addedTags,
            url
         } = this.state;
        return(
            <div>
                <ToastAppBar pageTitle="投稿"></ToastAppBar>
                <div className={classes.content}>
                    <SearchBox
                        placeholder="URL"
                        onClick={this.onSearchUrl}
                        value={url}
                        onChange={this.onChangeUrl}
                        onClickBar={this.resetUrl}
                    ></SearchBox>
                </div>
                <div className={classes.content}>
                    <ArticleCard
                        title={articleData!=null?articleData.title:""}
                        image={articleData!=null?articleData.image:""}
                        comments={commentCount}
                        staked={staked}
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
                        value={comment}
                        onChange={this.onChangeComment}
                    />
                </div>
                <div className={classes.content}>
                    <TagBox tags={addedTags} onDelete={this.deleteTag}/>
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
                                onClick={this.onClickSendTag}
                            >
                                <AddBoxIcon color="primary" fontSize="large"/>
                            </IconButton>
                            </InputAdornment>
                        ),}}
                        fullWidth
                        value={taginput}
                        onChange={this.onChangeTagInput}
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