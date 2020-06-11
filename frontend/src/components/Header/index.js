import React,{Component} from 'react'
import Logo from './Logo.js'
import Navigation from './Navigation'
import { makeStyles } from '@material-ui/core/styles';
import {AppBar,Toolbar, Typography, Button, IconButton,Link,Box} from '@material-ui/core'
import './styles.css'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

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
                <Link href="#" >
                  <Typography color="textPrimary">
                    Home
                  </Typography>
                </Link>
              </Box>

              <Box m = {2}>
              <Link href="">
                <Typography color="textPrimary">
                 Questions
                 </Typography>
              </Link>
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

              <Box m = {2}>
              <Link href="">
                <Typography color="textPrimary">
                  Log in
                  </Typography>
               </Link>
               </Box>



        </Toolbar>
      </AppBar>
    )
  }
}


Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header)
