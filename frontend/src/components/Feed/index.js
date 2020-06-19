import React,{Component} from 'react'
import Answer from '../Answer'
import {Box} from '@material-ui/core'
import axios from 'axios'



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
    axios.get('http://127.0.0.1:8000/api/answers/').then(res => {
      this.setState({
        answers: res.data
      });
      console.log(res.data)
    })
  }

  render(){
    return (
      <Box >
          {this.state.answers.map((answer,index) => (
            <Box  key = {answer.id}>
              <Answer answerID={answer.id} userID={answer.question.askedUser.id}
              askerName= "@Rick_Astley" questionText= {answer.question.question_text}
              askerWhenAsked = {answer.question.timestamp}
              answerText= {answer.answer_text} likesAmount= {answer.likes}
              dislikesAmount= {answer.dislikes}  />
            </Box>
          ))}
      </Box>
    )
  }
}
