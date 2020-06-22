import React,{Component} from 'react'
import Answer from '../Answer'
import {Box,Typography} from '@material-ui/core'
import axios from 'axios'
import transformtimestamp from '../utils'
import {connect} from 'react-redux'

class Feed extends Component {

  render(){
    const emptyOrAnswers = this.props.answers ?
    (this.props.answers.map((answer,index) => (
      <Box  key = {answer.id}>
        <Answer answerId={answer.id}
        askedUserFirstName = {answer.askedUser.first_name}
        askedUserLastName = {answer.askedUser.last_name}
        askedUserUsername = {answer.askedUser.username}
        asker = {answer.asker}
        questionText= {answer.question_text}
        whenAnswered = {transformtimestamp(answer.timestamp)}
        answerText= {answer.answer_text}
        likesAmount= {answer.likes}
        dislikesAmount= {answer.dislikes}
        avatar = {answer.askedUser.avatar}
        token={this.props.token}/>
      </Box>
    )) ) : <Typography variant="h3">No answers yet </Typography>
    return (
      <Box >
          {emptyOrAnswers}
      </Box>
    )
  }
}



const mapStateToProps = state => {
  return {
    token: state.token
  }
}


export default connect(mapStateToProps)(Feed)
