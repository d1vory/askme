import React from 'react'
import {Typography,Box,Grid,Avatar} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import UserStats from '../UserStats'


import CakeIcon from '@material-ui/icons/Cake';


const styles = (theme) => ({
  largeAvatar: {
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
  aboutText:{
    whiteSpace: 'pre-wrap'
  },
  cakeIconStyle:{
    color:'#AF0D81'
  }
});


class UserPanel extends React.Component {
  state= {

  }

  render(){
    const { classes } = this.props;

    return(
      <Grid container direction="row" justify="space-between">
        <Box>
        <Grid container direction="row">
        <Box m= {2 }>
          <Avatar src={this.props.user.avatar} className={classes.largeAvatar}/>
        </Box>

        <Box>

          <Box>
            <Box>
              <Typography variant="h4">
                {this.props.user.first_name + ' ' + this.props.user.last_name}
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle1" color='textSecondary'>
                {'@' + this.props.user.username}
              </Typography>
            </Box>
          </Box>

          <Box mt = {1}>
            <Grid container display='row'>
              <CakeIcon className={classes.cakeIconStyle}/>
              <Typography variant='body1' className={classes.aboutText}>
                {this.props.user.DateOfBirth}
              </Typography>
            </Grid>

            <Box pt={1}>
              <Typography variant='body1' className={classes.aboutText}>
                {this.props.user.selfDescription}
              </Typography>
            </Box>
          </Box>


      </Box>
        </Grid>
    </Box>
      <UserStats stats={this.props.stats}/>
      </Grid>
    )
  }
}

UserPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(UserPanel)
