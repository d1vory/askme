import React from 'react'
import {Route,Redirect,Switch} from 'react-router-dom'
import Wall from './containers/Wall'
import QuestionList from './containers/QuestionList'
import SignIn from './containers/SignIn'
import SignUp from './containers/SignUp'
import Settings from "./containers/Settings";
import { connect } from 'react-redux'
import SaveRouter from './SaveRouter'




export  const BaseRouter = () => (
  <Switch>

    <SaveRouter path='/signin' component={SignIn}/>
    <SaveRouter exact path= '/signup' component={SignUp}/>
    <SaveRouter path = '/wall' component={Wall}/>
    <SaveRouter path = '/questions' component={QuestionList}/>
    <SaveRouter path = '/settings' component={Settings}/>

  </Switch>
);

export default {BaseRouter}
