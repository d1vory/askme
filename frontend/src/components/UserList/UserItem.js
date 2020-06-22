import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {ListItem,ListItemAvatar,Avatar,ListItemText,ListItemSecondaryAction,Button} from '@material-ui/core'
import Popup from "reactjs-popup";
import QuestionForm from '../QuestionForm'
import {Link } from 'react-router-dom'

export default function UserItem(props){

  const handleSendFriendRequestButton = (event) => {

  }

  const firstLastName = props.firstName + ' ' + props.lastName
  const primaryLink = <Link to = {`/user/${props.username}/`}  style={{ textDecoration: 'none', color:'inherit' }} >{firstLastName} </Link>
  const secondaryLink = <Link to = {`/user/${props.username}/`}  style={{ textDecoration: 'none', color:'inherit' }} >{'@' + props.username} </Link>
  return(
    <ListItem >


          <ListItemAvatar>
              <Link to = {`/user/${props.username}/`} >
                <Avatar alt ="avatar"  scr={props.avatar} />
              </Link>
          </ListItemAvatar>


            <ListItemText primary={primaryLink} secondary={secondaryLink} > </ListItemText>


        {
          props.isFriend ?
          (
            <Popup  lockScroll modal closeOnEscape closeOnDocumentClick
              trigger={<Button variant="contained" color="primary" > Запитати</Button>}>
              { close =>(<QuestionForm closeElement = {close} askedUser={props.userId} firstLastName={firstLastName} isFriendPage={true} username={ props.username}  />) }
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
