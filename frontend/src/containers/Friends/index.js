import React,{Component} from 'react'


import './styles.css'
import Search from "../../components/UserSearch";
import List from "../../components/UserList";
import Grid from "@material-ui/core/Grid";
export default class Friends extends Component {


  render(){
    return(
        <div style={{ display: 'flex', margin: 40  }}>
          <Grid container spacing={2} direction="column">
            <Grid container item spacing={0} justify="center" >
              <Grid item xs={3}> <Search  placeholder="Знайти користувача"></Search></Grid>
            </Grid>
            <Grid container item spacing={0} justify="center" >
              <Grid item xs={6} ><List/></Grid>
            </Grid>
          </Grid>
        </div>
    )
  }
}
