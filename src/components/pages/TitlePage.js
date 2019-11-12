import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import { classes } from 'istanbul-lib-coverage';
import { Button } from '@material-ui/core';

const styles = {
    container:{
        textAlign:"center",
        backgroundColor:'#4AE0C0',
        height:"100%",
        width:"100%",
        display:"flex",
        alignItems: "center",
        zIndex:0
    },
    subtitle:{
        color:"white",
        fontSize:35,
        fontWeight:"bold",
        width:"100%",
        display:"flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    icon:{
        height:200,
        width:200
    },
    iconSmall:{
        height:30,
        width:30,
        marginRight:5
    },
    title:{
        top:0,
        left:0,
        position:"fixed",
        display:"flex",
        alignItems: "center",
        height:50,
        paddingLeft:10,
        fontSize:30,
        fontWeight:"bold",
        color:"white",
        zIndex:0
    },
    btn:{
        position:"fixed",
        backgroundColor:"white",
        width:200,
        left:"50%",
        bottom:50,
        transform: "translate(-50%, -50%)",
        zIndex:0,
    }
}

class TitlePage extends React.Component{

    onClickButton = () => {
        this.props.history.push('/signup');
    }

    render(){
        const classes = this.props.classes;
        return(
        <div className={classes.container}>
            <div className={classes.title}>
                <img src="img/toast-icon.png" alt="toast" className={classes.iconSmall}/>
                <div>Toast</div>
            </div>
            <div className={classes.subtitle}>
                <div>
                    <img src="img/toast-icon.png" alt="toast" className={classes.icon}/>
                </div>
                <div>知りたいことを</div>
                <div>見つけましょう</div>
                <div className={classes.btnContain}>
                    <Button variant="contained" className={classes.btn} onClick={this.onClickButton}>アカウント登録</Button>
                </div>
            </div>
        </div>
        );
    }
}

export default withRouter(withStyles(styles)(TitlePage));