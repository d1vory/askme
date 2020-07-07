import React,{Component} from 'react'
import {Grid,Typography,Box,SwipeableDrawer,Drawer,List,ListItem, IconButton} from "@material-ui/core";

import  UserInfo from '../UserInfo'
import DoneIcon from '@material-ui/icons/Done';
import NotInterestedIcon from '@material-ui/icons/NotInterested';




export default function RequestUserItem(props){
  const {request,index} = props

  const handleAcceptButton= () => {

    props.acceptFriendship(index)
  }

  const handleDeclineButton = () => {

    props.rejectFriendship(index)
  }



  return(


    <ListItem key = {index}>
      <Grid container direction='row' justify='space-between'>
        <UserInfo isDisabled = {false} avatarSize='mediumAvatar' avatar = {request.from_user.avatar} firstLastNameVariant='body1' firstName={request.from_user.first_name}  lastName={request.from_user.last_name} askedUserUsername={request.from_user.username}/>

        <Grid>
          <IconButton onClick={handleAcceptButton}>
            <DoneIcon />
          </IconButton>

          <IconButton onClick={handleDeclineButton}>
            <NotInterestedIcon />
          </IconButton>
        </Grid>
      </Grid>
    </ListItem>
  )
}
