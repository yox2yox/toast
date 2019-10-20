import React from 'react';
import ToastAppBar from './ToastAppBar';

export default class HomePage extends React.Component{
    render(){
        return(
        <div>
            <ToastAppBar pageTitle="ホーム"></ToastAppBar>
        </div>
        );
    }
}