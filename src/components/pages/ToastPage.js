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
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { encodeToBytes,decodeFromHex } from '../../utils/bytesEncoder';

const styles = {
    content:{
        margin:"10px auto",
        width:"90%",
        maxWidth:"600px",
        textAlign:"left"
    },
    btnContent:{
        margin:"20px auto",
        display:"flex",
        justifyContent:"center"
    },
    submitBtn:{
        width:200
    },
    radioGroup:{
        display:"flex",
        flexDirection:"row"
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
        tagIds:[],
        isGood:true
    }

    componentDidMount = async ()=>{
        const {editTargetUrl} = this.props
        await this.setState({url:editTargetUrl})
        if (editTargetUrl){
            this.onSearchUrl()
        }
    }

    onSearchUrl = async () =>{
        const {url} = this.state;
        const {contract,getOgpData,web3} = this.props
        const data = getOgpData(url);
        console.log("called onSearchUrl success to get data")
        console.log(data)
        this.setState({articleData:data.Result});
        try{
            const urlbytes = encodeToBytes(url);
            const articleInfo = await contract.methods.getArtcileInfoFromUrl(urlbytes).call();
            console.log("get article info")
            console.log(articleInfo)
            if( Object.keys(articleInfo).length >= 3){
                const count = articleInfo[1].length;
                const staked = web3.utils.fromWei(articleInfo[2],'ether');
                this.setState({commentCount:count,staked:staked});
            }
        }
        catch(err){
            console.error(err);
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

    onChangeIsGood = (e)=>{
        if (e.target.value==="true"){
            this.setState({isGood:true})
        } else{
            this.setState({isGood:false})
        }
    }

    onClickSendTag = async ()=>{
        const {taginput,tagIds} = this.state;
        const {contract,accounts} = this.props;
        if (taginput!==""){
            try{
                const tagbyte = encodeToBytes(taginput);
                let tagId = await contract.methods.getTagId(tagbyte).call();

                if( tagId<=0){
                    console.log("tag does not exist. create new tag");
                    const addTag = contract.methods.addTag(tagbyte);
                    await addTag.send({from:accounts[0]});
                    tagId = await contract.methods.getTagId(tagbyte).call();
                } else {
                    console.log("tag is found");
                    console.log(tagId);
                }
                tagIds.push(tagId)
                this.addTag(taginput)
                this.setState({taginput:"",tagIds:tagIds})
            }
            catch(err){
                alert("タグの追加に失敗しました");
                console.error(err);
            }
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

    onSubmit = async ()=>{
        const {url,comment,tagIds,isGood} = this.state;
        const {contract,accounts,history} = this.props;
        if (url!==""&&comment!==""&&tagIds.length>0){
            try{
                const urlbyte = (new TextEncoder('utf-8')).encode(url)
                const commentByte = encodeToBytes(comment)
                await contract.methods.toastComment(urlbyte,commentByte,isGood,tagIds).send({from:accounts[0],gas:2000000});
                this.setState({url:"",comment:"",tagIds:[],isGood:true,addedTags:[],taginput:"",articleData:null})
                alert("送信完了")
                history.push("/home")
            }catch(err){
                alert("送信に失敗しました")
                console.error(err)
            }
        } else {
            alert("全ての項目を入力してください");
        }
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
            url,
            isGood
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
                <div className={classes.content}>
                    <FormControl component="fieldset">
                        <RadioGroup aria-label="評価" name="isGood" value={isGood?"true":"false"} onChange={this.onChangeIsGood} className={classes.radioGroup}>
                            <FormControlLabel value="true" control={<Radio />} label="Good" />
                            <FormControlLabel value="false" control={<Radio />} label="Bad" />
                        </RadioGroup>
                    </FormControl>
                </div>
                <div className={classes.btnContent}>
                    <Button variant="contained" color="primary" className={classes.submitBtn} onClick={this.onSubmit}>投稿</Button>
                </div>
            </div>
        );
    }

}

export default withStyles(styles)(ToastPage);