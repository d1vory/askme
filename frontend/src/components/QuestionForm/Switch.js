import React,{Component} from 'react'
import './switch.css'


export default class Switch extends Component{
  constructor(props){
    super(props)

    this.switchColor = '#06D6A0'
  }


  render(){
    return(
      <>
        <input className="react-switch-checkbox" id={`react-switch-new`} type="checkbox"
        checked={this.props.ison} onChange={this.props.handleToggle}/>
       <label className="react-switch-label" htmlFor={`react-switch-new`} style={{background: this.props.ison && this.switchColor}} >
         <span className={`react-switch-button`} />
       </label>
      </>
    )

  }


}
