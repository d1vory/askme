import React,{Component} from 'react'
import QuestionForm from '../../components/QuestionForm'
import Feed from '../../components/Feed'
import './styles.css'
import axios from 'axios'
import {connect} from 'react-redux'

class Wall extends Component {

  state= {
    answers: [],
    nextUrl:''
  }

  fetchAnswers = (token) => {
    axios.get('api/answers/',{
        headers: {
          'Authorization' : `Token ${token}`
        }
    }).then(res => {
        this.setState({
          answers: res.data.results,
          nextUrl: res.data.next
        });
        //console.log("FETCHED ", res.data)
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

  loadMoreAnswers = ( ) => {
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
    return(
      <div  >
        <div className="wall">
          <QuestionForm caller="wall"/>
          <Feed answers={this.state.answers} loadMoreAnswers={this.loadMoreAnswers} />

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
