import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {Box,Grid,Avatar, Typography} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({

  smallAvatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  largeAvatar: {
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
}));


export default function AskerInfo(props){
  const classes = useStyles();

  return(
    <Box mb={2}>
      <Grid container direction="row">
        <Box mr = {2}>
          <Avatar alt="lana" src={props.userImageSrc} className={classes.largeAvatar} />
        </Box>
        <Box >
          <Typography variant= 'h6'>
            {props.askerName}
          </Typography>

          <Typography  variant='subtitle2' color='textSecondary'>
            {props.askerWhenAsked}
          </Typography>
        </Box>
      </Grid>
    </Box>
  )
}
