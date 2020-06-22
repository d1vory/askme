import React from 'react'
import {Typography,Box,Grid} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import axios from 'axios'
import {connect} from 'react-redux'

import UserPanel from '../../components/UserPanel'
import UserStats from '../../components/UserStats'
import QuestionForm from '../../components/QuestionForm'
import Feed from '../../components/Feed'

class Account extends React.Component {
  state = {
    answers: [],
    user: {}
  }

  fetchAnswers = (token, username) => {
    let url = ''
    if(!username){
      url = 'http://127.0.0.1:8000/api/account/answers/'
    }else{
      url = `http://127.0.0.1:8000/api/users/${username}/answers/`
    }

    axios.get(url,{
        headers: {
          'Authorization' : `Token ${token}`
        }
    }).then(res => {

        console.log("FETCHED   " ,res.data);
        this.setState({
          answers: res.data
        });

      }).catch(error => (console.log(error)))
  }

  fetchUserInfo = (token, username) => {
    let url =''
    if(!username){
      url = 'http://127.0.0.1:8000/api/account/info/'
    }else{
      url = `http://127.0.0.1:8000/api/users/${username}/info/`
    }

    axios.get(url,{
        headers: {
          'Authorization' : `Token ${token}`
        }
    }).then(res => {
        console.log("FETCHED   " ,res.data);
        this.setState({
          user: res.data
        });

      }).catch(error => (console.log(error)))
  }



  componentWillReceiveProps(newProps){
    if (newProps.token){

      this.fetchAnswers(newProps.token, newProps.match.params.username)
      this.fetchUserInfo(newProps.token, newProps.match.params.username)
    }

  }

  componentDidMount(){
    if (this.props.token !== null){
      this.fetchAnswers(this.props.token, this.props.match.params.username)
      this.fetchUserInfo(this.props.token, this.props.match.params.username)
    }
  }


  render(){
    return(
      <Grid>
        <UserPanel user={this.state.user}/>
        <Box>
          <QuestionForm firstLastName="yourself" isFriendPage={false} page="Account" askedUser={this.state.user.pk}   username="d1vory"/>

        </Box>
        <Feed answers = {this.state.answers}/>
      </Grid>
    )
  }

}

const mapStateToProps = state => {
  return {
    token: state.token
  }
}



export default connect(mapStateToProps)(Account)
