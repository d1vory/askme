import React,{Component} from 'react'

export default function AskerInfo(props){
  return(
    <div>
      <div className="asker-info">
        <div className="asker-picture-holder">
          <img src= {props.userImage} className="asker-picture" />
        </div>
        <div className="asker-name-holder">
          <div className="name"> <span className="name-text"> {props.askerName} </span> </div>
          <div className="time"> <span className="time-text"> {props.askerWhenAsked}</span></div>
        </div>
      </div>
    </div>
  )
}
