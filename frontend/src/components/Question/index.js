import React from 'react'
import {Card,Grid,Box,CardHeader,Avatar,IconButton,CardContent,Typography,Button} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Popup from "reactjs-popup";
import AnswerForm from '../AnswerForm'
import DeleteIcon from '@material-ui/icons/Delete';
import {connect} from 'react-redux'
import axios from 'axios'

const styles = theme => ({
  deleteButton: {
    backgroundColor:'#f90000'
  }

});


class Question extends React.Component{


  handleDeleteQuestionButton = () => {
    console.log(this.props.token);
    const data = {
      id: this.props.question.id,
    }
    const config = {
      headers: {
        'Authorization' : `Token ${this.props.token}`
      }
    }
    axios.delete(`http://127.0.0.1:8000/api/questions/${this.props.question.id}/delete/`,config)
      .then(res => this.props.handleDelete(this.props.question.id))
      .catch(err => console.log(err))

  }

  render(){
    const {whenAsked,question_text} = this.props.question

    const { classes } = this.props;
    const ava = (<Avatar aria-label="user" >
      <AccountCircleIcon />
    </Avatar> )
    const moreButton = (<IconButton aria-label="more"> <MoreVertIcon /> </IconButton>)
    const deleteQuestionButton = (
      <Button
        variant="contained"
        color="secondary"
        size="small"
        className={classes.deleteButton}
        startIcon={<DeleteIcon />}
        onClick={this.handleDeleteQuestionButton}
      >
        Delete question
      </Button>)

    const popupMore = (
      <Popup trigger = {moreButton}  position="left center">
        <Grid >
          {deleteQuestionButton}
        </Grid>

      </Popup>
    )
    return(
      <Box>

        <Card>
          <CardHeader  avatar={ava} action={popupMore}
          title={question_text} titleTypographyProps= {{variant:'h4'}}/>
          <CardContent>
            <Grid container direction="row" justify="space-between">
              <Typography color='textSecondary' variant ='subtitle2'>yesterday </Typography>

              <Popup lockScroll modal closeOnEscape closeOnDocumentClick trigger = {  <Button color="primary" variant="contained"  endIcon={<ChevronRightIcon />}>Answer</Button>}>
                {close => (<AnswerForm closeElement = {close} deleteQuestionFromDOM={this.props.handleDelete} question_id={this.props.question.id} question_text= {question_text}/>)

                }

              </Popup>

            </Grid>
          </CardContent>
        </Card>

      </Box>
    )
  }
}

Question.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    token: state.token
  }
}

const styledQuestion = withStyles(styles)(Question)

export default connect(mapStateToProps)(styledQuestion)
