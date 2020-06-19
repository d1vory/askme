import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {ListItem,ListItemAvatar,Avatar,ListItemText,ListItemSecondaryAction,Button} from '@material-ui/core'

export default function FriendItem(props){

  const handleAskButton = (event) => {
    console.log("ASK ", props.username);
  }



  const firstLastName = props.firstName + ' ' + props.lastName
  return(
    <ListItem >
        <ListItemAvatar>
            <Avatar scr={''}>
            </Avatar>
        </ListItemAvatar>
        <ListItemText primary={firstLastName} secondary={props.username} />
        <ListItemSecondaryAction>
            <Button variant="contained" color="primary" onClick={handleAskButton}>
                Запитати
            </Button>
        </ListItemSecondaryAction>
    </ListItem>
  )
}
