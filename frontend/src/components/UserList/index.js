import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Box, List,Divider } from "@material-ui/core";

import FriendItem from './FriendItem'
import axios from 'axios'
import {connect} from 'react-redux'


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});


class FriendList extends React.Component{

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
        console.log(res.data);
        this.setState({
          friends : res.data
        });
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

      if (this.props.token !== null){
        this.fetchFriends(this.props.token)
      }
    }


        //const classes = useStyles();
    render(){
      return (
        <Box boxShadow={3}>
            <List >
              {
                this.state.friends.map((friend,index) => (
                  <FriendItem key={friend.id} friendId = {friend.id} firstName={friend.first_name}  lastName={friend.last_name} username={friend.username}  />
                ))
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


export default connect(mapStateToProps)(FriendList);
