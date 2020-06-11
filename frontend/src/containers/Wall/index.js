import React,{Component} from 'react'
import QuestionForm from '../../components/QuestionForm'
import Feed from '../../components/Feed'
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
