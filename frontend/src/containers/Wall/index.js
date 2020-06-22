import React,{Component} from 'react'
import QuestionForm from '../../components/QuestionForm'
import Feed from '../../components/Feed'
import './styles.css'
import axios from 'axios'
import {connect} from 'react-redux'


class Wall extends Component {

  state= {
    answers: []
  }

  fetchAnswers = (token) => {
    axios.get('http://127.0.0.1:8000/api/answers/',{
        headers: {
          'Authorization' : `Token ${token}`
        }
    }).then(res => {
        this.setState({
          answers: res.data
        });
        console.log("FAILED")
      })
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
      <div >
        <div className="wall">
          <QuestionForm answers={this.state.answers}/>
          <Feed />
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    token: state.token
  }
}



export default connect(mapStateToProps)(Wall)
