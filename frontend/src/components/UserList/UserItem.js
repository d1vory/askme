import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {ListItem,ListItemAvatar,Avatar,ListItemText,ListItemSecondaryAction,Button} from '@material-ui/core'
import Popup from "reactjs-popup";
import QuestionForm from '../QuestionForm'

export default function UserItem(props){

  const handleSendFriendRequestButton = (event) => {

  }

  const firstLastName = props.firstName + ' ' + props.lastName
  return(
    <ListItem >
        <ListItemAvatar>
            <Avatar scr={''}>
            </Avatar>
        </ListItemAvatar>
        <ListItemText primary={firstLastName} secondary={'@' + props.username} />

        {
          props.isFriend ?
          (
            <Popup  lockScroll modal closeOnEscape closeOnDocumentClick
              trigger={<Button variant="contained" color="primary" > Запитати</Button>}>
              { close =>(<QuestionForm closeElement = {close} askedUser={props.friendId} firstLastName={firstLastName} isFriendPage={true} username={ props.username}  />) }
            </Popup>
          )
          :
          (
            <Button variant="contained" color="primary" onClick={handleSendFriendRequestButton}>Add to friends</Button>
          )
        }


    </ListItem>
  )
}
