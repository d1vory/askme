import React,{Component} from 'react'


import CustomLayout from '../../containers/CustomLayout'
import {BaseRouter} from '../../routes'
import {BrowserRouter as Router} from 'react-router-dom'
import { connect } from 'react-redux'

import * as actions from '../../store/actions/auth'

// main component
class App extends Component {

  componentDidMount(){
    this.props.onTryAutoSignup()
  }

  render() {
    return (
      <Router>
        <CustomLayout {...this.props}>
          <BaseRouter />

        </CustomLayout>
      </Router>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
