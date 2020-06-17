import React from 'react'
import {Typography,Box} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Question from '../../components/Question'
import axios from 'axios'
import {connect} from 'react-redux'
import AnswerForm from '../../components/AnswerForm'

const styles = theme => ({


});


class QuestionList extends React.Component{

  constructor(props){
    super(props)

    this.state = {
      questions : [],
      error: ''
    };
  }

  fetchQuestions= (token) => {
    const url = 'http://127.0.0.1:8000/api/questions/'
    axios.get(url,{
        headers: {
          'Authorization' : `Token ${token}`
        }
    }).then(res => {
      this.setState({
        questions: res.data
      });
    }).catch(err => {
      this.setState({
        error: err
      })
    })

  }

  componentWillReceiveProps(newProps){
    if (newProps.token){
      this.fetchQuestions(newProps.token)
    }

  }

  componentDidMount(){

    if (this.props.token !== null){
      this.fetchQuestions(this.props.token)
    }


  }

  render(){
    const { classes } = this.props;

    return(
      <Box>
        <Typography variant='h4'>
          Your questions
        </Typography>

        {
          this.state.questions.map((question,index) => (
            <Box key={question.id} my={2}>
              <Question  question= {question}/>
            </Box>

          ))
        }
      </Box>
    )
  }
}

QuestionList.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    token: state.token
  }
}

const styledList = withStyles(styles)(QuestionList)

export default connect(mapStateToProps)(styledList)
