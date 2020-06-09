import React,{Component} from 'react'
import './styles.css'
import SendIcon from '@material-ui/icons/Send';
import {Box,Typography,Card,TextField,CardHeader,CardContent,
        FormControl,Input,FormGroup,FormControlLabel,Switch,FilledInput,IconButton,Grid} from '@material-ui/core'

export default class QuestionForm extends Component {
  constructor(props){
    super(props)

    this.state = {textValue:'', toggleValue : true}

    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }


  handleTextChange(event){
    //do smth

     this.setState({textValue: event.target.value});
     //console.log("Text changed af: ", event.target.value)
  }


  handleSubmit(event){
    //do smth
    console.log("submit")
  }

  handleToggle(){

    this.setState((state,props) => ({toggleValue : !state.toggleValue}))
    console.log("toggle after, ", this.state.toggleValue)
  }


  render(){
    return (
      <Box>
        <Card>
          <CardHeader title="Ask a question!">


          </CardHeader>

          <CardContent>
            <FormGroup>
              <FormControl fullWidth variant='filled'>
                <FilledInput id="kek"  placeholder="What's up?" />
              </FormControl>

              <Grid  container direction="row" justify="space-between">

                  <FormControlLabel  control={<Switch checked= {this.state.toggleValue} onChange={this.handleToggle} />}
                    label="Anonymous question"
                  />

                  <IconButton type="submit" aria-label="Send!" component="span" >
                    <SendIcon />
                  </IconButton>


              </Grid>

            </FormGroup>


          </CardContent>


        </Card>

      </Box>
    )

  }
}
