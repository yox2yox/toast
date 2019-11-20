import React from 'react';
import SearchBox from './SearchBox';

export default class KeyWordSearchBox extends React.Component {

    state = {
        word:""
    }

    onChangeWord = (e)=>{
        this.setState({word:e.target.value});
    }

    onClickSearch = ()=>{
        const { word } = this.state;
        const { searchOnBase } = this.props
        if (word!==""){
            const tags = word.split(/\s+/);
            searchOnBase(tags)
        }
    }

    render(){
        const { placeholder } = this.props;
        const { word } = this.state;
        return (
            <SearchBox placeholder={placeholder} value={word} onChange={this.onChangeWord} onClick={this.onClickSearch}></SearchBox>
        );
    }
}