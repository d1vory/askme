import React from 'react'
import {Card,Grid,Box,CardHeader,CardActions,TextField, IconButton,CardContent,Container,Typography,Button} from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send';
import CancelIcon from '@material-ui/icons/Cancel';

class AnswerForm extends React.Component {

  state = {
    answerValue:''
  }

  handleAnswerChange = (event) => {
    this.setState({
      answerValue:event.target.value
    })
  }
  render(){
    const closeButton =(
     <IconButton  >
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

                  <Button variant="contained" color='secondary' endIcon={<SendIcon />} >
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


export default AnswerForm
