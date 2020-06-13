import React,{Component} from 'react'
import Logo from './Logo.js'
import Navigation from './Navigation'
import { makeStyles } from '@material-ui/core/styles';
import {AppBar,Toolbar, Typography, Button, IconButton,Link,Box} from '@material-ui/core'
import './styles.css'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {Link as RouterLink} from 'react-router-dom'
import {connect} from 'react-redux'
import * as actions from '../../store/actions/auth'

const styles = theme => ({
  linkStyle:{
    color:'green',
  }

});

class Header extends Component {

  constructor(props){
    super(props)

  }

  render(){
    //const { classes } = this.props;
    return(

      <AppBar position ="sticky" >
        <Toolbar>
          <div className="logo-holder">
            <img className="logo-img" src={require("../../common/assets/logo-dumb.png")}/>

          </div>
              <Box m = {2}>
                  <Typography color="textPrimary">
                    <RouterLink to="/wall">
                        Home
                    </RouterLink>

                  </Typography>

              </Box>

              <Box m = {2}>

                <Typography color="textPrimary">
                  <RouterLink to="/questions">
                      Questions
                  </RouterLink>
                 </Typography>

              </Box>

              <Box m = {2}>
              <Link href="">
                <Typography color="textPrimary">
                Friends
                </Typography>
              </Link>
              </Box>

              <Box m = {2}>
              <Link href="">
                <Typography color="textPrimary">
                 Settings
                 </Typography>
              </Link>
              </Box>

              {
                this.props.isAuthenticated ?

                <Box m = {2}>
                  <Button color="inherit" onClick={this.props.logout}>
                    Log out
                  </Button>

                </Box>

                :

                <Box m = {2}>

                  <Typography color="textPrimary">
                    <RouterLink to= '/signin'>
                        Log in
                    </RouterLink>

                    </Typography>

                </Box>
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
