import React from 'react'
import {Route,Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import SignIn from './containers/SignIn'
import SignUp from './containers/SignUp'

const SaveRouter = props => {
  const {isAuthenticated,path} = props
  if(isAuthenticated){
    return <Route {...props} />
  }else {
    if(path === '/signup'){
      return <Route exact path= '/signup' component={SignUp}/>
    }else if (path ==='/signin') {
      return <Route exact path= '/signin' component={SignIn}/>
    }else{
      return <Redirect to='/signin' />
    }

  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null
  }
}

export default connect(mapStateToProps)(SaveRouter)
