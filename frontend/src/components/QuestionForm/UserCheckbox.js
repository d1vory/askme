import React,{Component, useState} from 'react'
import {Box,Typography,Checkbox,Container} from '@material-ui/core'
import UserInfo from '../UserInfo'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  boxStyle:{
    cursor:'pointer'
  },

  checkedBox: {
    backgroundColor:'#DEDEDE',
    borderRadius:'3px'
  },
  uncheckedBox: {
    backgroundColor:'inherit'
  }
})


export default function UserCheckbox(props){
  const classes = useStyles();

  const boxClassName = [classes.boxStyle, (props.isChecked ? classes.checkedBox : classes.uncheckedBox)].join(' ')

  return(
    <Box my={1}>
      <Container fluid className={boxClassName} onClick={() => {props.handleCheckUser(props.index)}}>
        <UserInfo isDisabled = {true} avatar = {props.avatar} firstName={props.firstName}  lastName={props.lastName} userId = {props.pk} askedUserUsername={props.username}/>
      </Container>
    </Box>
  )
}
