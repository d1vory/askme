import React,{Component} from 'react'
import './styles.css'
import Switch from './Switch'

export default class QuestionForm extends Component {
  constructor(props){
    super(props)

    this.state = {textValue:'', toggleValue : true}

    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }


  handleTextChange(event){
    //do smth

     this.setState({textValue: event.target.value});
     //console.log("Text changed af: ", event.target.value)
  }


  handleSubmit(event){
    //do smth
    console.log("submit")
  }

  handleToggle(){
  
    this.setState((state,props) => ({toggleValue : !state.toggleValue}))
    //console.log("toggle after, ", this.state.toggleValue)
  }



  render(){
    return (
      <div className ="card">
        <div className ="card-title">Ask a question!</div>
        <div className ="form-holder">
          <form className ="question-form" onSubmit={this.handleSubmit}>

            <input className ="question-form__input" type="text" value={this.state.textValue} onChange={this.handleTextChange} />

            <Switch ison={this.state.toggleValue} handleToggle={this.handleToggle}/>

            <input className ="question-form__submit" type="submit"  />

          </form>
        </div>
      </div>
    )

  }
}
