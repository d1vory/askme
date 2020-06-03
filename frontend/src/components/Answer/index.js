import React,{Component} from 'react'
import './styles.css'
import ReactionButton from './ReactionButton'
import AskerInfo from './AskerInfo'
export default class Feed extends Component {

  constructor(props){
    super(props)

  }

  render(){
    return (
      <div className="container-fluid answer">
        <div className="question"> <span className="question-text"> {this.props.questionText} </span></div>


            <AskerInfo askerWhenAsked={this.props.askerWhenAsked}
              askerName={this.props.askerName} userImage = {require('../../common/assets/lena.png')} />

						<div className="answer-holder">
							<p className="answer-text"> {this.props.answerText}</p>
						</div>

						<div>
							<div className="bottom-panel">

                  <form className="container comment-form">
                    <div className=" comment-holder">
                      <input className="comment-form__input form-control" placeholder="comment" type="text" />
                      <input className="btn btn-success comment-form__submit"  type="submit" Value="Send" />
                    </div>

                  </form>

								<div className="reaction-holder">
                  <ReactionButton name ="rb-like" img = {require('../../common/assets/like2.svg')} imgHover = {require('../../common/assets/like-hover.svg')} />
                  <ReactionButton name = "rb-dislike" img = {require('../../common/assets/dislike.svg')} imgHover = {require('../../common/assets/dislike-hover.svg')} />
								</div>
							</div>
						</div>

      </div>
    )

  }
}
