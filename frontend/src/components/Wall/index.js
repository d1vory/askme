import React,{Component} from 'react'
import QuestionForm from '../QuestionForm'
import Feed from '../Feed'


export default class Wall extends Component {


  render(){
    return(
      <div>
        <QuestionForm />
        <Feed />
      </div>
    )
  }
}
