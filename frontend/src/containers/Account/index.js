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
    answers: []
  }

  fetchAnswers = (token) => {
    axios.get('http://127.0.0.1:8000/api/account/answers/',{
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

  componentWillReceiveProps(newProps){
    if (newProps.token){
      this.fetchAnswers(newProps.token)
    }

  }

  componentDidMount(){
    if (this.props.token !== null){
      this.fetchAnswers(this.props.token)
    }
  }


  render(){
    return(
      <Grid>
        <UserPanel />
        <Box>
          <QuestionForm firstLastName="yourself" isFriendPage={false}  askedUser={1}   username="d1vory"/>

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
