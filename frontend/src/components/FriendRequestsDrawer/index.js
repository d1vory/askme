import React,{Component} from 'react'
import {Typography,Box,SwipeableDrawer,List,Snackbar} from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';

import RequestUserItem from '../RequestUserItem'
import axios from 'axios'
import PropTypes from 'prop-types';
import {connect} from 'react-redux'


const styles = theme => ({
  list: {
    width: 350,
  },
})


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}



class FriendRequestsDrawer extends Component{
  state = {
    requests:[],
    error:'',
    openInfo:false,
    infoMessage:'',
    infoType:''
  }

  componentWillReceiveProps(newProps){
    if (newProps.token !== null && !this.props.isOpen){
      this.fetchFriendRequests(newProps.token)
    }

  }


  componentDidMount(){
    if (this.props.token !== null && !this.props.isOpen){
      this.fetchFriendRequests(this.props.token)
    }
  }

  removeFromRequests= (index) => {
    let requestsCopy = [...this.state.requests]
    requestsCopy.splice(index,1)
    this.setState({
      requests:requestsCopy
    })
  }

  openInfo = (message, type) => {
    this.setState({
      openInfo:true,
      infoMessage:message,
      infoType:type
    })
  }


  fetchFriendRequests= (token) => {
    const url = 'http://127.0.0.1:8000/api/friends/requests/'
    axios.get(url,{
        headers: {
          'Authorization' : `Token ${token}`
        }
    }).then(res => {
      //console.log(res.data);
    // console.log("FETCHED ", res.data);
      if( res.data.length > 0){
        this.setState({
          requests : res.data
        });
      }else{
        this.setState({
          error: 'You dont have any requests!'
        })
      }

    }).catch(err => {
      this.setState({
        error: err
      })
    })

  }


  acceptFriendship = (index) => {
    const config = {
      headers: {
        'Authorization' : `Token ${this.props.token}`,
        'Content-Type': 'application/json'
      }
    }
    const requestId = this.state.requests[index].id
    axios.post(`http://127.0.0.1:8000/api/friendship/create/${requestId}/`,{}, config)
      .then(res => {
                    this.removeFromRequests(index);
                    this.props.fetchFriends(this.props.token);
                    this.openInfo('Frienship accepted', 'success')
                    })
      .catch(err => console.log(err))
  }

  rejectFriendship = (index) => {
    const config = {
      headers: {
        'Authorization' : `Token ${this.props.token}`,
        'Content-Type': 'application/json'
      }
    }
    const requestId = this.state.requests[index].id
    axios.post(`http://127.0.0.1:8000/api/friendship/reject/${requestId}/`,{}, config)
      .then(res => {
                    this.removeFromRequests(index);
                    this.openInfo('Frienship rejected', 'info')
                    })
      .catch(err => console.log(err))
  }


  close = (event) => {

    this.props.toggleDrawer(false)
  }

  handleInfoClose = () => {
    this.setState({
      openInfo:false
    })
  }

  render(){
    const { classes } = this.props;

    return(

      <SwipeableDrawer open ={this.props.isOpen} onOpen={() => {this.props.toggleDrawer(true)}} onClose={this.close}  ModalProps={{ onBackdropClick: this.toggleDrawer }}>
        <Box pt ={1}>
          <Typography variant='h5' align='center'>
            Friend requests
          </Typography>
        </Box>
        { this.state.error ?
        <Typography>
          {this.state.error}
        </Typography>   :
        <List className={classes.list}>

          {
            this.state.requests ?

              this.state.requests.map((request,index) => (
                <React.Fragment key ={index}>
                  <RequestUserItem  request={request} rejectFriendship={this.rejectFriendship} acceptFriendship={this.acceptFriendship} index= {index} />
                </React.Fragment>
              ))
              : undefined


          }



        </List>
        }

        <Snackbar open={this.state.openInfo} autoHideDuration={6000} onClose={this.handleInfoClose}>
         <Alert onClose={this.handleInfoClose} severity={this.state.infoType}>
           {this.state.infoMessage}
         </Alert>
       </Snackbar>
      </SwipeableDrawer>)
  }


}



FriendRequestsDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    token: state.token
  }
}
const temp  =  withStyles(styles)(FriendRequestsDrawer)

export default connect(mapStateToProps)(temp)
