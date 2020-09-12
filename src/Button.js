import React from 'react';

function Button(props){

    let positionDict = {
      position:"absolute", 
      top: props.top, 
      left: props.left,
    }
  
    return (
      <button 
        className="button" 
        onClick={props.handleClick}
        style={positionDict}
      >{props.text}</button>
    )
  }

export default Button;