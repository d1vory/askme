import React from 'react'
import {Typography,Box,Grid,Avatar, Button} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import UserStats from '../UserStats'
import axios from 'axios'
import {connect} from 'react-redux'

const styles = (theme) => ({
  largeAvatar: {
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
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


            <Grid>
              <Button variant="outlined" > Add to friends </Button>
            </Grid>
          </Box>

      </Box>
        </Grid>
    </Box>
      <UserStats />
      </Grid>
    )
  }
}

UserPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(UserPanel)
