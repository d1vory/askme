import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Input,IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import SearchBar from 'material-ui-search-bar'
import SearchIcon from '@material-ui/icons/Search';
import Box from "@material-ui/core/Box";
import axios from 'axios'


class UserSearch extends React.Component {

    state= {
      searchValue:''

    }


  filter = () => {
    const url = 'http://127.0.0.1:8000/api/users/search/?search=' + this.state.searchValue
    axios.get(url,{
        headers: {
          'Authorization' : `Token ${this.props.token}`
        }
    }).then(res => {
      console.log(res.data);
      if(res.data.length > 0 ){
        this.props.changeView(res.data)
      }else{
        this.props.changeView(null, 'Nothing found!')
      }

    }).catch(error => {
      this.props.changeView(null, error)
    })
  }

  handleSearchChange = (val) => {
    this.setState({
      searchValue: val
    })
    if( this.state.searchValue.length > 3 ){
      //this.filter()
    }

  }


  handleSearchRequest = () => {
    console.log(this.state.searchValue.length);
    if( this.state.searchValue.length > 3 ){
      this.filter()
    }else{
      this.props.changeView(null,'nothing found')
    }
  }

  handleCloseButton = () => {
    console.log("ClOSE");
  }

  render(){
    const closeButton=  ( <IconButton onClick={this.handleCloseButton}> <CloseIcon /> </IconButton>)
    return (
      <SearchBar
      onClear={this.handleCloseButton}
      onChange={this.handleSearchChange}
      onRequestSearch={this.handleSearchRequest}
      value= {this.state.searchValue}
      style={{
        margin: '0 auto'
      }}
    />
    );
  }
};



export default UserSearch;
