import React,{Component} from 'react'
import Edit from '../../components/infoEdit'
import './styles.css'
import Grid from "@material-ui/core/Grid";
import Password from "../../components/Password";
import {connect} from 'react-redux'

class Settings extends Component {


  render(){
    return(
      <div >
        <Grid
            container
            spacing={4}
        >
          <Grid
              item
              md={7}
              xs={12}
          >
            <Edit  />
          </Grid>
          <Grid
              item
              md={5}
              xs={12}
          >
            <Password />
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



export default connect(mapStateToProps)(Settings)
