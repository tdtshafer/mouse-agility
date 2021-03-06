import React from 'react';

function GameButton(props){

    let positionDict = {
      position:"absolute", 
      top: props.top,
      left: props.left,
    }
  
    return (
      <button 
        className={props.className} 
        onClick={props.handleClick}
        style={positionDict}
      >{props.text}</button>
    )
  }

export default GameButton;