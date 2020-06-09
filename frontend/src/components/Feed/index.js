import React,{Component} from 'react'
import Answer from '../Answer'
import answerExample from './answerExample.js'
import {Box} from '@material-ui/core'



export default class Feed extends Component {

  constructor(props){
    super(props)

    this.state = {
      answers : []
    };
  }



  async loadAnswers(){
    this.setState({
      answers: await fetch("api/v0/answers/").then(response => response.json())
    })
  }

  componentDidMount(){
    this.loadAnswers();
  }

  render(){
    return (
      <Box container>
          {this.state.answers.map((answer,index) => (
            <Box item key = {answer.id}>
              <Answer answerID={answer.id} userID={answer.question.askedUser.id}
              askerName= "{answer.question.asker.user.username}" questionText= {answer.question.question_text}
              askerWhenAsked = {answer.question.timestamp}
              answerText= {answer.answer_text} likesAmount= {answer.likes}
              dislikesAmount= {answer.dislikes}  />
            </Box>
          ))}
      </Box>
    )
  }
}
