import React from 'react';
import Header from '../components/Header'
import {withRouter,Switch,Redirect,useHistory,useLocation,Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {Box} from '@material-ui/core'
import * as actions from '../store/actions/auth'
import SignIn from './SignIn'
import SignUp from './SignUp'

class CustomLayout extends React.Component{
  render(){
    const header = this.props.isAuthenticated && (<Header isAuthenticated = {this.props.isAuthenticated}  logoutFunc = {this.props.logout}> </Header>)
    return(


        <Box>
            {
              header
            }
            <Box mx={10}  mt={2}>
              {this.props.children}
            </Box>
          </Box>

    )
  }

}



const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch.actions.logout()
    }
  }
}


export default withRouter(connect(null,mapDispatchToProps)(CustomLayout))
