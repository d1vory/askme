import React,{Component} from 'react'


export default function(props){

  return(
    <button className="btn">
      <img  className={'rb' +' ' + props.name}  src= {props.img}
        onMouseOver={e => e.currentTarget.src = props.imgHover}
        onMouseOut = {e => e.currentTarget.src = props.img }
      />
    </button>
  )
}
