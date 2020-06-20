import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {ListItem,ListItemAvatar,Avatar,ListItemText,ListItemSecondaryAction,Button} from '@material-ui/core'
import Popup from "reactjs-popup";


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

        <Button variant="contained" color="primary" onClick={handleSendFriendRequestButton}>Add to friends</Button>

    </ListItem>
  )
}
