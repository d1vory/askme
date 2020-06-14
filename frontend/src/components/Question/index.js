import React from 'react'
import {Card,Grid,Box,CardHeader,Avatar,IconButton,CardContent,Typography,Button} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const styles = theme => ({


});


class Question extends React.Component{

  render(){
    const {whenAsked,question_text} = this.props.question

    const { classes } = this.props;
    const ava = (<Avatar aria-label="user" >
      <AccountCircleIcon />
    </Avatar> )
    const moreButton = (<IconButton aria-label="more"> <MoreVertIcon /> </IconButton>)
    return(
      <Box>
        <Card>
          <CardHeader  avatar={ava} action={moreButton}
          title={question_text} titleTypographyProps= {{variant:'h4'}}/>
          <CardContent>
            <Grid container direction="row" justify="space-between">
              <Typography color='textSecondary' variant ='subtitle2'>yesterday </Typography>
              <Button color="primary" variant="contained" endIcon={<ChevronRightIcon />}>Answer</Button>
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

export default withStyles(styles)(Question)
