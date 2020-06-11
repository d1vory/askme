import React,{Component} from 'react'

import Wall from '../../containers/Wall'
import CustomLayout from '../../containers/CustomLayout'
import BaseRouter from '../../routes'
import {BrowserRouter as Router} from 'react-router-dom'

// main component
export default class App extends Component {

  render() {
    return (
      <Router>
        <CustomLayout>
          <BaseRouter />
        </CustomLayout>
      </Router>
    )
  }
}
