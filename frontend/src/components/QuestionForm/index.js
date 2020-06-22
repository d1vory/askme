import React,{Component} from 'react'
import './styles.css'
import SendIcon from '@material-ui/icons/Send';
import {Box,Card,CardHeader,CardContent,
        FormControl,FormGroup,FormControlLabel,Switch,FilledInput,IconButton,Grid} from '@material-ui/core'
import CancelIcon from '@material-ui/icons/Cancel';
import axios from 'axios'
import {connect} from 'react-redux'
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator'

class QuestionForm extends Component {

  constructor(props){
    super(props)

    this.state = {textValue:'',
                  toggleValue : true}

    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }


  handleTextChange(event){
     this.setState({textValue: event.target.value});
  }


  handleSubmit(event){

    const postData = {
      question_text: this.state.textValue,
      askedUser: this.props.askedUser,
      isAnon: this.state.toggleValue
    }

    const config = {
      headers: {
        'Authorization' : `Token ${this.props.token}`,
        'Content-Type': 'application/json'
      }
    }
    axios.post('http://127.0.0.1:8000/api/questions/create/',postData,config)
      .then(res => {this.props.closeElement(); this.setState({textValue:''})}  )
      .catch(err => console.log(err))

  }

  handleToggle(){
    this.setState((state,props) => ({toggleValue : !state.toggleValue}))
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

export default connect(mapStateToProps)(QuestionForm)
