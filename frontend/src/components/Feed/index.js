import React,{Component} from 'react'
import Answer from '../Answer'
import answerExample from './answerExample.js'

export default class Feed extends Component {

  render(){
    return (
      <div>
        <Answer answerID={answerExample.answerID} userID={answerExample.userID}
        askerName={answerExample.askerName} questionText= {answerExample.questionText}
        askerWhenAsked ={answerExample.askerWhenAsked}
        answerText= {answerExample.answerText} likesAmount= {answerExample.likesAmount}
        dislikesAmount= {answerExample.dislikesAmount}/>

        <Answer answerID={answerExample.answerID} userID={answerExample.userID}
        askerName={answerExample.askerName} questionText= {answerExample.questionText}
        askerWhenAsked ={answerExample.askerWhenAsked}
        answerText= {answerExample.answerText} likesAmount= {answerExample.likesAmount}
        dislikesAmount= {answerExample.dislikesAmount}/>

        <Answer answerID={answerExample.answerID} userID={answerExample.userID}
        askerName={answerExample.askerName} questionText= {answerExample.questionText}
        askerWhenAsked ={answerExample.askerWhenAsked}
        answerText= {answerExample.answerText} likesAmount= {answerExample.likesAmount}
        dislikesAmount= {answerExample.dislikesAmount}/>
        Feeds
      </div>
    )
  }
}
