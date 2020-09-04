import React,{Component} from 'react'
import Answer from '../Answer'
import {Box,Typography,CircularProgress,Grid,Snackbar} from '@material-ui/core'
import transformtimestamp from '../utils'
import { Waypoint } from 'react-waypoint';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}



class Feed extends Component {

  state= {
    isLoading:false,
    openInfo:false,
    infoMessage:'',
    infoType:''
  }

  openInfo = (message, type) => {
    this.setState({
      openInfo:true,
      infoMessage:message,
      infoType:type,

    })
  }

  closeInfo = () => {
    this.setState({
      openInfo:false
    })
  }

  prepareToLoad = () => {
    //console.log('LOAD MORE in feed');
     this.setState({ loading: true });
     this.props.loadMoreAnswers()
      this.setState({ loading: false });
  }

  renderWaypoint = () => {
    if (!this.state.isLoading) {
      return (
        <Waypoint onEnter={this.prepareToLoad}  threshold={2.0}/>
      );
    }
  }

  render(){
    const emptyOrAnswers =  (Array.isArray(this.props.answers) && this.props.answers.length ) ?
    (this.props.answers.map((answer,index) => (
      <Box  key = {answer.id}>
        <Answer answerId={answer.id}
        askedUserFirstName = {answer.askedUser.first_name}
        askedUserLastName = {answer.askedUser.last_name}
        askedUserUsername = {answer.askedUser.username}
        asker = {answer.asker}
        questionText= {answer.question_text}
        whenAnswered = {transformtimestamp(answer.timestamp)}
        answerText= {answer.answer_text}
        likesAmount= {answer.likes}
        dislikesAmount= {answer.dislikes}
        avatar = {answer.askedUser.avatar}
        token={this.props.token}
        openInfo={this.openInfo}/>
        {(index === this.props.answers.length - 2 ) && this.renderWaypoint() }
      </Box>
    )) ) : <Typography variant="h3">No answers yet </Typography>

    const progress = this.state.isLoading && (<Grid container direction='row' justify ='center' > <CircularProgress />  </Grid>)
    return (
      <Box >
          {emptyOrAnswers}
          {progress }
          <Snackbar open={this.state.openInfo} autoHideDuration={6000} onClose={this.handleInfoClose}>
            <Alert onClose={this.closeInfo} severity={this.state.infoType}>
              {this.state.infoMessage}
            </Alert>
          </Snackbar>
      </Box>
    )
  }
}


export default Feed
