import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {Box,Grid,Avatar, Typography} from '@material-ui/core'
import {Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({

  smallAvatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  mediumAvatar: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  largeAvatar: {
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
  disableLink:{
    pointerEvents: 'none'
  }
}));


export default function UserInfo(props){
  const classes = useStyles();
  const askedUserFirstLastName = props.firstName + ' ' + props.lastName
  return(
    <Box mb={2}>
      <Grid container direction="row" alignItems="center">
        <Box mr = {2}>
          <Link to = {`/user/${props.askedUserUsername}/`} className={props.isDisabled && classes.disableLink} >
          <Avatar alt="avatar" src = {props.avatar}  className={props.avatarSize ? classes[props.avatarSize] : classes.largeAvatar} />
          </Link>
        </Box>
        <Box >

          <Link to = {`/user/${props.askedUserUsername}/`} className={props.isDisabled && classes.disableLink} style={{ textDecoration: 'none', color:'inherit' }} >
          <Typography variant={ props.firstLastNameVariant ?  props.firstLastNameVariant : 'h6'}>
            {askedUserFirstLastName}
          </Typography>
        </Link>

          <Link to = {`/user/${props.askedUserUsername}/`} className={props.isDisabled && classes.disableLink} style={{ textDecoration: 'none', color:'inherit' }} >
          <Typography variant= {props.usernameVariant ? props.usernameVariant : 'subtitle2'} color='textSecondary'>
            {'@' + props.askedUserUsername}
          </Typography>
          </Link>
          {
            props.whenAnswered ? (  <Typography  variant='subtitle2' color='textSecondary'>
                {props.whenAnswered}
              </Typography>)
              :
              undefined
          }

        </Box>
      </Grid>
    </Box>
  )
}
