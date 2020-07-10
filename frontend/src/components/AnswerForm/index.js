import React from 'react'
import {Card,Grid,Box,CardHeader,CardActions,TextField, IconButton,Container,Button} from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send';
import CancelIcon from '@material-ui/icons/Cancel';
import axios from 'axios'
import {connect} from 'react-redux'

class AnswerForm extends React.Component {

  state = {
    answerValue:''
  }

  handleAnswerChange = (event) => {
    this.setState({
      answerValue:event.target.value
    })
  }

  handleSendButton = (event) => {
    const postData = {
      question_id: this.props.question_id,
      answer_text: this.state.answerValue


    }

    const config = {
      headers: {
        'Authorization' : `Token ${this.props.token}`,
        'Content-Type': 'application/json'
      }
    }
    axios.post('api/answers/create/',postData,config)
      .then(res => {
        this.props.deleteQuestionFromDOM(this.props.question_id)
        this.props.closeElement()})
      .catch(err => console.log(err))
  }

  render(){
    const closeButton =(
     <IconButton onClick={this.props.closeElement} >
      <CancelIcon />
    </IconButton>)
    return (
      <Box>
        <Card>
          <CardHeader title={this.props.question_text} action={closeButton}/>
          <CardActions >
            <Container>
              <TextField label="Answer" size="small" variant="outlined" multiline fullWidth rows={8} onChange={this.handleAnswerChange} value= {this.state.answerValue}>

              </TextField>
              <Box mt={1} bm={2}>
                <Grid  container direction="row" justify="flex-end"  alignItems="center">

                  <Button variant="contained" color='secondary' onClick={this.handleSendButton} endIcon={<SendIcon />} >
                    Send
                  </Button>
                </Grid>
              </Box>

            </Container>

          </CardActions>
        </Card>
      </Box>
    )
  }
}

const mapStateToProps = state => {
  return {
    token: state.token
  }
}


export default connect(mapStateToProps)(AnswerForm)
