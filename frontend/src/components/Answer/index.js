import React,{Component} from 'react'

import PropTypes from 'prop-types';
//import ReactionButton from './ReactionButton'
import AskerInfo from './AskerInfo'
import {Card,Box,Typography,CardContent,CardActions,CardHeader,
        FormControl,FilledInput,IconButton,Grid} from '@material-ui/core'
import ThumbUpRoundedIcon from '@material-ui/icons/ThumbUpRounded';
import ThumbDownRoundedIcon from '@material-ui/icons/ThumbDownRounded';
import ChatRoundedIcon from '@material-ui/icons/ChatRounded';
import SendIcon from '@material-ui/icons/Send';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({

  inputWrapper: {
    flex:1,
  },
});

class Answer extends Component {

  

  render(){
    const { classes } = this.props;
    return (
      <Box my={2}>
        <Card variant="outlined">
          <CardHeader title= {this.props.questionText} titleTypographyProps = {{variant:'h4'}}/>

          <CardContent>
            <AskerInfo askerWhenAsked={this.props.askerWhenAsked}
              askerName={this.props.askerName} userImageSrc = {require('../../common/assets/lena.png')} />

            <Typography variant='body1' >
              {this.props.answerText}
            </Typography>

          </CardContent>

          <CardActions>


                <Grid container direction="row" alignItems="center" >

                  <Grid className={classes.inputWrapper}>
                    <FormControl fullWidth variant='filled'>
                      <FilledInput fullWidth placeholder="Write a comment!" />
                    </FormControl>
                  </Grid>


                      <IconButton type="submit" aria-label="Send!" component="span" >
                        <SendIcon />
                      </IconButton>


                        <IconButton type = 'button' component="span"> <ChatRoundedIcon/> </IconButton>
                        <Typography> </Typography>



                        <IconButton type = 'button' component="span"> <ThumbUpRoundedIcon/> </IconButton>
                        <Typography>{this.props.likesAmount} </Typography>



                        <IconButton type = 'button' component="span"> <ThumbDownRoundedIcon/>  </IconButton>
                        <Typography>{this.props.dislikesAmount} </Typography>



                   </Grid>




          </CardActions>


        </Card>
      </Box>
    )

  }
}

Answer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Answer)
