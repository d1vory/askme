import React,{Component} from 'react'
import QuestionForm from '../QuestionForm'
import Feed from '../Feed'
import './styles.css'

export default class Wall extends Component {


  render(){
    return(
      <div >
        <div className="wall">
          <QuestionForm />
          <Feed />
        </div>
      </div>
    )
  }
}
