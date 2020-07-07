import React,{Component} from 'react'
import StartPage from '../../components/Start'
import './styles.css'

export default class Start extends Component {

  static getDerivedStateFromProps(props, state) {
    if(localStorage.getItem('token')){
      props.history.push('/wall')
    }
  
    return null
  }

  render(){
    return(


          <StartPage/>



    )
  }
}
