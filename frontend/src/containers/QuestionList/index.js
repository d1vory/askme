import React from 'react'
import {Typography,Box} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Question from '../../components/Question'
import axios from 'axios'

const styles = theme => ({


});


class QuestionList extends React.Component{

  constructor(props){
    super(props)

    this.state = {
      questions : []
    };
  }

  componentDidMount(){
    axios.get('http://127.0.0.1:8000/api/v0/questions/').then(res => {
      this.setState({
        questions: res.data
      });
    })
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

export default withStyles(styles)(QuestionList)
