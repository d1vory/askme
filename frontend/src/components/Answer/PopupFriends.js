import React,{Component} from 'react'
import Popup from "reactjs-popup";
import {Box} from '@material-ui/core'

import UserCheckbox from './UserCheckbox'
import UserInfo from '../UserInfo'



class PopupFriends extends Component {

  state = {
    userList:[],
    checkedUsers:[],
    error:''
  }

  fetchFriends= (token) => {
    const url = 'http://127.0.0.1:8000/api/friends/'
    axios.get(url,{
        headers: {
          'Authorization' : `Token ${token}`
        }
    }).then(res => {
      //console.log(res.data);
      console.log("FETCHED ", res.data);
      if( res.data.length > 0){
        this.setState({
          userList : res.data,
          checkedUsers: res.data.map(() => (false)),
          openFriends:true
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

  componentDidMount(){
    this.fetchFriends(this.props.token)
  }


  render(){

    return(
      <Popup open={this.props.openFriends} closeOnDocumentClick onClose={this.props.closeFriends}>
        <Box p={2}>
          <Typography variant='h4'>
            Select users that you want to ask!
          </Typography>
          {
            (this.state.userList.map((user,index) => (

            <UserCheckbox key={index} index={index} isChecked={this.state.checkedUsers[index]} handleCheckUser={this.handleCheckUser} avatar = {user.avatar} firstName={user.first_name}  lastName={user.last_name} userId = {user.pk} username={user.username}/>

            )))
          }

          <Button>Ask! </Button>
        </Box>
      </Popup>
    )
  }
}


export default PopupFriends;
