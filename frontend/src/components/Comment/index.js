import React from 'react'
import { Typography,Box} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

import UserInfo from '../UserInfo'
import transformtimestamp from '../utils'

const useStyles = makeStyles((theme) => ({

  commentTextContainer:{
    marginLeft: theme.spacing(6)
  }

}));


export default function Comment(props){
  const { data } = props;
  const classes = useStyles();


  return(
    <Box key = {data.id} my={1}>

      <UserInfo  firstName= {data.commented_user.first_name}  avatarSize='mediumAvatar'  lastName={data.commented_user.last_name}
                askedUserUsername={data.commented_user.username} avatar = {data.commented_user.avatar} whenAnswered={transformtimestamp(data.timestamp)} />
      <Box className={classes.commentTextContainer} >
        <Typography variant='body1'>
          {data.comment_text}
        </Typography>


      </Box>

    </Box>
  )
}
