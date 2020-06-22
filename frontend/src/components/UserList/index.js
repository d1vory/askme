import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Box, List,Divider } from "@material-ui/core";

import FriendItem from './FriendItem'
import UserItem from './UserItem'
import axios from 'axios'
import {connect} from 'react-redux'




class UserList extends React.Component{

    render(){
      console.log("USER LIST ", this.props.users);
      return (
        
    );}
};

const mapStateToProps = state => {
  return {
    token: state.token
  }
}


export default connect(mapStateToProps)(UserList);
