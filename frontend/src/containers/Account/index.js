import React from 'react'
import {Typography,Box,Grid} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import axios from 'axios'
import {connect} from 'react-redux'

import UserPanel from '../../components/UserPanel'
import UserStats from '../../components/UserStats'
import QuestionForm from '../../components/QuestionForm'
import Feed from '../../components/Feed'

class Account extends React.Component {


  render(){
    return(
      <Grid>
        <UserPanel />
        <Box>
          <QuestionForm firstLastName="yourself" isFriendPage={false}  askedUser={1}   username="d1vory"/>
        </Box>
        <Feed />
      </Grid>
    )
  }

}

export default Account;
