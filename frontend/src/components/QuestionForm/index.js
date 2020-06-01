import React,{Component} from 'react'


export default class QuestionForm extends Component {
  constructor(props){
    super(props)

    this.state = {textValue:'', checkboxValue : true}

    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleCheckBox = this.handleCheckBox.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleTextChange(event){
    //do smth
     this.setState({textValue: event.target.value});
     console.log("Text changed: ", event.target.value)
  }

  handleSubmit(event){
    //do smth
    console.log("submit")
  }

  handleCheckBox(){
    //do smth {checkboxValue: !this.state.checkboxValue}
    this.setState((state,props) => ({
      checkboxValue: !state.checkboxValue
    }))

    console.log("Checkbox ", this.state.checkboxValue)
  }

  render(){
    return (
      <div className ="card">
        <div className ="card-title">Ask a question!</div>
        <div className ="form-holder">
          <form className ="question-form" onSubmit={this.handleSubmit}>

            <input className ="question-form__input" type="text" value={this.state.textValue} onChange={this.handleTextChange} />

            <label className= "switch">
              <input  type="checkbox" onClick={this.handleCheckBox} />
              <span className="switch__slider switch__round"></span>
            </label>

            <input className ="question-form__submit" type="submit"  />

          </form>
        </div>
      </div>
    )

  }
}
