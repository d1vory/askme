import React,{Component} from 'react'
import Logo from './Logo.js'
import Navigation from './Navigation'
import { makeStyles } from '@material-ui/core/styles';
import {AppBar,Toolbar, Typography, Button, IconButton,Link} from '@material-ui/core'
import './styles.css'



export default class Header extends Component {


  render(){
    return(
      <AppBar position ="sticky" >
        <Toolbar>
          <div className="logo-holder">
            <img className="logo-img" src={require("../../common/assets/logo-dumb.png")}/>

          </div>
              <Typography>
            <Button color="inherit">Home</Button>
            <Button color="inherit">Questions </Button>
            <Button color="inherit">Friends</Button>
            <Button color="inherit">Settings</Button>
              <Button color="inherit"> Log out</Button>
          </Typography>
        </Toolbar>
      </AppBar>
    )
  }
}
