import React from 'react'
import {Route} from 'react-router-dom'
import Wall from './containers/Wall'
import QuestionList from './containers/QuestionList'
import SignIn from './containers/SignIn'
import SignUp from './containers/SignUp'
import Settings from "./containers/Settings";

const BaseRouter = () => (
  <div>
    <Route exact path = '/wall' component={Wall} />
    <Route exact path = '/questions' component={QuestionList} />
    <Route exact path='/signin' component={SignIn}/>
    <Route exact path= '/signup' component={SignUp}/>
      <Route exact path= '/settings' component={Settings}/>
  </div>
);

export default BaseRouter
