import React from 'react'
import {Route} from 'react-router-dom'
import Wall from './containers/Wall'
import QuestionList from './containers/QuestionList'


const BaseRouter = () => (
  <div>
    <Route exact path = '/wall' component={Wall} />
    <Route exact path = '/questions' component={QuestionList} />
  </div>
);

export default BaseRouter
