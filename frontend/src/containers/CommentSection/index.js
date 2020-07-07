import React,{Component} from 'react'

import {Grid} from '@material-ui/core'

import axios from 'axios'
import {connect} from 'react-redux'


class CommentSection extends Component{

  state = {
    comments:[]
  }

  fetchComments = (token) => {
    axios.get(`http://127.0.0.1:8000/api/answer/${this.props.answerId}/comments/`,{
        headers: {
          'Authorization' : `Token ${token}`
        }
    }).then(res => {
        this.setState({
          comments: res.data
        });
        console.log("FETCHED ", res.data)
      })
  }


  componentDidMount(){
    if (this.props.token !== null){
      this.fetchComments(this.props.token)
    }
  }


  render(){
    return(
      <Grid>
        
      </Grid>
    )
  }
}


const mapStateToProps = state => {
  return {
    token: state.token
  }
}



export default connect(mapStateToProps)(CommentSection)
