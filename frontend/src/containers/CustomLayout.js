import Header from '../components/Header'
import React from 'react'
import {Box} from '@material-ui/core'

function CustomLayout(props){
  return(
    <Box>
      <Header isAuthenticated = {props.isAuthenticated}> </Header>
      <Box mx={10}  mt={2}>
        {props.children}
      </Box>

    </Box>
  )
}


export default CustomLayout;
