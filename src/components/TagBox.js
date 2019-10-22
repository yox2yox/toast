import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Chip } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    tag:{
        margin:"2px 0"
    }
}));

export default function TagBox(){
    const classes = useStyles();
    return (
        <div>
            <Chip
            className={classes.tag}
            label="衝撃"
            onDelete={()=>{}}
            />
            <Chip
                className={classes.tag}
                label="衝撃画像"
                onDelete={()=>{}}
            />
            <Chip
                className={classes.tag}
                label="生物"
                onDelete={()=>{}}
            />
            <Chip
                className={classes.tag}
                label="生き物"
                onDelete={()=>{}}
            />
            <Chip
                className={classes.tag}
                label="いきもの"
                onDelete={()=>{}}
            />
            <Chip
                className={classes.tag}
                label="深海"
                onDelete={()=>{}}
            />
            <Chip
                className={classes.tag}
                label="海外"
                onDelete={()=>{}}
            />
        </div>
    );
}