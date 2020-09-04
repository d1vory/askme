import React from 'react';
import Header from '../components/Header'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {Box} from '@material-ui/core'
import * as actions from '../store/actions/auth'

import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';


const styles = theme => ({
  layoutWrapper:{
    [theme.breakpoints.up('sm')]: {
      marginLeft:theme.spacing(5),
      marginRight:theme.spacing(5)

    },
    marginTop:3,
    marginBottom:theme.spacing(0)
  }
});

class CustomLayout extends React.Component{
  render(){
    const { classes } = this.props;


    const header = (this.props.isAuthenticated  || /\/user\/\w+\/?/.test(this.props.location.pathname)) &&
    (<Header isAuthenticated = {this.props.isAuthenticated}  logoutFunc = {this.props.logout}> </Header>)
    return(


        <Box>
            {
              header
            }
            <Box className={(this.props.location.pathname !== '/') && classes.layoutWrapper}   >
              {this.props.children}
            </Box>
          </Box>

    )
  }

}


CustomLayout.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styledCustomLayout = withStyles(styles)(CustomLayout)

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(actions.logout())
    }
  }
}


export default withRouter(connect(null,mapDispatchToProps)(styledCustomLayout))
