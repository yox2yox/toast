import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ToastAppBar from '../ToastAppBar';
import SearchBox from '../SearchBox';
import ArticleCard from '../AtricleCard';
import { Button } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import { encodeToBytes,decodeFromHex } from '../../utils/bytesEncoder';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormHelperText from '@material-ui/core/FormHelperText';

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
    },
    tokenInput:{
        width:"100%"
    },
    tokenLabel:{
        marginBottom:8,
        fontSize:16
    }
};

class RequestPage extends React.Component{

    state = {
        articleData: null,
        commentCount:0,
        staked:0,
        url:"",
        jelly:0
    }

    onSearchUrl = async () =>{
        const {url} = this.state;
        const {contract,getOgpData,web3} = this.props
        const data = getOgpData(url);
        if (data["Result"]["title"]==""){
            alert("URLが見つかりませんでした");
            this.setState({url:""});
            return;
        }
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

    onChangeUrl = (e)=>{
        this.setState({url:e.target.value})
    }

    onChangeJelly = (e)=>{
        this.setState({jelly:e.target.value})
    }

    resetUrl = () =>{
        this.setState({url:""})
    }

    onSubmit = async ()=>{
        const {url,jelly} = this.state;
        const {contract,accounts,userData,web3,updateUserData} = this.props;

        if (jelly>userData[3]){
            alert("jellyが足りません");
        } else if (url!==""&&jelly>0) {
            try {
                const urlbytes = encodeToBytes(url);
                const jellyWei = web3.utils.toWei(jelly,'ether')
                await contract.methods.sendRequest(urlbytes,jellyWei).send({from:accounts[0],gas:2000000});
                this.setState({url:"",jelly:0,articleData:null});
                updateUserData();
                alert("リクエスト送信完了しました");
            } catch(err){
                console.error(err);
                alert("リクエスト送信に失敗しました");
            }
        }
    }

    render(){
        const { classes,userData} = this.props;
        const { 
            articleData,
            commentCount,
            staked,
            url,
            jelly
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
                    <FormControl variant="outlined" className={classes.tokenInput}>
                    <FormHelperText id="outlined-weight-helper-text" className={classes.tokenLabel}>{userData?userData[3]:0} jelly 利用可能</FormHelperText>
                    <OutlinedInput
                        id="outlined-adornment-weight"
                        type="number"
                        endAdornment={<InputAdornment position="end">jelly</InputAdornment>}
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                        'aria-label': 'weight',
                        }}
                        labelWidth={0}
                        value={jelly}
                        onChange={this.onChangeJelly}
                    />
                    </FormControl>
                </div>
                <div className={classes.btnContent}>
                    <Button variant="contained" color="primary" className={classes.submitBtn} onClick={this.onSubmit}>投稿</Button>
                </div>
            </div>
        );
    }

}

export default withStyles(styles)(RequestPage);