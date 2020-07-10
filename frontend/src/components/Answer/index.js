import React,{Component} from 'react'

import PropTypes from 'prop-types';
//import ReactionButton from './ReactionButton'
import UserInfo from '../UserInfo'
import CommentSection from '../../containers/CommentSection'

import {Card,Box,Typography,CardContent,CardActions,CardHeader,Collapse,
        FormControl,FilledInput,IconButton,Grid} from '@material-ui/core'
import ThumbUpRoundedIcon from '@material-ui/icons/ThumbUpRounded';
import ThumbDownRoundedIcon from '@material-ui/icons/ThumbDownRounded';
import ChatRoundedIcon from '@material-ui/icons/ChatRounded';
import SendIcon from '@material-ui/icons/Send';
import axios from 'axios'
import { withStyles } from '@material-ui/core/styles';
import {Link } from 'react-router-dom'
import {connect} from 'react-redux'


const styles = theme => ({

  inputWrapper: {
    flex:1,
  },
  likedButton:{
    color:'blue'
  },
  dislikedButton:{
    color:'blue'
  }

});

class Answer extends Component {

  constructor(props){
    super(props)

    this.state = {
      likes: this.props.likesAmount,
      isLiked:false,
      dislikes: this.props.dislikesAmount,
      isDisliked:false,
      isCommentsOpen:false,
      commentText:'',
      addedNewComment:false
    }

  }


  updateWithNewComment = (val) => {
    this.setState({addedNewComment:val})
  }


  fetchLike = (val) => {
    const postData = {
        likes:this.state.likes + val
    }
    const config = {
      headers: {
        'Authorization' : `Token ${this.props.token}`,
        'Content-Type': 'application/json'
      }
    }
    axios.patch(`http://127.0.0.1:8000/api/answer/${this.props.answerId}/like/`,postData,config)
      .then(res => {
        this.setState({
          likes: this.state.likes + val
        })
                    })
      .catch(err => console.log(err))
  }

  fetchDislike = (val) => {
    const postData = {
        dislikes:this.state.dislikes + val
    }
    const config = {
      headers: {
        'Authorization' : `Token ${this.props.token}`,
        'Content-Type': 'application/json'
      }
    }
    axios.patch(`http://127.0.0.1:8000/api/answer/${this.props.answerId}/dislike/`,postData,config)
      .then(res => {
        this.setState({
          dislikes: this.state.dislikes + val
        })
                    })
      .catch(err => console.log(err))
  }

  handleLikeButton = () => {
    if(this.state.isDisliked){
      this.handleDislikeButton()
    }
    if(!this.state.isLiked){
      this.fetchLike(1)
      this.setState({
        isLiked:true
      })
    }else{
      this.fetchLike(-1)
      this.setState({
        isLiked:false
      })
    }

  }

  handleDislikeButton = () => {
    if(this.state.isLiked){
      this.handleLikeButton()
    }
    if(!this.state.isDisliked){
      this.fetchDislike(1)
      this.setState({
        isDisliked:true
      })
    }else{
      this.fetchDislike(-1)
      this.setState({
        isDisliked:false
      })
    }

  }

  handleCommentsButton = () => {
    this.setState({
      isCommentsOpen: !this.state.isCommentsOpen
    })
  }


  handleSendButton = () => {
    const postData = {
      comment_text: this.state.commentText
    }

    const config = {
      headers: {
        'Authorization' : `Token ${this.props.token}`,
        'Content-Type': 'application/json'
      }
    }
    axios.post(`http://127.0.0.1:8000/api/answer/${this.props.answerId}/comment/create/`,postData,config)
      .then(res => {
        this.setState({commentText:''});
        if(this.state.isCommentsOpen){
          this.updateWithNewComment(true)
        }
      }).catch(err => console.log(err.response.data))

  }

  render(){
    const { classes } = this.props;
    const likeIcon =  this.state.isLiked ?  <ThumbUpRoundedIcon className={classes.likedButton}/> :   <ThumbUpRoundedIcon/>
    const dislikeIcon =  this.state.isDisliked ?  <ThumbDownRoundedIcon className={classes.dislikedButton}/> :   <ThumbDownRoundedIcon/>
    const subheader = this.props.asker ? (<Link style={{ textDecoration: 'none', color:'inherit' }} to = {`/user/${this.props.asker.username}/`} > {'@' + this.props.asker.username} </Link> ): undefined
    return (
      <Box my={2}>
        <Card variant="outlined">
          <CardHeader title= {this.props.questionText} titleTypographyProps = {{variant:'h4'}}
                      subheader={subheader}  subheaderTypographyProps={{ color:'textSecondary' }}/>

          <CardContent>
            <UserInfo whenAnswered={this.props.whenAnswered}
                        avatar = {this.props.avatar}
                        firstName = {this.props.askedUserFirstName}
                        lastName = {this.props.askedUserLastName}
                        askedUserUsername = {this.props.askedUserUsername}
                       />

            <Typography variant='body1' >
              {this.props.answerText}
            </Typography>

          </CardContent>

          <CardActions>


                <Grid container direction="row" alignItems="center" >

                  <Grid className={classes.inputWrapper}>
                    <FormControl fullWidth variant='filled'>
                      <FilledInput value={this.state.commentText} onChange={(event)=>{this.setState({commentText:event.target.value})}}
                         fullWidth placeholder="Write a comment!" />
                    </FormControl>
                  </Grid>


                      <IconButton type="submit" onClick={this.handleSendButton} aria-label="Send!" component="span" >
                        <SendIcon />
                      </IconButton>


                        <IconButton type = 'button' onClick={this.handleCommentsButton} component="span"> <ChatRoundedIcon/> </IconButton>




                        <IconButton type = 'button' component="span" onClick={this.handleLikeButton}> {likeIcon} </IconButton>
                        <Typography>{this.state.likes} </Typography>



                        <IconButton type = 'button' component="span" onClick={this.handleDislikeButton}> {dislikeIcon}  </IconButton>
                        <Typography>{this.state.dislikes} </Typography>



                   </Grid>




          </CardActions>


          <Collapse in={this.state.isCommentsOpen} timeout="auto" unmountOnExit>
            <CardContent>
              <CommentSection addedNewComment={this.state.addedNewComment}  updateWithNewComment={this.updateWithNewComment} answerId={this.props.answerId}/>
            </CardContent>

          </Collapse>

        </Card>
      </Box>
    )

  }
}

Answer.propTypes = {
  classes: PropTypes.object.isRequired,
};


const mapStateToProps = state => {
  return {
    token: state.token
  }
}

const styledAnswer = withStyles(styles)(Answer)

export default connect(mapStateToProps)(styledAnswer)
