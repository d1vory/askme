import React from 'react'
import {Route,Redirect} from 'react-router-dom'
import Wall from './containers/Wall'
import QuestionList from './containers/QuestionList'
import SignIn from './containers/SignIn'
import SignUp from './containers/SignUp'
import Settings from "./containers/Settings";
import Friends from './containers/Friends'
import Start from './containers/Start'
import Account from './containers/Account'



const PrivateRoute = ({ component: Component, ...rest }) => {
  const authenticated = localStorage.getItem("token") !== null;
  return (
    <Route
      {...rest}
      render={props =>
        authenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};


const Hoc = props => props.children;


export  const BaseRouter = () => (
  <Hoc>
    <Route exact path="/" component={Start} />
    <Route path="/signin" component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route path= '/user/:username/' component={Account}/>
    <PrivateRoute path = '/wall' component={Wall}/>
    <PrivateRoute path = '/questions' component={QuestionList}/>
    <PrivateRoute path = '/settings' component={Settings}/>
    <PrivateRoute  path= '/friends' component={Friends}/>
    <PrivateRoute path= '/account' component={Account}/>

  </Hoc>
);

export default BaseRouter
