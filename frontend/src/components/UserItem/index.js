import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {ListItem,Button,Grid,Box,IconButton} from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import Popup from "reactjs-popup";
import QuestionForm from '../QuestionForm'
import UserInfo from '../UserInfo'
import axios from 'axios'

const useStyles = makeStyles({
  deleteButton: {
    backgroundColor:'#f90000'
  }
});


export default function UserItem(props){

  const handleSendFriendRequestButton = (event) => {
    const config = {
      headers: {
        'Authorization' : `Token ${props.token}`,
        'Content-Type': 'application/json'
      }
    }
    axios.post(`api/friendship/request/create/${props.userId}/`,{}, config)
      .then(res => {
            props.openInfo(res.data.message, 'success')
                    })
      .catch(err => {

        props.openInfo(err.response.data.message, 'error')
      })
  }


  const handleDeleteFriendButton = () => {
    const config = {
      headers: {
        'Authorization' : `Token ${props.token}`,
        'Content-Type': 'application/json'
      }
    }
    axios.post(`api/friendship/delete/${props.userId}/`,{}, config)
      .then(res => {
            props.openInfo(res.data.message, 'success');
            props.removeFromFriends(props.index)
                    })
      .catch(err => {
        props.openInfo(err.response.data.message, 'error')
      })
  }

  const classes = useStyles();
  const firstLastName = props.firstName + ' ' + props.lastName

  const deleteQuestionButton = (
    <Button
      variant="contained"
      color="secondary"
      size="small"
      className={classes.deleteButton}
      startIcon={<DeleteIcon />}
      onClick={handleDeleteFriendButton}
    >
      delete friend
    </Button>)

  const moreButton = (<IconButton aria-label="more"> <MoreVertIcon /> </IconButton>)

  const popupMore = (
    <Popup trigger = {moreButton}  position="top center">
      <Grid container justify='center'>
        {deleteQuestionButton}
      </Grid>

    </Popup>
  )

  return(
    <ListItem >
      <Grid container direction='row' justify="space-between" align-items="baseline">


            <UserInfo firstName= {props.firstName} avatarSize='mediumAvatar' lastName={props.lastName} askedUserUsername={props.username} avatar = {props.avatar}/>


        <Box>
        {
          props.isFriend ?
          (
            <Grid container direction='row' justify="flex-end">
              <Popup  lockScroll modal closeOnEscape closeOnDocumentClick
                trigger={<Button variant="contained" color="primary" > Запитати</Button>}>
                { close =>(<QuestionForm closeElement = {close}  askedUser={props.userId} firstLastName={firstLastName} caller={'friends'} isFriendPage={true} username={ props.username}  />) }
              </Popup>
              <Box>
                {popupMore}
              </Box>
            </Grid>
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
