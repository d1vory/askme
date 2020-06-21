import React,{Component} from 'react'
import {AppBar,Toolbar,  Button, Box} from '@material-ui/core'
import './styles.css'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {Link as RouterLink} from 'react-router-dom'
import {connect} from 'react-redux'
import * as actions from '../../store/actions/auth'

const styles = theme => ({
  linkStyle:{
    color:'#e8e9eb',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
      color:'#e8e9eb'
    }
  },
  linkWrapper:{
    '&:hover':{
      backgroundColor:'#293783',
      borderRadius:'20%'
    }
  }

});

class Header extends Component {

  handleSignOutClick = () => {
    this.props.logout()
    this.props.history.push('/signin')
  }

  render(){
    const { classes } = this.props;

    const logoutButton = this.props.isAuthenticated && (
      <Box m = {2}>
      <Button color="inherit" onClick={this.props.logout}>
        Log out
      </Button>

    </Box>)

    return(

      <AppBar position ="sticky" >
        <Toolbar>
          <div className="logo-holder">
            <img className="logo-img" alt="logo" src={require("../../common/assets/logo-dumb.png")}/>

          </div>


                    <RouterLink className={classes.linkStyle} to="/wall">
                      <Box className={classes.linkWrapper} p = {1} m={1}>
                        Home
                        </Box>
                    </RouterLink>





                    <RouterLink className={classes.linkStyle}  to="/questions">
                      <Box className={classes.linkWrapper} p = {1} m={1}>
                        Questions
                        </Box>
                    </RouterLink>



                    <RouterLink className={classes.linkStyle} to="/friends">
                      <Box className={classes.linkWrapper} p = {1} m={1}>
                        Friends
                        </Box>
                    </RouterLink>




                    <RouterLink className={classes.linkStyle} to="/account">
                      <Box className={classes.linkWrapper} p = {1} m={1}>
                        Account
                        </Box>
                    </RouterLink>





                    <RouterLink className={classes.linkStyle} to="/settings">
                      <Box className={classes.linkWrapper} p = {1} m={1}>
                        Settings
                        </Box>
                    </RouterLink>




              {
                logoutButton
              }





        </Toolbar>
      </AppBar>
    )
  }
}


Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(actions.logout())

    }
  }
}


export default connect(null,mapDispatchToProps)(withStyles(styles)(Header))
