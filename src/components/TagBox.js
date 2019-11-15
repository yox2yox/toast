import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Chip } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    tag:{
        margin:"2px 0"
    }
}));

export default function TagBox(props){
    const classes = useStyles();
    return (
        <div>
            {
                props.tags.map((tagname,index)=>{
                    return <Chip
                    className={classes.tag}
                    label={tagname}
                    onDelete={()=>props.onDelete(tagname)}
                    key={index}
                    />
                })
            }
        </div>
    );
}