import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {ListItem,ListItemAvatar,Avatar,ListItemText,ListItemSecondaryAction,Button,Grid,Box} from '@material-ui/core'
import Popup from "reactjs-popup";
import QuestionForm from '../QuestionForm'
import UserInfo from '../Answer/UserInfo'
import {Link } from 'react-router-dom'
import axios from 'axios'

export default function UserItem(props){
  const handleSendFriendRequestButton = (event) => {
    const config = {
      headers: {
        'Authorization' : `Token ${props.token}`,
        'Content-Type': 'application/json'
      }
    }
    axios.post(`http://127.0.0.1:8000/api/friendship/request/create/${props.userId}/`,{}, config)
      .then(res => {
            props.openInfo(res.data.message, 'success')
                    })
      .catch(err => {

        props.openInfo(err.response.data.message, 'error')
      })
  }

  const firstLastName = props.firstName + ' ' + props.lastName
  const primaryLink = <Link to = {`/user/${props.username}/`}  style={{ textDecoration: 'none', color:'inherit' }} >{firstLastName} </Link>
  const secondaryLink = <Link to = {`/user/${props.username}/`}  style={{ textDecoration: 'none', color:'inherit' }} >{'@' + props.username} </Link>
  return(
    <ListItem >
      <Grid container direction='row' justify="space-between" align-items="baseline">


            <UserInfo firstName= {props.firstName} avatarSize='mediumAvatar' lastName={props.lastName} askedUserUsername={props.username} avatar = {props.avatar}/>


        <Box>
        {
          props.isFriend ?
          (
            <Popup  lockScroll modal closeOnEscape closeOnDocumentClick
              trigger={<Button variant="contained" color="primary" > Запитати</Button>}>
              { close =>(<QuestionForm closeElement = {close}  askedUser={props.userId} firstLastName={firstLastName} caller={'friends'} isFriendPage={true} username={ props.username}  />) }
            </Popup>
          )
          :
          (
            <Button variant="contained" color="primary" onClick={handleSendFriendRequestButton}>Add to friends</Button>
          )
        }
        </Box>

      </Grid>
    </ListItem>
  )
}
