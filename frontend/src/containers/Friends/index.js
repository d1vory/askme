import React,{Component} from 'react'


import './styles.css'
import Search from "../../components/UserSearch";
//import UserList from "../../components/UserList";
import {Grid,Typography,Box, List,Divider } from "@material-ui/core";
import {connect} from 'react-redux'
import axios from 'axios'
import UserItem from '../../components/UserList/UserItem'
import FriendRequests from '../../components/FriendRequests'

class Friends extends Component {

  state = {
    showFriends:true,
    error:'',
    userList:[]
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
          userList : res.data
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

  componentWillReceiveProps(newProps){
    if (newProps.token !== null){
      this.fetchFriends(newProps.token)
    }

  }

  componentDidMount(){
    console.log("DID MOUNT FETCH without token");
    if (this.props.token !== null){
      console.log("DID MOUNT FETCH");
      this.fetchFriends(this.props.token)
    }
  }



  changeView = (userList, error,showFriends) => {

      this.setState({
        error:error,
        showFriends: showFriends,
        userList:userList
      })
      if(showFriends){
        this.componentDidMount()
      }
  }

  render(){
    return(
        <div style={{ display: 'flex', marginTop: 40  }}>

          <Grid container spacing={2} direction="column">
            <Grid container item spacing={0} justify="center" >
              <Grid item xs={3}> <Search changeView={this.changeView}  token ={this.props.token} placeholder="Знайти користувача"></Search></Grid>

            </Grid>
            <Grid container item spacing={0} justify="center" >
              <Grid item xs={6} >
                {
                  (!this.state.error) ?
                    (
                      <Box boxShadow={3}>
                          <List >
                            {
                              (this.state.userList.map((user,index) => (
                                <UserItem key={user.id} avatar={user.avatar} isFriend={this.state.showFriends} userId = {user.id} firstName={user.first_name}  lastName={user.last_name} username={user.username}  />
                              )))
                            }
                          </List>
                      </Box> )
                      //<UserList  isFriend={this.state.showFriends} changeView= {this.changeView} users= {this.state.userList}/>)
                    :
                    (<Typography variant="h5" >
                      {this.state.error}
                    </Typography>)
                }

              </Grid>
            </Grid>
          </Grid>
        </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    token: state.token
  }
}

export default connect(mapStateToProps)(Friends)
