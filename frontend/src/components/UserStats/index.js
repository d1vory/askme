import React from 'react'
import {Typography,Box,Grid,Avatar, Button,Divider,Paper} from '@material-ui/core'
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PeopleIcon from '@material-ui/icons/People';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import axios from 'axios'
import {connect} from 'react-redux'



const styles = (theme) => ({
  largeAvatar: {
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
  mediumAvatar: {
    // color:'green',
    // backgroundColor:'blue',
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  gridFlex: {
    alignSelf: 'flex-start',
    justifySelf: 'flex-start'
  }
});


class UserStats extends React.Component {
  state= {

  }

  render(){
    const { classes } = this.props;

    return(
      <Paper>
      <Box p = {2}>
      <Grid container direction="row" alignItems="flex-start" justify="flex-start">
        <Box className={classes.gridFlex}>
          <Grid   direction="column" justify="center" >
            <Avatar className={classes.mediumAvatar}> <ChatBubbleIcon /> </Avatar>
            <Typography align="center">
              6
            </Typography>
            <Typography align="center">
              Posts
            </Typography>
          </Grid>
        </Box>

        <Divider orientation="vertical" variant='middle'/>
        <Box className={classes.gridFlex}>
          <Grid   direction="column" justify="center" >
            <Avatar className={classes.mediumAvatar} > <FavoriteIcon /> </Avatar>
            <Typography align="center">
              12
            </Typography>
            <Typography align="center">
              Likes
            </Typography>
          </Grid>
        </Box>

        <Divider orientation="vertical" variant='middle'/>
        <Box className={classes.gridFlex}>
          <Grid   direction="column" justify="center" >
            <Avatar className={classes.mediumAvatar}> <PeopleIcon /> </Avatar>
            <Typography align="center">
              3
            </Typography>
            <Typography align="center">
              Friends
            </Typography>
          </Grid>
        </Box>

      </Grid>
      </Box>
    </Paper>
    )
  }
}

UserStats.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(UserStats)
