import React from 'react'
import {Box,Grid} from '@material-ui/core'

import axios from 'axios'
import {connect} from 'react-redux'

import UserPanel from '../../components/UserPanel'
import QuestionForm from '../../components/QuestionForm'
import Feed from '../../components/Feed'

// // http://127.0.0.1:8000/api/users/maffioznik/info/
// // http://127.0.0.1:8000/api/users/maffioznik/answers/
// http://127.0.0.1:8000/user/api/users/maffioznik/answers/
// http://127.0.0.1:8000/user/maffioznik/api/users/maffioznik/answers/

class Account extends React.Component {
  state = {
    answers: [],
    user: {},
    stats:{},
    nextUrl:''
  }

  fetchAnswers = (token, username) => {
    let url = (!username) ? 'api/account/answers/' : `api/users/${username}/answers/`
    //console.log(url);
    // axios.interceptors.request.use(function (config) {
    //   console.log(config)
    //   return config
    // }, function (error) {
    //   return Promise.reject(error)
    // })
    axios.get(url,{
        headers: {
          'Authorization' : `Token ${token}`
        }
    }).then(res => {

        //console.log("FETCHED   " ,res);
        this.setState({
          answers: res.data.results,
          nextUrl: res.data.next
        });

      }).catch(error => (console.log(error)))
  }

  fetchUserInfo = (token, username) => {
    let url =''
    if(!username){
      url = 'api/account/info/'
    }else{
      url = `api/users/${username}/info/`
    }

    axios.get(url,{
        headers: {
          'Authorization' : `Token ${token}`
        }
    }).then(res => {
      //  console.log("FETCHED  INFO:  " ,res.data);
        this.setState({
          user: res.data
        });

      }).catch(error => (console.log(error)))
  }

  fetchUserStats = (token,username) => {
    let url =''
    if(!username){
      url = 'api/account/info/stats/'
    }else{
      url = `api/users/${username}/info/stats/`
    }

    axios.get(url,{
        headers: {
          'Authorization' : `Token ${token}`
        }
    }).then(res => {
      //  console.log("FETCHED   " ,res.data);
        this.setState({
          stats: res.data
        });

      }).catch(error => (console.log(error)))
  }


  componentWillReceiveProps(newProps){
    if (newProps.token){

      this.fetchAnswers(newProps.token, newProps.match.params.username)
      this.fetchUserInfo(newProps.token, newProps.match.params.username)
      this.fetchUserStats(newProps.token, newProps.match.params.username)
    }

  }

  componentDidMount(){
    //if (this.props.token !== null){
      this.fetchAnswers(this.props.token, this.props.match.params.username)
      this.fetchUserInfo(this.props.token, this.props.match.params.username)
      this.fetchUserStats(this.props.token, this.props.match.params.username)
    //}
  }

  loadMoreAnswers = ( ) => {
    console.log('LOAD MORE ANSWERS');
    if(this.state.nextUrl){
      axios.get(this.state.nextUrl,{
          headers: {
            'Authorization' : `Token ${this.props.token}`
          }
      }).then(res => {
          this.setState({
            answers: this.state.answers.concat(res.data.results),
            nextUrl: res.data.next
          });

        })
    }
  }


  render(){
    const firstLastName = this.props.match.params.username ? (this.state.user.first_name + ' ' + this.state.user.last_name) : "yourself"
    return(
      <Grid>
        <UserPanel user={this.state.user} stats = {this.state.stats} />
        <Box>
          <QuestionForm firstLastName={firstLastName} isFriendPage={false} page="Account" askedUser={this.state.user.pk}   username="d1vory"/>

        </Box>
        <Feed answers = {this.state.answers} loadMoreAnswers={this.loadMoreAnswers}/>
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
