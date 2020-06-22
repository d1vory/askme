import React,{Component} from 'react'
//import UserList from "../../components/UserList";
import {Grid,Typography,Box, ExpansionPanel,ExpansionPanelSummary,ExpansionPanelDetails,List,ListItem} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import UserItem from '../UserList/UserItem'

import axios from 'axios'


class FriendRequests extends Component {

  state = {
    users:[]
  }


  render(){
    return(
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>
            Friend requests
          </Typography>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails>
          <List >
            {
              (this.state.users ? (this.state.users.map((user,index) => (
                <UserItem key={user.id} isFriend={this.state.showFriends} userId = {user.id} firstName={user.first_name}  lastName={user.last_name} username={user.username}  />
              ))) : <ListItem> <Typography>Nothing here!</Typography> </ListItem>)
            }
          </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }

}

export default FriendRequests
