import React,{Component} from 'react'
import Edit from '../../components/infoEdit'
import './styles.css'
import {Grid ,Snackbar} from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';

import Password from "../../components/Password";
import {connect} from 'react-redux'

class Settings extends Component {
  state = {
    openInfo:false,
    infoType:'success',
    infoMessage:''
  }

  openInfo = (message, type) => {
    this.setState({
      openInfo:true,
      infoMessage:message,
      infoType:type
    })
  }

  handleInfoClose = () => {
    this.setState({
      openInfo:false
    })
  }

  render(){
    return(
      <div >
        <Grid  container spacing={4} >

          <Grid item md={7} xs={12}>
            <Edit  openInfo={this.openInfo}/>
          </Grid>

          <Grid item md={5} xs={12}  >
            <Password />
          </Grid>
        </Grid>

        <Snackbar open={this.state.openInfo} autoHideDuration={6000} onClose={this.handleInfoClose}>
           <MuiAlert elevation={6} severity={this.state.infoType} onClose={this.handleInfoClose} >
             {this.state.infoMessage}
           </MuiAlert>
        </Snackbar>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    token: state.token
  }
}



export default connect(mapStateToProps)(Settings)
