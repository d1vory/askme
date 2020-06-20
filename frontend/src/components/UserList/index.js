import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Box, List,Divider } from "@material-ui/core";

import FriendItem from './FriendItem'
import UserItem from './UserItem'
import axios from 'axios'
import {connect} from 'react-redux'


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});


class UserList extends React.Component{

    constructor(props){
      super(props)

      this.state = {
        friends : [],
        error: ''
      };
    }

    fetchFriends= (token) => {
      const url = 'http://127.0.0.1:8000/api/friends/'
      axios.get(url,{
          headers: {
            'Authorization' : `Token ${token}`
          }
      }).then(res => {
        //console.log(res.data);
        if( res.data.length > 0){
          this.setState({
            friends : res.data
          });
        }else{
          this.setState({
            error: 'You have not any friends!'
          })
        }

      }).catch(err => {
        this.setState({
          error: err
        })
      })

    }

    componentWillReceiveProps(newProps){
      if (newProps.token){
        this.fetchFriends(newProps.token)
      }

    }

    componentDidMount(){
      if( this.props.renderFriends){
        if (this.props.token !== null){
          this.fetchFriends(this.props.token)
        }
      }else{

      }


    }


    render(){
      return (
        <Box boxShadow={3}>
            <List >

              {
                (this.props.renderFriends) ?
                (this.state.friends.map((friend,index) => (
                  <FriendItem key={friend.id} friendId = {friend.id} firstName={friend.first_name}  lastName={friend.last_name} username={friend.username}  />
                )))
                :
                (this.props.users.map((user,index) => (
                  <UserItem key={user.id} userId = {user.id} firstName={user.first_name}  lastName={user.last_name} username={user.username}  />
                )))
              }
            </List>
        </Box>
    );}
};

const mapStateToProps = state => {
  return {
    token: state.token
  }
}


export default connect(mapStateToProps)(UserList);
