import React,{Component} from 'react'
import './styles.css'
import SendIcon from '@material-ui/icons/Send';
import {Box,Card,CardHeader,CardContent,Typography,Button,Snackbar,
        FormControl,FormGroup,FormControlLabel,Switch,FilledInput,IconButton,Grid,List,Checkbox} from '@material-ui/core'
import CancelIcon from '@material-ui/icons/Cancel';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios'
import {connect} from 'react-redux'
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator'
import UserItem from '../UserList/UserItem'
import UserInfo from '../UserInfo'
import UserCheckbox from './UserCheckbox'
import Popup from "reactjs-popup";


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


class QuestionForm extends Component {

  constructor(props){
    super(props)

    this.state = {
                  textValue:'',
                  toggleValue : true,
                  openFriends:false,
                  userList:[],
                  checkedUsers:[],
                  error:'',
                  snackbarOpen:false
                 }

    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }


  handleTextChange(event){
     this.setState({textValue: event.target.value});
  }

  fetchFriends= (token) => {
    const url = 'http://127.0.0.1:8000/api/friends/'
    axios.get(url,{
        headers: {
          'Authorization' : `Token ${token}`
        }
    }).then(res => {
      //console.log(res.data);
      console.log("FETCHED ", res.data);
      if( res.data.length > 0){
        this.setState({
          userList : res.data,
          checkedUsers: res.data.map(() => (false)),
          openFriends:true
        });
      }else{
        this.setState({
          error: 'You have not any friends!'
        })
      }

    }).catch(err => {
      this.setState({
        error: err
      })
    })

  }

  postQuestion = (question_text,askedUser,isAnon) => {
        const postData = {
          question_text: question_text,
          askedUser: askedUser,
          isAnon: isAnon
        }

        const config = {
          headers: {
            'Authorization' : `Token ${this.props.token}`,
            'Content-Type': 'application/json'
          }
        }
        axios.post('http://127.0.0.1:8000/api/questions/create/',postData,config)
          .then(res => {this.setState({textValue:''}); this.props.closeElement(); }  )
          .catch(err => console.log(err))
  }

  handleCheckUser = (index) => {
    const newChecked = [...this.state.checkedUsers]
    newChecked[index] = !newChecked[index]
    console.log(index);
    console.log(newChecked);
    this.setState({
      checkedUsers:newChecked
    })
  }

  closeFriends = () => {
    this.setState({openFriends:false})
  }

  handleSubmit(event){
    if(this.props.caller == 'wall'){
      this.fetchFriends(this.props.token)

    }else{
      this.postQuestion(this.state.textValue, this.props.askedUser, this.state.toggleValue)
    }

  }

  handlePopupSubmit = () => {
    const postData = {
      question_text: this.state.textValue,
      askedUsers: this.state.userList.filter((item,i) => this.state.checkedUsers[i]).map((user) => user.pk),
      isAnon: this.state.toggleValue
    }
    if( postData.askedUsers.length == 0){
      this.setState({snackbarOpen:true})
    }else{
      const config = {
        headers: {
          'Authorization' : `Token ${this.props.token}`,
          'Content-Type': 'application/json'
        }
      }
      axios.post('http://127.0.0.1:8000/api/questions/multiple/create/',postData,config)
        .then(res => {this.setState({textValue:'',openFriends:false}) }  )
        .catch(err => console.log(err))
    }
  }

  handleToggle(){
    this.setState((state,props) => ({toggleValue : !state.toggleValue}))
  }

  handleSnackbarClose = (event,reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({snackbarOpen:false})
  }

  render(){
    const closeButton =(
     <IconButton onClick={this.props.closeElement} >
      <CancelIcon />
    </IconButton>)

    const titleText = this.props.firstLastName ? ('Ask a question to ' + this.props.firstLastName +' !') : "Ask a question!"
    return (
      <Box>
        <Card>
          <CardHeader title={titleText} action={this.props.isFriendPage ? closeButton : undefined } />

          <CardContent>
            <FormGroup>
              <ValidatorForm
                  ref="form"
                  onSubmit={this.handleSubmit}
                  onError={errors => console.log(errors)}>

                <TextValidator
                  variant="filled"
                  fullWidth
                  required
                  label="Question"
                  name="question"
                  value={this.state.textValue}
                  autoFocus
                  onChange={this.handleTextChange}
                  validators={['required']}
                  errorMessages={['this field is required']}
                />


              <Grid  container direction="row" justify="space-between">

                  <FormControlLabel  control={<Switch checked= {this.state.toggleValue} onChange={this.handleToggle} />}
                    label="Anonymous question"
                  />

                  <IconButton type="submit" aria-label="Send!"   >
                    <SendIcon />
                  </IconButton>


              </Grid>
              </ValidatorForm>

            </FormGroup>


          </CardContent>

          <Popup open={this.state.openFriends} closeOnDocumentClick onClose={this.closeFriends}>
            <Box p={2}>
              <Typography variant='h4'>
                Select users that you want to ask!
              </Typography>
              {
                (this.state.userList.map((user,index) => (

                <UserCheckbox key={index} index={index} isChecked={this.state.checkedUsers[index]} handleCheckUser={this.handleCheckUser} avatar = {user.avatar} firstName={user.first_name}  lastName={user.last_name} userId = {user.pk} username={user.username}/>

                )))
              }

              <Grid container justify="flex-end">
                <Button color="primary" variant="contained" onClick={this.handlePopupSubmit}> Ask! </Button>
              </Grid>

            </Box>
          </Popup>

        </Card>

        <Snackbar open={this.state.snackbarOpen} autoHideDuration={2000} onClose = {this.handleSnackbarClose}>
          <Alert onClose={this.handleSnackbarClose} severity = 'error' >
            You should select one or more friends
          </Alert>
        </Snackbar>

      </Box>
    )

  }
}

const mapStateToProps = state => {
  return {
    token: state.token
  }
}

export default connect(mapStateToProps)(QuestionForm)
