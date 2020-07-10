import React,{Component} from 'react'


import './styles.css'
import Search from "../../components/UserSearch";
//import UserList from "../../components/UserList";
import {Grid,Typography,Box, List,Container,Button,Snackbar } from "@material-ui/core";
import {connect} from 'react-redux'
import axios from 'axios'
import UserItem from '../../components/UserItem'
import FriendRequestsDrawer from '../../components/FriendRequestsDrawer'
import MuiAlert from '@material-ui/lab/Alert';



class Friends extends Component {

  state = {
    showFriends:true,
    error:'',
    userList:[],
    isFriendReqestsDrawerOpen:false,
    openInfo:false,
    infoMessage:'',
    infoType:''
  }

  fetchFriends= (token) => {
    const url = 'api/friends/'
    axios.get(url,{
        headers: {
          'Authorization' : `Token ${token}`
        }
    }).then(res => {
      //console.log(res.data);
      //console.log("FETCHED FRIENDS", res.data);
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

    if (this.props.token !== null){

      this.fetchFriends(this.props.token)
    }
  }

  removeFromFriends = (index) => {
    let friendsCopy = [...this.state.userList]
    friendsCopy.splice(index,1)
    this.setState({
      userList:friendsCopy
    })
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

  toggleFriendReqestsDrawer = (open) => {
    this.setState({
      isFriendReqestsDrawerOpen:open
    })
  }


  handleFriendReqestsButton =  (event) => {
    this.toggleFriendReqestsDrawer(true)

  }

  openInfo = (message, type) => {
    this.setState({
      openInfo:true,
      infoMessage:message,
      infoType:type
    })
  }

  handleInfoClose = () => {
    this.setState({
      openInfo:false
    })
  }

  render(){
    return(
        <div style={{ display: 'flex', marginTop: 40  }}>

          <Grid container spacing={2} direction="column">
            <Grid container item spacing={0} justify="space-around" alignItems='baseline'>

              <Grid item xs={3} >
                <Button variant="outlined" color="primary" onClick={this.handleFriendReqestsButton}> Friend requests</Button>
              </Grid>

              <Grid item xs={3}> <Search changeView={this.changeView}  token ={this.props.token} placeholder="Знайти користувача"></Search></Grid>

            </Grid>


            <Grid container justify="center" >
              <Container>
                {
                  (!this.state.error) ?
                    (
                      <Box boxShadow={3}>
                          <List >
                            {
                              (this.state.userList.map((user,index) => (
                                <UserItem token={this.props.token} key={user.pk} avatar={user.avatar}
                                  isFriend={this.state.showFriends} userId = {user.pk} firstName={user.first_name}
                                  lastName={user.last_name} username={user.username}  openInfo={this.openInfo}
                                  removeFromFriends= {this.removeFromFriends} index = {index}/>
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

              </Container>
            </Grid>
          </Grid>
          <FriendRequestsDrawer isOpen={this.state.isFriendReqestsDrawerOpen} fetchFriends= {this.fetchFriends} toggleDrawer={this.toggleFriendReqestsDrawer}/>

          <Snackbar open={this.state.openInfo} autoHideDuration={6000} onClose={this.handleInfoClose}>
             <MuiAlert elevation={6} severity={this.state.infoType} onClose={this.handleInfoClose} >
               {this.state.infoMessage}
             </MuiAlert>
          </Snackbar>

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
