import React from 'react';
import ToastAppBar from './ToastAppBar';
import SearchBox from './SearchBox';
import { withStyles } from '@material-ui/core/styles';
import TokenInfoBox from './TokenInfoBox';

const styles = {
    container:{
        textAlign:"center"
    },
    searchBox:{
        display:"inline-block",
        margin:"10px auto",
        width:"90%",
        maxWidth:"400px",
    }
}

class HomePage extends React.Component{

    render(){
        return(
        <div className={this.props.classes.container}>
            <ToastAppBar pageTitle="ホーム"></ToastAppBar>
            <div>
                <div className={this.props.classes.searchBox}>
                    <SearchBox placeholder="検索"></SearchBox>
                </div>
            </div>
            <div>
                <div className={this.props.classes.searchBox}>
                    <TokenInfoBox></TokenInfoBox>
                </div>
            </div>
        </div>
        );
    }
}

export default withStyles(styles)(HomePage);