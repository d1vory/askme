import React,{Component} from 'react'


import './styles.css'
import Search from "../../components/UserSearch";
import UserList from "../../components/UserList";
import {Grid,Typography } from "@material-ui/core";
import {connect} from 'react-redux'

class Friends extends Component {

  state = {
    showFriends:true,
    error:'',
    userList:[]
  }

  componentDidMount(){
    // this.setState({
    //   showFriends: true
    // })
  }

  changeView = (userList, error) => {
    if( !error){
      this.setState({
        showFriends: !this.state.showFriends
      })
      this.setState({
        userList: userList
      })
    }else{
      this.setState({
        error:error
      })
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
                    (<UserList  renderFriends={this.state.showFriends} changeView= {this.changeView} users= {this.state.userList}/>)
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
